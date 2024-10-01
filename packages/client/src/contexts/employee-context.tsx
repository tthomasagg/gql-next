import { createContext, useState } from "react";
import {
  EMPLOYEE_DEPARTMENT_UPDATE_MUTATION,
  EMPLOYEE_DETAILS_QUERY,
  EMPLOYEE_LIST_QUERY,
  EMPLOYEE_STATUS_UPDATE_MUTATION,
} from "@/data/queries";
import createApolloClient from "@/data/client";
import { Department, EmployeeType } from "@/data/types";

type EmployeeContextType = {
  employeeList: EmployeeType[] | [];
  currentEmployee: EmployeeType | null;
  departments: Department[] | [];
  setCurrentEmployee: (employee: EmployeeType) => void;
  setDepartments: (departments: Department[]) => void;
  setCurrentEmployeeStatus: (active: boolean) => Promise<void>;
  setCurrentEmployeeDepartment: (departmentId: number) => Promise<void>;
  getEmployeeList: () => Promise<void>;
  getEmployeeDetails: (id: number) => Promise<void>;
} | null;

export const EmployeeContext = createContext<EmployeeContextType>(null);

const client = createApolloClient();

const EmployeeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeType | null>(
    null,
  );
  const [employeeList, setEmployeeList] = useState<EmployeeType[] | []>([]);
  const [departments, setDepartments] = useState<Department[] | []>([]);

  const onSetEmployee = (employee: EmployeeType) => {
    setCurrentEmployee(employee);
  };

  const onSetDepartments = (departments: Department[]) => {
    setDepartments(departments);
  };

  const onGetEmployeeDetails = async (employeeId: number) => {
    const { data, error } = await client.query({
      query: EMPLOYEE_DETAILS_QUERY,
      variables: {
        employeeId,
      },
    });
    if (!error) {
      setCurrentEmployee(data.GetEmployeeById);
      setDepartments(data.GetAllDepartments);
    } else {
      console.log(error);
    }
  };

  const onSetCurrentEmployeeStatus = async (active: boolean) => {
    const { data, errors } = await client.mutate({
      mutation: EMPLOYEE_STATUS_UPDATE_MUTATION,
      variables: {
        employee: {
          id: currentEmployee?.id,
          active,
        },
      },
    });
    if (!errors?.length) {
      if (currentEmployee) {
        setCurrentEmployee({
          ...currentEmployee,
          active: data.UpdateEmployee.active,
        });
      }
    } else {
      console.log(errors);
    }
  };

  const onSetCurrentEmployeeDepartment = async (departmentId: number) => {
    const { data, errors } = await client.mutate({
      mutation: EMPLOYEE_DEPARTMENT_UPDATE_MUTATION,
      variables: {
        employee: {
          id: currentEmployee?.id,
          department: {
            id: departmentId,
          },
        },
      },
    });
    if (!errors?.length) {
      if (currentEmployee) {
        setCurrentEmployee({
          ...currentEmployee,
          department: {
            id: data.UpdateEmployee?.department?.id,
            name: data.UpdateEmployee?.department?.name,
          },
          departmentHistory: data.UpdateEmployee?.departmentHistory,
        });
      }
    } else {
      console.log(errors);
    }
  };

  const onGetEmployeeList = async () => {
    const { data, error } = await client.query({
      query: EMPLOYEE_LIST_QUERY,
    });
    if (!error) {
      setEmployeeList(data.GetAllEmployees);
      setDepartments(data.GetAllDepartments);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        currentEmployee,
        departments,
        employeeList,
        setCurrentEmployee: onSetEmployee,
        setDepartments: onSetDepartments,
        getEmployeeDetails: onGetEmployeeDetails,
        setCurrentEmployeeStatus: onSetCurrentEmployeeStatus,
        setCurrentEmployeeDepartment: onSetCurrentEmployeeDepartment,
        getEmployeeList: onGetEmployeeList,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
