import styles from "./Table.module.css";

const Table = ({ twoDimensionArrayOfElements = [], TableTitle=null, RowTitleArray = [], ColumnTitleArray = [] }) => {
    return (
    <div>
      <div className={styles.TableTitle}>
        <p>{TableTitle}</p>
      </div>
      <table className={styles.table}>    
        <thead>
          {/* Set 1st tow for the Column Titles */}
          <tr>
            {/* leave blank for 1st cell of the Column Titles */}
            <th>{}</th>
            {/* Column Titles */}
            {ColumnTitleArray.map((title, columnIndex) => (
              <th className={styles.ColumnTitle}key={columnIndex}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          

          {twoDimensionArrayOfElements.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row Titles */}
                <td className={styles.RowTitle} key={rowIndex}>{RowTitleArray[rowIndex]}</td>
              {/* Row data */}
              {ColumnTitleArray.map((_, columnIndex) => (
                <td key={columnIndex}>{row[columnIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
};

export default Table;

/* Example of using Table */
/*
    <Table
        twoDimensionArrayOfElements={[
          [<p>test</p>, <p>d</p>],
          [<a>link</a>, <p>3</p>],
        ]}
        RowTitleArray={["Row 1", "Row 2"]}
        ColumnTitleArray={["Column 1", "Column 2"]}
      />
*/