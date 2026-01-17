## Liste des tables

- user
- tournament
- match
- team

### user

| Nom        | Type        | null ?   | default           | commentaire                                     |
| ---------- | ----------- | -------- | ----------------- | ----------------------------------------------- |
| id         | SERIAL      | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK          |
| pseudo     | VARCHAR(50) | NOT NULL | -                 | UNIQUE                                          |
| email      | VARCHAR(50) | NOT NULL | -                 | UNIQUE                                          |
| password   | VARCHAR(50) | NOT NULL | -                 |                                                 |
| status     | VARCHAR(5)  | NOT NULL | "USER"            | autre valeur - "ADMIN"                          |
| team_id    | INT         | NOT NULL | -                 | relation 1-N : REFERENCES "team"("id")          |
| created_at | TIMESTAMP   | NOT NULL | CURRENT_TIMESTAMP |                                                 |
| updated_at | TIMESTAMP   | NULL     | -                 | pour l'instant ca existe, meme si pas d'utilité |

### tournament

| Nom         | Type         | null ?   | default                 | commentaire                                 |
| ----------- | ------------ | -------- | ----------------------- | ------------------------------------------- |
| id          | SERIAL       | NOT NULL | -                       | SERIAL not null et gère sa valeur - PK      |
| name        | VARCHAR(255) | NOT NULL | -                       | UNIQUE                                      |
| date        | DATE         | NOT NULL | DATE.now()              | SELECT now();                               |
| description | VARCHAR(50)  | NOT NULL | "Tournois de Baby-Foot" |                                             |
| status      | VARCHAR(11)  | NOT NULL | "PENDING"               | autres valeurs - "IN_PROGRESS" - "FINISHED" |
| user_id     | INT          | NOT NULL | -                       | relation 1-N : REFERENCES "user"("id")      |
| created_at  | TIMESTAMP    | NOT NULL | CURRENT_TIMESTAMP       |                                             |
| updated_at  | TIMESTAMP    | NULL     | -                       |                                             |

### match

| Nom          | Type        | null ?   | default           | commentaire                                       |
| ------------ | ----------- | -------- | ----------------- | ------------------------------------------------- |
| id           | SERIAL      | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK            |
| score_team_1 | INT         | NOT NULL | 0                 | on pourra calculer le classement via cette donnée |
| score_team_1 | INT         | NOT NULL | 0                 | on pourra calculer le classement via cette donnée |
| status       | VARCHAR(50) | NOT NULL | "PENDING"         | autres valeurs "IN_PROGRESS" - "FINISHED"         |
| created_at   | TIMESTAMP   | NOT NULL | CURRENT_TIMESTAMP |                                                   |
| updated_at   | TIMESTAMP   | NULL     | -                 |                                                   |

### team

| Nom           | Type        | null ?   | default           | commentaire                                  |
| ------------- | ----------- | -------- | ----------------- | -------------------------------------------- |
| id            | SERIAL      | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK       |
| name          | VARCHAR(50) | NOT NULL | -                 |                                              |
| player_1      | VARCHAR(50) | NOT NULL | -                 |                                              |
| player_2      | VARCHAR(50) | NOT NULL | -                 |                                              |
| tournament_id | INT         | NOT NULL | -                 | relation 1-N : REFERENCES "tournament"("id") |
| created_at    | TIMESTAMP   | NOT NULL | CURRENT_TIMESTAMP |                                              |
| updated_at    | TIMESTAMP   | NULL     | -                 |                                              |

## Liste des tables de liaison

team <-> match

### team_play_match

| Nom      | Type | commentaire              |
| -------- | ---- | ------------------------ |
| team1_id | INT  | REFERENCES "team"("id")  |
| team2_id | INT  | REFERENCES "team"("id")  |
| match_id | INT  | REFERENCES "match"("id") |
