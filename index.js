const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbd0s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    await client.connect()
    const laptopCollection = client.db("inventory").collection("laptops");
    try {
        app.get('/laptops', async (req, res) => {
            const query = {}
            const cursor = laptopCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/laptops/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = await laptopCollection.findOne(query)
            res.send(cursor)
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server site is running')
})

app.listen(port, () => {
    console.log("server is ok.Port is:", port)
})