const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is needed"],
  },
});

module.exports = model("Role", RoleSchema);
