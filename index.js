const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to shuffle an array (for randomizing cards)
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Route for the main game page
app.get('/', (req, res) => {
  const cards = shuffleArray(Array.from({ length: 18 }, (_, i) => i + 1).flatMap(i => [i, i])); // 18 unique pairs
  res.render('index', { cards });
});

// Route for the scores page
app.get('/scores', (req, res) => {
  const scores = JSON.parse(fs.readFileSync('./data/scores.json', 'utf8'));
  res.render('scores', { scores });
});

// Endpoint to submit a new high score
app.post('/submit-score', (req, res) => {
  const { username, time } = req.body;
  const scores = JSON.parse(fs.readFileSync('./data/scores.json', 'utf8'));
  
  scores.push({ username, time });
  scores.sort((a, b) => a.time - b.time); // Sort scores by time
  
  fs.writeFileSync('./data/scores.json', JSON.stringify(scores));
  res.status(200).json({ message: 'Score submitted successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));