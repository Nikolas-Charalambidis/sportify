DROP DATABASE IF EXISTS `sportify`;
CREATE DATABASE `sportify`;
USE `sportify`;

-- TABLES --------------------------------------------------------------------------------------------------------------
CREATE TABLE `users` (
    `id_user` int PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `surname` varchar(255) NOT NULL,
    `verified` boolean NOT NULL
);

CREATE TABLE `confirmTokens` (
    `id_token` int PRIMARY KEY AUTO_INCREMENT,
    `id_user` int NOT NULL unique ,
    `hash` varchar(255) NOT NULL,
    `validity` datetime NOT NULL
);

CREATE TABLE `teams` (
    `id_team` int PRIMARY KEY AUTO_INCREMENT,
    `id_sport` int NOT NULL,
    `name` varchar(255) UNIQUE NOT NULL,
    `id_leader` int NOT NULL
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

ALTER TABLE `confirmTokens` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

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
-- Password is hashed using bcrypt "abc123", 10 rounds
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (1, 'user1@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user1_name', 'user1_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (2, 'user2@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user2_name', 'user2_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (3, 'user3@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user3_name', 'user3_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (4, 'user4@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user4_name', 'user4_surname', true);

INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (5, 'user5@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user5_name', 'user5_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (6, 'user6@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user6_name', 'user6_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (7, 'user7@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user7_name', 'user7_surname', true);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (8, 'user8@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'user8_name', 'user8_surname', true);

INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (9, 'unverified1@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'unverified1_name', 'unverified1_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (10, 'unverified2@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'unverified2_name', 'unverified2_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (11, 'unverified3@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'unverified3_name', 'unverified3_surname', false);
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES (12, 'unverified4@test.cz', '$2y$10$C1VR1Z1SHhS5SQDqoFpJkO70oq.xM0aHmMtVLsJ51Sqi1itHnUyMe', 'unverified4_name', 'unverified4_surname', false);

INSERT INTO `confirmTokens` (`id_token`, `id_user`, `hash`, `validity`) VALUES (1, 9, '39247677', '2019-12-29 00:09:33');
INSERT INTO `confirmTokens` (`id_token`, `id_user`, `hash`, `validity`) VALUES (2, 10, '39247679', '2019-12-29 00:09:33');
INSERT INTO `confirmTokens` (`id_token`, `id_user`, `hash`, `validity`) VALUES (3, 11, '39247678', '2019-12-29 00:09:33');
INSERT INTO `confirmTokens` (`id_token`, `id_user`, `hash`, `validity`) VALUES (4, 12, '39247677', '2019-12-29 00:09:33');

INSERT INTO `sports` (`id_sport`, `sport`) VALUES (1, 'hokej');
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (2, 'florbal');
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (3, 'hokejbal');

INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`) VALUES (1, 1, 'team_hokej', 1);
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`) VALUES (2, 3, 'team_hokejbal', 5);

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (1, 1, 1, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (2, 1, 2, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (3, 1, 3, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (4, 1, 4, 'active', 'attacker');

INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (5, 2, 5, 'active', 'goalkeeper');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (6, 2, 6, 'active', 'defender');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (7, 2, 7, 'active', 'attacker');
INSERT INTO `team_membership` (`id_team_membership`, `team`, `user`, `status`, `position`) VALUES (8, 2, 8, 'active', 'attacker');

-- INSERT INTO `matches` (`id_match`, `competition`, `host`, `guest`, `date`) VALUES ();

-- INSERT INTO `matchup` (`id_matchup`, `match`, `goalkeeper`, `team`, `user`, `host`, `profi`) VALUES ();

-- INSERT INTO `events` (`id_event`, `match`, `team`, `user`, `type`, `minute`, `value`) VALUES ();
