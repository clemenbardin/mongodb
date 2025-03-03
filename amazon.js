const { MongoClient } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Remplacez
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("bibliotheque_amazon");
        const userCollection = db.collection("utilisateurs");
        const bookCollection = db.collection("livres");

        const livresDisponibles = await bookCollection.find(
        { 
            disponible: true,
        }
        ).toArray();
        console.log("Livres disponibles :", livresDisponibles);

        const livresApres2000 = await bookCollection.find(
            {
                annee_publication: {
                    $gt: 2000, 
                }
            }
        ).toArray();

        console.log("Livres après 2000 :", livresApres2000);

        const livresAuteur = await bookCollection.find(
            {
                "auteur": "Victor Hugo" 
            }
            ).toArray()

        console.log("Livres de Victor Hugo :", livresAuteur);

        const noteMoyenne = await bookCollection.find(
            {
                'note_moyenne': {
                    $gte: 4,
                }
            }
        ).toArray();

        console.log("Livres avec une note moyenne supérieure à 4 :", noteMoyenne);

        const specificTownUser = await userCollection.find(
            {
                'adresse.ville': 'Lyon',
            }
        ).toArray();

        console.log("Utilisateurs habitant à Lyon :", specificTownUser);

        const specificBooks = await bookCollection.find(
            {
                'prix': {
                    $lt: 15,
                },
                'moyenne': {
                    $gt: 4,
                }
            }
        )
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close();
    }
}

run();