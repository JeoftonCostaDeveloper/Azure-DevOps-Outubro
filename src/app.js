const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let heroes = []
let nextId = 1;

app.get('/heroes', (req, res) =>{
  res.json(heroes);
});

app.get('/heroes/:id', (req, res) => {
  const hero = heroes.find(h => h.id === parseInt(req.params.id));
  if (!hero) return res.status(404).json({ error: 'Hero not found' });
  res.json(hero);
});

app.post('/heroes', (req, res) => {
  const { name, power } = req.body;
  const hero = { id: nextId++, name, power };
  heroes.push(hero);
  res.status(201).json(hero);
});

app.put('/heroes/:id', (req, res) => {
  const hero = heroes.find(h => h.id === parseInt(req.params.id));
  if (!hero) return res.status(404).json({ error: 'Hero not found' });

  const { name, power } = req.body;
  hero.name = name ?? hero.name;
  hero.power = power ?? hero.power;

  res.status(200).json(hero);
});

app.delete('/heroes/:id', (req, res) => {
  const index = heroes.findIndex(h => h.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Hero not found' });

  const deleted = heroes.splice(index, 1);
  res.json(deleted[0]);
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
