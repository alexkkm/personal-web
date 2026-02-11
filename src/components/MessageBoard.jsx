import styles from "./MessageBoard.module.css";

const MessageBoard = (parameters) => {
    return (
        <div className={styles.messageBoard}>
            <div className={styles.border}>
                <div className={styles.body}>
                    <h4 className={styles.title}>Example of Message Board</h4>
                    <p className={styles.text}>
                        This is the exmaple of message board with some example content
                    </p>
                    <p className={styles.text}>
                        The goal is: showcasing a start of a UI kit. If you've played the
                        game, you' might be able to pick-up some similarities with the
                        in-game menus.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageBoard;