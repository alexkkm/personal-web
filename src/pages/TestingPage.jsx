import React, { useState } from 'react';
import Table from '../components/Table';

const TestingPage = () => {
  return (
    <div style={{ backgroundColor: 'black', color: '#00f0ff' }}>
      <Table
        twoDimensionArrayOfElements={[
          [<p>test</p>, <p>d</p>],
          [<a>link</a>, <p>3</p>],
        ]}
        RowTitleArray={["Row 1", "Row 2"]}
        ColumnTitleArray={["Column 1", "Column 2"]}
      />
    </div>
  );
};

export default TestingPage;
