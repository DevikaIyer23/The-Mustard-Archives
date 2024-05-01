const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 'your-port',
  user: 'your-username',
  password: 'your-password',
  database: 'mustardarchive'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Routes for 'service' table
app.get('/api/services', (req, res) => {
  db.query('SELECT * FROM service', (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log('api/services called')
  });
});
  
app.get('/api/services/:name', (req, res) => {
  db.query('SELECT * FROM service WHERE name = ?', [req.params.name], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Routes for 'client' table
app.get('/api/clients', (req, res) => {
  db.query('SELECT * FROM client', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/clients/:id', (req, res) => {
  db.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get('/api/clients/username/:id', (req, res) => {
  db.query('SELECT * FROM client WHERE username = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Routes for 'consultant' table
app.get('/api/consultants', (req, res) => {
  db.query('SELECT * FROM consultant', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/consultants/:id', (req, res) => {
  db.query('SELECT * FROM consultant WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Routes for 'project' table
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM project', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/projects', (req, res) => {
  console.log(req.body);
  const {id, name, client_id, consultant_id, s_date, e_date, status, tot_cost } = req.body;
  const query = 'INSERT INTO project (id, name, client_id, consultant_id, s_date, e_date, status, tot_cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, name, client_id, consultant_id, s_date, e_date, status, tot_cost], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/api/projects/clients/:id', (req, res) => {
  db.query('SELECT * FROM project WHERE client_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/projects/consultants/:id', (req, res) => {
  db.query('SELECT * FROM project WHERE consultant_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Routes for 'payment' table
app.get('/api/payments', (req, res) => {
  db.query('SELECT * FROM payment', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/payments/:id', (req, res) => {
  db.query('SELECT * FROM payment WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get('/api/payments/clients/:id', (req, res) => {
  db.query('SELECT * FROM payment WHERE client_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get('/api/payments/consultants/:id', (req, res) => {
  db.query('SELECT * FROM payment WHERE consultant_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});