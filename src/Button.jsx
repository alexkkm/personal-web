const Button = ({ label, onClick, style }) => {
    return (
        <div className="ButtonComponent">
            <button className="buttonBody" onClick={onClick} style={style || styles.buttonBodyStyle}>
                {label}
            </button>
        </div>
    );
};

export default Button;

const styles = {
    buttonBodyStyle: {
        color: "white",
        backgroundColor: "black",
    },
}


// This is an example of css in js, we define the style in the jsx, and then import it into the component in style field
// use style || style.buttonStyle to select the style of default and customized style