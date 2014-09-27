CREATE TABLE `users` (
    `ID` int(10) unsigned NOT NULL auto_increment,
    `username` varchar(255) default NULL,
    `password` varchar(255) default NULL,
    `email` varchar(255) default NULL,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `location` (
	`geolat` float(10,4) NOT NULL default '0',
	`geolng` float(10,4) NOT NULL default '0',
	`overall_happiness` float(4,2) default NULL,
	PRIMARY KEY (`geolat`, `geolng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `data` (
	`user_ID` int(10) unsigned NOT NULL,
	`geolat` float(10,4) default NULL,
	`geolng` float(10,4) default NULL,
	`happiness` float(6,4) default NULL,
	`date_time` date default NULL,
	PRIMARY KEY (`user_ID`, `date_time`),
	FOREIGN KEY(user_ID) REFERENCES users(`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;