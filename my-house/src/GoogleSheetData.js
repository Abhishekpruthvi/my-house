import React, { useState, useEffect } from 'react';

const GoogleSheetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const API_KEY = 'AIzaSyBMpEPBZMkQqvDnwSX6T9Yzvciq9VcNHzc';
      const SPREADSHEET_ID = '12lNwIS2YnYbo5J_HSR8Clz0G8f3zmh7eAKJtt1OsXpo';

      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const jsonData = await response.json();

      setData(jsonData.values);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{row.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleSheetData;
