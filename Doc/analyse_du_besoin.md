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

## Mocodo : [MLD](./FIBFA.svg)

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
