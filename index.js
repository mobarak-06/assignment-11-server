const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// assignment-11
// piDFjbG60mGvpC1w



const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dyqxkty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const blogsCollection = client.db('worldAdventure').collection('blogs');
    const commentsCollection = client.db('worldAdventure').collection('comments');

    app.get('/blogs', async(req,res) => {
        const result = await blogsCollection.find().toArray();
        res.send(result);
    })

    app.get('/blogs/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id)};
        const result = await blogsCollection.findOne(query);
        res.send(result);
    })

    app.get('/addComments/:id', async(req, res) => {
        const id = req.params.id;
        const query = { id: id};
        const result = await commentsCollection.find(query).toArray();
        res.send(result);
    })

    app.post('/addComments', async(req, res) => {
        const comments = req.body;
        const result = await commentsCollection.insertOne(comments);
        res.send(result);
    })

    app.post('/addBlogs', async(req, res) => {
        const blog = req.body;
        const result = await blogsCollection.insertOne(blog);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`the server ias running on  port ${port}`);
})