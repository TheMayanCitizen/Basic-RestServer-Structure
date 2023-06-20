const Role = require("../models/role");
const User = require("../models/usuario");

const isRoleValid = async (role = " ") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not valid`);
  }
};

//Verificar si el correo existe
const DoesEmailExists = async (email = " ") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email ${email} already exists`);
  }
};

const DoesUserlExist = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`The user with id ${id} does not exists`);
  }
};

module.exports = { isRoleValid, DoesEmailExists, DoesUserlExist };
