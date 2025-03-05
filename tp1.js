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
        const bibliotheques = db.collection('bibliotheques');

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

        // const indexIsbn = await livre.createIndex({ isbn: 1, unique: true });

        // livre.createIndex({ titre: 1 }, { partialFilterExpression: { disponible: true } });

        // // Niveau de profiling a 2, exécutions toutes les 100ms
        // db.setProfilingLevel(2, 100);

        // db.system.profile.find({ milis: { $gt: 1000 } }).pretty();

        // // Suppresion d'index
        // const livreIndex = db.livre.getIndexes();

        // db.livre.dropIndex("indexIsbn");

        const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"];
        const nom_bibliotheque = ["ABC", "Tita", "Titou", "Tito", "La bibliothèque de Tita", "Titan", "Tittitii"]
        const rues = ["Rue de la Paix", "Avenue des Champs-Élysées", "Boulevard Saint-Germain", "Rue du Faubourg Saint-Antoine", "Rue de Rivoli"];
        // const pointer = await user.updateMany(
        //     {},
        //     { $set: {
        //         adresse: {
        //             rue: { $sample: rues},
        //             ville: { $sample: villes},
        //             code_postal: `${Math.floor(Math.random() * 90000) + 10000}`,
        //             localisation: {
        //                 type: "Point",
        //                 coordinates: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180 ]
        //             }
        //         }
        //     }
        // }
        // )

        const insert = await bibliotheques.insertMany([
            {
                nom: nom_bibliotheque[Math.floor(Math.random() * nom_bibliotheque.length)],
                adresse: rues[Math.floor(Math.random() * rues.length)],
                ville: villes[Math.floor(Math.random() * villes.length)],
                localisation: {
                    type: "Point",
                    coordinates: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180]
                },
                zone_de_service: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180],
                            [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180],
                            [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180],
                            [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180],
                            [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 180]
                        ]
                    ]
                }
            }
        ]);

        const geoUser = user.createIndex({ localisation: "2dsphere" })
        const geoBibliotheque = bibliotheques.createIndex({ localisation: "2dsphere" })

        const centreParis = [2.3522, 48.8566];

        db.utilisateurs.find({
            localisation: {
                $geoWithin: {
                    $geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [2.33, 48.86],
                                [2.34, 48.86],
                                [2.34, 48.87],
                                [2.33, 48.87],
                                [2.33, 48.86],
                            ],
                        ],
                    },
                },
            },
        });

        const bibliotheque = db.bibliotheques.findOne({ nom: "Bibliothèque Nationale" }); // Remplacez par le nom de votre bibliothèque
        db.utilisateurs.find({
            localisation: {
                $geoWithin: {
                    $geometry: bibliotheque.zone_service,
                },
            },
        });

    } catch (error) {
        console.error("Erreur :", error);
    }
}

run();