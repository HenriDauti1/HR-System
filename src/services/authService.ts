import type { LoginRequest, LoginResponse } from '@/types';

// Mock users for demo purposes
const MOCK_USERS: Record<string, LoginResponse & { password: string }> = {
  'admin@hrms.com': {
    employeeId: '550e8400-e29b-41d4-a716-446655440001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'admin@hrms.com',
    positionName: 'HR – General Manager',
    roleLevel: 1,
    role: 'ADMIN',
    password: 'admin123',
  },
  'specialist@hrms.com': {
    employeeId: '550e8400-e29b-41d4-a716-446655440002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'specialist@hrms.com',
    positionName: 'HR – Specialist',
    roleLevel: 1,
    role: 'ADMIN',
    password: 'specialist123',
  },
  'coordinator@hrms.com': {
    employeeId: '550e8400-e29b-41d4-a716-446655440003',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'coordinator@hrms.com',
    positionName: 'HR – Coordinator',
    roleLevel: 0,
    role: 'READ_ONLY',
    password: 'coordinator123',
  },
  'partner@hrms.com': {
    employeeId: '550e8400-e29b-41d4-a716-446655440004',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'partner@hrms.com',
    positionName: 'HR – HR Partner',
    roleLevel: 0,
    role: 'READ_ONLY',
    password: 'partner123',
  },
  'developer@hrms.com': {
    employeeId: '550e8400-e29b-41d4-a716-446655440005',
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'developer@hrms.com',
    positionName: 'Software Developer',
    roleLevel: -1,
    role: 'READ_ONLY',
    password: 'developer123',
  },
};

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = MOCK_USERS[credentials.email.toLowerCase()];
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = user;
    return userResponse;
  },

  async validateSession(authHeader: string): Promise<LoginResponse | null> {
    try {
      const base64Credentials = authHeader.replace('Basic ', '');
      const credentials = atob(base64Credentials);
      const [email, password] = credentials.split(':');
      
      const user = MOCK_USERS[email.toLowerCase()];
      
      if (!user || user.password !== password) {
        return null;
      }
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userResponse } = user;
      return userResponse;
    } catch {
      return null;
    }
  },
};
