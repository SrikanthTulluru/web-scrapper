// app.ts

import express from 'express';
import { scrapeZillow } from './index'; // Assuming the function name is scrapeZillow

const app = express();
const PORT = 3000;

// Define a route that triggers the scraping process
app.get('/scrape', async (req, res) => {
    try {
        const searchString = req.query.searchString as string;
        let listingsData=await scrapeZillow(searchString); // Call your scraping function
        res.send(listingsData);
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
