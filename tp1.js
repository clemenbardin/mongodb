const { MongoClient, ObjectId, UUID } = require('mongodb');

async function run() {
    try {
        const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const client = new MongoClient(uri);

        await client.connect();
        const db = client.db('bibliotheque_amazon');
        const session = db.collection('sessions_utilisateurs');
        const livre = db.collection('livres');
        const user = db.collection('utilisateurs');

        // const textIndex = await collection.createIndex({ titre: 1, description: 1})

        // const request = await collection.insertOne([
        //     {
        //         id: new ObjectId(),
        //         derniere_activite: new Date(),
        //         useCookie: false,
        //         achat: 0,
        //     }
        // ]);

        // const ttl = await collection.createIndex( { "derniere_activite": 1 }, { expireAfterSeconds: 60 } );

        // const openRequest =  collection.find({ genre: "Fantasy" }, { titre: 1, auteur: 1, _id: 0 }).explain("executionStats");
        
        // const isbn = await livre.updateMany(
        //     {},
        //     { $set : { isbn: new UUID() } },
        // )

        const indexIsbn = await livre.createIndex({ isbn: 1, unique: true });

        livre.createIndex({ titre: 1 }, { partialFilterExpression: { disponible: true } });

        // Niveau de profiling a 2, exécutions toutes les 100ms
        db.setProfilingLevel(2, 100);

        db.system.profile.find({ milis: { $gt: 1000 } }).pretty();

        // Suppresion d'index
        const livreIndex = db.livre.getIndexes();

        db.livre.dropIndex("indexIsbn");

    } catch (error) {
        console.error("Erreur :", error);
    }
}

run();