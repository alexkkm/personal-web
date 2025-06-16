// JsonNestedTable.js
import React from 'react';
import './NestedJSONTable.css';

const JsonNestedTable = ({ data,tableTitle }) => {
  const renderTable = (obj, parentKey) => {
    return (
      <div className="NestedJSONTable" style={{ marginBottom: '20px' }}>
        <table className="table" border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(obj).map(([key, value]) => {
              const currentPath = `${parentKey}/${key}`;

              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    {typeof value === 'object' && value !== null ? (
                      renderTable(value, currentPath)
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="NestedJSONTable">
      <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>{tableTitle}</h1>
      {renderTable(data, '')}
    </div>
  );
};

export default JsonNestedTable;