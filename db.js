const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('bibliotheque_amazon');
        const collection = db.collection('emprunts');

        const marque = await collection.createIndex({ marque: 1});
        const prix = await collection.createIndex({ prix: 1});

        const request = await collection.find( {
            marque: {
                $lt : "MarqueC",
            }
        }).explain();

    } catch (error) {
        console.error('Erreur :', error);
    } finally {
        await client.close();
    }
}

run();