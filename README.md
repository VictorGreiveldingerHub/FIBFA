# FIBFA - Fédération Internationnale de Baby-Foot Association

FIBFA (Fédération Internationale de Baby-Foot Association) est une application pour gérer les tournois de baby-foot, créer des équipes, suivre les matchs et consulter les classements.

## Analyse du besoin

**Outils** => [Mocodo](https://www.mocodo.net/)

[Analyse du besoin](/Doc/analyse_du_besoin.md)

## User stories

[User stories](/Doc/user_stories.md)

Plus d'informations dans la [doc](/Doc/).

# Installation Avec Docker

- **Docker** & **Docker Compose**  
  Télécharger : [https://www.docker.com/get-started](https://www.docker.com/get-started)

## Cloner le dépôt et créer les variables d'environnements

```bash
git clone git@github.com:VictorGreiveldingerHub/FIBFA.git

cp .env.example .env
```

## Remplir les varaibales d'envrironnement selon le fichier d'example

## Lancer le projet avec Docker

Construire et lancer les containers

À la racine du projet :

```bash
docker-compose up --build -d
```

## Vérifier que tout fonctionne

```bash
docker-compose logs -f db      # logs de la base
docker-compose logs -f app     # logs du serveur backend
```

La base PostgreSQL sera initialisée automatiquement avec les fichiers SQL dans ./data.

Si vous voulez vérifier que la DB fonctionne :

```bash
docker exec -it fibfa_db psql -U $DB_USER -d $DB_NAME


//

docker exec -it fibfa_db psql -U fibfa -d fibfa (par exemple)
```

## Installer et lancer le frontend

Le frontend se lance en local (hors Docker).

Assurez-vous d’avoir les éléments suivants installés :

### Node.js ≥ 24

Téléchargement : [https://nodejs.org/](https://nodejs.org/)

Vérifier l’installation :

```bash
node -v
```

```bash
cd frontend

npm install

npm run dev
```

## Installation sans docker

## 1. Prérequis

Assurez-vous d’avoir les éléments suivants installés :

### Node.js ≥ 24

Téléchargement : [https://nodejs.org/](https://nodejs.org/)

Vérifier l’installation :

```bash
node -v
```

### npm ≥ 11

Installé automatiquement avec Node.js.

Vérifier l’installation :

```bash
npm -v
```

### PostgreSQL ≥ 16

Téléchargement : https://www.postgresql.org/download/

Vérifier l’installation :

```bash
psql --version
```

## Installer les dépendances du backend

```bash
npm install
```

## Installer les dépendances du frontend

```bash
cd frontend
npm install
```

## Mise en place BDD

### Se connecter au système en tant que postgres

```bash
sudo -i -u postgres
```

### Se connecter au serveur en tant que postgres

```bash
psql
```

### Créer un nouvel utilisateur

```bash
CREATE USER login WITH PASSWORD 'motdepasse' LOGIN;
```

### Créer une nouvelle base, en déclarant son propriétaire

```bash
CREATE DATABASE nomDeLaBase OWNER nomDuUser;
```

### Se connecter à la base de données nouvellement créée, avec l'utilisateur nouvellement créé

```bash
psql -U nomDeLutilisateur -d nomDeLaBase
```

Note: par défaut, si on ne met pas -d nomDeLaBase, on se connecte automatiquement à la base de données qui porte le même nom que l'utilisateur.

### Executer les instructions SQL contenues dans un fichier

On aura souvent, dans les projets, un fichier SQL destiné à mettre en place la première version de la base de données. Ces fichiers ne contiennent pas la donnée directement, mais bien les instructions pour créer les tables et y injecter les données.

```bash
psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql

```

## Accès à l'application

- Backend : http://localhost:54520
- Frontend : http://localhost:5173 (ou le port affiché par Vite)
