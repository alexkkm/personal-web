//https://os.arsrna.cn/demo/tencent-stock-api?stockcode=hk00005

import React, { useEffect, useState, useCallback } from "react";
import styles from "./StockInformationPage.module.css";

const APIEP = "https://qt.gtimg.cn";

// Fetch and parse a single stock (Keep this as is)
async function GetStockInfo(stock) {
  const response = await fetch(`${APIEP}/q=${stock}`);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("gbk");
  const rawText = decoder.decode(buffer);

  // For single-stock responses like: v_hk00005="..."
  // NOTE: The original regex seems to only capture 'hk' prefixed stocks. 
  // For general codes like 'sh600000' or 'sz000001', you might need a more generic regex or check the API response format.
  // Assuming the API response structure for the user input will match the pre-set ones for now.
  const match = rawText.match(/v_([A-Za-z0-9_]+)="([^"]+)"/i); // Made it slightly more general

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
  throw new Error(`Failed to parse stock data for code: ${stock}`);
}

// The desktop widget showing the stock information
const StockInformationPage = () => {
  // State for pre-set stocks (brief list)
  const [indicesData, setIndicesData] = useState([]); // array of brief data
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for user input area
  const [userInputCode, setUserInputCode] = useState("hk00005");
  const [searchedStockData, setSearchedStockData] = useState(null); // For the full card display
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const stocksCodeList = ["hk00003", "hk00005", "hk02388"];
  const indicesCodeList=["hkHSI","usIXIC"]

  // Effect for initial/pre-set stock list fetch
  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      setError(null);
       
      // try fetch the indicesData from API
      try {
        // fetch indicesResult concurrently
        const indicesPromises = indicesCodeList.map((code) => GetStockInfo(code));
        const indicesResults = await Promise.all(indicesPromises);
        if (!cancelled) {
          setIndicesData(indicesResults);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching initial indices data:", err);
          setError(err.message || "Unknown error fetching initial indices list");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }

      // try fetch the stocksData from API
      try {
        // fetch stocksResult concurrently
        const stockPromises = stocksCodeList.map((code) => GetStockInfo(code));
        const stockResults = await Promise.all(stockPromises);
        if (!cancelled) {
          setStocksData(stockResults);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching initial stock data:", err);
          setError(err.message || "Unknown error fetching initial stock list");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []); // Empty dependency array as stocksCodeList is static

  // Function to handle fetching a single stock by user input
  const fetchSingleStock = useCallback(async (stockCode) => {
    if (!stockCode) {
        setSearchedStockData(null);
        setSearchError(null);
        return;
    }
    
    setSearchLoading(true);
    setSearchError(null);
    setSearchedStockData(null);

    try {
      const data = await GetStockInfo(stockCode);
      setSearchedStockData(data);
    } catch (err) {
      console.error(`Error fetching stock ${stockCode}:`, err);
      setSearchError(err.message || `Failed to fetch data for ${stockCode}`);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Handler for the input change (to make it a controlled component)
  const handleInputChange = (event) => {
    setUserInputCode(event.target.value.trim()); // Normalize input
  };

  // Handler for the search button click
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    fetchSingleStock(userInputCode);
  };

  // Optional: Fetch automatically when userInputCode changes (e.g., on blur or after a short delay)
  // For simplicity, we'll stick to the button submit as per the prompt structure, but here's how you could use useEffect:
  useEffect(() => {
    const handler = setTimeout(() => {
        if (userInputCode) {
            fetchSingleStock(userInputCode);
        } else {
            setSearchedStockData(null);
        }
    }, 1000); // Debounce for better performance

    return () => {
      clearTimeout(handler);
    };
  }, [userInputCode, fetchSingleStock]);
  


  if (loading) {
    return (
      <div className={styles.stockWidget}>
        <p>Loading initial indices data and stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stockWidget}>
        <p>Error loading initial list: {error}</p>
      </div>
    );
  }

  // Helper component for displaying a single stock card (can be extracted)
  const StockDisplayCard = ({ data }) => {
    if (!data) return null;

    const change = parseFloat(data.priceChange) || 0;
    const sign = change > 0 ? "+" : change < 0 ? "-" : "";
    const isNegative = change < 0;
    const changeClass = isNegative ? styles.changeNegative : styles.changePositive;

    return (
        <div className={styles.stockDetailsInformationCard}>
            <p className={styles.stockDetailsHeader}>
                <span>
                    {data.name} ({data.code})
                </span>
            </p>
            <p>
              <span className={styles.stockDetailsPrice}>
                {data.price}{ }
              </span>
              <span className={data.priceChange > 0 ? styles.changePositive : data.priceChange < 0 ? styles.changeNegative : ""}>
                {sign}{Math.abs(change).toFixed(2)} ({data.priceChangePercent}%)
              </span>
            </p>
            {/* Display more detailed info for the user-searched card if desired */}
            {(data.totalMarketValue) && (
                <div className={styles.stockDetails}>
                  <p>昨收: {data.preClose}</p>
                  <p>今開: {data.openPrice}</p>
                  <p>最高: {data.highest}</p>
                  <p>最低: {data.lowest}</p>
                  <p>成交量: {data.volume}</p>
                  <p>成交額(萬): {data.turnover}</p>
                  <p>市盈率(%): {data.pe}</p>
                  <p>總市值(億): {data.totalMarketValue}</p>
                  
                </div>
            )}
        </div>
    );
  };

  return (
    <div className={styles.stockInformationPage}>
      {/* 1. Display Area for Pre-set Stocks (Brief Information) */}
      <h2 className={styles.indicesHeader}>Indices</h2>
      <div className={styles.stocksData}>
        {indicesData.map((indexData) => (
          // Reusing the existing card rendering logic for the initial list
          <div key={indexData.code} className={styles.stockCards}>
            <div className={styles.stockCardsText}>
              <p>
                {indexData.name} ({indexData.code})
              </p>
              <p>
                {indexData.price}
              </p>
              <p className={indexData.priceChange > 0 ? styles.changePositive : indexData.priceChange < 0 ? styles.changeNegative : ""}>
                {indexData.priceChange > 0 ? "+" : indexData.priceChange < 0 ? "-" : ""}
                {Math.abs(indexData.priceChange)} {"("+Math.abs(indexData.priceChangePercent)+'%)'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Display Area for Pre-set Stocks (Brief Information) */}
      <h2 className={styles.watchListHeader}>Watchlist</h2>
      <div className={styles.stocksData}>
        {stocksData.map((stockData) => (
          // Reusing the existing card rendering logic for the initial list
          <div key={stockData.code} className={styles.stockCards}>
            <div className={styles.stockCardsText}>
              <p>
                {stockData.name} ({stockData.code})
              </p>     
              <p>
                {stockData.price} 
              </p>
              <p className={stockData.priceChange > 0 ? styles.changePositive : stockData.priceChange < 0 ? styles.changeNegative : ""}>
                {stockData.priceChange > 0 ? "+" : stockData.priceChange < 0 ? "-" : ""}
                {Math.abs(stockData.priceChange)} {"("+Math.abs(stockData.priceChangePercent)+'%)'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{color: '#ffffff'}} />

      {/* 2. Input Area for User Stock Code */}
      <h2 className={styles.stockInformationSearchTitle} >Stock Information Search</h2>
      <div className={styles.inputArea}>
          <div className={styles.searchRow}>
            <label htmlFor="stockCodeInput" className={styles.searchLabel}>
              Enter Stock Code:
            </label>
              <input
                className={styles.stockCodeInput}
                type="text"
                value={userInputCode}
                onChange={handleInputChange}
                placeholder="e.g., hk00005"
                disabled={searchLoading}
              />
            <button
              type="submit"
              className={styles.searchButton}
              onClick={handleSearchSubmit}
              disabled={searchLoading || !userInputCode}
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>
       </div>

      {/* 3. Display Area for User-Searched Stock (Card Area) */}
      {searchLoading && <p>Loading details for {userInputCode}...</p>}
      {searchError && <p className={styles.errorText}>Search Error: {searchError}</p>}
      
      {searchedStockData && (
        <div>
          <StockDisplayCard data={searchedStockData} />
        </div>
      )}

      <hr />
    </div>
  );
};

export default StockInformationPage;