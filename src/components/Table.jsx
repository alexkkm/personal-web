const Table = ({ twoDimensionArrayOfElements = [], RowTitleArray = [], ColumnTitleArray = [] }) => {
    return (
      <table>
        <thead>
          <tr>
            {ColumnTitleArray.map((title, columnIndex) => (
              <th key={columnIndex}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {twoDimensionArrayOfElements.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {ColumnTitleArray.map((_, columnIndex) => (
                <td key={columnIndex}>
                  {row[columnIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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