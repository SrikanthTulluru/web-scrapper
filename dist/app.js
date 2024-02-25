"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./index"); // Assuming the function name is scrapeZillow
const app = (0, express_1.default)();
const PORT = 3000;
// Define a route that triggers the scraping process
app.get('/scrape', async (req, res) => {
    try {
        const searchString = req.query.searchString;
        let listingsData = await (0, index_1.scrapeZillow)(searchString); // Call your scraping function
        res.send(listingsData);
    }
    catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
