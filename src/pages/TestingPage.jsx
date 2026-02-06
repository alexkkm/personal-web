import React, { useState } from 'react';
import Table from '../components/Table';

const TestingPage = () => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Table twoDimensionArrayOfElements={{a: {b: 1, c: 2}, d: {e: 3, f: 4}, g: {h: 5, i: 6}}}/>
    </div>
  );
};

export default TestingPage;
