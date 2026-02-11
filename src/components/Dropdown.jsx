import styles from './Dropdown.module.css';

const Dropdown = ({ options, onChange, defaultValue }) => {
    return (
        <div className={styles.Dropdown}>
            <select className={styles.dropdown} onChange={onChange} defaultValue={defaultValue}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;