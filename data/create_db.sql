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
  "name" VARCHAR(255) NOT NULL,
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
  "team_position" INT NOT NULL CHECK ("team_position" IN (1, 2)),
  "score" INT NOT NULL DEFAULT 0,
  PRIMARY KEY ("match_id", "team_id"),
  UNIQUE ("match_id", "team_position")
);

CREATE TABLE "team_tournament"(
  "team_id" INT NOT NULL REFERENCES "team"("id") ON DELETE CASCADE,
  "tournament_id" INT NOT NULL REFERENCES "tournament"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- ====
-- TEAM
-- ====

-- ====
-- USER
-- ====

-- ==========
-- TOURNAMENT
-- ==========

-- ========================
-- Fin transactions SEEDING
-- ========================

COMMIT;