const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "xaipei",
    password: "",
    database: "smartbrain"
  }
});

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cokies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com"
    }
  ]
};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "apples",
    "$2a$10$phx1LvO0paJ3okA/BkI5xeQOTP4xch.lmMKCNhmSHs/g/vLz4zsdm",
    function(err, res) {
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$phx1LvO0paJ3okA/BkI5xeQOTP4xch.lmMKCNhmSHs/g/vLz4zsdm",
    function(err, res) {
      console.log("second guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB
    console.log(hash);
  });
  db("users")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(console.log);
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
