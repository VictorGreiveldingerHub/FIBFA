-- Création du fichier SQL pour l'API : FIBFA

-- ========================
-- Début transaction TABLES
-- ========================
BEGIN;

-- ==================================
-- DROP les tables avant de commencer
-- ==================================

DROP TABLE IF EXISTS "team_tournament" CASCADE;
DROP TABLE IF EXISTS "match_team" CASCADE;
DROP TABLE IF EXISTS "match" CASCADE;
DROP TABLE IF EXISTS "tournament" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "team" CASCADE;

-- ===================
-- Création des tables
-- ===================

CREATE TABLE "team"(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL UNIQUE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "user"(
  "id" SERIAL PRIMARY KEY,
  "pseudo" VARCHAR(50) NOT NULL UNIQUE,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'USER',
  "is_verified" BOOLEAN NOT NULL DEFAULT FALSE,
  "team_id" INT REFERENCES "team"("id") ON DELETE SET NULL, -- team supprimée => null
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "tournament"(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL UNIQUE,
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "description" TEXT NOT NULL DEFAULT 'Tournois de Baby-Foot',
  "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  "creator_id" INT NOT NULL  REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "match"(
  "id" SERIAL PRIMARY KEY,
  "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  "tournament_id" INT NOT NULL REFERENCES "tournament"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);


CREATE TABLE "match_team"(
  "match_id" INT NOT NULL REFERENCES "match"("id") ON DELETE CASCADE,
  "team_id" INT NOT NULL REFERENCES "team"("id") ON DELETE CASCADE,
  "team_position" INT NOT NULL CHECK ("team_position" IN (0, 1)),
  "score" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("match_id", "team_id"),
  UNIQUE ("match_id", "team_position")
);

CREATE TABLE "team_tournament"(
  "team_id" INT NOT NULL REFERENCES "team"("id") ON DELETE CASCADE,
  "tournament_id" INT NOT NULL REFERENCES "tournament"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("team_id", "tournament_id")
);

-- ========================
-- Fin transaction TABLES
-- ========================

COMMIT;


-- ==========================
-- Début transactions SEEDING
-- ==========================

BEGIN;

-- ================
-- TEAM
-- ================

UPDATE "user"
SET status = 'ADMIN'
WHERE email = 'clementine@laxou.fr';

INSERT INTO "team"("name") 
VALUES
  ('BB FC Barcelone'),
  ('BB Real Madrid'),
  ('BB Bayern Munich'),
  ('BB PSG'),
  ('BB Manchester City'),
  ('BB Manchester United'),
  ('BB Arsenal'),
  ('BB Roma');

-- ================
--      USER
-- ================

INSERT INTO "user"("pseudo", "email", "password", "status", "is_verified", "team_id") 
VALUES
  ('Super_Clementine', 'clementine@laxou.fr', 'admin', 'ADMIN', true, null),
  ('Messi', 'messi@barcelone.com', 'messi', 'USER', true, 1),
  ('Iniesta', 'iniesta@barcelone.com', 'iniesta', 'USER', true, 1),
  ('Ronaldo', 'ronaldo@realmadrid.com', 'ronaldo', 'USER', true, 2),
  ('Ramos', 'ramos@realmadrid.com', 'ramos', 'USER', true, 2),
  ('Neuer', 'neuer@bayern.com', 'neuer', 'USER', true, 3),
  ('Muller', 'muller@bayern.com', 'muller', 'USER', true, 3),
  ('Mbappe', 'mbappe@psg.com', 'mbappe', 'USER', true, 4),
  ('Dembele', 'dembele@psg.com', 'dembele', 'USER', true, 4),
  ('Haaland', 'haaland@manchesterCity.com', 'haaland', 'USER', true, 5),
  ('Doku', 'doku@manchesterCity.com', 'doku', 'USER', true, 5),
  ('Hernandez', 'hernandez@manchesterUnited.com', 'hernandez', 'USER', true, 6),
  ('Onana', 'onana@manchesterUnited.com', 'onana', 'USER', true, 6),
  ('Saka', 'saka@arsenal.com', 'saka', 'USER', true, 7),
  ('Rice', 'rice@arsenal.com', 'rice', 'USER', true, 7),
  ('Totti', 'totti@roma.com', 'totti', 'USER', true, 8),
  ('Dybala', 'dybala@roma.com', 'dybala', 'USER', true, 8);

-- ================
--    TOURNAMENT
-- ================

INSERT INTO "tournament"("name", "description", "creator_id")
VALUES 
  ('Champions League', 'Tournois prestigieux entre les meilleures équipes européenne', 1),
  ('Liga', 'Tournois espagnol', 1),
  ('Premiere League', 'Tournois britannique', 1);


-- ================
-- TEAM_TOURNAMENT
-- ================

INSERT INTO "team_tournament" ("team_id", "tournament_id", "created_at") 
VALUES
  (1, 1, '2025-01-10 09:00:00'), 
  (2, 1, '2025-01-10 09:15:00'), 
  (3, 1, '2025-01-10 09:30:00'), 
  (4, 1, '2025-01-10 09:45:00'), 
  (5, 1, '2025-01-10 10:00:00'),
  (6, 1, '2025-01-10 10:15:00'),
  (7, 1, '2025-01-10 10:30:00'),
  (8, 1, '2025-01-10 10:45:00'); 

INSERT INTO "team_tournament" ("team_id", "tournament_id", "created_at")
VALUES
  (1, 2, '2025-01-11 09:00:00'),
  (2, 2, '2025-01-11 09:15:00');

INSERT INTO "team_tournament" ("team_id", "tournament_id", "created_at") 
VALUES
  (5, 3, '2025-01-12 09:00:00'),
  (6, 3, '2025-01-12 09:15:00'), 
  (7, 3, '2025-01-12 09:30:00'); 

-- ========================
-- Fin transactions SEEDING
-- ========================

COMMIT;