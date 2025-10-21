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
  console.log('connection Succuessfully!');
})

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('error fetching users');
      return;
    }
    res.json(results);
  })
})

app.post('/api/mahasiswa', (req, res) => {
  const { nama, nim, kelas, prodi } = req.body;

  if (!nama || !nim || !kelas ||!prodi) {
    return res.status(400).json({message: 'nama, nim, kelas, prodi wajib diisi' });
  }

  db.query(
    'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
    [nama, nim, kelas, prodi],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User created successfully' });
    }
  );
});

app.put('/api/mahasiswa/:id', (req, res) => {
  const userId = req.params.id;
  const { nama, nim, kelas, prodi } = req.body;

  db.query(
    'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
    [nama, nim, kelas, prodi, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({ message: 'User updated successfully' });
    }
  );
});
