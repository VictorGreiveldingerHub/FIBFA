## Définition des routes selon l'architecture REST

| But                              | url                   | méthode HTTP |
| -------------------------------- | --------------------- | ------------ |
| Récupérer tous les matchs        | /match                | GET          |
| Récupérer les résultats          | /match/result         | GET          |
| Récupérer les équipes            | /team                 | GET          |
| Créer une team                   | /team                 | POST         |
| Créer un tournois                | /tournament           | POST         |
| Créer un utilisateur             | /user                 | POST         |
| Connecter un utilisateur         | /login                | POST         |
| Ajouter des équipes aux tournois | /tournaments/:id/team | POST         |
| Modifier les scores              | /match/:id/score      | PATCH        |
| Supprimer une team               | /team/:id             | DELETE       |
| Supprimer un tournois            | /tournament/:id       | DELETE       |
| Supprimer un utilisateur         | /user/:id             | DELETE       |
