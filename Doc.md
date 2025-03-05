1. Méthodes
- insertOne : insère un document 
- insertMany : insère plusieurs documents (a englober en tableau)
- updateOne : met à jour un document
- updateMany : ...
- findOne : récupère un seul document


2. Variables : 
- $inc : incrémente une valeur : { $inc: { $age: 1} }
- $push : ajoute un élément à un tableau
- $pull : supprime un élément ...
- $regex: expression régulières : { nom : { $regex: "^D" } } : renvoie tous les noms commençant par D
- $and, $or, $nor, $not : .find({ $and : [ ville: "Paris", age: { $gt : 17 } ]} )
- $explain : renvoie un document json détaillé : exemple: explain("executionStats)
- $geoWithin, $geoIntersects, $nearSphere : opérateurs géospatiaux
db.etudiants.find({
    localisation:
        $nearSphere:
            $geometry: {type: "Point", coordinates: [2.35, 48.86]}
            $maxDistance: 5000
    }
)
renvoie les étudiants situés à moins de 5km du point spécifié