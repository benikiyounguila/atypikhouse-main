-- Création de la base de données
CREATE DATABASE IF NOT EXISTS atypikhouse;
USE atypikhouse;

-- Création de la table Utilisateurs
CREATE TABLE IF NOT EXISTS Utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    est_admin BOOLEAN DEFAULT FALSE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Hebergements
CREATE TABLE IF NOT EXISTS Hebergements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proprietaire_id INT,
    titre VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    adresse TEXT NOT NULL,
    description TEXT,
    capacite INT NOT NULL,
    prix_nuit DECIMAL(10, 2) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proprietaire_id) REFERENCES Utilisateurs(id)
);

-- Création de la table Photos
CREATE TABLE IF NOT EXISTS Photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hebergement_id INT,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (hebergement_id) REFERENCES Hebergements(id)
);

-- Création de la table Equipements
CREATE TABLE IF NOT EXISTS Equipements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table de liaison Hebergements_Equipements
CREATE TABLE IF NOT EXISTS Hebergements_Equipements (
    hebergement_id INT,
    equipement_id INT,
    PRIMARY KEY (hebergement_id, equipement_id),
    FOREIGN KEY (hebergement_id) REFERENCES Hebergements(id),
    FOREIGN KEY (equipement_id) REFERENCES Equipements(id)
);

-- Création de la table Reservations
CREATE TABLE IF NOT EXISTS Reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hebergement_id INT,
    utilisateur_id INT,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    prix_total DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(20) DEFAULT 'en attente',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hebergement_id) REFERENCES Hebergements(id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateurs(id)
);

-- Création de la table Avis
CREATE TABLE IF NOT EXISTS Avis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hebergement_id INT,
    utilisateur_id INT,
    note INT NOT NULL,
    commentaire TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hebergement_id) REFERENCES Hebergements(id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateurs(id)
);
