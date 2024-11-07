const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  const cards = Array.from({ length: 18 }, (_, i) => i + 1).flatMap(i => [i, i]);
  shuffle(cards);
  res.render('index', { cards });
});
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));