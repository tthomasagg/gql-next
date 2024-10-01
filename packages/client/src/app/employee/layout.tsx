"use client";
import EmployeeContextProvider from "@/contexts/employee-context";
import styles from "@/app/page.module.css";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EmployeeContextProvider>{children}</EmployeeContextProvider>
      </main>
    </div>
  );
}
