import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import { schema, resolvers} from './schema';
import envs from './envs';
import { db } from './db';

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err : any) => {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
});

const app = express();
app.use(express.json());

app.use(
    envs.graphqlPath,
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolvers,
        graphiql: true,
        context: {
            request,
            response,
        },
    }))
);

app.listen(envs.port, () => {
    console.log(`Server is running at http://localhost:${envs.port}${envs.graphqlPath}`);
});