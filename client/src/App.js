import React, { Fragment } from 'react';
import './App.css';

// Components
import InputTodo from './components/input';
import ListTodo from './components/list';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
