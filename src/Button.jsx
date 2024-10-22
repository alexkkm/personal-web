import styles from "./Button.module.css";

const Button = ({ label, onClick }) => {
    return (
        <div className="ButtonComponent">
            <button className={styles.buttonBodyStyle} id="buttonBody" onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default Button;

// This is an example of modules css
// Also need to use className={className ? className : styles.buttonBodyStyle} for the cutomized css and default css


/** */