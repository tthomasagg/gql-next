import { employeeList } from "./mock/employee";
import { GQLResolverInterface } from "../../interfaces/resolver";
import { Department, EmployeeType } from "../../types";
import { departments } from "./mock/department";

let employees = employeeList;

export const InMemoryResolverAdapter: GQLResolverInterface = {
  Query: {
    GetAllEmployees: (): EmployeeType[] => employees,
    GetEmployeeById: (parent, args): EmployeeType | {} => {
      const id = +args?.id;
      let employee = {};
      employee = employees.find(({ id: employeeId }) => employeeId === id);
      return employee;
    },
    GetAllDepartments: (): Department[] => departments,
  },
  Mutation: {
    UpdateEmployee: (parent, args) => {
      const employeeId = +args?.employee?.id;
      let employee = employees.find((emp) => emp.id === employeeId);
      if (!employee) {
        return null;
      }
      if (args?.employee?.active !== undefined) {
        const active = !!args?.employee?.active;
        employee = { ...employee, active };
      }
      if (args?.employee?.department !== undefined) {
        const deparmentId = +args?.employee?.department?.id;
        let newDepartment = departments.find(({ id }) => id === deparmentId);

        if (newDepartment.id === employee.department.id) {
          throw new Error("Can't change employee to current department");
        }

        const departmentHistory = [...(employee?.departmentHistory || [])];
        const newDepartmentHistory = {
          department: newDepartment,
          employee,
          changeDate: new Date(),
        };
        departmentHistory.push(newDepartmentHistory);

        employee = {
          ...employee,
          department: newDepartment,
          departmentHistory,
        };
      }
      employees = [
        ...employees.filter((emp) => emp.id !== employeeId),
        employee,
      ];

      return employee;
    },
    DeleteEmployee: (parent, args) => {
      const employeeId = +args?.employee?.id;
      let employee = employees.find((emp) => emp.id === employeeId)?.id;
      employees = [...employees.filter((emp) => emp.id !== employeeId)];

      return !!employee;
    },
  },
};
