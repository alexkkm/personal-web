import React from 'react';
import Button from './Button.jsx';

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
          style={styles.testingButtonStyle}
        />
        <hr />
        <Button label="sample" />
      </div>
    </div>
  );
}

export default App;

const styles = {
  testingButtonStyle: {
    backgroundColor: 'yellow',
    color: "black"
  }
}

// This is an example of css in js, we define the style in the jsx, and then import it into the component in style field
// define const styles for the style of the component in this file, and import the style into the component in style field 