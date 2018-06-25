import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

// const mocks = {
//     String: () => 'It works!'
//   };

const typeDefs = `
type Query {
  testString: String
  allHospitals: [Hospital]
  allOrgans: [Organ]
}

type Hospital {
    name: String!
    organs: [String]
  }

type Organ {
  name: String!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;