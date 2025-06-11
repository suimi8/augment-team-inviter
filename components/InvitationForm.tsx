import { useState } from 'react';

interface InvitationFormProps {
  onSendInvitations: (emails: string[]) => void;
}

const InvitationForm: React.FC<InvitationFormProps> = ({ onSendInvitations }) => {
  const [emailsText, setEmailsText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailsText.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Split emails by newline, comma, or semicolon and trim whitespace
      const emails = emailsText
        .split(/[\n,;]/)
        .map(email => email.trim())
        .filter(email => email.length > 0);
      
      await onSendInvitations(emails);
      
      // Clear the input after successful submission
      setEmailsText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="emails" className="mb-1 block">
          Email Addresses (one per line, or comma/semicolon separated)
        </label>
        <textarea
          id="emails"
          className="w-full p-2 border rounded"
          rows={5}
          value={emailsText}
          onChange={(e) => setEmailsText(e.target.value)}
          placeholder="example@domain.com&#10;another@example.com"
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid var(--border-color)'
          }}
        />
      </div>
      
      <button
        type="submit"
        className="primary-button"
        disabled={isLoading || !emailsText.trim()}
      >
        {isLoading ? 'Sending...' : 'Send Invitations'}
      </button>
    </form>
  );
};

export default InvitationForm; 