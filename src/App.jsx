import React from 'react';
import Button from './Button.jsx';

import styles from './App.module.css';

const App = () => {
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div className='playground'>
        <Button
          className={styles.testingButtonStyle}
          label='Hi'
          onClick={() => {
            console.log('Hellow');
          }}
        />
        <hr />
        <Button label="sample" />
      </div>
    </div>
  );
}

export default App;

// This is an example of modules css