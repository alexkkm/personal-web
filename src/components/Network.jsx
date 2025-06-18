
import { Link } from "react-router-dom";
import "./Network.css";
import NewNestedJSONTable from "./NestedJSONTable";

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
        <div className="networkPage">
            <NewNestedJSONTable data={nestedTable} tableTitle="Network" />
        </div>
    );
};

export default NetworkPage;
