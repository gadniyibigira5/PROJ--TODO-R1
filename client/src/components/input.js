import React, { Fragment, useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');
  const onSubmition = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location = '/';
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-head mt-5">My Todos List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmition}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
