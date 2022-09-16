const express = require("express");
const user = require("../controller/UserController");
const router = express.Router();

router.get("/", user.user);

router.get("/signup", user.signup);
router.post("/signup", user.post_signup);

router.get("/signin", user.signin);
router.post("/signin", user.post_signin);

router.post("/socket", user.socket);
// router.post("/socket", user.post_socket);

router.post("/profile", user.profile);
router.post("/profile/edit", user.profile_edit);
router.post("/profile/delete", user.profile_delete);

module.exports = router;
