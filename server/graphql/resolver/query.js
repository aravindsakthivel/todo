const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User } = require("../../models/user");
const { Todo } = require("../../models/todo");
const { authorize } = require("../../utils/tokenValidator");

const Query = {
  user: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const user = await User.findOne({ _id: req._id });
      return user;
    } catch (err) {
      throw err;
    }
  },

  todo: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const todo = await Todo.findOne({ _id: args.id, author: req._id });
      if (!todo) {
        throw new UserInputError("The todo is not present");
      }
      return todo;
    } catch (err) {
      throw err;
    }
  },

  todos: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const todos = await Todo.find({ author: req._id });
      if (!todos) {
        throw new UserInputError("No Todo was present");
      }
      return todos;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { Query };
