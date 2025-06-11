import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvitationForm from '../components/InvitationForm';
import InvitationList from '../components/InvitationList';
import axios from 'axios';

type Invitation = {
  id: string;
  email: string;
  createdAt?: string;
  status?: string;
};

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team data on component mount
  useEffect(() => {
    fetchTeamData();
  }, []);

  // Function to fetch team data
  const fetchTeamData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/team');
      
      if (response.data.success) {
        setInvitations(response.data.invitations || []);
      } else {
        setError(response.data.message || 'Failed to retrieve team data');
        toast.error('Failed to retrieve team data');
      }
    } catch (error: any) {
      console.error('Error fetching team data:', error);
      setError(error.message || 'An error occurred while retrieving team data');
      toast.error('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sending invitations
  const handleSendInvitations = async (emails: string[]) => {
    try {
      const response = await axios.post('/api/invite', { emails });
      
      if (response.data.success) {
        toast.success(`Successfully sent ${response.data.valid?.length || 0} invitation(s)`);
        
        if (response.data.invalid && response.data.invalid.length > 0) {
          toast.warn(`${response.data.invalid.length} invalid email(s) were skipped`);
        }
        
        // Refresh the invitation list
        fetchTeamData();
      } else {
        toast.error(response.data.message || 'Failed to send invitations');
      }
    } catch (error: any) {
      console.error('Error sending invitations:', error);
      toast.error(error.message || 'An error occurred while sending invitations');
    }
  };

  // Function to handle deleting an invitation
  const handleDeleteInvitation = async (id: string) => {
    try {
      const response = await axios.delete(`/api/delete-invite?id=${id}`);
      
      if (response.data.success) {
        toast.success('Invitation deleted successfully');
        
        // Update the local state
        setInvitations(invitations.filter(invitation => invitation.id !== id));
      } else {
        toast.error(response.data.message || 'Failed to delete invitation');
      }
    } catch (error: any) {
      console.error('Error deleting invitation:', error);
      toast.error(error.message || 'An error occurred while deleting the invitation');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Team Inviter</title>
        <meta name="description" content="Invite team members to your AugmentCode team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-3 mt-2">
        <h1 className="text-center">AugmentCode Team Inviter</h1>
        <p className="text-center">Manage team invitations easily</p>
      </header>

      <main>
        <div className="card mb-3">
          <h2 className="mb-2">Send Invitations</h2>
          <InvitationForm onSendInvitations={handleSendInvitations} />
        </div>

        <div className="card">
          <div className="flex-between mb-2">
            <h2>Pending Invitations</h2>
            <button 
              className="secondary-button"
              onClick={fetchTeamData}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <InvitationList 
            invitations={invitations} 
            loading={loading} 
            onDelete={handleDeleteInvitation} 
          />
        </div>
      </main>

      <footer className="text-center mt-3 mb-3">
        <p>&copy; {new Date().getFullYear()} AugmentCode Team Inviter</p>
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
} 