const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

// let users = []
let users = [
  {
      "name": "jane",
      "bio": "tarzan fling",
      "id": "4Ai8er34H"
  },
  {
      "name": "tarzan",
      "bio": "the one and only",
      "id": "HmvldyHVW"
  }
]
//Add the code necessary to create a Web API and implement the following _endpoints_:

// {
//   id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }

//| Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

// POST new user
server.post('/api/users', (req, res)=>{
  const newUser = req.body;
  newUser.id = shortid.generate()
  users.push(newUser)
  res.status(201).json(users) //returns array of users
})


// GET users
server.get('/api/users', (req, res) =>{
  res.status(200).json(users)
})


// GET user by id
server.get('/api/users/:id', (req, res) =>{
  const user = users.filter(u => u.id === req.params.id)
  res.status(200).json(user)
})

//DELETE user with the specified `id` and returns the deleted user. 
server.delete('/api/users/:id', (req, res) =>{
  const deletedUser = users.filter( u => u.id === req.params.id);
  users = users.filter(u => u.id !== req.params.id)
  res.status(200).json(deletedUser)

})

//PUT Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', (req, res)=>{
  const userIndex = users.findIndex(u => u.id === req.params.id)
  console.log(' old users', users);
  //modify the user
  users[userIndex] = {
    ...users[userIndex],
    name: req.body.name,
    bio: req.body.bio
  }

  
  console.log('updated users', users);

  //returns modified user 
  res.status(200).json(users[userIndex])
})

const port = 8000;

server.listen(port, ()=>{
  console.log(`server listening on port ${port}`);
})