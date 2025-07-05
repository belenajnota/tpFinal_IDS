const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Health route
app.get('/Api/health', (req, res) => {
    res.json({status: 'OK'});
});



app.listen(PORT, () => {
    console.log("Puerto: ", PORT);
});