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
  try{
    const newUser = req.body;
    newUser.id = shortid.generate()
    if(!newUser.name || !newUser.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else{
      users.push(newUser)
      res.status(201).json(users) //returns array of users
    }
  } catch{
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
})


// GET users
server.get('/api/users', (req, res) =>{
  try{
    res.status(200).json(users)
  } catch{
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})


// GET user by id
server.get('/api/users/:id', (req, res) =>{
  try{
    const user = users.filter(u => u.id === req.params.id)
    if(user.length >0){
      res.status(200).json(user)
    } else{
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  } catch{
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }
})

//DELETE user with the specified `id` and returns the deleted user. 
server.delete('/api/users/:id', (req, res) =>{
  try{
    const deletedUser = users.filter( u => u.id === req.params.id);
    if(deletedUser.length > 0){
      users = users.filter(u => u.id !== req.params.id)
      res.status(200).json(deletedUser)
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  } catch{
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }

})

//PUT Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', (req, res)=>{
  try{
    const updatedUser = users.filter(u => u.id === req.params.id)
    if(updatedUser.length > 0){
      if(!req.body.name || !req.body.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else {
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
      }
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

  } catch{
    res.status(500).json({ errorMessage: "The user information could not be modified." })
  }
})

const port = 8000;

server.listen(port, ()=>{
  console.log(`server listening on port ${port}`);
})