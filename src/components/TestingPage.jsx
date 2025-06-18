import React, { useState } from 'react';
import NestedJSONTable from './NestedJSONTable';


const TestingPage = () => {
  const data = {
    item1: "Value 1",
    item2: {
      type: 'button',
      props: {
        onClick: () => alert('Button Clicked!'),
        children: "Click Me!"
      }
    },
    item3: {
      type: 'img',
      props: {
        src: 'https://via.placeholder.com/150',
        alt: 'Placeholder Image'
      }
    }
  };

  return (
    <div style={{backgroundColor: "black"}}>
    <NestedJSONTable data={data} tableTitle="Dynamic Nested JSON Table" />
    </div>
  );
}

export default TestingPage;