require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// const stripe = require("stripe")(process.env.Payment_SECRET);

/* All require statements must in top portion to access desired components / functions */

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
// console.log('Secret: ', process.env.Payment_SECRET);

const app = express();


app.use(cors({
    origin: [ "http://localhost:5173", "https://task-management-system-mnh.web.app" ],
    credentials: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

console.log(process.env.DB_NAME);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db(process.env.DB_NAME);
        const taskCollection = db.collection('tasks');

        app.get('/api/v1/to-do-list', async (_req, res) => {
            try {
                const query = { status: 'to-do' };
                const result = await taskCollection.find(query).toArray();

                // console.log('to do list: ',result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.get('/api/v1/running-tasks', async (_req, res) => {
            try {
                const query = { status: 'ongoing' };
                const result = await taskCollection.find(query).toArray();

                console.log('running: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.get('/api/v1/completed-tasks', async (_req, res) => {
            try {
                const query = { status: 'completed' };
                const result = await taskCollection.find(query).toArray();

                console.log('Completed: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.get('/api/v1/task/:id', async (req, res) => {
            try {
                const id = req.params
                const query = { _id: new ObjectId(id) };
                const result = await taskCollection.findOne(query);

                console.log('Get Task: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.delete('/api/v1/remove-task/:id', async (req, res) => {
            try {
                const id = req.params
                const query = { _id: new ObjectId(id) };
                const result = await taskCollection.deleteOne(query);

                console.log('Deleted: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.put('/api/v1/update-task/:id', async (req, res) => {
            try {
                const id = req.params
                const task = req.body
                const query = { _id: new ObjectId(id) };
                const result = await taskCollection.updateOne(query, task, { upsert: true });

                console.log('Updated: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

        app.post('/api/v1/add-task', async (req, res) => {

            try {
                const task = req.body
                // console.log(task);

                const result = await taskCollection.insertOne(task);

                console.log('Added: ', result);

                res.send(result)
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        })

    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);





app.get('/', (_req, res) => {
    res.send('Task Management System taskWavelet is running');
})

app.listen(port, () => {
    console.log(`taskWavelet server is running on ${port}`);
})