import type {
  Region,
  Country,
  Department,
  Position,
  Employee,
  EmployeeHistory,
  Attendance,
  Contract,
  Payroll,
  EmployeeLeave,
  ActiveEmployeeDto,
  DepartmentStatisticsDto,
  AttendanceSummaryDto,
  ExpiringContractDto,
  LeaveBalanceDto,
} from '@/types';

// Mock data generators
const generateId = () => crypto.randomUUID();

// Mock Regions
const mockRegions: Region[] = [
  { regionId: generateId(), regionName: 'North America', description: 'USA and Canada operations', isActive: true, createdAt: '2024-01-01' },
  { regionId: generateId(), regionName: 'Europe', description: 'European operations', isActive: true, createdAt: '2024-01-01' },
  { regionId: generateId(), regionName: 'Asia Pacific', description: 'APAC operations', isActive: true, createdAt: '2024-01-01' },
  { regionId: generateId(), regionName: 'Latin America', description: 'LATAM operations', isActive: true, createdAt: '2024-01-01' },
];

// Mock Countries
const mockCountries: Country[] = [
  { countryId: generateId(), countryName: 'United States', regionId: mockRegions[0].regionId, regionName: 'North America', isActive: true, createdAt: '2024-01-01' },
  { countryId: generateId(), countryName: 'Canada', regionId: mockRegions[0].regionId, regionName: 'North America', isActive: true, createdAt: '2024-01-01' },
  { countryId: generateId(), countryName: 'United Kingdom', regionId: mockRegions[1].regionId, regionName: 'Europe', isActive: true, createdAt: '2024-01-01' },
  { countryId: generateId(), countryName: 'Germany', regionId: mockRegions[1].regionId, regionName: 'Europe', isActive: true, createdAt: '2024-01-01' },
  { countryId: generateId(), countryName: 'Japan', regionId: mockRegions[2].regionId, regionName: 'Asia Pacific', isActive: true, createdAt: '2024-01-01' },
];

// Mock Departments
const mockDepartments: Department[] = [
  { departmentId: generateId(), departmentName: 'Human Resources', countryId: mockCountries[0].countryId, countryName: 'United States', isActive: true, createdAt: '2024-01-01' },
  { departmentId: generateId(), departmentName: 'Engineering', countryId: mockCountries[0].countryId, countryName: 'United States', isActive: true, createdAt: '2024-01-01' },
  { departmentId: generateId(), departmentName: 'Marketing', countryId: mockCountries[0].countryId, countryName: 'United States', isActive: true, createdAt: '2024-01-01' },
  { departmentId: generateId(), departmentName: 'Finance', countryId: mockCountries[2].countryId, countryName: 'United Kingdom', isActive: true, createdAt: '2024-01-01' },
  { departmentId: generateId(), departmentName: 'Operations', countryId: mockCountries[4].countryId, countryName: 'Japan', isActive: true, createdAt: '2024-01-01' },
];

// Mock Positions
const mockPositions: Position[] = [
  { positionId: generateId(), positionName: 'HR – General Manager', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'HR – Senior Specialist', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'HR – Specialist', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'HR – Coordinator', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'HR – HR Partner', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'Software Engineer', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'Senior Developer', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'Product Manager', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'Marketing Manager', isActive: true, createdAt: '2024-01-01' },
  { positionId: generateId(), positionName: 'Financial Analyst', isActive: true, createdAt: '2024-01-01' },
];

// Mock Employees
const mockEmployees: Employee[] = [
  {
    employeeId: generateId(),
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'admin@hrms.com',
    phone: '+1-555-0101',
    dateOfBirth: '1985-03-15',
    gender: 'female',
    nationality: 'American',
    addressLine1: '123 Main Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    hireDate: '2020-01-15',
    isActive: true,
    createdAt: '2020-01-15',
  },
  {
    employeeId: generateId(),
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'specialist@hrms.com',
    phone: '+1-555-0102',
    dateOfBirth: '1988-07-22',
    gender: 'male',
    nationality: 'American',
    addressLine1: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    hireDate: '2021-03-10',
    isActive: true,
    createdAt: '2021-03-10',
  },
  {
    employeeId: generateId(),
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'coordinator@hrms.com',
    phone: '+1-555-0103',
    dateOfBirth: '1992-11-08',
    gender: 'female',
    nationality: 'Canadian',
    addressLine1: '789 Pine Road',
    city: 'Toronto',
    state: 'ON',
    postalCode: 'M5V 2A1',
    hireDate: '2022-06-01',
    isActive: true,
    createdAt: '2022-06-01',
  },
  {
    employeeId: generateId(),
    firstName: 'James',
    lastName: 'Wilson',
    email: 'partner@hrms.com',
    phone: '+1-555-0104',
    dateOfBirth: '1983-04-30',
    gender: 'male',
    nationality: 'British',
    addressLine1: '10 Downing Street',
    city: 'London',
    state: 'England',
    postalCode: 'SW1A 2AA',
    hireDate: '2019-09-15',
    isActive: true,
    createdAt: '2019-09-15',
  },
  {
    employeeId: generateId(),
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@hrms.com',
    phone: '+1-555-0105',
    dateOfBirth: '1990-08-12',
    gender: 'female',
    nationality: 'American',
    addressLine1: '555 Elm Street',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60601',
    hireDate: '2023-01-20',
    isActive: true,
    createdAt: '2023-01-20',
  },
];

// Mock Active Employees Report
const mockActiveEmployees: ActiveEmployeeDto[] = mockEmployees.map((emp, idx) => ({
  employeeId: emp.employeeId,
  fullName: `${emp.firstName} ${emp.lastName}`,
  email: emp.email,
  phone: emp.phone,
  departmentName: mockDepartments[idx % mockDepartments.length].departmentName,
  positionName: mockPositions[idx % mockPositions.length].positionName,
  countryName: mockCountries[idx % mockCountries.length].countryName,
  regionName: mockRegions[idx % mockRegions.length].regionName,
  hireDate: emp.hireDate,
  yearsOfService: new Date().getFullYear() - new Date(emp.hireDate).getFullYear(),
}));

// Mock Department Statistics
const mockDepartmentStatistics: DepartmentStatisticsDto[] = mockDepartments.map((dept, idx) => ({
  regionName: mockRegions[idx % mockRegions.length].regionName,
  countryName: mockCountries[idx % mockCountries.length].countryName,
  departmentName: dept.departmentName,
  totalEmployees: Math.floor(Math.random() * 50) + 10,
  maleCount: Math.floor(Math.random() * 25) + 5,
  femaleCount: Math.floor(Math.random() * 25) + 5,
  avgYearsService: Math.round((Math.random() * 5 + 2) * 100) / 100,
  malePercentage: Math.round(Math.random() * 60 + 20),
  femalePercentage: Math.round(Math.random() * 60 + 20),
}));

// Mock Attendance Summary
const mockAttendanceSummary: AttendanceSummaryDto[] = mockEmployees.map((emp, idx) => ({
  employeeId: emp.employeeId,
  fullName: `${emp.firstName} ${emp.lastName}`,
  departmentName: mockDepartments[idx % mockDepartments.length].departmentName,
  positionName: mockPositions[idx % mockPositions.length].positionName,
  monthYear: new Date().toISOString().slice(0, 7),
  daysWorked: Math.floor(Math.random() * 10) + 15,
  totalHoursWorked: Math.floor(Math.random() * 40) + 120,
  avgHoursPerDay: Math.round((Math.random() * 2 + 7) * 100) / 100,
  lateArrivals: Math.floor(Math.random() * 5),
  overtimeHours: Math.round(Math.random() * 20 * 100) / 100,
}));

// Mock Expiring Contracts
const mockExpiringContracts: ExpiringContractDto[] = [
  {
    employeeId: mockEmployees[2].employeeId,
    fullName: 'Emily Davis',
    email: 'coordinator@hrms.com',
    departmentName: 'Human Resources',
    positionName: 'HR – Coordinator',
    contractType: 'temporary',
    startDate: '2023-06-01',
    endDate: '2026-01-25',
    daysUntilExpiry: 22,
    salary: 55000,
    urgencyStatus: 'CRITICAL - 30 days or less',
    contractDurationYears: 2.5,
  },
  {
    employeeId: mockEmployees[4].employeeId,
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@hrms.com',
    departmentName: 'Marketing',
    positionName: 'Marketing Manager',
    contractType: 'temporary',
    startDate: '2024-01-20',
    endDate: '2026-02-15',
    daysUntilExpiry: 43,
    salary: 72000,
    urgencyStatus: 'WARNING - 60 days or less',
    contractDurationYears: 2,
  },
];

// Mock Leave Balance
const mockLeaveBalance: LeaveBalanceDto[] = mockEmployees.map((emp, idx) => ({
  employeeId: emp.employeeId,
  fullName: `${emp.firstName} ${emp.lastName}`,
  departmentName: mockDepartments[idx % mockDepartments.length].departmentName,
  positionName: mockPositions[idx % mockPositions.length].positionName,
  totalAllowedDays: 22,
  paidDaysUsed: Math.floor(Math.random() * 15),
  sickDaysUsed: Math.floor(Math.random() * 5),
  unpaidDaysUsed: Math.floor(Math.random() * 3),
  remainingDays: Math.floor(Math.random() * 15) + 5,
  scheduledFutureDays: Math.floor(Math.random() * 5),
  balanceStatus: ['OK', 'LOW - Less than 3 days', 'WARNING - Too many unused days near year end'][Math.floor(Math.random() * 3)],
  usagePercentage: Math.round(Math.random() * 80 + 10),
}));

// Mock Contracts
const mockContracts: Contract[] = mockEmployees.map(emp => ({
  contractId: generateId(),
  employeeId: emp.employeeId,
  employeeName: `${emp.firstName} ${emp.lastName}`,
  contractType: ['permanent', 'temporary', 'internship'][Math.floor(Math.random() * 3)] as Contract['contractType'],
  startDate: emp.hireDate,
  endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : undefined,
  salary: Math.floor(Math.random() * 80000) + 40000,
  createdAt: emp.hireDate,
}));

// Mock Attendance records
const mockAttendance: Attendance[] = mockEmployees.flatMap(emp => {
  const records: Attendance[] = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const checkIn = new Date(date);
      checkIn.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
      const checkOut = new Date(date);
      checkOut.setHours(17 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
      records.push({
        attendanceId: generateId(),
        employeeId: emp.employeeId,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        attendanceDate: date.toISOString().slice(0, 10),
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        createdAt: date.toISOString(),
      });
    }
  }
  return records;
});

// Mock Payroll
const mockPayroll: Payroll[] = mockEmployees.map(emp => ({
  payrollId: generateId(),
  employeeId: emp.employeeId,
  employeeName: `${emp.firstName} ${emp.lastName}`,
  payPeriodStart: '2025-12-01',
  payPeriodEnd: '2025-12-31',
  grossSalary: Math.floor(Math.random() * 8000) + 4000,
  netSalary: Math.floor(Math.random() * 6000) + 3000,
  paidAt: Math.random() > 0.3 ? '2025-12-31' : undefined,
  createdAt: '2025-12-01',
}));

// Mock Employee History
const mockEmployeeHistory: EmployeeHistory[] = mockEmployees.map((emp, idx) => ({
  employeeHistoryId: generateId(),
  employeeId: emp.employeeId,
  employeeName: `${emp.firstName} ${emp.lastName}`,
  departmentId: mockDepartments[idx % mockDepartments.length].departmentId,
  departmentName: mockDepartments[idx % mockDepartments.length].departmentName,
  positionId: mockPositions[idx % mockPositions.length].positionId,
  positionName: mockPositions[idx % mockPositions.length].positionName,
  validFrom: emp.hireDate,
  validTo: undefined,
  createdAt: emp.hireDate,
}));

// Mock Leaves
const mockLeaves: EmployeeLeave[] = mockEmployees.flatMap(emp => {
  const leaves: EmployeeLeave[] = [];
  const leaveTypes: EmployeeLeave['leaveType'][] = ['paid', 'sick', 'unpaid'];
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);
    leaves.push({
      leaveId: generateId(),
      employeeId: emp.employeeId,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      approved: Math.random() > 0.3,
      createdAt: new Date().toISOString(),
    });
  }
  return leaves;
});

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data Service
export const mockDataService = {
  // Regions
  async getRegions(): Promise<Region[]> {
    await delay();
    return [...mockRegions];
  },
  async createRegion(data: Partial<Region>): Promise<Region> {
    await delay();
    const newRegion: Region = {
      ...data as Region,
      regionId: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockRegions.push(newRegion);
    return newRegion;
  },
  async updateRegion(id: string, data: Partial<Region>): Promise<Region> {
    await delay();
    const idx = mockRegions.findIndex(r => r.regionId === id);
    if (idx >= 0) {
      mockRegions[idx] = { ...mockRegions[idx], ...data, updatedAt: new Date().toISOString() };
      return mockRegions[idx];
    }
    throw new Error('Region not found');
  },
  async deleteRegion(id: string): Promise<void> {
    await delay();
    const idx = mockRegions.findIndex(r => r.regionId === id);
    if (idx >= 0) mockRegions.splice(idx, 1);
  },

  // Countries
  async getCountries(): Promise<Country[]> {
    await delay();
    return [...mockCountries];
  },
  async createCountry(data: Partial<Country>): Promise<Country> {
    await delay();
    const region = mockRegions.find(r => r.regionId === data.regionId);
    const newCountry: Country = {
      ...data as Country,
      countryId: generateId(),
      regionName: region?.regionName,
      createdAt: new Date().toISOString(),
    };
    mockCountries.push(newCountry);
    return newCountry;
  },
  async updateCountry(id: string, data: Partial<Country>): Promise<Country> {
    await delay();
    const idx = mockCountries.findIndex(c => c.countryId === id);
    if (idx >= 0) {
      const region = mockRegions.find(r => r.regionId === data.regionId);
      mockCountries[idx] = { ...mockCountries[idx], ...data, regionName: region?.regionName, updatedAt: new Date().toISOString() };
      return mockCountries[idx];
    }
    throw new Error('Country not found');
  },
  async deleteCountry(id: string): Promise<void> {
    await delay();
    const idx = mockCountries.findIndex(c => c.countryId === id);
    if (idx >= 0) mockCountries.splice(idx, 1);
  },

  // Departments
  async getDepartments(): Promise<Department[]> {
    await delay();
    return [...mockDepartments];
  },
  async createDepartment(data: Partial<Department>): Promise<Department> {
    await delay();
    const country = mockCountries.find(c => c.countryId === data.countryId);
    const newDept: Department = {
      ...data as Department,
      departmentId: generateId(),
      countryName: country?.countryName,
      createdAt: new Date().toISOString(),
    };
    mockDepartments.push(newDept);
    return newDept;
  },
  async updateDepartment(id: string, data: Partial<Department>): Promise<Department> {
    await delay();
    const idx = mockDepartments.findIndex(d => d.departmentId === id);
    if (idx >= 0) {
      const country = mockCountries.find(c => c.countryId === data.countryId);
      mockDepartments[idx] = { ...mockDepartments[idx], ...data, countryName: country?.countryName, updatedAt: new Date().toISOString() };
      return mockDepartments[idx];
    }
    throw new Error('Department not found');
  },
  async deleteDepartment(id: string): Promise<void> {
    await delay();
    const idx = mockDepartments.findIndex(d => d.departmentId === id);
    if (idx >= 0) mockDepartments.splice(idx, 1);
  },

  // Positions
  async getPositions(): Promise<Position[]> {
    await delay();
    return [...mockPositions];
  },
  async createPosition(data: Partial<Position>): Promise<Position> {
    await delay();
    const newPos: Position = {
      ...data as Position,
      positionId: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockPositions.push(newPos);
    return newPos;
  },
  async updatePosition(id: string, data: Partial<Position>): Promise<Position> {
    await delay();
    const idx = mockPositions.findIndex(p => p.positionId === id);
    if (idx >= 0) {
      mockPositions[idx] = { ...mockPositions[idx], ...data, updatedAt: new Date().toISOString() };
      return mockPositions[idx];
    }
    throw new Error('Position not found');
  },
  async deletePosition(id: string): Promise<void> {
    await delay();
    const idx = mockPositions.findIndex(p => p.positionId === id);
    if (idx >= 0) mockPositions.splice(idx, 1);
  },

  // Employees
  async getEmployees(): Promise<Employee[]> {
    await delay();
    return [...mockEmployees];
  },
  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    await delay();
    const newEmp: Employee = {
      ...data as Employee,
      employeeId: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockEmployees.push(newEmp);
    return newEmp;
  },
  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    await delay();
    const idx = mockEmployees.findIndex(e => e.employeeId === id);
    if (idx >= 0) {
      mockEmployees[idx] = { ...mockEmployees[idx], ...data, updatedAt: new Date().toISOString() };
      return mockEmployees[idx];
    }
    throw new Error('Employee not found');
  },
  async deleteEmployee(id: string): Promise<void> {
    await delay();
    const idx = mockEmployees.findIndex(e => e.employeeId === id);
    if (idx >= 0) mockEmployees.splice(idx, 1);
  },

  // Employee History
  async getEmployeeHistory(): Promise<EmployeeHistory[]> {
    await delay();
    return [...mockEmployeeHistory];
  },
  async createEmployeeHistory(data: Partial<EmployeeHistory>): Promise<EmployeeHistory> {
    await delay();
    const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
    const dept = mockDepartments.find(d => d.departmentId === data.departmentId);
    const pos = mockPositions.find(p => p.positionId === data.positionId);
    const newHistory: EmployeeHistory = {
      ...data as EmployeeHistory,
      employeeHistoryId: generateId(),
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
      departmentName: dept?.departmentName,
      positionName: pos?.positionName,
      createdAt: new Date().toISOString(),
    };
    mockEmployeeHistory.push(newHistory);
    return newHistory;
  },
  async updateEmployeeHistory(id: string, data: Partial<EmployeeHistory>): Promise<EmployeeHistory> {
    await delay();
    const idx = mockEmployeeHistory.findIndex(h => h.employeeHistoryId === id);
    if (idx >= 0) {
      const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
      const dept = mockDepartments.find(d => d.departmentId === data.departmentId);
      const pos = mockPositions.find(p => p.positionId === data.positionId);
      mockEmployeeHistory[idx] = {
        ...mockEmployeeHistory[idx],
        ...data,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : mockEmployeeHistory[idx].employeeName,
        departmentName: dept?.departmentName || mockEmployeeHistory[idx].departmentName,
        positionName: pos?.positionName || mockEmployeeHistory[idx].positionName,
        updatedAt: new Date().toISOString(),
      };
      return mockEmployeeHistory[idx];
    }
    throw new Error('Employee history not found');
  },
  async deleteEmployeeHistory(id: string): Promise<void> {
    await delay();
    const idx = mockEmployeeHistory.findIndex(h => h.employeeHistoryId === id);
    if (idx >= 0) mockEmployeeHistory.splice(idx, 1);
  },

  // Attendance
  async getAttendance(): Promise<Attendance[]> {
    await delay();
    return [...mockAttendance];
  },
  async createAttendance(data: Partial<Attendance>): Promise<Attendance> {
    await delay();
    const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
    const newAtt: Attendance = {
      ...data as Attendance,
      attendanceId: generateId(),
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
      createdAt: new Date().toISOString(),
    };
    mockAttendance.push(newAtt);
    return newAtt;
  },
  async updateAttendance(id: string, data: Partial<Attendance>): Promise<Attendance> {
    await delay();
    const idx = mockAttendance.findIndex(a => a.attendanceId === id);
    if (idx >= 0) {
      const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
      mockAttendance[idx] = {
        ...mockAttendance[idx],
        ...data,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : mockAttendance[idx].employeeName,
        updatedAt: new Date().toISOString(),
      };
      return mockAttendance[idx];
    }
    throw new Error('Attendance not found');
  },
  async deleteAttendance(id: string): Promise<void> {
    await delay();
    const idx = mockAttendance.findIndex(a => a.attendanceId === id);
    if (idx >= 0) mockAttendance.splice(idx, 1);
  },

  // Contracts
  async getContracts(): Promise<Contract[]> {
    await delay();
    return [...mockContracts];
  },
  async createContract(data: Partial<Contract>): Promise<Contract> {
    await delay();
    const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
    const newContract: Contract = {
      ...data as Contract,
      contractId: generateId(),
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
      createdAt: new Date().toISOString(),
    };
    mockContracts.push(newContract);
    return newContract;
  },
  async updateContract(id: string, data: Partial<Contract>): Promise<Contract> {
    await delay();
    const idx = mockContracts.findIndex(c => c.contractId === id);
    if (idx >= 0) {
      const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
      mockContracts[idx] = {
        ...mockContracts[idx],
        ...data,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : mockContracts[idx].employeeName,
        updatedAt: new Date().toISOString(),
      };
      return mockContracts[idx];
    }
    throw new Error('Contract not found');
  },
  async deleteContract(id: string): Promise<void> {
    await delay();
    const idx = mockContracts.findIndex(c => c.contractId === id);
    if (idx >= 0) mockContracts.splice(idx, 1);
  },

  // Payroll
  async getPayroll(): Promise<Payroll[]> {
    await delay();
    return [...mockPayroll];
  },
  async createPayroll(data: Partial<Payroll>): Promise<Payroll> {
    await delay();
    const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
    const newPayroll: Payroll = {
      ...data as Payroll,
      payrollId: generateId(),
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
      createdAt: new Date().toISOString(),
    };
    mockPayroll.push(newPayroll);
    return newPayroll;
  },
  async updatePayroll(id: string, data: Partial<Payroll>): Promise<Payroll> {
    await delay();
    const idx = mockPayroll.findIndex(p => p.payrollId === id);
    if (idx >= 0) {
      const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
      mockPayroll[idx] = {
        ...mockPayroll[idx],
        ...data,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : mockPayroll[idx].employeeName,
        updatedAt: new Date().toISOString(),
      };
      return mockPayroll[idx];
    }
    throw new Error('Payroll not found');
  },
  async deletePayroll(id: string): Promise<void> {
    await delay();
    const idx = mockPayroll.findIndex(p => p.payrollId === id);
    if (idx >= 0) mockPayroll.splice(idx, 1);
  },

  // Leaves
  async getLeaves(): Promise<EmployeeLeave[]> {
    await delay();
    return [...mockLeaves];
  },
  async createLeave(data: Partial<EmployeeLeave>): Promise<EmployeeLeave> {
    await delay();
    const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
    const newLeave: EmployeeLeave = {
      ...data as EmployeeLeave,
      leaveId: generateId(),
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
      createdAt: new Date().toISOString(),
    };
    mockLeaves.push(newLeave);
    return newLeave;
  },
  async updateLeave(id: string, data: Partial<EmployeeLeave>): Promise<EmployeeLeave> {
    await delay();
    const idx = mockLeaves.findIndex(l => l.leaveId === id);
    if (idx >= 0) {
      const emp = mockEmployees.find(e => e.employeeId === data.employeeId);
      mockLeaves[idx] = {
        ...mockLeaves[idx],
        ...data,
        employeeName: emp ? `${emp.firstName} ${emp.lastName}` : mockLeaves[idx].employeeName,
        updatedAt: new Date().toISOString(),
      };
      return mockLeaves[idx];
    }
    throw new Error('Leave not found');
  },
  async deleteLeave(id: string): Promise<void> {
    await delay();
    const idx = mockLeaves.findIndex(l => l.leaveId === id);
    if (idx >= 0) mockLeaves.splice(idx, 1);
  },

  // Reports
  async getActiveEmployees(): Promise<ActiveEmployeeDto[]> {
    await delay();
    return [...mockActiveEmployees];
  },
  async getDepartmentStatistics(): Promise<DepartmentStatisticsDto[]> {
    await delay();
    return [...mockDepartmentStatistics];
  },
  async getAttendanceSummary(): Promise<AttendanceSummaryDto[]> {
    await delay();
    return [...mockAttendanceSummary];
  },
  async getExpiringContracts(): Promise<ExpiringContractDto[]> {
    await delay();
    return [...mockExpiringContracts];
  },
  async getLeaveBalance(): Promise<LeaveBalanceDto[]> {
    await delay();
    return [...mockLeaveBalance];
  },
};
