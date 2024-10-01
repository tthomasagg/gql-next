import { DataSourcesInterface } from "../../interfaces/datasources";

export const InMemoryDatasourceAdapter: DataSourcesInterface = {
  getClient: () => ({
    hasSuccessfullyConnect: async () => new Promise((resolve) => resolve(true)),
    getInstance: () => new Promise(() => {}),
  }),
};
