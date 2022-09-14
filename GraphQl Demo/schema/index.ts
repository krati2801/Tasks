import schema from './schema';
import query from './query';
import mutation from './mutation';

const resolvers = {
    ...query, ...mutation,
};

export{
    resolvers,
    schema
}
