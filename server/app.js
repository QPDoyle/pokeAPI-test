const express = require('express');
const path = require('path');

const app = express();

app.use('/website', express.static(path.join(__dirname, '/public')));

app.use((req,res) => {
    res.status('404');
    res.send(`<h1>Error 404: Recourse not found</h1>`);

})

app.listen(3000, () =>{
    console.log("beaver");
});