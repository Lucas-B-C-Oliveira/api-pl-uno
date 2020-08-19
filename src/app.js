const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const storage = [];

app.get("/api", (request, response) => {
  return response.json(storage);
});

app.get("/api/sala/:sala", (request, response) => {
  const {sala} = request.params

  const key = storage.findIndex(item => item.sala === sala);

  if(key < 0) {
    return response.status(400).json({error: 'Data not found'});
  }

  return response.json(storage[key]);
});

app.post("/api", (request, response) => {
  // console.log(request.body)
  // const {url, title, techs} = request.body
  const repository = {
    id: uuid(),
    ...request.body
  }
  storage.push(repository);
  return response.json(repository)
});

app.put("/api/:id", (request, response) => {
  const {id} = request.params

  const key = storage.findIndex(item => item.id === id);

  if(key < 0) {
    return response.status(400).json({error: 'Data not found'});
  }
  const repository = {id, ...request.body};
  storage[key] = repository;
  return response.json(repository);
});

app.delete("/api/:id", (request, response) => {
  const {id} = request.params;
  const key = storage.findIndex(item => item.id === id);

  if(key < 0) {
    return response.status(400).json({error: 'Data not found'});
  }

  storage.splice(key, 1);
  return response.status(204).send();
});


module.exports = app;
