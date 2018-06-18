import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

// const mocks = {
//     String: () => 'It works!'
//   };

const typeDefs = `
type Query {
  testString: String
  allHospitals: [Hospital]
}

type Hospital {
    name: String
    volume: Int
    rate: Float
    type: String
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;