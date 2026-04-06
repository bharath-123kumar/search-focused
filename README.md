# Zeerostock Inventory Search

## Overview
A full-stack prototype for Zeerostock's surplus inventory search. Built with an Express.js backend API and a vanilla HTML/CSS/JS frontend showcasing a premium, responsive, glassmorphism design.

## Features
- **Search API**: Allows filtering by product name (partial/case-insensitive), category, and price range.
- **Dynamic UI**: Rich aesthetic frontend handling empty queries, missing results, and displaying dynamic result counts.

## How to Run Locally
1. Ensure Node.js is installed.
2. Open terminal in this folder (`assignment-a`).
3. Run `npm install` to install dependencies (`express`, `cors`).
4. Run `npm start`.
5. Visit `http://localhost:3000` in your browser.

## Search Logic Explanation
The `/search` endpoint in `server.js` processes requests by successively filtering an in-memory dataset (`data.json`).
1. It reads the query parameters: `q`, `category`, `minPrice`, `maxPrice`.
2. A `results` array is initialized with all data.
3. If `q` exists, it applies a case-insensitive string `includes` check.
4. If `category` exists (and is not 'All'), it strictly matches the category (case-insensitive).
5. If `minPrice` or `maxPrice` exist, it parses them to floats and filters the results by checking the item's price against bounds.
6. Returns the filtered array as JSON.

## Performance Improvement for Large Datasets
For scaling to millions of records, iterating with `.filter()` on an array is inefficient (O(N) time complexity).
**Recommended Improvement**: Migrate from a JSON file to a relational or NoSQL database (like PostgreSQL or MongoDB) and create compound indexes on the most frequently searched columns (e.g., indexed text search on `name`, B-tree indexing on `price` and `category`). We could also implement **pagination** (using `limit` and `offset`/cursor) so the server never attempts to return or process millions of rows at a time, protecting memory and network limits.
