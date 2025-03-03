const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection("ecommerce_produits");

        //     const result = await collection.updateMany(
        //         {},
        //         { $mul: { prix: 1.1}},
        //  );
        if (result.acknowledged === true) {
            console.log("Succès : ")
        }
    } catch (error) {
        console.log("Echec : ", error)
    } finally {
        await client.close();
    }
}

run().catch(console.dir);