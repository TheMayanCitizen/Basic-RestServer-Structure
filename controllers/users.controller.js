const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/usuario.js");

const usersGet = async (req = request, res = response) => {
  // const { q, name = "no name", apikey, page = 1, limit } = req.query;
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };

  // const users = await User.find(query)
  //   .skip(Number(offset))
  //   .limit(Number(limit));

  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(offset)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD
  await user.save();
  res.json({
    msg: "POST API - Controller",
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - Controller",
  });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  //const user = await User.findByIdAndDelete(id);

  //Solo cambiamos el estado del usuario a false
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
};
