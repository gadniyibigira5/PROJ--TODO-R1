const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());
//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newtodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description],
    );
    res.status(201).json(newtodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});
// Select all todos
app.get('/todos', async (req, res) => {
  try {
    const alltodos = await pool.query('SELECT * FROM todo');
    res.json(alltodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//Select a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id= $1', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//Update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatetodo = await pool.query(
      'UPDATE todo SET description =$1 WHERE todo_id = $2',
      [description, id],
    );
    res.json('todo was updated!');
  } catch (error) {
    console.error(error.message);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todo WHERE  todo_id = $1',
      [id],
    );
    res.json('todo was deleted !');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
