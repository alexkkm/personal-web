import React from 'react';
import Button from './Button.jsx';

import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.App}>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div className="playground">
        <div className="selfDefineStyle">
          <Button
            label='Hi'
            onClick={() => {
              console.log('Hellow');
            }}
          />
        </div>

        <hr />
        <Button label="sample" />
      </div>
    </div>
  );
}

export default App;

// This is an example of modules css

/** Note: Here is the updated version of example of modules css: 
 *  Now we deine a <div> to cover the <Button>, and give the className to the <div>,
 *  then we define the style for the <Button> in App.module.css file, and define .selfDefineStyle{} with the Button:
 *  .selfDefineStyle {
      Button{
        background-color: red;
        color: white;
      }
  }

 *  Then we can finally use define the style: 
    {   background-color: red;
        color: white;
    }
 * **/
