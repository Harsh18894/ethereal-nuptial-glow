# Backend Setup Guide for RSVP System

This guide will help you set up a complete backend system for your wedding website's RSVP functionality using Vercel and PostgreSQL.

## Prerequisites

1. A Vercel account
2. A PostgreSQL database (Vercel Postgres recommended)

## Step 1: Set up Vercel Postgres Database

1. **Create a new Vercel project** (if you haven't already):
   ```bash
   vercel
   ```

2. **Add Vercel Postgres to your project**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to "Storage" tab
   - Click "Create Database" → "Postgres"
   - Choose a plan (Hobby plan is free for small projects)
   - Select a region close to your users
   - Click "Create"

3. **Set up the database schema**:
   - In your Vercel dashboard, go to the "Storage" tab
   - Click on your Postgres database
   - Go to "SQL Editor"
   - Run the SQL from `database/schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS rsvp_responses (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255),
     attendance VARCHAR(50) NOT NULL CHECK (attendance IN ('yes', 'no')),
     guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 10),
     message TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses(created_at);
   CREATE INDEX IF NOT EXISTS idx_rsvp_attendance ON rsvp_responses(attendance);
   ```

## Step 2: Install Dependencies

Install the required dependencies:

```bash
npm install @vercel/postgres
```

## Step 3: Environment Variables

Vercel will automatically add the database environment variables to your project. You can verify them in your Vercel dashboard under "Settings" → "Environment Variables".

The variables should include:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 4: Deploy to Vercel

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Add RSVP backend functionality"
   git push
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## Step 5: Test the System

1. **Test RSVP submission**:
   - Visit your deployed website
   - Fill out the RSVP form
   - Submit and verify the success message

2. **Test admin panel**:
   - Visit `https://your-domain.vercel.app/admin`
   - You should see the RSVP responses dashboard

## Step 6: Security Considerations

1. **Add authentication to admin panel** (recommended):
   - Consider adding a simple password protection
   - Or use Vercel's authentication features

2. **Rate limiting**:
   - Consider adding rate limiting to prevent spam
   - Vercel has built-in rate limiting for serverless functions

## API Endpoints

### POST /api/rsvp
Submits a new RSVP response.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "attendance": "yes",
  "guests": 2,
  "message": "Can't wait to celebrate!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "RSVP submitted successfully",
  "id": 123
}
```

### GET /api/rsvp-list
Retrieves all RSVP responses (for admin use).

**Response:**
```json
{
  "success": true,
  "responses": [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "attendance": "yes",
      "guests": 2,
      "message": "Can't wait to celebrate!",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Troubleshooting

### Common Issues:

1. **Database connection errors**:
   - Verify environment variables are set correctly
   - Check if the database is running
   - Ensure the schema has been created

2. **API 500 errors**:
   - Check Vercel function logs in the dashboard
   - Verify the database schema exists
   - Check for syntax errors in the API files

3. **CORS issues**:
   - The API routes should work automatically with Vercel
   - If you're testing locally, you might need to configure CORS

### Local Development:

To test locally, you can use Vercel's development server:

```bash
vercel dev
```

This will start a local development server with your API routes.

## Monitoring

1. **Vercel Analytics**: Monitor your API usage in the Vercel dashboard
2. **Database Monitoring**: Check your Postgres database usage in the Storage tab
3. **Function Logs**: View serverless function logs in the Functions tab

## Cost Considerations

- **Vercel Hobby Plan**: Free tier includes 100GB-hours of serverless function execution
- **Vercel Postgres Hobby Plan**: Free tier includes 256MB storage and 10GB bandwidth
- **For larger events**: Consider upgrading to Pro plan for more resources

## Next Steps

1. **Add email notifications** when RSVPs are submitted
2. **Implement RSVP editing** functionality
3. **Add RSVP deadline** features
4. **Create RSVP reminders** for guests who haven't responded
5. **Add analytics** and reporting features

## Support

If you encounter any issues:
1. Check the Vercel documentation
2. Review the function logs in your Vercel dashboard
3. Verify your database connection and schema
4. Test the API endpoints using tools like Postman or curl
