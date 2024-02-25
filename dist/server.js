"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
//import { scrapeHandler } from './scraper';
function startServer(app, port) {
    app.use(express_1.default.json());
    //app.post('/scrape', scrapeHandler);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
exports.startServer = startServer;
