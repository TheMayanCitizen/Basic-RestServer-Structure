const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "The email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//Estamos sobreescribiendo el metodo toJSON para que me retorne todas las propiedades excepto __v y password
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
