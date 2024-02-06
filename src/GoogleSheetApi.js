

const fetchData = async () => {
    try {
        const API_KEY = 'AIzaSyBMpEPBZMkQqvDnwSX6T9Yzvciq9VcNHzc';
        const SPREADSHEET_ID = '12lNwIS2YnYbo5J_HSR8Clz0G8f3zmh7eAKJtt1OsXpo';

        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        console.log("pringt=================", jsonData);
        return jsonData.values;
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateNonContinuousRanges = async (updates) => {
    try {
        const SPREADSHEET_ID = '12lNwIS2YnYbo5J_HSR8Clz0G8f3zmh7eAKJtt1OsXpo';
        const API_KEY = 'AIzaSyBMpEPBZMkQqvDnwSX6T9Yzvciq9VcNHzc'; // Replace with your OAuth access token

        for (const update of updates) {
            const { range, values } = update;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`;

            const response = await fetch(apiUrl, {
                method: 'PUT', // or 'POST' if you prefer
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values,
                }),
            });

            const jsonData = await response.json();
            console.log(`Update Response for Range ${range}:`, jsonData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


const googleSheetApi = {
    fetchData,
    updateNonContinuousRanges
};

export default googleSheetApi