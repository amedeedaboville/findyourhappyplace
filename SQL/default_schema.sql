CREATE TABLE `users` (
    `ID` int(10) unsigned NOT NULL auto_increment,
    `username` varchar(255) default NULL,
    `password` varchar(255) default NULL,
    `email` varchar(255) default NULL,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `locations` (
	`geolat` float(10,4) NOT NULL default '0',
	`geolng` float(10,4) NOT NULL default '0',
	`overall_happiness` float(4,2) default NULL,
	`number_of_entries` int(8) default 0,
	PRIMARY KEY (`geolat`, `geolng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `data` (
	`user_ID` int(10) unsigned NOT NULL,
	`geolat` float(10,4) default NULL,
	`geolng` float(10,4) default NULL,
	`happiness` float(6,4) default NULL,
	`date_time` datetime default NULL,
	PRIMARY KEY (`user_ID`, `date_time`),
	FOREIGN KEY(user_ID) REFERENCES users(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DELIMITER //
CREATE TRIGGER test
	AFTER INSERT ON data FOR EACH ROW
	BEGIN
	DECLARE geo_exists Boolean;
	SELECT 1
	INTO @geo_exists
	FROM locations
	WHERE locations.geolat=NEW.geolat AND locations.geolng=NEW.geolng;
	IF @geo_exists=1
	THEN
	UPDATE locations
	SET 
	locations.overall_happiness = (((locations.overall_happiness * locations.number_of_entries) + NEW.happiness) / (locations.number_of_entries + 1)),
	locations.number_of_entries = (locations.number_of_entries + 1)
	WHERE locations.geolat=NEW.geolat AND locations.geolng=NEW.geolng;
	ELSE
	INSERT INTO locations (geolat, geolng, overall_happiness, number_of_entries)
	VALUES (NEW.geolat, NEW.geolng, NEW.happiness, 1);
	END IF;
	END;//
DELIMITER;