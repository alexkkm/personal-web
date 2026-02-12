import React, { useState } from 'react';
import Table from '../components/Table';

const TestingPage = () => {
  return (
    <div style={{marginTop:'5px',marginLeft:'20px', marginRight:'20px'}}>
      <Table
          twoDimensionArrayOfElements={[
            [<p>test</p>, <p>d</p>],
            [<a>link</a>, <p>3</p>],
          ]}
          TableTitle="Title"
          RowTitleArray={["Row 1", "Row 2"]}
          ColumnTitleArray={["Column 1", "Column 2"]}
        />
    </div>
    );
};

export default TestingPage;
