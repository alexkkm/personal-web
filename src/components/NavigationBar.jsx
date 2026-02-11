import { useNavigate } from 'react-router-dom';

// react-icons
import { RxCross2 } from "react-icons/rx";
import { MdSettings } from "react-icons/md";
import { BsBroadcastPin } from "react-icons/bs";
import { FaBook, FaCalendar } from "react-icons/fa";

import styles from "./NavigationBar.module.css"

// Navigation Bar
const NavigationBar = ({ switchNavigationBar }) => {
    // name the useNavigate() hook as "navigate"
    const navigate = useNavigate();

    return (
        <div className={styles.navigationBar}>
            <div className={styles.closeNavigationBarButton} onClick={switchNavigationBar}>
                <RxCross2 />
            </div>
            <NavigationBarWidget
                className={styles.setting}
                icon={<MdSettings style={{ color: '#00f0ff' }} />}
                title="setting"
                onClick={() => { console.log("navigate to setting page") }}
            />
            <NavigationBarWidget
                className={styles.network}
                icon={<BsBroadcastPin style={{ color: '#00f0ff' }} />}
                title="network"
                onClick={() => navigate("/network")}
            />
            <NavigationBarWidget
                className={styles.tutorial}
                icon={<FaBook style={{ color: '#00f0ff' }} />}
                title="tutorial"
                onClick={() => navigate("/tutorial")}
            />
            <NavigationBarWidget
                className={styles.testing}
                icon={<FaBook style={{ color: '#00f0ff' }} />}
                title="testing"
                onClick={() => navigate("/testing")}
            />
            <NavigationBarWidget
                className={styles.testing}
                icon={<FaCalendar style={{ color: '#00f0ff' }} />}
                title="Calendar"
                onClick={() => navigate("/calendar")}
            />
        </div>
    );
};

// The single Navigation Widget
const NavigationBarWidget = ({ icon, title, onClick }) => {
    return (
        <div className={styles.navigationBarWidget} onClick={onClick}>
            <BarWidgetIcon icon={icon} />
            <BarWidgetTitle title={title} />
        </div>
    );
};

const BarWidgetIcon = ({ icon }) => {
    return (
        <div className={styles.barWidgetIcon}>
            {icon}
        </div>
    )
}

const BarWidgetTitle = ({ title }) => {
    return (
        <div className={styles.barWidgetTitle}>
            <p style={{ color: '#00f0ff' }}>{title}</p>
        </div>
    )
}

export default NavigationBar;