import type { NextApiRequest, NextApiResponse } from 'next';
import { getTeamData, extractInvitations } from '../../lib/api';

type ResponseData = {
  success: boolean;
  message: string;
  invitations?: any[];
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get team data
    const data = await getTeamData();
    
    // Extract invitations
    const invitations = extractInvitations(data);

    return res.status(200).json({
      success: true,
      message: 'Team data retrieved successfully',
      invitations,
      data
    });
  } catch (error: any) {
    console.error('Error in team API:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while retrieving team data'
    });
  }
} 