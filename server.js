const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/*
Task 2 – Serve Static Files
*/
app.use(express.static('public'));

/*
Bonus – Request Logging Middleware
*/
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/*
Task 3 – Route Handlers
*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

/*
Task 4 – API Endpoint
*/

app.get('/api/time', (req, res) => {
    res.json({
        datetime: new Date().toISOString(),
        timestamp: Date.now()
    });
});

/*
Task 5 – 404 Error Handler
*/

app.use((req, res) => {
    res.status(404);

    res.sendFile(path.join(__dirname, 'public', '404.html'), (err) => {
        if (err) {
            res.send('404 - Page Not Found');
        }
    });
});

/*
Task 5 – 500 Error Handler
*/

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500);

    res.sendFile(path.join(__dirname, 'public', '500.html'), (err) => {
        if (err) {
            res.send('500 - Internal Server Error');
        }
    });
});

/*
Task 6 – Start Server
*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('GET /');
    console.log('GET /about');
    console.log('GET /contact');
    console.log('GET /api/time');
});