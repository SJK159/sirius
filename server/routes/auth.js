const crypto = require('crypto');

const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const { pool } = require('../db/migrate');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const dummyHashPromise = bcrypt.hash('stablepay_dummy_password', 12);

function issueAccessToken(user) {
  return jwt.sign(
    {
      phone: user.phone,
      role: user.role,
      status: user.status,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      subject: user.id,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    }
  );
}

async function issueRefreshToken(userId) {
  const rawToken = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(rawToken, 12);
  const expiresAt = new Date(
    Date.now() + parseDurationMs(process.env.JWT_REFRESH_EXPIRES_IN)
  );

  await pool.query(
    `
      INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt]
  );

  return rawToken;
}

function parseDurationMs(value) {
  const match = /^(\d+)([smhd])$/.exec(value || '');

  if (!match) {
    throw new Error('Invalid JWT_REFRESH_EXPIRES_IN value');
  }

  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
}

router.post('/signup', async (req, res, next) => {
  try {
    const { phone, full_name: fullName, password } = req.body || {};

    if (!phone || !fullName || !password) {
      return res.status(400).json({ error: 'phone, full_name, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE phone = $1',
      [phone]
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json({ error: 'Phone number already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const insertResult = await pool.query(
      `
        INSERT INTO users (phone, full_name, password_hash, role, status)
        VALUES ($1, $2, $3, 'user', 'pending_kyc')
        RETURNING id, phone, full_name, role, status
      `,
      [phone, fullName, passwordHash]
    );

    const user = insertResult.rows[0];
    const accessToken = issueAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);

    return res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { phone, password } = req.body || {};

    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password are required' });
    }

    const userResult = await pool.query(
      `
        SELECT id, phone, full_name, password_hash, role, status
        FROM users
        WHERE phone = $1
      `,
      [phone]
    );

    if (userResult.rowCount === 0) {
      const dummyHash = await dummyHashPromise;
      await bcrypt.compare(password, dummyHash);
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    const user = userResult.rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    const accessToken = issueAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);

    return res.json({
      user: {
        id: user.id,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        status: user.status,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return res.status(400).json({ error: 'refreshToken is required' });
    }

    const tokenResult = await pool.query(
      `
        SELECT
          rt.id,
          rt.token_hash,
          rt.user_id,
          u.phone,
          u.role,
          u.status
        FROM refresh_tokens rt
        JOIN users u ON u.id = rt.user_id
        WHERE rt.expires_at > NOW()
      `
    );

    let matchedRow = null;

    for (const row of tokenResult.rows) {
      const isMatch = await bcrypt.compare(refreshToken, row.token_hash);
      if (isMatch) {
        matchedRow = row;
        break;
      }
    }

    if (!matchedRow) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await pool.query('DELETE FROM refresh_tokens WHERE id = $1', [matchedRow.id]);

    const user = {
      id: matchedRow.user_id,
      phone: matchedRow.phone,
      role: matchedRow.role,
      status: matchedRow.status,
    };

    const nextAccessToken = issueAccessToken(user);
    const nextRefreshToken = await issueRefreshToken(user.id);

    return res.json({
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const userResult = await pool.query(
      `
        SELECT id, phone, full_name, role, status, created_at
        FROM users
        WHERE id = $1
      `,
      [req.user.id]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: userResult.rows[0],
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
