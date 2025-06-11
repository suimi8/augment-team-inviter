import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteInvitation } from '../../lib/api';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    // Validate input
    if (!id) {
      return res.status(400).json({ success: false, message: 'Invalid input: invitation ID is required' });
    }

    // Delete invitation
    const result = await deleteInvitation(id as string);

    return res.status(200).json({
      success: true,
      message: 'Invitation deleted successfully',
      data: result
    });
  } catch (error: any) {
    console.error('Error in delete-invite API:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while deleting the invitation'
    });
  }
} 