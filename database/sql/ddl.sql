DROP DATABASE IF EXISTS `sportify`;
CREATE DATABASE `sportify`;
USE `sportify`;

CREATE TABLE `users` (
    `id_user` int PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `surname` varchar(255) NOT NULL
);

CREATE TABLE `teams` (
    `id_team` int PRIMARY KEY AUTO_INCREMENT,
    `id_sport` int NOT NULL,
    `name` varchar(255) UNIQUE NOT NULL,
    `leader` int NOT NULL
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
    `id_result` int PRIMARY KEY AUTO_INCREMENT,
    `match` int NOT NULL,
    `team` int NOT NULL,
    `user` int,
    `type` ENUM ('shot', 'goal', 'assistance1', 'assistance2', 'suspension'),
    `minute` int,
    `value` tinyint NOT NULL
);

CREATE TABLE `matchup` (
    `id_sestava` int PRIMARY KEY AUTO_INCREMENT,
    `match` int NOT NULL,
    `goalkeeper` boolean NOT NULL,
    `team` int NOT NULL,
    `user` int NOT NULL,
    `host` boolean NOT NULL,
    `profi` boolean NOT NULL
);

ALTER TABLE `teams` ADD FOREIGN KEY (`id_sport`) REFERENCES `sports` (`id_sport`);

ALTER TABLE `teams` ADD FOREIGN KEY (`leader`) REFERENCES `users` (`id_user`);

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
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`) values (1, 'user1@test.cz', 'asdf', 'user1_name', 'user1_surname');
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`) values (2, 'user2@test.cz', 'asdf', 'user2_name', 'user2_surname');
