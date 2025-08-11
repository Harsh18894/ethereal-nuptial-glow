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
    res.status(500).json({ error: 'Failed to submit RSVP' });
  }
}
