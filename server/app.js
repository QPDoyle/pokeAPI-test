const express = require('express');
const path = require('path');
const app = express();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '46328486-233a-4a85-813b-dbaca8ee8bb3'})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/intro/intro.html'));
});

app.get('/card', (req, res) => {
    pokemon.card.find('hgss3-82') //first number = set? (ie swsh 1 = base SWSH base), card # in set.
    .then(card => {
        res.json(card)
        console.log(card.name)
    })
        .catch(error => {
            res.status(500).json({ error: 'Failed to fetch Pokémon card.' }); //error handling
        });
});

app.get('/cards', (req, res) => { //trying to find multiple cards of a single type
    const query = req.query.q;
    pokemon.card.where({ q: `name:${query}`})
    .then(card => {
        res.json(card)
        console.log(card.name)
    })
        .catch(error => {
            res.status(500).json({ error: 'Failed to fetch Pokémon card.' }); //error handling
        });
});


app.use(express.static(path.join(__dirname, '/public'))); //provides a path for static files

app.use((req,res) => { // Custum 404 error message
    res.status('404');
    res.send(`<h1>Error 404: Resource not found</h1>`);

})

app.listen(3000, () =>{
    console.log("Website is live!");
});