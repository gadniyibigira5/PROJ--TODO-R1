import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './edit';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const deleteTodos = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:8000/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(deleteTodo);
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <h1>List Todos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodos(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/*<tr>
            <td>Default</td>
            <td>Defaultson</td>
            <td>def@somemail.com</td>
          </tr>*/}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
