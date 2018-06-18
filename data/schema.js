import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const mocks = {
    String: () => 'It works!'
  };

const typeDefs = `
type Query {
  testString: String
}

type Hospital {
    id: Int
    name: String
    volume: Int
    rate: Float
    type: String
  }
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;