const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('bibliotheque_amazon');
        const collection = db.collection('emprunts');

        db.produits.aggregate([
            {
              $group: {
                _id: "$marque",
                productCount: { $sum: 1 }
              }
            },
            { $sort: { productCount: -1 } },
            { $limit: 3 }
          ]).toArray();

    } catch (error) {
        console.error('Erreur :', error);
    } finally {
        await client.close();
    }
}

run();