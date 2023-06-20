const { Router } = require("express");
const {
  isRoleValid,
  DoesEmailExists,
  DoesUserlExist,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/users.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/user-validations");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "The name is needed").notEmpty(),
    check(
      "password",
      "The password must contain more than 6 characters"
    ).isLength({
      min: 6,
    }),
    check("email", "The email is not valid").isEmail(),
    check("email").custom(DoesEmailExists),
    //check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "It is not a valid ID").isMongoId(),
    check("id").custom(DoesUserlExist),
    validateFields,
  ],
  usersPut
);

router.patch("/", usersPatch);

router.delete(
  "/:id",
  [
    check("id", "It is not a valid ID").isMongoId(),
    check("id").custom(DoesUserlExist),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
