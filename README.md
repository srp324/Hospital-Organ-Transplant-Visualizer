# Hospital Organ Transplant API
A Neo4j backed GraphQL API providing hospital organ transplant data.

## Motivation
This was just a personal project to feed my curiosity around graph databases and a little bit of web scraping. It was nice to get my mind around graph database schemas and visualizing different relationships in data when simply looking at a CSV file. I decided to use GraphQL to query the Neo4j Database after it was set up. When I stumbled across the SRTR hospital organ transplant page, I thought it would be convenient to set up a graph database for the information since the hospital's are involved with multiple organ transplants, each with their own rate and volume as well as for adults and pediatric patients, which can be seen modeled in the screenshots below.

## Process
I scraped the data from https://www.srtr.org/transplant-centers/. The code for this is contained within the `neo4jscrape` branch.

With this data formatted to a CSV, I imported into a blank Neo4j Sandbox Database and created the necessary constraints, nodes, and relationships. The query for this can be found within the `/data/neo4jcypher` file within the `neo4jscrape` branch. A small sample of the nodes and relationships can be seen within the first screenshot.

After the data was scraped and imported into the Neo4j Database, it was time to create the GraphQL server. I defined the GraphQL schema and resolver functions in order to query the Neo4j Database. The last screenshot below shows the output of the Query.allHospitals and Hospital.organs resolvers.

TODO: Finish README and instructions to setup

## Screenshots
Glimpse of the Neo4j Database
![alt text](https://i.gyazo.com/dd9ef2da322740f7d63582d786096188.png "MATCH (n:Hospital) RETURN n LIMIT 5")

Glimpse of a Node and Relationship. Each `TRANSPLANTS` relationship is either for an `adult` or `pediatric` organ transplant with corresponding rates and volumes.

![alt text](https://i.gyazo.com/ef29aa2316871d31e88145c51ef45a67.png "MATCH r = (:Hospital {name: \"JOHNS HOPKINS HOSPITAL\"})-[:TRANSPLANTS]->(:Organ) RETURN r")

Glimpse of the GraphiQL IDE querying the Neo4j Database
![alt text](https://i.gyazo.com/9916e9a1ebae219030def77322d552da.png "{allHospitals { name transplants {name type rate volume}}}")

Glimpse of the graph generated with Alchemy.js using the GraphJSON formatted response for the `getOrgan(name:"KIDNEY") { hospital name type rate }` query
![alt text](https://i.gyazo.com/ef13507a423d7e75868002e669786443.png "Created using Alchemy.js. Node's radius based on transplant rate.")