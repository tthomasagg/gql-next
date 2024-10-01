import { EmployeeType } from "../../../types";
import { departments } from "./department";

export const thomas: EmployeeType = {
  id: 1,
  firstName: "thomas",
  lastName: "gazaniga",
  hireDate: "2023-02-03",
  department: departments.find(({ id }) => id === 1),
  avatarUrl: "https://picsum.photos/id/101/250/250",
  active: true,
  departmentHistory: [
    {
      id: 1,
      changeDate: "2023-02-03",
      department: departments.find(({ id }) => id === 2),
    },
    {
      id: 2,
      changeDate: "2024-02-03",
      department: departments.find(({ id }) => id === 1),
    },
  ],
};

const johndoe: EmployeeType = {
  id: 2,
  firstName: "John",
  lastName: "Doe",
  hireDate: "2022-03-03",
  department: departments.find(({ id }) => id === 1),
  avatarUrl: "https://picsum.photos/id/102/250/250",
  active: true,
  departmentHistory: [
    {
      id: 3,
      changeDate: "2022-03-03",
      department: departments.find(({ id }) => id === 1),
    },
  ],
};

const marg: EmployeeType = {
  id: 3,
  firstName: "Margareth",
  lastName: "Smith",
  hireDate: "2021-04-03",
  department: departments.find(({ id }) => id === 1),
  avatarUrl: "https://picsum.photos/id/103/250/250",
  active: false,
};

const will: EmployeeType = {
  id: 4,
  firstName: "Wiliam",
  lastName: "McBride",
  hireDate: "2020-05-03",
  department: departments.find(({ id }) => id === 2),
  avatarUrl: "https://picsum.photos/id/104/250/250",
  active: true,
};

const jenn: EmployeeType = {
  id: 5,
  firstName: "Jennifer",
  lastName: "Jones",
  hireDate: "2019-06-03",
  department: departments.find(({ id }) => id === 2),
  avatarUrl: "https://picsum.photos/id/106/250/250",
  active: true,
};

const employeeList = [thomas, johndoe, marg, will, jenn];

export { employeeList };
