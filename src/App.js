import React from 'react';
import Button from './Button.jsx';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div className='playground'>
        <Button
          id='testing'
          label='Hi'
          onClick={() => {
            console.log('Hellow');
          }}
        />
      </div>
    </div>
  );
}

export default App;