import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

import styles from "./NewsMarquee.module.css";

const NewsMarquee = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("https://newsdata.io/api/1/latest?apikey=pub_3180b53ed9434c6082a215e2f3f37ef9&country=hk&language=zht&category=business");
        const data = await response.json();
        setTitles(data.results.map((result) => result.title));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTitles();
  }, []);

  return (
    <div className={styles.NewsMarquee}>
      <Marquee>
        {titles.map((title, index) => (
          <div style={{marginRight:'20px'}}>
            <p key={index}>{title}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsMarquee;