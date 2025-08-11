-- Create RSVP responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  attendance VARCHAR(50) NOT NULL CHECK (attendance IN ('yes', 'no')),
  guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 10),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_rsvp_attendance ON rsvp_responses(attendance);
