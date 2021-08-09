const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { Todo } = require("../../models/todo");

const User = {
  todos: async (parent, args, context, info) => {
    try {
      const todos = await Todo.find({ author: parent._id });
      if (!todos) {
        throw new UserInputError("No Todo was present");
      }
      return todos;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { User };
