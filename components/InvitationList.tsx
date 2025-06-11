import React from 'react';

type Invitation = {
  id: string;
  email: string;
  createdAt?: string;
  status?: string;
};

interface InvitationListProps {
  invitations: Invitation[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const InvitationList: React.FC<InvitationListProps> = ({
  invitations,
  loading,
  onDelete
}) => {
  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <div className="text-center">Loading invitations...</div>;
  }

  if (invitations.length === 0) {
    return <div className="text-center">No pending invitations found.</div>;
  }

  return (
    <div className="invitation-list">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
            <th style={{ textAlign: 'right', padding: '0.5rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation) => (
            <tr key={invitation.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.5rem' }}>{invitation.email}</td>
              <td style={{ padding: '0.5rem' }}>{formatDate(invitation.createdAt)}</td>
              <td style={{ padding: '0.5rem' }}>{invitation.status || 'Pending'}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                <button
                  className="danger-button"
                  onClick={() => onDelete(invitation.id)}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitationList; 