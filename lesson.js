const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let users = [
  {
    name: "Antonio",
  },
  {
    name: "Emilio",
  },
  {
    name: "Luis",
  },
];

let accounts = [
  {
    id: shortid.generate(),
    name: "Santiago",
  },
  {
    id: shortid.generate(),
    name: "Daniel",
  },
  {
    id: shortid.generate(),
    name: "Alejandra",
  },
];

server.get("/hello", (req, res) => {
  res.send("Hello world");
});

// show a list of users

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json(users);
});

server.delete('/users/:name', (req, res)=>{
  const name = req.params.name.toLowerCase()
  users = users.filter( u => u.name.toLowerCase() !== name )
  res.status(204).end()
})

server.get("/accounts", (req, res) => {
  res.status(200).json(accounts);
});

server.post("/accounts", (req, res) => {
  const account = req.body;
  account.id = shortid.generate()

  accounts.push(account);
  res.status(201).json(accounts);
});

const port = 8000;
server.listen(port, () => {
  console.log("Server Running on port 8000");
});
