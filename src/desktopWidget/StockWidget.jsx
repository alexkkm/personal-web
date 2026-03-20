//https://os.arsrna.cn/demo/tencent-stock-api?stockcode=hk00005
//https://cnb.cool/arsrna/websites/os/-/tree/master/components/ui
//https://cnb.cool/arsrna/websites/os/-/blob/master/pages/demo/tencent-stock-api/index.tsx

import React, { useEffect, useState } from "react";
import styles from "./StockWidget.module.css";

const APIEP = "https://qt.gtimg.cn";

// Fetch and parse a single stock
async function GetStockInfo(stock) {
  const response = await fetch(`${APIEP}/q=${stock}`);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("gbk");
  const rawText = decoder.decode(buffer);

  // For single-stock responses like: v_hk00005="..."
  const match = rawText.match(/v_hk([A-Za-z0-9_]+)="([^"]+)"/i);

  if (match) {
    // if using the second regex, the captured group 2 is the data; if using the first, group 1
    const raw = match[2];
    const stockData = raw.split("~");

    return {
      name: stockData[1] || "",
      code: stockData[2] || "",
      price: stockData[3] || "0",
      preClose: stockData[4] || "0",
      openPrice: stockData[5] || "0",
      volume: stockData[6] || "0",
      outerVolume: stockData[7] || "0",
      innerVolume: stockData[8] || "0",
      lastTrade: stockData[29] || "0",
      time: stockData[30] || "",
      priceChange: stockData[31] || "0",
      priceChangePercent: stockData[32] || "0",
      highest: stockData[33] || "0",
      lowest: stockData[34] || "0",
      priceVolumeAmount: stockData[35] || "0",
      turnover: stockData[37] || "0",
      turnoverRate: stockData[38] || "0",
      pe: stockData[39] || "0",
      aplitude: stockData[43] || "0",
      circulateMarketValue: stockData[44] || "0",
      totalMarketValue: stockData[45] || "0",
      pb: stockData[46] || "0",
      limitUpPrice: stockData[47] || "0",
      limitDownPrice: stockData[48] || "0",
    };
  }
  throw new Error("Failed to parse stock data");
}

// The desktop widget showing the stock information
const StockWidget = () => {
  const [stocksData, setStocksData] = useState([]); // array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If your stock list is static, define it outside of render to avoid effect re-run:
  const stocksCodeList = ["hkHSI","hk00005"];

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        // fetch concurrently
        const promises = stocksCodeList.map((code) => GetStockInfo(code));
        const results = await Promise.all(promises);
        if (!cancelled) {
          setStocksData(results);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching stock data:", err);
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [/* stocksCodeList */]); // leave empty if stocksCodeList is static

  if (loading) {
    return (
      <div className={styles.stockWidget}>
        <p>Loading stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stockWidget}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.stockWidget}>
      <div className={styles.stocksData}>
        {stocksData.map((s) => {
          const change = parseFloat(s.priceChange) || 0;
          const sign = change > 0 ? "+" : change < 0 ? "-" : "";
          const isNegative = change < 0;
          const changeClass = isNegative ? styles.changeNegative : styles.changePositive;

          return (
            <div key={s.code} className={styles.stockCard}>
              <p className={styles.stockCardText}>
                <span>
                  {s.name} ({s.code}) {s.price}
                </span>
                <span className={changeClass}>
                  {sign}{Math.abs(change)}
                </span>
              </p>
            </div>
          );
         })}
      </div>
    </div>
  );
};

export default StockWidget;