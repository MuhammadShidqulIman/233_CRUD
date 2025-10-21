const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Msi15153',
  database: 'biodata',
  port : 3307
});

db.connect((err) => {
  if (err) {
    console.error('error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('connection Succuesfully!');
})

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.satck);
      res.status(500).send('error fetching users');
      return;
    }
    res.json(results);
  })
})