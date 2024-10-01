"use client";
import { useEffect } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";
import useEmployeeContext from "@/hooks/useEmployeeContext";

const EmployeeList = () => {
  const { getEmployeeList, employeeList } = useEmployeeContext();

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <div>
      {employeeList?.map((v, i) => <EmployeeCard employee={v} key={i} />)}
    </div>
  );
};

export default EmployeeList;
