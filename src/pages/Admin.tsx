import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Users, CheckCircle, XCircle } from 'lucide-react';
import { getRSVPResponses, getRSVPStats, RSVPResponse } from '@/lib/rsvpService';

const Admin = () => {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const responses = await getRSVPResponses();
      setResponses(responses);
    } catch (error) {
      setError('Failed to fetch responses');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Attendance', 'Guests', 'Message', 'Date'];
    const csvContent = [
      headers.join(','),
             ...responses.map(r => [
         `"${r.name}"`,
         `"${r.email || ''}"`,
         r.attendance,
         r.guests,
         `"${r.message || ''}"`,
         r.createdAt.toLocaleDateString()
       ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp-responses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await getRSVPStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading RSVP responses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchResponses}>Try Again</Button>
        </div>
      </div>
    );
  }

      return (
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={exportToCSV} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attending</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Attending</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGuests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Responses List */}
        <div className="space-y-4">
          {responses.map((response) => (
            <Card key={response.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{response.name}</h3>
                      <Badge variant={response.attendance === 'yes' ? 'default' : 'secondary'}>
                        {response.attendance === 'yes' ? 'Attending' : 'Not Attending'}
                      </Badge>
                      {response.attendance === 'yes' && (
                        <Badge variant="outline">{response.guests} guest{response.guests > 1 ? 's' : ''}</Badge>
                      )}
                    </div>
                    {response.email && (
                      <p className="text-muted-foreground mb-2">{response.email}</p>
                    )}
                    {response.message && (
                      <p className="text-sm text-muted-foreground mb-2">"{response.message}"</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Submitted: {response.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {responses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No RSVP responses yet.</p>
          </div>
        )}
            </div>
          </div>
        </div>
      );
    };

export default Admin;
