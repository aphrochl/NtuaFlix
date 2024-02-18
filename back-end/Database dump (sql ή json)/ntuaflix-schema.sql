-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `ntuaflix` ;

CREATE SCHEMA IF NOT EXISTS `ntuaflix` DEFAULT CHARACTER SET latin1;
USE `ntuaflix` ;

-- ----------------------------------
-- TABLES
-- ----------------------------------


-- Principal
CREATE TABLE IF NOT EXISTS `principal` (
  `principal_id` VARCHAR(255) NOT NULL,
  `principal_name` VARCHAR(255) NOT NULL,
  `principal_birthYr` INT NULL,
  `principal_deathYr` INT NULL,
  `principal_profession` VARCHAR(255) NOT NULL,
  `titles_titles_id` VARCHAR(255) NULL,
  `principal_imageURL` VARCHAR(255) NULL,
  PRIMARY KEY (`principal_id`));
  

-- Title
CREATE TABLE IF NOT EXISTS `title_basics` (
  `title_id` VARCHAR(255) NOT NULL,
  `title_type` VARCHAR(255) NOT NULL,
  `title_primaryTitle` VARCHAR(255) NOT NULL,
  `title_originalTitle` VARCHAR(255) NOT NULL,
  `title_isAdult` INT NOT NULL,
  `title_startYear` INT NOT NULL,
  `title_endYear` INT NULL,
  `title_runtimeMinutes` INT NULL,
  `title_genre` VARCHAR(255) NULL,
  `title_posterURL` VARCHAR(255) NULL,
  PRIMARY KEY (`title_id`));

CREATE TABLE IF NOT EXISTS `title_AKAs` (
	`AKA_index` INT NOT NULL AUTO_INCREMENT,
	`title_title_id` VARCHAR(255) NOT NULL,
    `AKA_ordering` INT NOT NULL,
    `AKA_title` VARCHAR(255) NOT NULL,
    `AKA_region` VARCHAR(4) NULL,
    `AKA_language` VARCHAR(4) NULL,
    `AKA_types` VARCHAR(255) NULL,
    `AKA_attributes` VARCHAR(255) NULL,
    `AKA_isOriginal` INT NOT NULL,
    PRIMARY KEY (`AKA_index`),
    CONSTRAINT `fk_AKA_title_id`
    FOREIGN KEY (`title_title_id`) REFERENCES `title_basics` (`title_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `title_principals` (
	`title_title_id` VARCHAR(255) NOT NULL,
    `principal_ordering` INT NOT NULL,
    `principal_principal_id` VARCHAR(255) NOT NULL,
    `principal_category` VARCHAR(255) NOT NULL,
    `principal_job` VARCHAR(255) NULL,
    `principal_character` VARCHAR(255) NULL,
    `principal_poster` VARCHAR(255) NULL ,
    PRIMARY KEY (`title_title_id`, `principal_principal_id`),
    CONSTRAINT `fk_principal_title_id`
    FOREIGN KEY (`title_title_id`) REFERENCES `title_basics` (`title_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_principal_id`
    FOREIGN KEY (`principal_principal_id`) REFERENCES `principal` (`principal_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `title_ratings` (
	`title_title_id` VARCHAR(255) NOT NULL,
	`rating_avg` VARCHAR(255) NOT NULL,
	`rating_numVotes` INT NOT NULL,
	PRIMARY KEY (`title_title_id`),
	CONSTRAINT `fk_rating_title_id`
	FOREIGN KEY (`title_title_id`) REFERENCES `title_basics` (`title_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `title_crew` (
	`title_title_id` VARCHAR(255) NOT NULL,
    `principal_directors_id` VARCHAR(255) NULL,
    `principal_writers_id` VARCHAR(255) NULL,
    PRIMARY KEY (`title_title_id`),
    CONSTRAINT `fk_crew_title_id`
	FOREIGN KEY (`title_title_id`) REFERENCES `title_basics` (`title_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
    CONSTRAINT `fk_crew_directors_id`
	FOREIGN KEY (`principal_directors_id`) REFERENCES `principal` (`principal_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
    CONSTRAINT `fk_crew_writers_id`
	FOREIGN KEY (`principal_writers_id`) REFERENCES `principal` (`principal_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `title_episode` (
	`title_episode_id` VARCHAR(255) NOT NULL,
	`title_series_id` VARCHAR(255) NOT NULL,
    `title_season_NO` INT NULL,
    `title_episode_NO` VARCHAR(4) NULL,
    PRIMARY KEY (`title_episode_id`),
    CONSTRAINT `fk_episode_title_id`
	FOREIGN KEY (`title_episode_id`) REFERENCES `title_basics` (`title_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
    CONSTRAINT `fk_series_title_id`
	FOREIGN KEY (`title_series_id`) REFERENCES `title_basics` (`title_id`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);
    
    