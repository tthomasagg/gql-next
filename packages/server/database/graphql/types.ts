export type Department = {
  id: number;
  name: string;
};

export type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone?: string;
  address?: string;
  department: Department;
  avatarUrl: string;
  active: boolean;
  departmentHistory?: DepartmentHistory[];
};

export type DepartmentHistory = {
  id?: number;
  department: Department;
  employee?: EmployeeType;
  date: string;
};
