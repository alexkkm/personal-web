import React from 'react';
import styles from './NestedJSONTable.module.css';

const renderCellContent = (value) => {
  if (typeof value === 'object' && value !== null) {
    // If the value is an object, expect it to be a component definition
    const { type, props } = value;
    const Component = type; // Assuming 'type' is a valid React component
    return <Component {...props} />;
  }
  return <span>{value}</span>;
};

const NestedJSONTable = ({ data, tableTitle }) => {
  const renderTable = (obj, parentKey) => {
    return (
      <div className={styles.NestedJSONTable} style={{ marginBottom: '20px' }}>
        <table className={styles.table} border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(obj).map(([key, value]) => {
              const currentPath = `${parentKey}/${key}`;
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{renderCellContent(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.NestedJSONTable}>
      <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>{tableTitle}</h1>
      {renderTable(data, '')}
    </div>
  );
};

export default NestedJSONTable;

/** 
 * Below is an example of how to use the NewNestedJSONTable component
 * 
import { Link } from 'react-router-dom'; // Import Link
import NewNestedJSONTable from './NewNestedJSONTable';
import ClockWidget from './ClockWidget'; // Import the ClockWidget

  const Page = () => {
  const nestedTable = {
    item1: "Value 1",
    item2: {
      type: 'button',
      props: {
        onClick: () => alert('Button Clicked!'),
        children: "Click Me!"
      }
    },
    item3: {
      type: 'img',
      props: {
        src: 'https://via.placeholder.com/150',
        alt: 'Placeholder Image'
      }
    },
    item4: {
      type: ClockWidget, // Use ClockWidget directly
      props: {} // Pass any required props here
    },
    item5: {
      type: Link, // Use Link component
      props: {
        to: "/",
        children: "Home" // Link text
      }
    },
    item6: {
      type: 'p', // Use a paragraph tag
      props: {
        children: "Network" // Paragraph text
      }
    }
  };

  return (
    <div style={{backgroundColor: "black"}}>
    <NestedJSONTable data={nestedTable} tableTitle="Dynamic Nested JSON Table" />
    </div>
  );
  }
 * 
 * 
 * 
 * **/