const axios = require('axios');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:Brawl123_@cluster0.8fom6sh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function fetchDataAndStoreInDB() {
    try {
        // Fetch data from NBA API
        // Code for fetching data from the NBA API
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/players', {
            params: {
                team: '1', // Example team ID
                season: '2023', // Example season
            },
            headers: {
                'X-RapidAPI-Key': '365e5f0952msh73fc543d504ba5bp1d375bjsn4debf6b56df9',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            },
        });
        const players = response.data.data;
        // Connect to MongoDB Atlas cluster
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // Specify the database and collection
        const database = client.db('nba-stats');
        const collection = database.collection('players');

        // Insert players data into MongoDB
        await collection.insertMany(players);
        console.log('Data inserted successfully into MongoDB.');

        // Close MongoDB connection
        await client.close();
        console.log(players);
    } catch (error) {
        console.error('Error:', error);
    }
}
