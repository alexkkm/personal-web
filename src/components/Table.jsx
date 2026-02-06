const Table = ({ twoDimensionArrayOfElements = {} }) => {
    const rows = Object.keys(twoDimensionArrayOfElements).filter((key) => typeof twoDimensionArrayOfElements[key] === 'object');
    const columns = Object.keys(rows.length > 0 ? twoDimensionArrayOfElements[rows[0]] : {});
  
    return (
            <table>
                <thead>
                <tr>
                    {columns.map((column, columnIndex) => (
                    <th key={columnIndex}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                        <td key={columnIndex}>{twoDimensionArrayOfElements[row][columnIndex]}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
    );
};

export default Table;