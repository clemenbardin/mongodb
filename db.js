const { MongoClient } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('ecommerce'); // Remplacer
        const collection = db.collection('ecommerce_produits');

        // const result = await collection.insertOne({ test: 'testDocument' });
        // console.log('Document inséré :', result.insertedId);

        const result = await collection.deleteOne({ test: 'testDocument' });
    } catch (error) {
        console.error('Erreur :', error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);