import './Button.css';

const Button = ({ label, onClick }) => {
    return (
        <div className="ButtonComponent">
            <button className="buttonBody" onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default Button;