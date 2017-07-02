import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

export default class StammdatenRepository {
  constructor() {
    this.apolloClient = new ApolloClient ({
      networkInterface: createNetworkInterface({
        uri: 'http://localhost:5000/graphql'
      })
    });
  }

  getModulData() {
    return this.apolloClient.query({
      query: gql(this.getModulQuery())
    });
  }

  getModulQuery() {
    return `query getModuls {
      studiengang (id: 1) {
        moduls {
          edges {
            node {
              id,
              title,
              description,
              credit_points,
              prerequisite,
              recommended_semester
            }
          }
        }
      }
    }`
  }
}
