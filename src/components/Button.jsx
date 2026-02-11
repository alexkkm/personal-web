import styles from './Button.module.css';

const Button = ({ label, onClick }) => {
    return (
        <div className={styles.Button}>
            <button className={styles.button} onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default Button;