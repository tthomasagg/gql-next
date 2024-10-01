import { useContext } from "react";
import { EmployeeContext } from "@/contexts/employee-context";

const useEmployeeContext = () => {
  const employeeContext = useContext(EmployeeContext);

  if (employeeContext === null) {
    throw new Error("useEmployeeContext must be used within a Provider");
  }

  return {
    ...employeeContext,
  };
};

export default useEmployeeContext;
