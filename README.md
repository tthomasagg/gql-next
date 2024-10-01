## Project structure
This is a monorepo. Inside "packages" you'll find `client` and `server` folder.

Inside `client` there's the Next.js project corresponding to the 
frontend project.

### Client structure:
- app - react components and style files
- contexts - react contexts
- data - everything related to data fetching
- helpers - helper functions used in components
- hooks - react hooks (I've created a specialized hook to manipulate the context)

### Server structure:
The idea was to implement at least two different datasources for 
GraphQL to consume.

#### In-memory
#### mysql (via sequelize)
Note: You'll see in-memory implemented with basic array functions and
mocked data instead of sequelize's in-memory option because it
was implemented first

- database
  - graphql -
    - adapters - graphql datasources adapters and resolvers implementation
    - interfaces - interfaces to guide new adapters' implementation
  - mysql
    - /sequelize - sequelize's models
    - database-up.sql - script to set up the mysql database structure and initial data

## Requirements
- Node v20
- mysql (optional)
- In order for the server to run with mysql, you should run the setup script found at `packages/server/database/mysql/database-up.sql` with the following command (assuming mysql is installed):
```
mysql -u root -p < packages/server/database/mysql/database-up.sql
```

#### Instructions to run the project
```
nvm use
yarn
yarn server:start
# in a separate tab
yarn client:start
```

## Assumptions
- A relational db data source for GraphQL was picked since SQL is present in the tech stack.
- GraphQL was picked since the endpoints were given as what it seems to be operation names