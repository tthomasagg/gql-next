import { DataSourcesInterface } from "../../interfaces/datasources";
import { Sequelize } from "sequelize";

let sqlize;

export const MysqlDatasourceAdapter: DataSourcesInterface = {
  getClient: () => {
    return {
      getInstance: async () => getConnection(),
      hasSuccessfullyConnect: async () => {
        let success = true;
        try {
          await getConnection().authenticate();
        } catch (e) {
          console.log("err mysqldatasource ", e);
          success = false;
        }

        return success;
      },
    };
  },
};

export const getConnection = () => {
  if (sqlize !== undefined) return sqlize;
  sqlize = new Sequelize(
    process.env.MYSQL_SCHEMA,
    process.env.MYSQL_USER,
    process.env.MYSQL_SECRET,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",
    },
  );

  return sqlize;
};
