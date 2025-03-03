const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://bardinclement97:q2V9JNwYtQApgSqN@cluster0.crzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Remplacez
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("bibliotheque_amazon");
        const userCollection = db.collection("utilisateurs");
        const bookCollection = db.collection("livres");

        const updateBook = await bookCollection.updateOne(
                { isbn : "9782070612758"},
                { $set : { titre: "The little prince" } }
        );

        console.log(updateBook);

        const insertStock = await bookCollection.updateMany(
                {},
                { $set : { stock: 5}}
        )

        const livreIndispo = await bookCollection.updateOne(
            { isbn: "9782070612758"},
            { $set : { disponible : false}}
        )

        const nouvelEmprunt = {
                titre : "Game of Thrones",
                date_emprunt: new Date("2023-02-15"),
                date_retour_prevue: new Date("2023-03-15")
        }

        const empruntSup = await userCollection.updateOne(
                { email: "marie.dupont@example.com"},
                { $push : { livres_empruntes : nouvelEmprunt}}
        )

        const changementAdress = await userCollection.updateOne(
                { email: "marie.dupont@example.com"},
                { $set : { adresse : "12 rue de la paix"}}
        )

        const newTag = await userCollection.updateOne(
                { email: "marie.dupont@example.com"},
                { $push : { tags : "Fantasy"}}
        )

        const note = await bookCollection.updateOne(
                { isbn: "9782070612758"},
                { $set : { note : 5} },
        )

    // Partie 4
        const supTitre = await bookCollection.deleteOne(
            {
                titre: "The little prince"
            }
        ).toArray();

        const supLivreAuteur = await bookCollection.deleteMany(
            {
                auteur: "J.K. Rowling"
            }
        ).toArray();

        const supUserByMail = await userCollection.deleteOne(
            {
                email: "marie.dupont@example.com"
            }
        ).toArray();

        // Partie 5
        const livreDecroissant = await bookCollection.find().sort({
            note_moyenne : -1
        }).toArray();

        const livreAncien = await bookCollection.find().sort({
            annee_publication: 1
        }).limit(3).toArray();

        const livreParAuteur = await bookCollection.aggregate([
            {
                $group: { _id: "$auteur", nombre_livres: { $sum: 1 } } },
                { $sort: { nombre_lives: -1}}
        ]).toArray();
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close();
    }
}

run();