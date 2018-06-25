import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

// const mocks = {
//     String: () => 'It works!'
//   };

const typeDefs = `
type Query {
  testString: String
  allHospitals: [Hospital]
  allOrgans: [String]
}

type Hospital {
    name: String
    transplants: [Organ]
  }

type Organ {
  name: String
  type: String
  rate: Float
  volume: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;