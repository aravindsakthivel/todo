const { User } = require("../../models/user");
const { Todo } = require("../../models/todo");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

const { authorize } = require("../../utils/tokenValidator");

const Mutation = {
  signUp: async (parents, args, context, info) => {
    try {
      const user = await new User({
        email: args.fields.email,
        password: args.fields.password,
      }).save();

      const getToken = await user.generateToken();
      if (!getToken) {
        throw new AuthenticationError("Something went wrong, try again");
      }

      return { ...getToken._doc };
    } catch (err) {
      if(err.code === 11000){
          throw new AuthenticationError('Sorry, duplicated email. try a new on, dummy');
      }
      throw new ApolloError("Sorry something went wrong", null, err);
    }
  },

  loginUser: async (parent, args, context, info) => {
    try {
      const user = await User.findOne({
        email: args.fields.email,
      });
      if (!user) {
        throw new AuthenticationError("Bad email");
      }
      const checkpass = await user.comparePassword(args.fields.password);
      if (!checkpass) {
        throw new AuthenticationError("Wrong password");
      }
      const getToken = await user.generateToken();
      if (!getToken) {
        throw new AuthenticationError("Something went wrong, try again");
      }
      return {
        _id: user._id,
        email: user.email,
        token: getToken.token,
      };
    } catch (err) {
      throw new ApolloError("Sorry something went wrong", null, err);
    }
  },

  createTodo: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const todo = await new Todo({
        title: args.fields.title,
        content: args.fields.content,
        author: req._id,
        status: args.fields.status,
      }).save();
      return { ...todo._doc };
    } catch (err) {
      throw err;
    }
  },

  updateTodo: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const todo = await Todo.findOne({ _id: args.fields.id, author: req._id });
      if (!todo) {
        throw new UserInputError("The todo is not present");
      }
      todo.status = args.fields.status;
      const result = await todo.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },

  deleteTodo: async (parent, args, context, info) => {
    try {
      const req = authorize(context.req);
      if (!req._id) {
        throw new AuthenticationError("Bad token");
      }
      const todo = await Todo.findOne({ _id: args.id, author: req._id });
      if (!todo) {
        throw new UserInputError("The todo is not present");
      }
      const deletedTodo = await Todo.findByIdAndRemove(args.id);
      return deletedTodo;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { Mutation };
