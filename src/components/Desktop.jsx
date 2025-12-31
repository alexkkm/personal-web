// Basic tools
import { Link, useLocation, } from "react-router-dom";
import { useState } from "react";

import GridLayout from 'react-grid-layout';

import { TfiViewListAlt } from "react-icons/tfi";

import "./Desktop.css"
// Components
import NavigationBar from "./NavigationBar";
import WeatherWidget from "../desktopWidget//Weather";
import ClockWidget from "../desktopWidget/Clock";
import TodoListWidget from "../desktopWidget/TodoListWidget";
import TOTPWidget from "../desktopWidget/TOTPWidget";

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
        <div className="desktop">
            
            <div className={`mainScreen ${isBlurred ? 'blurred' : ''}`}>
                <TfiViewListAlt className="settingButton" onClick={switchNavigationBar} />

                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={3}
                    rowHeight={30}
                    width={1200}
                    onLayoutChange={onLayoutChange}
                >

                    <div key="weatherWidget" className="grid-item">
                    <WeatherWidget />
                    </div>
                    <div key="clockWidget" className="grid-item">
                    <ClockWidget />
                    </div>
                    <div key="todoListWidget" className="grid-item">
                    <TodoListWidget />
                    </div>
                    <div key="totpWidget" className="grid-item">
                    <TOTPWidget />
                    </div>
                </GridLayout>
            </div>
            <div className="hiddenArea">
                <div className={`switchNavigationBarButton ${isBlurred ? '' : 'hidden'}`}>
                    <NavigationBar switchNavigationBar={switchNavigationBar} />
                </div>
            </div>
        </div>
    );
};

export default Desktop;