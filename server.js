const express = require('express');
const cors = require('cors');
const data = require('./data.json');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req, res) => {
    let { q, category, minPrice, maxPrice } = req.query;
    
    let results = data;

    if (q) {
        const query = q.toLowerCase();
        results = results.filter(item => item.name.toLowerCase().includes(query));
    }

    if (category && category !== 'All') {
        results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice) {
        const min = parseFloat(minPrice);
        if (!isNaN(min)) {
            results = results.filter(item => item.price >= min);
        }
    }

    if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max)) {
            results = results.filter(item => item.price <= max);
        }
    }

    res.json(results);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Assignment A Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
