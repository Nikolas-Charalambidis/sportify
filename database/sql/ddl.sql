DROP SCHEMA `sportify`;
CREATE SCHEMA `sportify`;
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
  `name` varchar(255) UNIQUE NOT NULL,
  `leader` int NOT NULL
);

CREATE TABLE `competitions` (
  `id_competition` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `leader` int NOT NULL
);

CREATE TABLE `competition_membership` (
  `id_competition_membership` int PRIMARY KEY AUTO_INCREMENT,
  `competition` int NOT NULL,
  `team` int NOT NULL,
  `status` ENUM ('pending', 'declined', 'active', 'inactive') NOT NULL
);

CREATE TABLE `matches` (
  `id_match` int PRIMARY KEY AUTO_INCREMENT,
  `competition` int,
  `team_1` int NOT NULL,
  `team_2` int NOT NULL,
  `start` datetime
);

CREATE TABLE `team_membership` (
  `id_team_membership` int PRIMARY KEY AUTO_INCREMENT,
  `team` int NOT NULL,
  `user` int NOT NULL,
  `status` ENUM ('pending', 'declined', 'active', 'inactive') NOT NULL
);

CREATE TABLE `results` (
  `id_result` int PRIMARY KEY AUTO_INCREMENT,
  `match` int NOT NULL,
  `team` int NOT NULL,
  `user` int NOT NULL,
  `goals` tinyint NOT NULL,
  `assistance` tinyint NOT NULL,
  `suspension_2` tinyint NOT NULL,
  `suspension_5` tinyint NOT NULL
);

ALTER TABLE `teams` ADD FOREIGN KEY (`leader`) REFERENCES `users` (`id_user`);

ALTER TABLE `competitions` ADD FOREIGN KEY (`leader`) REFERENCES `users` (`id_user`);

ALTER TABLE `competition_membership` ADD FOREIGN KEY (`competition`) REFERENCES `competitions` (`id_competition`);

ALTER TABLE `competition_membership` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

ALTER TABLE `matches` ADD FOREIGN KEY (`competition`) REFERENCES `competitions` (`id_competition`);

ALTER TABLE `matches` ADD FOREIGN KEY (`team_1`) REFERENCES `teams` (`id_team`);

ALTER TABLE `matches` ADD FOREIGN KEY (`team_2`) REFERENCES `teams` (`id_team`);

ALTER TABLE `team_membership` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

ALTER TABLE `team_membership` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id_user`);

ALTER TABLE `results` ADD FOREIGN KEY (`match`) REFERENCES `matches` (`id_match`);

ALTER TABLE `results` ADD FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

ALTER TABLE `results` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id_user`);
