import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, attendance, guests, message } = req.body;

    // Validate required fields
    if (!name || !attendance || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // First, check if the table exists
    try {
      await sql`SELECT 1 FROM rsvp_responses LIMIT 1`;
    } catch (tableError) {
      console.error('Table does not exist:', tableError);
      return res.status(500).json({
        error: 'Database table not found. Please set up the database schema first.',
        details: 'The rsvp_responses table does not exist. Run the SQL schema from database/schema.sql in your Vercel Postgres database.'
      });
    }

    // Insert RSVP into database
    const result = await sql`
      INSERT INTO rsvp_responses (name, email, attendance, guests, message, created_at)
      VALUES (${name}, ${email || null}, ${attendance}, ${parseInt(guests)}, ${message || null}, NOW())
      RETURNING id
    `;

    res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('RSVP submission error:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('relation "rsvp_responses" does not exist')) {
        return res.status(500).json({
          error: 'Database table not found. Please set up the database schema first.',
          details: 'Run the SQL schema from database/schema.sql in your Vercel Postgres database.'
        });
      }
      if (error.message.includes('connection')) {
        return res.status(500).json({
          error: 'Database connection failed. Please check your database configuration.',
          details: error.message
        });
      }
    }

    res.status(500).json({
      error: 'Failed to submit RSVP',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
