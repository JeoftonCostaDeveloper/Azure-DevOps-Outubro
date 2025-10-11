const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let heroes = []
let nextId = 1;

app.get('/heroes', (req, res) =>{
  res.json(heroes);
});

app.post('/heroes', (req, res) =>{
    const {name, power} = req.body;
    const hero = { id: nextId++, name, power};
    heroes.push(hero);
  res.status(201).json(hero);
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
