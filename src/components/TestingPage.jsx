import React, { useState } from 'react';
import JsonNestedTable from './NestedJSONTable';

const TestingPage = () => {
  const data={
    "test1": {"newField": "data1", "nestedField": {"subField1": "value1", "subField2": "value2"}},
    "test2": "test2",
    "test3": "test3",
    "test4": "test4",
    "test5": "test5",
    "test6": "test6",
    "test7": "test7",
    "test8": "test8",
    "test9": "test9",
    "test10": "test10",
    "test11": "test11",
    "test12": "test12",
    "test13": "test13",
    "test14": "test14",
    "test15": "test15",
    "test16": "test16",
    "test17": "test17",
    "test18": "test18",
    "test19": "test19",}

  return(
    <div style={{backgroundColor: "black"}}>
      <JsonNestedTable data={data} tableTitle={"Tesing Title"} />
    </div>
  )
}

export default TestingPage;