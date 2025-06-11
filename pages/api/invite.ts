import type { NextApiRequest, NextApiResponse } from 'next';
import { inviteMembers, validateEmail } from '../../lib/api';

type ResponseData = {
  success: boolean;
  message: string;
  valid?: string[];
  invalid?: string[];
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { emails } = req.body;

    // Validate input
    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ success: false, message: 'Invalid input: emails must be an array' });
    }

    // Filter valid and invalid emails
    const valid: string[] = [];
    const invalid: string[] = [];

    emails.forEach((email: string) => {
      if (validateEmail(email.trim())) {
        valid.push(email.trim());
      } else {
        invalid.push(email.trim());
      }
    });

    // If no valid emails, return error
    if (valid.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No valid email addresses provided',
        invalid
      });
    }

    // Send invites
    const result = await inviteMembers(valid);

    return res.status(200).json({
      success: true,
      message: `Successfully sent ${valid.length} invitation(s)`,
      valid,
      invalid,
      data: result
    });
  } catch (error: any) {
    console.error('Error in invite API:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while sending invitations'
    });
  }
} 