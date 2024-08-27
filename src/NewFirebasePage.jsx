import


// Page of tutorials of firebase functions
const NewFirebasePage = () => {

    // parameters for add
    const addDocPath = "storage/document/newSubCollection";
    const addContent = {
        id: 1881,
        testField: "test Value"
    };

    // parmameters for delete
    const deleteDocPath = "storage/document/newSubCollection";
    const deleteFieldName = "testField";
    const deleteFieldOperatior = "==";
    const deleteFieldValue = "test Value";

    // parameters for search
    const searchDocPath = "storage/document/newSubCollection";
    const searchFieldName = "id";
    const searchFieldOperatior = "==";
    const searchFieldValue = 188123;

    return (
        <div>
            <p>List the firebase collections</p>

        </div>
    );
}

export default NewFirebasePage