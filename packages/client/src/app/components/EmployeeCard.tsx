import { useRouter } from "next/navigation";
import styles from "./EmployeeCard.module.css";
import { dateDifference, formatDate } from "@/helpers/date";
import useEmployeeContext from "@/hooks/useEmployeeContext";
import { EmployeeType } from "@/data/types";

type EmployeeCardProps = {
  employee: EmployeeType;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { setCurrentEmployee } = useEmployeeContext();
  const router = useRouter();

  const onDetailsClick = () => {
    setCurrentEmployee(employee);
    router.push(`/employee/details/${employee.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img
          src={employee.avatarUrl}
          alt={`${employee.firstName}'s profile picture`}
        />
      </div>
      <div className={styles.details}>
        <span className={styles.employeeName}>
          {employee.firstName} {employee.lastName}
          <span className={styles.department}>
            &nbsp;({employee.department.name})
          </span>
        </span>
        <span className={styles.hireDate}>Hire Date</span>
        <span>
          {formatDate(employee.hireDate)} ({dateDifference(employee.hireDate)})
        </span>
      </div>
      <button type="button" className={styles.cta} onClick={onDetailsClick}>
        View Details
      </button>
    </div>
  );
};

export default EmployeeCard;
