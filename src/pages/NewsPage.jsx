import React, { useState,useEffect } from "react";

import styles from "./NewsPage.module.css";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const NewsCard = ({ title, description, onClick, setSelectedNews  }) => (
  <div className={styles.singleNewsCard} onClick={onClick} >
    <h3>{title}</h3>
    <p>{truncateText(description, 100)}</p> {/* Limit the length of the description to 100 characters */}
  </div>
);

const NewsBox = ({ title, description, onClose, setSelectedNews }) => {
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  const handleBoxClose = () => {
    setSelectedNews({});
    setIsBoxVisible(false);
    onClose();
  };

  return (
    <div className="news-box" style={{ opacity: isBoxVisible ? 1 : 0 }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleBoxClose}>Close</button>
    </div>
  );
};

const NewsPage = () => {
  const [selectedNews, setSelectedNews] = useState({});
  const [newsData, setNewsData] = useState({ results: [] });

  const handleNewsClick = (title, description) => {
    console.log("Clicked a news")
    setSelectedNews({ title, description });
  };

  const handleCloseBox = () => {
    setSelectedNews({});
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_3180b53ed9434c6082a215e2f3f37ef9&country=hk&language=zh&excludecategory=business,politics"
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.newsPage}>
      {/* Display the news cards if there are no selected news*/}
      {Object.keys(selectedNews).length === 0 && (
        <div className={styles.newsCardsArea}>
        {newsData.results.map((result, index) => (
          <NewsCard
            key={index}
            title={result.title}
            description={result.description}
            onClick={() => handleNewsClick(result.title, result.description)}
            setSelectedNews={setSelectedNews}
            style={{ opacity: selectedNews? 0 : 1}}
          />
        ))}
      </div>
      )
      }
      {/* Display the news box if there is a selected news*/}
      {Object.keys(selectedNews).length !== 0 && (
        <div className={styles.newsBoxContainer}>
          <NewsBox
            title={selectedNews.title}
            description={selectedNews.description}
            onClose={handleCloseBox}
            setSelectedNews={setSelectedNews}

            style={{ opacity: selectedNews ? 1 : 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;