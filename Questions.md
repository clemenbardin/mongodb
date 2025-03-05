Livrables TP1:
1.
Pièce jointe

2.
- L'ajout d'indexation sur des éléments des collections contenant mes données a considérablement réduis le temps de recherche en modifiant le type de recherche de COLSCAN a FETCH. MongoDB s'attarde uniquement sur l'index a exploiter et ne scanne pas l'intégralité des données. L'utilisation d'index est donc fortement recommandé dans un cadre de production et peut être également utile en local. 

- J'ai utiliser majoritairement des index uniques pour comprendre le fonctionnement de ce nouvel outil avant d'utiliser des index composite par exemple, mais ces derniers sont aussi performants. L'utilisation des index unique a également permis d'éviter une double insertion sur la donnée indexée avec l'ISBN. Un autre type d'index manipulé est l'index TTL qui permettait de garantir une supression automatique d'une session inactive après un délai spécifié.

- L'ajout d'index a amélioré les performances de lecture mais a ralenti les opérations d'écritures. Chaque index doit être mis à jour lors de ces opérations, ce qui entrâine une surcharge. Il est donc essentiel de trouver un équilibre permettant de mener à bien des opérations de lecture et d'écriture.

- Pour une application de bibliothèque en production, je recommanderais les index suivants :

1. Index sur les champs fréquemment utilisés dans les requêtes de recherche (titre, auteur, genre, ISBN).
2. Index composites pour les requêtes qui combinent plusieurs critères de recherche (par exemple, genre et langue).
3. Index uniques sur les champs qui doivent être uniques (ISBN).
4. Index partiels pour les requêtes qui ne ciblent qu'un sous-ensemble de documents (livres disponibles).
5. Index TTL pour les sessions utilisateur.