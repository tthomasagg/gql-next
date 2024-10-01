interface DataSourceClientInterface {
  hasSuccessfullyConnect: () => Promise<boolean>;
  getInstance: <T>() => Promise<T>;
}

export interface DataSourcesInterface {
  getClient: () => DataSourceClientInterface;
}
