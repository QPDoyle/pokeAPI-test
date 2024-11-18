const express = require('express');
const path = require('path');

const app = express();

app.get('/api', (req, res)=>{
    res.json(`HTTP GET Request Recieved.`);
}) 
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//app.use('/website', express.static(path.join(__dirname, '/public')));

app.use((req,res) => {
    res.status('404');
    res.send(`<h1>Error 404: Resourse not found</h1>`);

})

app.listen(3000, () =>{
    console.log("Website is live!");
});