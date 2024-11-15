import styles from './app.module.css';
import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [error, setError] = useState("");

    const validate = (val) => val && val.length >= 3;

    const onInputButtonClick = () => {
        const newValue = prompt();
        if (!validate(newValue)) {
            setError("Введенное значение должно содержать минимум 3 символа");
        } else {
            setValue(newValue);
            setError("");
        }
    };

    const onAddButtonClick = () => {
        const id = Date.now();
        setList([...list, { id, value }]);
        setValue('');
    };

    const handleDelete = (id) => {
        setList(list.filter(item => item.id !== id));
    };

    const handleClearAll = () => {
        setList([]);
    };

    const isValidValue = validate(value);

    return (
        <div className={styles.app}>
            <h1 className={styles.pageHeading}>Список дел</h1>
            <p className={styles.noMarginText}>
                Введенная задача:
                <output className={styles.currentValue}> {value}</output>
            </p>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonsContainer}>
                <button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
                <button className={styles.button} disabled={!isValidValue} onClick={onAddButtonClick}>Добавить в список</button>
            </div>
            <div className={styles.listContainer}>
                <h2 className={styles.listHeading}>Ваши задачи:</h2>
                {!list.length ? (
                    <p className={styles.noMarginText}>Нет добавленных элементов</p>
                ) : (
                    <>
                        <ul className={styles.list}>
                            {list.map((item) => (
                                <li className={styles.listItem} key={item.id}>
                                    <div className={styles.taskContent}>
                                        {item.value}
                                        <button className={styles.deleteButton}
                                                onClick={() => handleDelete(item.id)}>×
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className={styles.clearButton} onClick={handleClearAll}>Очистить весь список</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
