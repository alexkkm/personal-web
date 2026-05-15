import React, { useState,useEffect } from "react";

import styles from "./NewsPage.module.css";

const NewsCard = ({ title, description, onClick }) => (
  <div className="news-card" onClick={onClick}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const NewsBox = ({ title, description, onClose }) => {
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  const handleBoxClose = () => {
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
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState({ results: [] });

  const handleNewsClick = (title, description) => {
    setSelectedNews({ title, description });
  };

  const handleCloseBox = () => {
    setSelectedNews(null);
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
      <div className={styles.newsCards}>
        {newsData.results.map((result, index) => (
          <NewsCard
            key={index}
            title={result.title}
            description={result.description}
            onClick={() => handleNewsClick(result.title, result.description)}
            style={{ opacity: selectedNews? 0: 0.5}}
          />
        ))}
      </div>
      {selectedNews && (
        <div className={styles.newsBoxContainer}>
          <NewsBox
            title={selectedNews.title}
            description={selectedNews.description}
            onClose={handleCloseBox}
            style={{ opacity: selectedNews ? 0.5 : 0 }}
          />
          <div
            className={styles.blur}
            onClick={handleCloseBox}
          ></div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;