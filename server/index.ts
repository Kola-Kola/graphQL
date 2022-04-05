import { ApolloServer, gql } from "apollo-server";

import data from "./data.json";

const PORT = 3001;

interface Person {
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  status: string;
}

interface PaginationArguments {
  filter?: string;
  from?: string;
  limit?: number;
}

const people: Person[] = data;

const typeDefs = gql`
  enum Status {
    PROTECTED
    VULNERABLE
  }

  scalar Date

  type People {
    createdAt: Date!
    id: ID!
    fullName: String!
    status: Status!
    profilePicture: String!
  }

  type Query {
    countPeople(filter: String): Int
    people(filter: String, from: ID, limit: Int): [People]!
  }
`;

const formatFullName = ({ firstName, lastName }: Person): string =>
  `${firstName} ${lastName}`;

const search = (data: Person[], filter: string = ""): Person[] => {
  if (!filter) {
    return data;
  }

  return data.filter((person) => {
    const fullName = formatFullName(person);

    return fullName.toLowerCase().includes(filter.toLowerCase());
  });
};

const resolvers = {
  People: {
    fullName: formatFullName,
  },

  Query: {
    countPeople(context: any, { filter }: PaginationArguments) {
      return search(people, filter).length;
    },

    people(
      context: any,
      { filter, from, limit = Infinity }: PaginationArguments
    ) {
      const data = search(people, filter);
      const startIndex = data.findIndex(({ id }) => id === from) + 1;

      const withProfilePicture = data.map((item, i) => ({
        ...item,
        profilePicture: `https://picsum.photos/200/300?random=${i}`,
      }));

      return withProfilePicture.slice(startIndex, Math.max(1, limit));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
