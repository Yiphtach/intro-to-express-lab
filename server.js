const express = require("express");

const app = express ();

// Part 1

// Define a dynamic route with a parameter for the username
app.get('/greetings/:username', (req, res) => {
    // Access the username parameter from the route
    const { username } = req.params;

    // Send a personalized greeting using the username
    res.send(`Hello there, ${username}!`);
});


// Part 2
app.get('/roll/:number', (req, res) => {
    const { number } = req.params;

    // Check if the parameter is a valid number
    if (isNaN(number)) {
        res.send("You must specify a number.");
        return;
    }

    // Convert the parameter to an integer
    const maxNumber = parseInt(number);

    // Generate a random number between 0 and the specified number
    const randomNumber = Math.floor(Math.random() * (maxNumber + 1));

    // Send back a message with the rolled number
    res.send(`You rolled a ${randomNumber}.`);
});


// Part 3

// Define the collectibles array
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Set up the route to handle collectible requests by index
app.get('/collectibles/:index', (req, res) => {
    const { index } = req.params;

    // Convert index to a number and check if it's within the array bounds
    const idx = parseInt(index);
    if (idx >= 0 && idx < collectibles.length) {
        const item = collectibles[idx];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    } else {
        res.send("This item is not yet in stock. Check back soon!");
    }
});


// Part 4

// Define the shoes array
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Setup the route
app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    const { minPrice, maxPrice, type } = req.query;

    // Filter by minimum price
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseInt(minPrice));
    }

    // Filter by maximum price
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseInt(maxPrice));
    }

    // Filter by type
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    // Send the response
    res.json(filteredShoes);
});



// Set the application to listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
