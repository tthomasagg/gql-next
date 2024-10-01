import { GQLResolverInterface } from "../interfaces/resolver";
import { DataSourcesInterface } from "../interfaces/datasources";
import { MysqlResolverAdapter } from "./mysql/mysql-resolver-adapter";
import { InMemoryResolverAdapter } from "./in-memory/in-memory-resolver-adapter";
import { MysqlDatasourceAdapter } from "./mysql/mysql-datasource-adapter";
import { InMemoryDatasourceAdapter } from "./in-memory/in-memory-datasource-adapter";

type GqlDataSourcesAdapterType = {
  [key: string]: {
    name?: string;
    resolver: GQLResolverInterface;
    dataSource: DataSourcesInterface;
  };
};

export const GqlDataSources: GqlDataSourcesAdapterType = {
  inmemory: {
    resolver: InMemoryResolverAdapter,
    dataSource: InMemoryDatasourceAdapter,
    name: "inmemory",
  },
  mysql: {
    resolver: MysqlResolverAdapter,
    dataSource: MysqlDatasourceAdapter,
    name: "mysql",
  },
};
