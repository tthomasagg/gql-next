"use client";
import { useEffect, useState } from "react";
import { dateDifference, formatDate } from "@/helpers/date";
import styles from "./EmployeeDetails.module.css";
import useEmployeeContext from "@/hooks/useEmployeeContext";

type EmployeeDetailsProps = {
  id: string;
};

const EmployeeDetails = ({ id: employeeId }: EmployeeDetailsProps) => {
  const [departmentId, setDepartmentId] = useState<number>(0);
  const {
    currentEmployee: employee,
    getEmployeeDetails,
    departments,
    setCurrentEmployeeStatus,
    setCurrentEmployeeDepartment,
  } = useEmployeeContext();

  useEffect(() => {
    getEmployeeDetails(+employeeId);
  }, []);

  useEffect(() => {
    if (employee?.department.id) {
      setDepartmentId(employee?.department.id);
    }
  }, [employee]);

  const toggleStatus = () => {
    setCurrentEmployeeStatus(!employee?.active);
  };

  const updateDepartment = () => {
    setCurrentEmployeeDepartment(departmentId);
  };

  const changeDepartment = (ev) => {
    setDepartmentId(ev?.target?.value);
  };

  if (employee === undefined || employee === null) return null;

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.image}>
          <img
            src={employee.avatarUrl}
            alt={`${employee.firstName}'s profile picture`}
          />
          {!employee.active && (
            <span
              className={[styles.employeeStatus, styles.inactive].join(" ")}
            >
              Inactive
            </span>
          )}
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <h3>
              {employee.firstName} {employee.lastName}
            </h3>
            <span className={styles.label}>Employee ID: {employee.id}</span>
            <span className={styles.label}>
              Department: {employee.department?.name}
            </span>
            <span className={styles.label}>
              Telephone: {employee.phone || "N/A"}
            </span>
            <span className={styles.label}>
              Address: {employee.address || "N/A"}
            </span>
            <div className={styles.department}>
              <span className={styles.updateDepartmentLabel}>
                Update department
              </span>
              <div>
                <select
                  className={styles.departmentInput}
                  value={departmentId || employee?.department?.id}
                  onChange={changeDepartment}
                  disabled={!employee.active}
                >
                  {departments?.map((department) => (
                    <option key={department.name} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={updateDepartment}
                  className={styles.updateDepartment}
                  disabled={
                    !employee.active ||
                    departmentId === employee?.department?.id
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className={styles.hireDate}>
            <h3 className={styles.hireDateTitle}>Hire Date</h3>
            <div>
              {formatDate(employee.hireDate)}
              <br />
              {dateDifference(employee.hireDate)}
            </div>
            <div>
              <button
                type="button"
                className={[
                  styles.changeStatusButton,
                  employee.active ? styles.inactive : styles.active,
                ].join(" ")}
                onClick={toggleStatus}
              >
                {employee.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Department History</h3>
        {!employee?.departmentHistory ? (
          "No department changes history"
        ) : (
          <div className={styles.departmentHistoryWrapper}>
            <table className={styles.departmentHistory} border={0}>
              <thead>
                <tr>
                  <th align="left">Date</th>
                  <th align="left">Department</th>
                </tr>
              </thead>
              <tbody>
                {employee?.departmentHistory?.map((history) => (
                  <tr key={history.changeDate}>
                    <td>{history.changeDate}</td>
                    <td>{history.department.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
