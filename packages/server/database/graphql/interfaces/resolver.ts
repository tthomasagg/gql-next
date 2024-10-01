import { Department, EmployeeType } from "../types";

export interface GQLResolverInterface {
  Query: {
    GetAllEmployees: () => EmployeeType[];
    GetEmployeeById: (parent, args) => EmployeeType | {};
    GetAllDepartments: () => Department[];
  };
  Mutation: {
    UpdateEmployee: (parent, args) => EmployeeType;
    DeleteEmployee: (parent, args) => boolean;
  };
}
