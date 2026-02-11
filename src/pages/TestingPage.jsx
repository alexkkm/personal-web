import React, { useState } from 'react';
import Table from '../components/Table';

const TestingPage = () => {
  return (
    <Table
        twoDimensionArrayOfElements={[
          [<p>test</p>, <p>d</p>],
          [<a>link</a>, <p>3</p>],
        ]}
        RowTitleArray={["Row 1", "Row 2"]}
        ColumnTitleArray={["Column 1", "Column 2"]}
      />
    );
};

export default TestingPage;
