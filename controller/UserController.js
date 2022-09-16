const { User } = require("../model");

exports.user = (req, res) => {
  res.render("index");
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.socket = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    if (result) res.render("socket", { data: result });
    else res.redirect("/user/signin");
  });
};

exports.signin = (req, res) => {
  res.render("signin");
};

exports.profile = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    if (result) res.render("profile", { data: result });
    else res.redirect("/user/signin");
  });
};

exports.post_signup = (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
    pw: req.body.pw,
  };
  User.create(data).then((result) => {
    res.send(true);
  });
};

exports.post_signin = (req, res) => {
  User.findAll({
    where: {
      id: req.body.id,
      pw: req.body.pw,
    },
  }).then((result) => {
    if (result.length > 0) res.send(true);
    else res.send(false);
  });
};

exports.profile_edit = (req, res) => {
  const data = {
    name: req.body.name,
    pw: req.body.pw,
  };
  User.update(data, {
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    res.send("회원정보 수정 성공!");
  });
};
exports.profile_delete = (req, res) => {
  User.destroy({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    res.redirect("/user/signin");
  });
};
