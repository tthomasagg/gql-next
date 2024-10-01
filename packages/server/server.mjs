import fs from "node:fs";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DateResolver, DateTypeDefinition } from "graphql-scalars";
import { GqlDataSources } from "./database/graphql/adapters/index";

const typeDefs = fs.readFileSync(
  path.join(
    path.resolve(),
    "./packages/server/database/graphql/schema.graphql",
  ),
  "utf-8",
);

let dataSource = GqlDataSources[process.env.DEFAULT_DATASOURCE];

const isDefaultDatasourceAvailable = await dataSource.dataSource
  .getClient()
  .hasSuccessfullyConnect();

if (!isDefaultDatasourceAvailable) {
  dataSource = GqlDataSources[process.env.FALLBACK_DATASOURCE];
  const isFallbackDatasourceAvailable = await dataSource.dataSource
    .getClient()
    .hasSuccessfullyConnect();
  if (!isFallbackDatasourceAvailable) {
    console.log(
      `Cannot start server as neither default or fallback datasources are available. default (${process.env.DEFAULT_DATASOURCE}) fallback (${process.env.FALLBACK_DATASOURCE})`,
    );
    process.exit(1);
  }

  console.log(
    "Server started with fallback datasource:",
    process.env.FALLBACK_DATASOURCE,
  );
} else {
  console.log(
    "Server started with default datasource:",
    process.env.DEFAULT_DATASOURCE,
  );
}

const { resolver } = dataSource;

const server = new ApolloServer({
  typeDefs: [DateTypeDefinition, typeDefs],
  resolvers: [{ Date: DateResolver }, resolver],
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
