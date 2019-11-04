DROP DATABASE IF EXISTS `sportify`;
CREATE DATABASE `sportify` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sportify`;

-- TABLES --------------------------------------------------------------------------------------------------------------
CREATE TABLE `users` (
    `id_user` int PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `surname` varchar(255) NOT NULL,
    `verified` boolean NOT NULL,
    `avatar_url` varchar(512),
    `avatar_public_id` varchar(255)
);

CREATE TABLE `tokens` (
    `id_token` int PRIMARY KEY AUTO_INCREMENT,
    `id_user` int NOT NULL ,
    `hash` varchar(255) NOT NULL,
    `validity` datetime NOT NULL,
    `type` ENUM ('confirm', 'reset') NOT NULL
);

CREATE TABLE `teams` (
    `id_team` int PRIMARY KEY AUTO_INCREMENT,
    `id_sport` int NOT NULL,
    `name` varchar(255) UNIQUE NOT NULL,
    `id_leader` int NOT NULL,
    `type` ENUM ('profi', 'amatéři') NOT NULL,
    `id_contact_person` int NOT NULL
);

CREATE TABLE `competitions` (
    `id_competition` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `leader` int NOT NULL,
    `id_sport` int NOT NULL,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL
);

CREATE TABLE `competition_membership` (
    `id_competition_membership` int PRIMARY KEY AUTO_INCREMENT,
    `competition` int NOT NULL,
    `team` int NOT NULL,
    `status` ENUM ('pending', 'declined', 'active', 'inactive')
);

CREATE TABLE `matches` (
    `id_match` int PRIMARY KEY AUTO_INCREMENT,
    `competition` int,
    `host` int NOT NULL,
    `guest` int NOT NULL,
    `date` datetime NOT NULL
);

CREATE TABLE `team_membership` (
    `id_team_membership` int PRIMARY KEY AUTO_INCREMENT,
    `team` int NOT NULL,
    `user` int NOT NULL,
    `status` ENUM ('pending', 'declined', 'active', 'inactive') NOT NULL,
    `position` ENUM ('goalkeeper', 'defender', 'attacker')
);

CREATE TABLE `sports` (
    `id_sport` int PRIMARY KEY AUTO_INCREMENT,
    `sport` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `events` (
    `id_event` int PRIMARY KEY AUTO_INCREMENT,
    `match` int NOT NULL,
    `team` int NOT NULL,
    `user` int,
    `type` ENUM ('shot', 'goal', 'assistance1', 'assistance2', 'suspension'),
    `minute` int,
    `value` tinyint NOT NULL
);

CREATE TABLE `matchup` (
    `id_matchup` int PRIMARY KEY AUTO_INCREMENT,
    `match` int NOT NULL,
    `goalkeeper` boolean NOT NULL,
    `team` int NOT NULL,
    `user` int NOT NULL,
    `host` boolean NOT NULL,
    `profi` boolean NOT NULL
);
-- KEYS ----------------------------------------------------------------------------------------------------------------
ALTER TABLE `teams` ADD FOREIGN KEY (`id_sport`) REFERENCES `sports` (`id_sport`);
ALTER TABLE `teams` ADD FOREIGN KEY (`id_leader`) REFERENCES `users` (`id_user`);
ALTER TABLE `teams` ADD FOREIGN KEY (`id_contact_person`) REFERENCES `users` (`id_user`);

ALTER TABLE `tokens` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE `competitions` ADD FOREIGN KEY (`leader`) REFERENCES `users` (`id_user`);
ALTER TABLE `competitions` ADD FOREIGN KEY (`id_sport`) REFERENCES `sports` (`id_sport`);

ALTER TABLE `competition_membership` ADD FOREIGN KEY (`competition`) REFERENCES `competitions` (`id_competition`);
ALTER TABLE `competition_membership` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

ALTER TABLE `matches` ADD FOREIGN KEY (`competition`) REFERENCES `competitions` (`id_competition`);
ALTER TABLE `matches` ADD FOREIGN KEY (`host`) REFERENCES `teams` (`id_team`);
ALTER TABLE `matches` ADD FOREIGN KEY (`guest`) REFERENCES `teams` (`id_team`);

ALTER TABLE `team_membership` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `team_membership` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id_user`);

ALTER TABLE `events` ADD FOREIGN KEY (`match`) REFERENCES `matches` (`id_match`);
ALTER TABLE `events` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `events` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id_user`);

ALTER TABLE `matchup` ADD FOREIGN KEY (`match`) REFERENCES `matches` (`id_match`);
ALTER TABLE `matchup` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `matchup` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id_user`);

-- Data ----------------------------------------------------------------------------------------------------------------
-- Password is hashed using bcrypt "Heslo123", 10 rounds

-- USERS
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (1,  'user1@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Dvořák', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (2,  'user2@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Evžen', 'Vomáčka', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (3,  'user3@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Michal', 'Nový', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (4,  'user4@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Zdeněk', 'Svěrák', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (5,  'user5@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jaroslav', 'Blažek', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (6,  'user6@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Emanuel', 'Motýlek', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (7,  'user7@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Vopustka', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (8,  'user8@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Dlouhý', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (9,  'user9@test.cz',       '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jakub', 'Kukla', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (10, 'user10@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Ondřej', 'Sokol', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (11, 'unverified1@test.cz', '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'unverified1_name', 'unverified1_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (12, 'unverified2@test.cz', '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'unverified2_name', 'unverified2_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (13, 'unverified3@test.cz', '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'unverified3_name', 'unverified3_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (14, 'user14@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Pekař', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (15, 'user15@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Lukáš', 'Patočka', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (16, 'user16@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jirka', 'Král', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (17, 'user17@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Nikola', 'Stará', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (18, 'user18@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Tomáš', 'Klavík', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (19, 'user19@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Miloslav', 'Mikeš', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (20, 'user20@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Miroslav', 'Šťastný', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (21, 'user21@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Kamil', 'Polívka', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (22, 'user22@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Patrik', 'Vašíček', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (23, 'user23@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Dominik', 'Strahovský', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (24, 'user24@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Pavel', 'Kovář', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (25, 'user25@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Rostislav', 'Říha', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (26, 'user26@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Hoffman', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (27, 'user27@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'David', 'Kolečko', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (28, 'user28@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Matěj', 'Čajkovský', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (29, 'user29@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Čapek', true);

-- CONFIRM TOKENS
INSERT INTO `tokens` (`id_token`, `id_user`, `hash`, `validity`, `type`) VALUES (1, 11, '39247679', '2020-12-29 00:09:33', 'confirm');
INSERT INTO `tokens` (`id_token`, `id_user`, `hash`, `validity`, `type`) VALUES (2, 12, '39247678', '2020-12-29 00:09:33', 'confirm');
INSERT INTO `tokens` (`id_token`, `id_user`, `hash`, `validity`, `type`) VALUES (3, 13, '39247677', '2020-12-29 00:09:33', 'confirm');

-- SPORTS
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (1, 'hokej');
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (2, 'florbal');
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (3, 'hokejbal');

-- TEAMS
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `type`, `id_contact_person`) VALUES (1, 1, 'Hokejisti pro srandu a žízeň', 1, 'amatéři', 1);
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `type`, `id_contact_person`) VALUES (2, 1, 'The Rural Jurors', 6, 'profi', 6);
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `type`, `id_contact_person`) VALUES (3, 1, 'Game of Throws', 14, 'amatéři', 14);
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `type`, `id_contact_person`) VALUES (4, 3, 'Not Last Place', 19, 'amatéři', 19);
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `type`, `id_contact_person`) VALUES (5, 3, 'The Salty Pretzels', 24, 'profi', 24);

-- TEAM-MEMBERSHIP
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (1, 1, 1, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (2, 1, 2, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (3, 1, 3, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (4, 1, 4, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (5, 1, 5, 'active', 'attacker');

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (6, 2, 6, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (7, 2, 7, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (8, 2, 8, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (9, 2, 9, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (10, 2, 10, 'active', 'attacker');

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (11, 3, 14, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (12, 3, 15, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (13, 3, 16, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (14, 3, 17, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (15, 3, 18, 'active', 'attacker');

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (16, 4, 19, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (17, 4, 20, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (18, 4, 21, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (19, 4, 22, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (20, 4, 23, 'active', 'attacker');

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (21, 5, 24, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (22, 5, 25, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (23, 5, 26, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (24, 5, 27, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (25, 5, 28, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (26, 5, 29, 'active', 'attacker');

-- CONPETITIONS
INSERT INTO `competitions` (`id_competition`, `name`, `leader`, `id_sport`, `start_date`, `end_date`) VALUES (1, 'Hokejová liga', 1, 1, '2019-09-01 23:59:59', '2020-04-01 23:59:59');
INSERT INTO `competitions` (`id_competition`, `name`, `leader`, `id_sport`, `start_date`, `end_date`) VALUES (2, 'Florbalová liga', 1, 2, '2017-06-20 23:59:59', '2018-11-20 23:59:59');
INSERT INTO `competitions` (`id_competition`, `name`, `leader`, `id_sport`, `start_date`, `end_date`) VALUES (3, 'Hokejbalová liga', 1, 3, '2019-09-01 23:59:59', '2020-04-01 23:59:59');

-- CONPETITION MEMBERSHIP
INSERT INTO `competition_membership` (`id_competition_membership`, `competition`, `team`, `status`) VALUES (1, 1, 1, 'active');
INSERT INTO `competition_membership` (`id_competition_membership`, `competition`, `team`, `status`) VALUES (2, 1, 2, 'active');
INSERT INTO `competition_membership` (`id_competition_membership`, `competition`, `team`, `status`) VALUES (3, 3, 4, 'active');
INSERT INTO `competition_membership` (`id_competition_membership`, `competition`, `team`, `status`) VALUES (4, 3, 5, 'active');

-- INSERT INTO `matches` (`id_match`, `competition`, `host`, `guest`, `date`) VALUES ();

-- INSERT INTO `matchup` (`id_matchup`, `match`, `goalkeeper`, `team`, `user`, `host`, `profi`) VALUES ();

-- INSERT INTO `events` (`id_event`, `match`, `team`, `user`, `type`, `minute`, `value`) VALUES ();
