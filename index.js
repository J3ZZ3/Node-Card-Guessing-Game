const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

app.get('/', (req, res) => {
  const cards = shuffleArray(Array.from({ length: 18 }, (_, i) => i + 1).flatMap(i => [i, i]));
  res.render('index', { cards });
});

app.get('/scores', (req, res) => {
  const scores = JSON.parse(fs.readFileSync('./data/scores.json', 'utf8'));
  res.render('scores', { scores });
});

app.post('/scores', (req, res) => {
  const scores = JSON.parse(fs.readFileSync('./data/scores.json', 'utf8'));
  const newScore = { username: req.body.username, time: req.body.time };
  scores.push(newScore);
  fs.writeFileSync('./data/scores.json', JSON.stringify(scores, null, 2));
  res.redirect('/scores', {submit});
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));