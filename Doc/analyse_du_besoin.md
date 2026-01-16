## Description du projet

Créer une application web permettant aux utilisateurs de créer et gérer des tournois de baby-foot. Les utilisateurs peuvent s'inscrire à des tournois, voir les matchs programmés, et suivre les résultats.

### 1. Création de Tournois :

- Les administrateurs peuvent créer de nouveaux tournois avec un nom, une date, et une description.

### 2. Inscription aux Tournois :

- Les administrateurs peuvent ajouter et voir les équipes aux tournois

### 3. Gestion des Matchs :

- Ajouter un bouton permettant de générer une planification automatique des matchs afin que toutes les équipes se rencontrent une fois.

### 4. Suivi des Résultats :

- Pouvoir définir le score de chaque match
- Afficher un classement

### 5. Interface Utilisateur :

- Utiliser Vue3 et/ou Nuxt pour créer une interface utilisateur réactive et intuitive.

### 6. Backend :

- Utiliser Node.js pour créer une API RESTful.
- Mettre en place une base de données

### 7. ⭐ Bonus :

- Ajouter des tests unitaires/e2e.
- Utiliser Docker

## Ce qu'il faut

Une application web en Vue3.
Une application qui permet aux utilisateurs de créer, gérer des tournois de baby-foot.
Des utilisateurs qui peuvent :

- s'inscrire à des tournois
- voir les matchs
- suivre les résultats

Des administrateurs qui peuvent :

- créer de nouveaux tournois, avec un nom, une date et une description
- ajouter des équipes aux tournois
- voir des équipes aux tournois
- définir le score de chaque match

Afficher un classement

## Les entités

- user
- tournament
- match
- team

## Les relations

user <-> tournament : CREER
user <-> team : CONSTITUER
team <-> tournament : PARTICIPER
match <-> team : OPPOSER

## Mocodo : [MCD](./FIBFA.svg)

```
tournament: id, name, date, description, status, created_by, isGenerated
CREER, 0N tournament, 11 user
user: id, username, email, password, role

PARTICIPER, 01 tournament, 0N team
team: id, name, player1_name, player2_name, created_by
CONSTITUER, 01 team, 1N [N <= 2] user


OPPOSER, 0N match, 22 team
match: id, score_team_1, score_team_2, status, match_number

```
