// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  positionName: string;
  roleLevel: number; // 1 = ADMIN, 0 = READ_ONLY, -1 = NO_ACCESS
  role: 'ADMIN' | 'READ_ONLY';
}

export interface User extends LoginResponse {}

// Entity Types
export interface Region {
  regionId: string;
  regionName: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Country {
  countryId: string;
  countryName: string;
  regionId: string;
  regionName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  countryId: string;
  countryName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Position {
  positionId: string;
  positionName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender?: 'male' | 'female';
  nationality: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  hireDate: string;
  terminationDate?: string;
  managerId?: string;
  managerName?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface EmployeeHistory {
  employeeHistoryId: string;
  employeeId: string;
  employeeName?: string;
  departmentId: string;
  departmentName?: string;
  positionId: string;
  positionName?: string;
  validFrom: string;
  validTo?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Attendance {
  attendanceId: string;
  employeeId: string;
  employeeName?: string;
  attendanceDate: string;
  checkIn?: string;
  checkOut?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Contract {
  contractId: string;
  employeeId: string;
  employeeName?: string;
  contractType: 'permanent' | 'temporary' | 'internship';
  startDate: string;
  endDate?: string;
  salary: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Payroll {
  payrollId: string;
  employeeId: string;
  employeeName?: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  grossSalary: number;
  netSalary: number;
  paidAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EmployeeLeave {
  leaveId: string;
  employeeId: string;
  employeeName?: string;
  leaveType: 'paid' | 'sick' | 'unpaid';
  startDate: string;
  endDate: string;
  approved: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Report View Types
export interface ActiveEmployeeDto {
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  departmentName: string;
  positionName: string;
  countryName: string;
  regionName: string;
  hireDate: string;
  yearsOfService: number;
}

export interface DepartmentStatisticsDto {
  regionName: string;
  countryName: string;
  departmentName: string;
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;
  avgYearsService: number;
  malePercentage: number;
  femalePercentage: number;
}

export interface AttendanceSummaryDto {
  employeeId: string;
  fullName: string;
  departmentName: string;
  positionName: string;
  monthYear: string;
  daysWorked: number;
  totalHoursWorked: number;
  avgHoursPerDay: number;
  lateArrivals: number;
  overtimeHours: number;
}

export interface ExpiringContractDto {
  employeeId: string;
  fullName: string;
  email: string;
  departmentName: string;
  positionName: string;
  contractType: string;
  startDate: string;
  endDate: string;
  daysUntilExpiry: number;
  salary: number;
  urgencyStatus: string;
  contractDurationYears: number;
}

export interface LeaveBalanceDto {
  employeeId: string;
  fullName: string;
  departmentName: string;
  positionName: string;
  totalAllowedDays: number;
  paidDaysUsed: number;
  sickDaysUsed: number;
  unpaidDaysUsed: number;
  remainingDays: number;
  scheduledFutureDays: number;
  balanceStatus: string;
  usagePercentage: number;
}

// Form Types
export type CreateRegion = Omit<Region, 'regionId' | 'createdAt' | 'updatedAt'>;
export type CreateCountry = Omit<Country, 'countryId' | 'createdAt' | 'updatedAt' | 'regionName'>;
export type CreateDepartment = Omit<Department, 'departmentId' | 'createdAt' | 'updatedAt' | 'countryName'>;
export type CreatePosition = Omit<Position, 'positionId' | 'createdAt' | 'updatedAt'>;
export type CreateEmployee = Omit<Employee, 'employeeId' | 'createdAt' | 'updatedAt' | 'managerName'>;
export type CreateEmployeeHistory = Omit<EmployeeHistory, 'employeeHistoryId' | 'createdAt' | 'updatedAt' | 'employeeName' | 'departmentName' | 'positionName'>;
export type CreateAttendance = Omit<Attendance, 'attendanceId' | 'createdAt' | 'updatedAt' | 'employeeName'>;
export type CreateContract = Omit<Contract, 'contractId' | 'createdAt' | 'updatedAt' | 'employeeName'>;
export type CreatePayroll = Omit<Payroll, 'payrollId' | 'createdAt' | 'updatedAt' | 'employeeName'>;
export type CreateLeave = Omit<EmployeeLeave, 'leaveId' | 'createdAt' | 'updatedAt' | 'employeeName'>;
