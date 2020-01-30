const bcrypt = require("bcrypt");

const express = require("express");

const Users = require("./users_models");

const router = express.Router();

// const restricted = require("./auth/restricted-middleware");
/////////// ROLES

// router.post("/roles", (req, res) => {
//   const newRole = req.body;

//   if (!newRole.description) {
//     res.status(400).json({
//       message: "Please provide a description for this role"
//     });
//     return;
//   }

//   Users.addRoles(newRole)
//     .then(role => {
//       res.status(201).json(role);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new role" });
//     });
// });

// router.get("/roles", restricted, (req, res) => {
//   Users.findRoles()
//     .then(role => {
//       res.status(200).json(role);
//     })
//     .catch(err => res.send(err));
// });

///////////////// USERS

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.send(err));
});

////////////// USERS / REGISTER / LOGIN

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  let { user_name, password } = req.body;

  Users.findByLog({ user_name })
    // .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome to my website ${user.user_name},id: ${user.id}`
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
      console.log(err);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    return req.session.destroy(err => {
      if (err) {
        res.json({ message: "you have not logged out properly" });
      } else {
        res.status(200).json({ message: "you have successfully logged out" });
      }
    });
  } else {
  }
  res.status(200).json({ message: "you were not logged in to start with" });
});

module.exports = router;
