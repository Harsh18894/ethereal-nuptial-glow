import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get all RSVP responses ordered by creation date
        const result = await sql`
      SELECT id, name, email, attendance, guests, message, created_at
      FROM rsvp_responses
      ORDER BY created_at DESC
    `;

        res.status(200).json({
            success: true,
            responses: result.rows
        });

    } catch (error) {
        console.error('Error fetching RSVP responses:', error);
        res.status(500).json({ error: 'Failed to fetch RSVP responses' });
    }
}
