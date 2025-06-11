import axios from 'axios';

// API base URL
const BASE_URL = 'https://app.augmentcode.com/api';

// Default cookie value
const DEFAULT_COOKIE = 'YOUR_ACTUAL_COOKIE_VALUE_HERE';

// 服务端Cookie变量
let serverSideCookie = DEFAULT_COOKIE;

// Get cookie from storage or use default
const getCookie = () => {
  if (typeof window !== 'undefined') {
    // 客户端环境
    return localStorage.getItem('augment_cookie') || DEFAULT_COOKIE;
  }
  // 服务器环境 - 使用服务端变量
  return serverSideCookie;
};

// Headers for API requests
const getHeaders = () => ({
  'accept': '*/*',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'no-cache',
  'pragma': 'no-cache',
  'priority': 'u=1, i',
  'sec-ch-ua': '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0',
  'cookie': getCookie(),
  'Referer': 'https://app.augmentcode.com/account/team',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'content-type': 'application/json'
});

// Create axios instance with default config
const getApi = () => axios.create({
  baseURL: BASE_URL,
  headers: getHeaders()
});

// Update cookie value
export const updateCookie = (newCookieValue: string) => {
  if (typeof window !== 'undefined') {
    // 客户端环境 - 存储到localStorage
    localStorage.setItem('augment_cookie', newCookieValue);
  } else {
    // 服务器环境 - 更新服务端变量
    serverSideCookie = newCookieValue;
  }
  console.log('Cookie updated successfully');
  return true;
};

// Get current cookie value
export const getCurrentCookie = () => {
  return getCookie();
};

// Email validation function
export const validateEmail = (email: string): boolean => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

// Get team data
export const getTeamData = async () => {
  try {
    const response = await getApi().get('/team');
    return response.data;
  } catch (error) {
    console.error('Error fetching team data:', error);
    throw error;
  }
};

// Invite members
export const inviteMembers = async (emails: string[]) => {
  try {
    const response = await getApi().post('/team/invite', { emails });
    return response.data;
  } catch (error) {
    console.error('Error inviting members:', error);
    throw error;
  }
};

// Delete invitation
export const deleteInvitation = async (inviteId: string) => {
  try {
    const response = await getApi().delete(`/team/invite/${inviteId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting invitation ${inviteId}:`, error);
    throw error;
  }
};

// Extract invitations from team data
export const extractInvitations = (data: any) => {
  if (!data) return [];
  
  const findInvitations = (obj: any): any[] => {
    let invitations: any[] = [];
    
    if (typeof obj !== 'object' || obj === null) {
      return invitations;
    }
    
    if (Array.isArray(obj)) {
      for (const item of obj) {
        invitations = [...invitations, ...findInvitations(item)];
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        if (key === 'invitations' || key === 'invites') {
          if (Array.isArray(value)) {
            invitations = [...invitations, ...value];
          }
        } else if (typeof value === 'object' && value !== null) {
          invitations = [...invitations, ...findInvitations(value)];
        }
      }
    }
    
    return invitations;
  };
  
  return findInvitations(data);
}; 