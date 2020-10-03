CREATE SCHEMA `digital_nurse_room_operation`;

create table users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(256) NOT NULL,
    age int(3),
    email varchar(256) NOT NULL,
    date_created datetime DEFAULT NULL,
    phone_number varchar(256),
    blood_group varchar(256),
    weight varchar(256),
    height varchar(256),
    allergies varchar(256),
    inactive boolean,
    PRIMARY KEY (id)
)

create table episodes (
    id int(11) NOT NULL AUTO_INCREMENT,
    user_id int, -- foreign key from users table
    date_created Date,
    start_time TIME,
    end_time TIME,
    s3_url varchar(256),
    PRIMARY KEY (id),
    constraint user_id_fk_1 FOREIGN KEY (user_id) REFERENCES users(id)
)

create table health_records (
    id int(11) NOT NULL AUTO_INCREMENT,
    episode_id int, -- foreign key from episodes table
    consulation_reason varchar(256),
    visited_date datetime,
    prescription_qty int(11),
    prescrption_details varchar(256),
    prescription_to datetime,
    prescription_from datetime,
    health_condition varchar(256),
    medicatation varchar(256),
    nurse_id int,
    nurse_name varchar(256),
    PRIMARY KEY (id),
    constraint episode_id_fk_1 FOREIGN KEY (episode_id) REFERENCES episodes(id)
)


--- STORED PROCEDURES

--- insert into user table
DELIMITER $$

CREATE PROCEDURE `insertUserRecords`(IN name varchar(256), age int, email varchar(256), phone_number varchar(256), date_created datetime)
BEGIN
    INSERT INTO users SET name = name, email= email, age = age, phone_number = phone_number, date_created = date_created;
END$$

DELIMITER ;

--- get all users
DELIMITER $$

CREATE PROCEDURE `getAllUsers`()
BEGIN
    SELECT * FROM users;
END$$

DELIMITER ;

--- get user details

DELIMITER $$
CREATE PROCEDURE `getUserDetails`(IN user_id int)
BEGIN
    SELECT * FROM users where id = user_id;
END$$

DELIMITER ;



--- get all health records

DELIMITER $$
CREATE PROCEDURE `getAllHealthRecords`()
BEGIN
    SELECT * FROM SELECT * FROM health_records;
END$$

DELIMITER ;


--- GET health record with respect to id
DELIMITER $$
CREATE PROCEDURE `getHealthRecord`(IN id int)
BEGIN
    SELECT * FROM health_records where id = id;
END$$

DELIMITER ;


--- GET all episodes
DELIMITER $$
CREATE PROCEDURE `getAllEpisodes`()
BEGIN
    SELECT * FROM episodes;
END$$

DELIMITER ;

--- GET episode details
DELIMITER $$
CREATE PROCEDURE `getEpisode`(IN id int)
BEGIN
    SELECT * FROM episodes where id = id;
END$$

DELIMITER ;

--- DELETE health record for a id 
CREATE PROCEDURE `deleteHealthRecord`(IN health_record_id int(11))
BEGIN
    DELETE FROM health_records WHERE id = health_record_id;
END$$

DELIMITER ;

--- DELETE episode for a id 
CREATE PROCEDURE `deleteEpisode`(IN episode_id int(11))
BEGIN
    DELETE FROM health_records WHERE id = episode_id;
END$$

DELIMITER ;

--- Notes:-
--- When user came first time, user table will populate
--- Episodes table will populate at the time of consulation, when user visits for consulation
--- health records table will populate at the time of consulation, having recorded episode id, consulation reason and prescription details to be set for a consulation. 


