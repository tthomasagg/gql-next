import { gql } from "@apollo/client";

export const EMPLOYEE_DETAILS_QUERY = gql`
  query getEmployees($employeeId: ID!) {
    GetEmployeeById(id: $employeeId) {
      id
      firstName
      lastName
      hireDate
      department {
        id
        name
      }
      avatarUrl
      active
      departmentHistory {
        department {
          name
        }
        changeDate
      }
    }

    GetAllDepartments {
      id
      name
    }
  }
`;

export const EMPLOYEE_LIST_QUERY = gql`
  query getEmployees {
    GetAllEmployees {
      id
      firstName
      lastName
      hireDate
      department {
        name
      }
      avatarUrl
      active
    }

    GetAllDepartments {
      id
      name
    }
  }
`;

export const EMPLOYEE_STATUS_UPDATE_MUTATION = gql`
  mutation UpdateEmployee($employee: UpdateEmployeeInput!) {
    UpdateEmployee(employee: $employee) {
      id
      active
    }
  }
`;

export const EMPLOYEE_DEPARTMENT_UPDATE_MUTATION = gql`
  mutation UpdateEmployee($employee: UpdateEmployeeInput!) {
    UpdateEmployee(employee: $employee) {
      id
      department {
        id
        name
      }
      departmentHistory {
        department {
          name
        }
        changeDate
      }
    }
  }
`;
