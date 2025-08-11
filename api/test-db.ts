import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test database connection
    const connectionTest = await sql`SELECT 1 as test`;
    
    // Check if table exists
    let tableExists = false;
    try {
      await sql`SELECT 1 FROM rsvp_responses LIMIT 1`;
      tableExists = true;
    } catch (tableError) {
      tableExists = false;
    }

    // Get environment variables (without sensitive data)
    const envVars = {
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      hasPostgresHost: !!process.env.POSTGRES_HOST,
      hasPostgresDatabase: !!process.env.POSTGRES_DATABASE,
      hasPostgresUser: !!process.env.POSTGRES_USER,
      hasPostgresPassword: !!process.env.POSTGRES_PASSWORD,
    };

    res.status(200).json({
      success: true,
      message: 'Database test completed',
      connection: 'OK',
      tableExists,
      environmentVariables: envVars,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
