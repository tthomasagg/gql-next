import { MysqlDatasourceAdapter } from "../../../graphql/adapters/mysql/mysql-datasource-adapter";
import { DataTypes, Sequelize } from "sequelize";

const sequelize: Sequelize =
  await MysqlDatasourceAdapter.getClient().getInstance();
const Departments = sequelize.define(
  "departments",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
  },
  {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  },
);

const Employees = sequelize.define(
  "employees",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    hireDate: { type: DataTypes.DATE },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    avatarUrl: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

const DepartmentHistory = sequelize.define(
  "department_history",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    changeDate: { type: DataTypes.DATE },
  },
  {
    tableName: "department_history",
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  },
);

Employees.belongsTo(Departments, { foreignKey: "department_id" });
Employees.hasMany(DepartmentHistory, {
  foreignKey: "employee_id",
  as: "departmentHistory",
});
DepartmentHistory.belongsTo(Departments, { foreignKey: "department_id" });

export { Employees, Departments, DepartmentHistory };
