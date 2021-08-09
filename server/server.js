const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const { typeDefs } = require("./graphql/schema");
const { Mutation } = require("./graphql/resolver/mutation");
const { Query } = require("./graphql/resolver/query");
const { User } = require("./graphql/resolver/user");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
  },
  context: ({ req }) => {
    return { req };
  },
});

server.applyMiddleware({ app });

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(`Error : ${err}`);
    } else {
      console.log("The Database is connected");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
