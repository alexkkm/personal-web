import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import './TestingPage.css';
import ClockWidget from '../desktopWidget/Clock';
import WeatherWidget from '../desktopWidget/Weather';
import TodoListWidget from '../desktopWidget/TodoListWidget';

const TestingPage = () => {
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 3, h: 5 },
    { i: 'b', x: 0, y: 1, w: 3, h: 3 },
    { i: 'c', x: 3, y: 1, w: 1, h: 5 },
  ]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <div className="testingPage">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
      >
        <div key="a" className="grid-item">
          <ClockWidget />
        </div>
        <div key="b" className="grid-item">
          <WeatherWidget />
        </div>
        <div key="c" className="grid-item">
          <TodoListWidget />
        </div>
      </GridLayout>
    </div>
  );
};

export default TestingPage;