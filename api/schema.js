import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  testString: String
  allHospitals: [Hospital]
  allOrgans: [String]
  getHospital(name: String): [Hospital]
  getOrgan(name: String): [Organ]
}

type Hospital {
    name: String
    transplants: [Organ]
  }

type Organ {
  name: String
  hospital: String!
  type: String
  rate: Float
  volume: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;