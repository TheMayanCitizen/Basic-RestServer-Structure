const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const { q, name = "no name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "GET API - Controller",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: "POST API - Controller",
    name,
    age,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "PUT API - Controller",
    id,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - Controller",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "DELETE API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
};
