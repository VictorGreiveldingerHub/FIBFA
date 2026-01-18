## Liste des tables

- user
- tournament
- match
- team

### user

| Nom         | Type         | null ?   | default           | Commentaire                                     |
| ----------- | ------------ | -------- | ----------------- | ----------------------------------------------- |
| id          | SERIAL       | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK          |
| pseudo      | VARCHAR(50)  | NOT NULL | -                 | UNIQUE                                          |
| email       | VARCHAR(100) | NOT NULL | -                 | UNIQUE                                          |
| password    | VARCHAR(255) | NOT NULL | -                 | Pour les hash bcrypt                            |
| status      | VARCHAR(20)  | NOT NULL | "USER"            | autre valeur - "ADMIN"                          |
| is_verified | BOOLEAN      | NOT NULL | FALSE             |                                                 |
| team_id     | INT          |          |                   | REFERENCES "team"("id") ON DELETE SET NULL      |
| created_at  | TIMESTAMP    | NOT NULL | CURRENT_TIMESTAMP |                                                 |
| updated_at  | TIMESTAMP    | -        | -                 | pour l'instant ca existe, meme si pas d'utilité |

### tournament

| Nom         | Type         | null ?   | default                 | Commentaire                                 |
| ----------- | ------------ | -------- | ----------------------- | ------------------------------------------- |
| id          | SERIAL       | NOT NULL | -                       | SERIAL not null et gère sa valeur - PK      |
| name        | VARCHAR(255) | NOT NULL | -                       | UNIQUE                                      |
| date        | DATE         | NOT NULL | CURRENT_DATE            |                                             |
| description | TEXT         | NOT NULL | "Tournois de Baby-Foot" |                                             |
| status      | VARCHAR(20)  | NOT NULL | "PENDING"               | autres valeurs - "IN_PROGRESS" - "FINISHED" |
| creator_id  | INT          | NOT NULL |                         | REFERENCES "user"("id") ON DELETE CASCADE   |
| created_at  | TIMESTAMP    | NOT NULL | CURRENT_TIMESTAMP       |                                             |
| updated_at  | TIMESTAMP    | -        | -                       |                                             |

### match

| Nom           | Type        | null ?   | default           | Commentaire                                     |
| ------------- | ----------- | -------- | ----------------- | ----------------------------------------------- |
| id            | SERIAL      | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK          |
| status        | VARCHAR(20) | NOT NULL | "PENDING"         | autres valeurs "IN_PROGRESS" - "FINISHED"       |
| tournament_id | INT         | NOT NULL | -                 | REFERENCES "tournament"("id") ON DELETE CASCADE |
| created_at    | TIMESTAMP   | NOT NULL | CURRENT_TIMESTAMP |                                                 |
| updated_at    | TIMESTAMP   | -        | -                 |                                                 |

### team

| Nom        | Type         | null ?   | default           | Commentaire                            |
| ---------- | ------------ | -------- | ----------------- | -------------------------------------- |
| id         | SERIAL       | NOT NULL | -                 | SERIAL not null et gère sa valeur - PK |
| name       | VARCHAR(255) | NOT NULL | -                 |                                        |
| created_at | TIMESTAMP    | NOT NULL | CURRENT_TIMESTAMP |                                        |
| updated_at | TIMESTAMP    | -        | -                 |                                        |

## Liste des relation 1-N

user - tournament
team - user
tournament - match

## Liste des tables de liaison

match <-> team
team <-> tournament

### match_team

| Nom           | Type | Commentaire                                         |
| ------------- | ---- | --------------------------------------------------- |
| match_id      | INT  | NOT NULL REFERENCES "match"("id") ON DELETE CASCADE |
| team_id       | INT  | NOT NULL REFERENCES "team"("id") ON DELETE CASCADE  |
| team_position | INT  | CHECK ("team_position" IN (1, 2))                   |
| score         | INT  | DEFAULT 0                                           |

### team_tournament

| Nom           | Type      | Commentaire                                              |
| ------------- | --------- | -------------------------------------------------------- |
| team_id       | INT       | NOT NULL REFERENCES "team"("id") ON DELETE CASCADE       |
| tournament_id | INT       | NOT NULL REFERENCES "tournament"("id") ON DELETE CASCADE |
| created_at    | TIMESTAMP | NOT NULL CURRENT_TIMESTAMP                               |
