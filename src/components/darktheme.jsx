import styles from"./darktheme.module.css";

const MessageBoard = (parameters) => {
	return (
		<div className={styles.darkThemePage}>
			<div className={styles.messageBoard}>
				<div className={styles.pad}>
					<div className={styles.pad__body}>
						<h4 className={styles.text_heading}>{parameters.title}</h4>
						{parameters.textList.map((text,key) => {
							return(
								<div key={key}>
									<p>{text}</p>
								</div>);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const DarkThemePage = () => {
	return (
		<div>
			<MessageBoard
				title="Testing Title"
				textList={[
					"It is the first paragraph of the message",
					"Then it is the 2nd line",
				]}
			/>
		</div>
	);
};

export default DarkThemePage;
