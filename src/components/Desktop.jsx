import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import GridLayout from 'react-grid-layout';
import { TfiViewListAlt } from 'react-icons/tfi';

import styles from './Desktop.module.css';

// Components
import NavigationBar from './NavigationBar';
import WeatherWidget from '../desktopWidget/WeatherWidget';
import ClockWidget from '../desktopWidget/ClockWidget';
import TodoListWidget from '../desktopWidget/TodoListWidget';
import TOTPWidget from '../desktopWidget/TOTPWidget';
import NewsMarquee from '../testing/NewsMarquee';

// indicate the current pathname and display it
const PathNameIndicator = () => {
    const location = useLocation();
    return <p>PathName: {location.pathname}</p>;
};

//Desktop is the main door of the app
const Desktop = () => {
  // state parameters
  const [isBlurred, setIsBlurred] = useState('');
  const [isButtonActive, setIsButtonActive] = useState('');

  // blur the element by changing the "isBlurred"
  const switchNavigationBar = () => {
    setIsBlurred(!isBlurred); // Toggle the blur state
    setIsButtonActive(true);
  };

  // state to save the Layout of the widget
  const [layout, setLayout] = useState([
    { i: 'weatherWidget', x: 0, y: 1, w: 1, h: 5 },
    { i: 'clockWidget', x: 0, y: 5, w: 1, h: 5 },
    { i: 'todoListWidget', x: 1, y: 1, w: 1, h: 5 },
    { i: 'totpWidget', x: 1, y: 5, w: 1, h: 5 },
  ]);

  // method to update the layout state when the layout changes
  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <div className={styles.desktop}>
      <div className={`${styles.mainScreen} ${isBlurred ? styles.blurred : ''}`}>
        <div className={styles.topBar}>
          <TfiViewListAlt className={styles.settingButton} onClick={switchNavigationBar} />
          <div className={styles.newsMarquee}>
            <NewsMarquee />
          </div>
        </div>
        <GridLayout
          className={styles.layout}
          layout={layout}
          cols={3}
          rowHeight={30}
          width={1200}
          onLayoutChange={onLayoutChange}
        >
          <div key="weatherWidget" className={styles.gridItem}>
            <WeatherWidget />
          </div>
          <div key="clockWidget" className={styles.gridItem}>
            <ClockWidget />
          </div>
          <div key="todoListWidget" className={styles.gridItem}>
            <TodoListWidget />
          </div>
          <div key="totpWidget" className={styles.gridItem}>
            <TOTPWidget />
          </div>
        </GridLayout>
      </div>
      <div className={styles.hiddenArea}>
        <div className={`${styles.switchNavigationBarButton} ${isBlurred ? '' : styles.hidden}`}>
          <NavigationBar switchNavigationBar={switchNavigationBar} />
        </div>
      </div>
    </div>
  );
};

export default Desktop;