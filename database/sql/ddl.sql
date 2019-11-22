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
    `id_type` int NOT NULL,
    `id_contact_person` int NOT NULL,
    `avatar_url` varchar(512),
    `avatar_public_id` varchar(255),
    `active` boolean not null
);
CREATE TABLE `team_types` (
     `id_type` int PRIMARY KEY AUTO_INCREMENT,
     `type` varchar(255) NOT NULL
);

CREATE TABLE `competitions` (
    `id_competition` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `id_leader` int NOT NULL,
    `id_sport` int NOT NULL,
    `start_date` date NOT NULL,
    `end_date` date NOT NULL,
    `avatar_url` varchar(512),
    `avatar_public_id` varchar(255)
);

CREATE TABLE `competition_membership` (
    `id_competition_membership` int PRIMARY KEY AUTO_INCREMENT,
    `id_competition` int NOT NULL,
    `id_team` int NOT NULL,
    `status` ENUM ('pending', 'declined', 'active', 'inactive')
);

CREATE TABLE `matches` (
    `id_match` int PRIMARY KEY AUTO_INCREMENT,
    `id_competition` int,
    `id_guest` int NOT NULL,
    `id_host` int NOT NULL,
    `goals_guest` int DEFAULT 0,
    `goals_host` int DEFAULT 0,
    `date` date NOT NULL
);

CREATE TABLE `team_membership` (
    `id_team_membership` int PRIMARY KEY AUTO_INCREMENT,
    `id_team` int NOT NULL,
    `id_user` int NOT NULL,
    `status` ENUM ('pending', 'declined', 'active', 'inactive') NOT NULL,
    `id_position` int NOT NULL
);

CREATE TABLE `positions` (
   `id_position` int PRIMARY KEY AUTO_INCREMENT,
   `position` varchar(255) NOT NULL,
   `is_goalkeeper` boolean NOT NULL
);

CREATE TABLE `sports` (
    `id_sport` int PRIMARY KEY AUTO_INCREMENT,
    `sport` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `events` (
    `id_event` int PRIMARY KEY AUTO_INCREMENT,
    `id_match` int NOT NULL,
    `id_team` int NOT NULL,
    `id_user` int,
    `type` ENUM ('shot', 'goal', 'suspension_2', 'suspension_2_2','suspension_5', 'suspension_pp', 'suspension_pp_end', 'suspension_penalty'),
    `id_assistance1` int,
    `id_assistance2` int,
    `minute` int,
    `value` tinyint,
    `host` boolean NOT NULL
);

CREATE TABLE `matchups` (
    `id_matchup` int PRIMARY KEY AUTO_INCREMENT,
    `id_match` int NOT NULL,
    `goalkeeper` boolean NOT NULL,
    `id_team` int NOT NULL,
    `id_user` int NOT NULL,
    `host` boolean NOT NULL
);

CREATE TABLE `team_statistics` (
    `id_team_statistics` int PRIMARY KEY AUTO_INCREMENT,
    `id_user` int NOT NULL,
    `id_team` int NOT NULL,
    `id_competition` int,                           -- null competition is a free time matches category
    `field_matches` int NOT NULL DEFAULT 0,         -- matches count as a field player, starts at 0
    `field_goals` int NOT NULL DEFAULT 0,           -- goals scored as a field player, starts at 0
    `field_assists` int NOT NULL DEFAULT 0,         -- assists as a field player, starts at 0
 -- `field_points`                                  -- points as a field player, starts at 0.. calculated as SUM of goals + assists, no need to persist
 -- `field_average_points                           -- average of `points`
    `field_suspensions` int NOT NULL DEFAULT 0,     -- sum of all suspensions as a field player, starts at 0
    `goalkeeper_matches` int NOT NULL DEFAULT 0,    -- matches count as a goalkeeper
    `goalkeeper_minutes` int NOT NULL DEFAULT 0,    -- minutes played as a goalkeeper, starts at 0
    `goalkeeper_goals` int NOT NULL DEFAULT 0,      -- goals received as a goalkeeper
    `goalkeeper_zeros` int NOT NULL DEFAULT 0,      -- matches where 0 goals were received as a goalkeeper
 -- `goalkeeper_average_zeros`                      -- average of `goalkeeper_zeros`
    `goalkeeper_shots` int NOT NULL DEFAULT 0       -- count of all shots shot to a player as a goalkeeper, starts at 0
 -- `goalkeeper_success_rate`                       -- rate is calculated
);

CREATE TABLE `logs` (
    `id_logs` int PRIMARY KEY AUTO_INCREMENT,
    `log` varchar(255)
);

-- KEYS ----------------------------------------------------------------------------------------------------------------
ALTER TABLE `teams` ADD FOREIGN KEY (`id_sport`) REFERENCES `sports` (`id_sport`);
ALTER TABLE `teams` ADD FOREIGN KEY (`id_leader`) REFERENCES `users` (`id_user`);
ALTER TABLE `teams` ADD FOREIGN KEY (`id_contact_person`) REFERENCES `users` (`id_user`);
ALTER TABLE `teams` ADD FOREIGN KEY (`id_type`) REFERENCES `team_types` (`id_type`);

ALTER TABLE `tokens` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE `competitions` ADD FOREIGN KEY (`id_leader`) REFERENCES `users` (`id_user`);
ALTER TABLE `competitions` ADD FOREIGN KEY (`id_sport`) REFERENCES `sports` (`id_sport`);

ALTER TABLE `competition_membership` ADD FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id_competition`);
ALTER TABLE `competition_membership` ADD FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`);

ALTER TABLE `matches` ADD FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id_competition`);
ALTER TABLE `matches` ADD FOREIGN KEY (`id_host`) REFERENCES `teams` (`id_team`);
ALTER TABLE `matches` ADD FOREIGN KEY (`id_guest`) REFERENCES `teams` (`id_team`);

ALTER TABLE `team_membership` ADD FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `team_membership` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
ALTER TABLE `team_membership` ADD FOREIGN KEY (`id_position`) REFERENCES `positions` (`id_position`);

ALTER TABLE `events` ADD FOREIGN KEY (`id_match`) REFERENCES `matches` (`id_match`) ON DELETE CASCADE;
ALTER TABLE `events` ADD FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `events` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
ALTER TABLE `events` ADD FOREIGN KEY (`id_assistance1`) REFERENCES `users` (`id_user`);
ALTER TABLE `events` ADD FOREIGN KEY (`id_assistance2`) REFERENCES `users` (`id_user`);

ALTER TABLE `matchups` ADD FOREIGN KEY (`id_match`) REFERENCES `matches` (`id_match`) ON DELETE CASCADE;
ALTER TABLE `matchups` ADD FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `matchups` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE `team_statistics` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
ALTER TABLE `team_statistics` ADD FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`);
ALTER TABLE `team_statistics` ADD FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id_competition`);

-- --- MATCHUP TABLE TO TEAM_STATISTICS SYNCHRONIZATION BLOCK START
DELIMITER //
CREATE PROCEDURE generate_team_statistics_on_matchups_records(
    triggered_id_match int(11), triggered_id_team int(11), triggered_id_user int(11))
BEGIN
    DECLARE competition int(11);
    DECLARE count_field_matches int(11);
    DECLARE count_goalkeeper_matches int(11);
    DECLARE count_records int(11);

    SELECT m.id_competition INTO competition FROM matches AS m WHERE m.id_match = triggered_id_match;

    SET count_records = count_team_statistics_records(
            triggered_id_user, triggered_id_team, competition);

    -- calculate field player matches statistics
    SELECT COUNT(1) INTO count_field_matches FROM matchups AS mup
    JOIN matches m ON mup.id_match = m.id_match
    WHERE mup.id_user=triggered_id_user
      AND mup.id_team=triggered_id_team
      AND mup.goalkeeper = 0
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition);

    IF (count_field_matches IS NULL) THEN SET count_field_matches = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts
        SET ts.field_matches = count_field_matches
        WHERE ts.id_user = triggered_id_user
          AND ts.id_team = triggered_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        INSERT INTO team_statistics (id_team_statistics, id_user, id_team, id_competition, field_matches)
        VALUES (NULL, triggered_id_user, triggered_id_team, competition, count_field_matches);
    END IF;

    -- calculate goalkeeper matches statistics
    SELECT COUNT(1) INTO count_goalkeeper_matches FROM matchups AS mup
    JOIN matches m ON mup.id_match = m.id_match
    WHERE mup.id_user=triggered_id_user
      AND mup.id_team=triggered_id_team
      AND mup.goalkeeper = 1
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition);

    IF (count_goalkeeper_matches IS NULL) THEN SET count_goalkeeper_matches = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts
        SET ts.goalkeeper_matches = count_goalkeeper_matches, ts.goalkeeper_minutes = count_goalkeeper_matches * 60
        WHERE ts.id_user = triggered_id_user
          AND ts.id_team = triggered_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        INSERT INTO team_statistics(id_team_statistics, id_user, id_team, id_competition, goalkeeper_matches, goalkeeper_minutes)
        VALUES (NULL, triggered_id_user, triggered_id_team, competition, count_goalkeeper_matches, count_goalkeeper_matches * 60);
    END IF;

    -- remove fields with all zeros
    CALL remove_empty_records();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER TR_MATCHUP_AFTER_INSERT AFTER INSERT ON matchups FOR EACH ROW
BEGIN
    CALL generate_team_statistics_on_matchups_records(
            new.id_match, new.id_team, new.id_user);
END; //
DELIMITER ;

DELIMITER //
CREATE TRIGGER TR_MATCHUP_AFTER_UPDATE AFTER UPDATE ON matchups FOR EACH ROW
BEGIN
    CALL generate_team_statistics_on_matchups_records(
            new.id_match, new.id_team, new.id_user);
END; //
DELIMITER ;

DELIMITER //
CREATE TRIGGER TR_MATCHUP_AFTER_DELETE AFTER DELETE ON matchups FOR EACH ROW
BEGIN
    -- remove all events of the related match-ups
    DELETE FROM events
    WHERE (old.id_user = id_user OR old.id_user = id_assistance1 OR old.id_user = id_assistance2)
      AND old.id_match = id_match
      AND old.id_team = id_team;

    CALL generate_team_statistics_on_matchups_records(
            old.id_match, old.id_team, old.id_user);
END; //
DELIMITER ;
-- --- MATCHUP TABLE TO TEAM_STATISTICS SYNCHRONIZATION BLOCK END

-- --- MATCH TABLE TRIGGERS BLOCK START
DELIMITER //
CREATE TRIGGER TR_MATCH_AFTER_INSERT AFTER INSERT ON matchups FOR EACH ROW
BEGIN
    -- TODO: TRIGGER ON `MATCH` INSERT - CRETE AND EVENT WITH 0 SHOOTS
    --       PLACE IT HERE
END; //
DELIMITER ;
-- --- MATCH TABLE TRIGGERS BLOCK END

-- --- EVENTS TABLE TO TEAM_STATISTICS SYNCHRONIZATION BLOCK START
DELIMITER //
CREATE PROCEDURE generate_team_statistics_on_event_records(
    triggered_id_match int(11), triggered_id_team int(11), triggered_id_user int(11), triggered_type varchar(255),
    triggered_host int(2), triggered_id_assistance1 int(11), triggered_id_assistance2 int(11))
BEGIN
    DECLARE competition int(11);
    DECLARE opponent_user_goalkeeper int(11);
    DECLARE opponent_team int(11);

    SELECT m.id_competition INTO competition FROM matches AS m WHERE m.id_match = triggered_id_match;

    SELECT mup.id_user INTO opponent_user_goalkeeper FROM matchups AS mup
    WHERE id_match = triggered_id_match AND mup.host = !triggered_host AND mup.goalkeeper = 1;

    SELECT mup.id_team INTO opponent_team FROM matchups AS mup
    WHERE id_match = triggered_id_match AND mup.host = !triggered_host AND mup.goalkeeper = 1;

    IF triggered_type = 'shot' THEN
        -- recalculate opponent goalkeeper's shots
        CALL generate_team_statistics_goalkeeper_shots_data(
                opponent_user_goalkeeper, opponent_team, competition);
    ELSEIF triggered_type = 'goal' THEN
        -- recalculate player's goals
        CALL generate_team_statistics_player_goals_data(
                triggered_id_user, triggered_id_team, competition);
        -- recalculate player's 1st assists, if any
        IF triggered_id_assistance1 IS NOT NULL THEN
            CALL generate_team_statistics_player_assists_data(
                    triggered_id_assistance1, triggered_id_team, competition);
        END IF;
        -- recalculate player's 2nd assists, if any
        IF triggered_id_assistance2 IS NOT NULL THEN
            CALL generate_team_statistics_player_assists_data(
                    triggered_id_assistance2, triggered_id_team, competition);
        END IF;
        -- recalculate opponent goalkeeper's goals data
        CALL generate_team_statistics_goalkeeper_goals_data(
                opponent_user_goalkeeper, opponent_team, competition);
    ELSEIF triggered_type LIKE 'suspension%' THEN
        -- recalculate player's suspensions
        CALL generate_team_statistics_player_suspensions_data(
                triggered_id_user, triggered_id_team, competition);
    ELSE
        -- log unknown event
        INSERT INTO logs VALUES (NULL, CONCAT('ERROR: ', 'unknown event.type=', triggered_type));
    END IF;

    -- remove fields with all zeros
    CALL remove_empty_records();
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_team_statistics_player_goals_data(
    triggered_id_user int(11), triggered_id_team int(11), competition int(11))
BEGIN
    DECLARE count_records int(11);
    DECLARE goals int(11);

    SET count_records = count_team_statistics_records(
            triggered_id_user, triggered_id_team, competition);

    -- calculate goals
    SELECT COUNT(1) INTO goals FROM events AS e
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE e.id_user = triggered_id_user
      AND e.id_team = triggered_id_team
      AND e.type = 'goal'
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition);

    IF (goals IS NULL) THEN SET goals = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts SET ts.field_goals = goals
        WHERE ts.id_user = triggered_id_user
          AND ts.id_team = triggered_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        -- should not happen, log the event
        CALL log_possible_inconsistency('generate_team_statistics_player_goals_data',
                                        CONCAT('id_user=', triggered_id_user, ', id_team=', triggered_id_team,
                                               ', id_competition=', IF(competition IS NULL, 'null', competition)));
        INSERT team_statistics (id_team_statistics, id_user, id_team, id_competition, field_matches, field_goals)
        VALUES(NULL, triggered_id_user, triggered_id_team, competition, 1, goals);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_team_statistics_player_suspensions_data(
    triggered_id_user int(11), triggered_id_team int(11), competition int(11))
BEGIN
    DECLARE count_records int(11);
    DECLARE suspensions int(11);

    SET count_records = count_team_statistics_records(
            triggered_id_user, triggered_id_team, competition);

    -- calculate suspensions
    SELECT SUM(CASE
                   WHEN e.type = 'suspension_2' THEN 2
                   WHEN e.type = 'suspension_2_2' THEN 4
                   WHEN e.type = 'suspension_5' THEN 5
                   WHEN e.type LIKE 'suspension_pp%' THEN 10
                   ELSE 0 END)
    INTO suspensions
    FROM events AS e
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE e.id_user = triggered_id_user
      AND e.id_team = triggered_id_team
      AND e.type LIKE 'suspension%'
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition);

    IF (suspensions IS NULL) THEN SET suspensions = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts SET ts.field_suspensions = suspensions
        WHERE ts.id_user = triggered_id_user
          AND ts.id_team = triggered_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        -- should not happen, log the event
        CALL log_possible_inconsistency('generate_team_statistics_player_suspensions_data',
                                        CONCAT('id_user=', triggered_id_user, ', id_team=', triggered_id_team,
                                               ', id_competition=', IF(competition IS NULL, 'null', competition)));
        INSERT team_statistics (id_team_statistics, id_user, id_team, id_competition, field_matches, field_suspensions)
        VALUES(NULL, triggered_id_user, triggered_id_team, competition, 1, suspensions);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_team_statistics_player_assists_data(
    triggered_id_user int(11), triggered_id_team int(11), competition int(11))
BEGIN
    DECLARE count_records int(11);
    DECLARE assists int(11);

    SET count_records = count_team_statistics_records(
            triggered_id_user, triggered_id_team, competition);

    -- calculate assists
    SELECT COUNT(1) INTO assists FROM events AS e
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE (e.id_assistance1 = triggered_id_user OR e.id_assistance2 = triggered_id_user)
      AND e.id_team = triggered_id_team
      AND e.type = 'goal'
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition);

    IF (assists IS NULL) THEN SET assists = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts SET ts.field_assists = assists
        WHERE ts.id_user = triggered_id_user
          AND ts.id_team = triggered_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        -- should not happen, log the event
        CALL log_possible_inconsistency('generate_team_statistics_player_assists_data',
                                        CONCAT('id_user=', triggered_id_user, ', id_team=', triggered_id_team,
                                               ', id_competition=', IF(competition IS NULL, 'null', competition)));
        INSERT team_statistics (id_team_statistics, id_user, id_team, id_competition, field_matches, field_assists)
        VALUES(NULL, triggered_id_user, triggered_id_team, competition, 1, assists);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_team_statistics_goalkeeper_shots_data(
    goalkeeper_id_user int(11), goalkeeper_id_team int(11), competition int(11))
BEGIN
    DECLARE count_records int(11);
    DECLARE shots int(11);

    SET count_records = count_team_statistics_records(
        goalkeeper_id_user, goalkeeper_id_team, competition);

    -- calculate shots
    SELECT SUM(e.value) INTO shots FROM matchups AS mup
    JOIN events AS e ON mup.id_match = e.id_match
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE mup.id_user = goalkeeper_id_user
      AND mup.id_team = goalkeeper_id_team
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition)
      AND e.host != mup.host
      AND mup.goalkeeper = 1
      AND e.type = 'shot';

    IF (shots IS NULL) THEN SET shots = 0; END IF;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts SET ts.goalkeeper_shots = shots
        WHERE ts.id_user = goalkeeper_id_user
          AND ts.id_team = goalkeeper_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        -- should not happen, log the event
        CALL log_possible_inconsistency('generate_team_statistics_goalkeeper_shots_data',
                                        CONCAT('id_user=', goalkeeper_id_user, ', id_team=', goalkeeper_id_team,
                                               ', id_competition=', IF(competition IS NULL, 'null', competition)));
        INSERT team_statistics (id_team_statistics, id_user, id_team, id_competition, goalkeeper_matches, goalkeeper_minutes, goalkeeper_shots)
        VALUES(NULL, goalkeeper_id_user, goalkeeper_id_team, competition, 1, 60, shots);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_team_statistics_goalkeeper_goals_data(
    goalkeeper_id_user int(11), goalkeeper_id_team int(11), competition int(11))
BEGIN
    DECLARE count_records int(11);
    DECLARE goals int(11);
    DECLARE matches int(11);
    DECLARE non_zeros int(11);
    DECLARE zeros int(11);

    SET count_records = count_team_statistics_records(
            goalkeeper_id_user, goalkeeper_id_team, competition);

    -- calculate goals
    SELECT COUNT(1) INTO goals FROM matchups AS mup
    JOIN events AS e ON mup.id_match = e.id_match
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE mup.id_user = goalkeeper_id_user
      AND mup.id_team = goalkeeper_id_team
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition)
      AND e.host != mup.host
      AND mup.goalkeeper = 1
      AND e.type = 'goal';

    -- calculate zeros
    SELECT COUNT(DISTINCT(mup.id_match)) INTO matches FROM matchups AS mup
    JOIN matches AS m ON mup.id_match = m.id_match
    WHERE mup.id_user = goalkeeper_id_user
      AND mup.id_team = goalkeeper_id_team
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition)
      AND mup.goalkeeper = 1;

    SELECT COUNT(DISTINCT(mup.id_match)) INTO non_zeros FROM matchups AS mup
    JOIN events AS e ON mup.id_match = e.id_match
    JOIN matches AS m ON e.id_match = m.id_match
    WHERE mup.id_user = goalkeeper_id_user
      AND mup.id_team = goalkeeper_id_team
      AND IF(competition IS NULL, m.id_competition IS NULL, m.id_competition = competition)
      AND e.host != mup.host
      AND mup.goalkeeper = 1
      AND e.type = 'goal';

    IF (matches IS NULL) THEN SET matches = 0; END IF;
    IF (non_zeros IS NULL) THEN SET non_zeros = 0; END IF;

    SET zeros = matches - non_zeros;

    -- generate to team_statistics
    IF (count_records > 0) THEN
        UPDATE team_statistics AS ts SET ts.goalkeeper_goals = goals, ts.goalkeeper_zeros = zeros
        WHERE ts.id_user = goalkeeper_id_user
          AND ts.id_team = goalkeeper_id_team
          AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    ELSE
        -- should not happen, log the event
        CALL log_possible_inconsistency('generate_team_statistics_goalkeeper_goals_data',
                                        CONCAT('id_user=', goalkeeper_id_user, ', id_team=', goalkeeper_id_team,
                                               ', id_competition=', IF(competition IS NULL, 'null', competition)));
        INSERT team_statistics (id_team_statistics, id_user, id_team, id_competition,
                                goalkeeper_matches, goalkeeper_minutes, goalkeeper_shots, goalkeeper_zeros)
        VALUES(NULL, goalkeeper_id_user, goalkeeper_id_team, competition, 1, 60, goals, zeros);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_match_goals_data(triggered_id_match int(11), triggered_id_team int(11), triggered_type varchar(255), triggered_host int(2))
BEGIN
    DECLARE goals int(11);
    DECLARE match_start datetime;

    IF triggered_type = 'goal' THEN
        SELECT COUNT(*) INTO goals FROM events AS e
        WHERE e.type = 'goal'
          AND e.host = triggered_host
          AND e.id_match = triggered_id_match
          AND e.id_team = triggered_id_team;

        IF goals IS NULL THEN SET goals = 0; END IF;
        SELECT m.date INTO match_start FROM matches AS m WHERE m.id_match = triggered_id_match;
        IF (match_start > NOW()) THEN SET goals = -1; END IF;

        IF triggered_host THEN
            UPDATE matches AS m SET m.goals_host = goals
            WHERE m.id_match = triggered_id_match AND m.id_host = triggered_id_team;
        ELSE
            UPDATE matches AS m SET m.goals_guest = goals
            WHERE m.id_match = triggered_id_match AND m.id_guest = triggered_id_team;
        END IF;
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_insert_events AFTER INSERT ON events FOR EACH ROW
BEGIN
    -- recalculate match goals
    CALL generate_match_goals_data(
            new.id_match, new.id_team, new.type, new.host);
    -- recalculate team_statistics
    CALL generate_team_statistics_on_event_records(
            new.id_match, new.id_team, new.id_user, new.type,
            new.host, new.id_assistance1, new.id_assistance2);
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_update_events AFTER UPDATE ON events FOR EACH ROW
BEGIN
    -- recalculate match goals
    CALL generate_match_goals_data(
            new.id_match, new.id_team, new.type, new.host);
    -- recalculate team_statistics
    CALL generate_team_statistics_on_event_records(
            new.id_match, new.id_team, new.id_user, new.type,
            new.host, new.id_assistance1, new.id_assistance2);
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_delete_events AFTER DELETE ON events FOR EACH ROW
BEGIN
    -- recalculate match goals
    CALL generate_match_goals_data(
            old.id_match, old.id_team, old.type, old.host);
    -- recalculate team_statistics
    CALL generate_team_statistics_on_event_records(
            old.id_match, old.id_team, old.id_user, old.type,
            old.host, old.id_assistance1, old.id_assistance2);
END//
DELIMITER ;
-- --- EVENTS TABLE TO TEAM_STATISTICS SYNCHRONIZATION BLOCK END

DELIMITER //
CREATE FUNCTION count_team_statistics_records(triggered_id_user int(11), triggered_id_team int(11), competition int(11))
    RETURNS int(255)
BEGIN
    DECLARE count_records int(11);
    SELECT COUNT(1) INTO count_records FROM team_statistics AS ts
    WHERE ts.id_user = triggered_id_user
      AND ts.id_team = triggered_id_team
      AND IF(competition IS NULL, ts.id_competition IS NULL, ts.id_competition = competition);
    IF (count_records IS NULL) THEN SET count_records = 0; END IF;
    RETURN count_records;
END//

DELIMITER //
CREATE PROCEDURE remove_empty_records()
BEGIN
    DELETE FROM team_statistics
    WHERE field_matches = 0 AND field_assists = 0 AND field_goals = 0 AND field_suspensions = 0
      AND goalkeeper_matches = 0 AND goalkeeper_goals = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE log_possible_inconsistency(called_procedure varchar(255), parameters varchar(255))
BEGIN
    CALL log('WARN', called_procedure, CONCAT('possible inconsistency regenerating team_statistics for ', parameters));
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE log(log_type varchar(255), called_procedure varchar(255), message varchar(255))
BEGIN
    DECLARE type varchar(255);
    CASE UPPER(log_type)
        WHEN 'SEVERE' THEN SET type = '[SEVERE]';
        WHEN 'ERROR' THEN SET type = '[ERROR] ';
        WHEN 'WARN' THEN SET type = '[WARN]  ';
        WHEN 'INFO' THEN SET type = '[INFO]  ';
        ELSE SET type = '[]      ';
        END CASE;
    INSERT INTO logs VALUES (NULL, CONCAT(type, '[', NOW(), '] ', called_procedure, '> ', message));
END//
DELIMITER ;

-- Data ----------------------------------------------------------------------------------------------------------------
-- USERS
-- Password is hashed using bcrypt "Heslo123", 10 rounds
INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `verified`) VALUES
    (1,  'user1@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Dvořák', true),
    (2,  'user2@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Evžen', 'Vomáčka', true),
    (3,  'user3@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Michal', 'Nový', true),
    (4,  'user4@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Zdeněk', 'Svěrák', true),
    (5,  'user5@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jaroslav', 'Blažek', true),
    (6,  'user6@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Emanuel', 'Motýlek', true),
    (7,  'user7@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Vopustka', true),
    (8,  'user8@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Dlouhý', true),
    (9,  'user9@test.cz',      '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jakub', 'Kukla', true),
    (10, 'user10@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Ondřej', 'Sokol', true),
    (11, 'user11@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Václav', 'Kulhánek', false),
    (12, 'user12@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Vladimír', 'Perušič', false),
    (13, 'user13@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Vilém', 'Stehlík', false),
    (14, 'user14@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Pekař', true),
    (15, 'user15@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Lukáš', 'Patočka', true),
    (16, 'user16@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jirka', 'Král', true),
    (17, 'user17@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Nikola', 'Stará', true),
    (18, 'user18@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Tomáš', 'Klavík', true),
    (19, 'user19@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Miloslav', 'Mikeš', true),
    (20, 'user20@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Miroslav', 'Šťastný', true),
    (21, 'user21@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Kamil', 'Polívka', true),
    (22, 'user22@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Patrik', 'Vašíček', true),
    (23, 'user23@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Dominik', 'Strahovský', true),
    (24, 'user24@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Pavel', 'Kovář', true),
    (25, 'user25@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Rostislav', 'Říha', true),
    (26, 'user26@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Jan', 'Hoffman', true),
    (27, 'user27@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'David', 'Kolečko', true),
    (28, 'user28@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Matěj', 'Čajkovský', true),
    (29, 'user29@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Tomáš', 'Vošahlík', true),
    (30, 'user30@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Vincent', 'Nejezchleba', true),
    (31, 'user31@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'José', 'Narraro', true),
    (32, 'user32@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Karel', 'Vyskočil', true),
    (33, 'user33@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Marek', 'Dohnal', true),
    (34, 'user34@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Michael', 'Kohl', true),
    (35, 'user35@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Petr', 'Vazal', true),
    (36, 'user36@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Pavel', 'Snížek', true),
    (37, 'user37@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Lojza', 'Ptáček', true),
    (38, 'user38@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Ignác', 'Rychlý', true),
    (39, 'user39@test.cz',     '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Fratnišek', 'Svoboda', true),
    (40, 'unverified@test.cz', '$2a$10$NcgTt5bSUnrf/Isf2BWCMe0kfGuO4AC9KeXitZ/a8bLN68d0akuEu', 'Not', 'Verified', false);

-- CONFIRM TOKENS
INSERT INTO `tokens` (`id_token`, `id_user`, `hash`, `validity`, `type`) VALUES (1, 40, '39247679', '2020-12-29 00:09:33', 'confirm');

-- SPORTS
INSERT INTO `sports` (`id_sport`, `sport`) VALUES (1, 'Hokej'), (2, 'Florbal'), (3, 'Hokejbal');

-- TEAM TYPES
INSERT INTO `team_types` (`id_type`, `type`) VALUES (1, 'Ligový'), (2, 'Volnočasový');

-- TEAMS
INSERT INTO `teams` (`id_team`, `id_sport`, `name`, `id_leader`, `id_type`, `id_contact_person`, `active`) VALUES
    (1, 1, 'Hokejisti pro srandu a žízeň', 1, 1, 1, true),
    (2, 1, 'The Rural Jurors', 6, 1, 6, true),
    (3, 1, 'Game of Throws', 14, 2, 14, true),
    (4, 3, 'Not Last Place', 19, 2, 19, true),
    (5, 3, 'The Salty Pretzels', 24, 1, 24, true);

-- TEAM POSITIONS
INSERT INTO `positions` (`id_position`, `position`, `is_goalkeeper`) VALUES
    (1, 'Brankář', true), (2, 'Obránce', false), (3, 'Útočník', false);

-- TEAM-MEMBERSHIP
INSERT INTO `team_membership` (`id_team_membership`, `id_team`, `id_user`, `status`, `id_position`) VALUES
    (1, 1, 1, 'active', 1),
    (2, 1, 2, 'active', 2),
    (3, 1, 3, 'active', 2),
    (4, 1, 4, 'active', 3),
    (5, 1, 5, 'active', 3),
    (6, 1, 6, 'active', 1),
    (7, 1, 7, 'active', 2),
    (8, 1, 8, 'active', 2),
    (9, 1, 9, 'active', 3),
    (10, 1, 10, 'active', 3),

    (11, 2, 11, 'active', 1),
    (12, 2, 12, 'active', 2),
    (13, 2, 13, 'active', 2),
    (14, 2, 14, 'active', 3),
    (15, 2, 15, 'active', 3),
    (16, 2, 16, 'active', 1),
    (17, 2, 17, 'active', 2),
    (18, 2, 18, 'active', 2),
    (19, 2, 19, 'active', 3),
    (20, 2, 20, 'active', 3),

    (21, 3, 21, 'active', 1),
    (22, 3, 22, 'active', 2),
    (23, 3, 23, 'active', 2),
    (24, 3, 24, 'active', 3),
    (25, 3, 25, 'active', 3),
    (26, 3, 26, 'active', 1),
    (27, 3, 27, 'active', 2),
    (28, 3, 28, 'active', 2),
    (29, 3, 29, 'active', 3),
    (30, 3, 30, 'active', 3),

    (31, 4, 31, 'active', 1),
    (32, 4, 32, 'active', 2),
    (33, 4, 33, 'active', 3);

INSERT INTO `team_membership` (`id_team_membership`, `id_team`, `id_user`, `status`, `id_position`) VALUES
    (34, 5, 34, 'active', 1),
    (35, 5, 35, 'active', 2),
    (36, 5, 36, 'active', 3);

-- CONPETITIONS
INSERT INTO `competitions` (`id_competition`, `name`, `id_leader`, `id_sport`, `start_date`, `end_date`) VALUES
    (1, 'Hokejová liga 19-20', 1, 1, '2019-09-01', '2020-04-01'),
    (2, 'Florbalová liga', 1, 2, '2017-06-20', '2018-11-20'),
    (3, 'Hokejbalová liga', 1, 3, '2019-09-01', '2020-04-01'),
    (4, 'Hokejová liga 18-19', 1, 1, '2018-09-01', '2019-04-01');

-- CONPETITION MEMBERSHIP
INSERT INTO `competition_membership` (`id_competition_membership`, `id_competition`, `id_team`, `status`) VALUES
    (1, 1, 1, 'active'),
    (2, 1, 2, 'active'),
    (3, 1, 3, 'active'),
    (4, 3, 4, 'active'),
    (5, 4, 1, 'active'),
    (6, 4, 2, 'active');

-- MATCHES
INSERT INTO `matches` (id_match, id_competition, id_host, id_guest, date) VALUES
    (1, null, 1, 1, '2018-11-04'),
    (2, null, 1, 1, '2018-11-05'),
    (3, 1, 1, 2, '2018-11-10'),
    (4, 1, 2, 3, '2018-11-11'),
    (5, 1, 3, 1, '2018-11-12');

INSERT INTO `matchups` (id_matchup, id_match, goalkeeper, id_team, id_user, host) VALUES
    (1, 1, true, 1, 1, true),
    (2, 1, false, 1, 2, true),
    (3, 1, false, 1, 3, true),
    (4, 1, false, 1, 4, true),
    (5, 1, false, 1, 5, true),
    (6, 1, true, 1, 6, false),
    (7, 1, false, 1, 7, false),
    (8, 1, false, 1, 8, false),

    (11, 2, true, 1, 1, true),
    (12, 2, false, 1, 2, true),
    (13, 2, false, 1, 3, true),
    (14, 2, false, 1, 4, true),
    (15, 2, false, 1, 5, true),
    (16, 2, true, 1, 6, false),
    (17, 2, false, 1, 7, false),
    (18, 2, false, 1, 8, false),

    (19, 3, true, 1, 1, true),
    (20, 3, false, 1, 2, true),
    (21, 3, false, 1, 3, true),
    (22, 3, false, 1, 4, true),
    (23, 3, false, 1, 5, true),
    (24, 3, true, 2, 11, false),
    (25, 3, false, 2, 12, false),
    (26, 3, false, 2, 13, false);

-- EVENTS
INSERT INTO `events` (id_event, id_match, id_team, id_user, type, id_assistance1, id_assistance2, minute, value, host) VALUES
    (1, 1, 1, 5, 'goal', 4, null, 40, null, true),
    (2, 1, 1, 2, 'goal', null, null, 48, null, true),
    (3, 1, 1, 2, 'suspension_2', null, null, 51, null, true),
    (4, 1, 1, 8, 'goal', null, null, 52, null, false),
    (5, 1, 1, null, 'shot', null, null, null, 45, true),
    (6, 1, 1, null, 'shot', null, null, null, 49, false),

    (7, 2, 1, 7, 'goal', 8, null, 16, null, false),
    (8, 2, 1, null, 'shot', null, null, null, 57, true),
    (9, 2, 1, null, 'shot', null, null, null, 59, false),

    (10, 3, 1, 4, 'goal', 5, 2, 32, null, true),
    (11, 3, 2, 13, 'goal', null, null, 36, null, false),
    (12, 3, 2, 13, 'goal', 11, 12, 41, null, false),
    (13, 3, 2, 13, 'suspension_5', null, null, 50, null, false),
    (14, 3, 2, 13, 'suspension_2_2', null, null, 56, null, false),
    (15, 3, 1, null, 'shot', null, null, null, 32, true),
    (16, 3, 2, null, 'shot', null, null, null, 66, false);

-- ---- MOCKED, START OF A SUBJECT OF A FUTURE CHANGE AND/OR REGENERATION, THE MODEL ITSELF IS CONSIDERED FINAL
-- ---- MATCHES ARE NECESSARY FOR THESE DATA CONSISTENCY, YET THEY ARE NOT NEEDED FOR THE DEVELOPMENT OF THE STATISTICS DISPLAY
-- ---- THE MOCKED DATA NEITHER MATCH THE MOCKED MATCHES, MATCHUPS NOR EVENTS

-- -- COMPETITION ID = 1
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (1, 1, 1, 1, 0, 0, 0, 0, 5, 300, 9, 2, 356);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (2, 2, 1, 1, 5, 0, 6, 2, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_soots` )
--     VALUES (3, 3, 1, 1, 5, 2, 0, 0, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (4, 4, 1, 1, 5, 1, 4, 1, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (5, 5, 1, 1, 5, 5, 2, 4, 0, 0, 0, 0, 0);
--
-- -- COMPETITION ID = 4
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (6, 1, 1, 4, 0, 0, 0, 0, 20, 1200, 52, 6, 1659);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (7, 2, 1, 4, 20, 0, 18, 0, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (8, 3, 1, 4, 20, 7, 10, 7, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (9, 4, 1, 4, 20, 19, 14, 4, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (10, 5, 1, 4, 20, 31, 16, 14, 0, 0, 0, 0, 0);
--
-- -- FREE TIME MATCHES (COMPETITION ID = null)
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (11, 1, 1, null, 2, 1, 4, 0, 2, 120, 6, 0, 215);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (12, 2, 1, null, 2, 0, 3, 0, 2, 120, 12, 0, 322);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_soots` )
--     VALUES (13, 3, 1, null, 4, 2, 1, 0, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (14, 4, 1, null, 4, 6, 8, 0, 0, 0, 0, 0, 0);
-- INSERT INTO `team_statistics` (`id_team_statistics`, `id_user`, `id_team`, `id_competition`, `field_matches`, `field_goals`, `field_assists`, `field_suspensions`, `goalkeeper_matches`, `goalkeeper_minutes`, `goalkeeper_goals`, `goalkeeper_zeros`, `goalkeeper_shots` )
--     VALUES (15, 5, 1, null, 4, 9, 0, 0, 0, 0, 0, 0, 0);
-- -- ---- END, START OF A SUBJECT OF A FUTURE CHANGE OR REGENERATION
