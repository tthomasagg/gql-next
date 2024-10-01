import { GQLResolverInterface } from "../../interfaces/resolver";
import {
  Employees,
  Departments,
  DepartmentHistory,
} from "../../../mysql/sequelize/models/index";

export const MysqlResolverAdapter: GQLResolverInterface = {
  Query: {
    GetAllEmployees: async () => {
      const employees = await Employees.findAll({
        include: [
          Departments,
          {
            model: DepartmentHistory,
            as: "departmentHistory",
            include: [Departments],
          },
        ],
      });

      return employees.map((ret) => ret?.dataValues);
    },
    GetAllDepartments: async () => {
      const deparments = await Departments.findAll();

      return deparments?.map((ret) => ret?.dataValues) || [];
    },
    GetEmployeeById: async (parent, args) => {
      const employeeId = +args?.id;

      const employee = await Employees.findByPk(employeeId, {
        include: [
          Departments,
          {
            model: DepartmentHistory,
            as: "departmentHistory",
            include: [Departments],
          },
        ],
      });

      return employee?.dataValues;
    },
  },
  Mutation: {
    UpdateEmployee: async (parent, args) => {
      const employeeId = +args?.employee?.id;
      const employee = await Employees.findByPk(employeeId, {
        include: [
          Departments,
          {
            model: DepartmentHistory,
            as: "departmentHistory",
            include: [Departments],
          },
        ],
      });
      if (!employee) return null;
      if (args?.employee?.active !== undefined) {
        const active = !!args?.employee?.active;
        await employee.update({
          active: active,
        });
      }
      if (args?.employee?.department !== undefined) {
        const deparmentId = +args?.employee?.department?.id;
        if (employee?.dataValues?.department_id !== deparmentId) {
          await employee.update({
            department_id: deparmentId,
          });
          await DepartmentHistory.create({
            employee_id: employeeId,
            department_id: deparmentId,
          });
        }
      }

      await employee.reload({
        include: [
          Departments,
          {
            model: DepartmentHistory,
            as: "departmentHistory",
            include: [Departments],
          },
        ],
      });

      return employee;
    },
    DeleteEmployee: async (parent, args) => {
      const employeeId = +args?.id;
      const affectedRows = await Employees.destroy({
        where: { id: employeeId },
      });

      return affectedRows > 0;
    },
  },
};
