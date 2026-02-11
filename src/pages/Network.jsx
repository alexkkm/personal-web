
import { Link } from "react-router-dom";
import styles from "./Network.module.css";
import NewNestedJSONTable from "../components/NestedJSONTable";

const NetworkPage = () => {
    const nestedTable = {
        1:{
            type:Link,
            props: {
                "to": "/firebase",
                "children": "Firebase",
            },
        },
        2:{
            type:Link,
            props: {
                "to": "/",
                "children": "Home",
            },
        }
    }


    return (
        <div className={styles.networkPage}>
            <NewNestedJSONTable data={nestedTable} tableTitle="Network" />
        </div>
    );
};

export default NetworkPage;
