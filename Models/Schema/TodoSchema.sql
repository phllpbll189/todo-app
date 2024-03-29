-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TodoSchema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `TodoSchema` ;

-- -----------------------------------------------------
-- Schema TodoSchema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TodoSchema` ;
USE `TodoSchema` ;

-- -----------------------------------------------------
-- Table `TodoSchema`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Users` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Users` (
  `Email` VARCHAR(255) NOT NULL,
  `Pass` VARCHAR(255) NOT NULL,
  `Token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TodoSchema`.`Lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Lists` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Lists` (
  `ListID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ListID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TodoSchema`.`Todos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Todos` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Todos` (
  `TodoID` INT NOT NULL AUTO_INCREMENT,
  `L_ListID` INT NOT NULL,
  `X` INT NOT NULL,
  `Y` INT NOT NULL,
  `Title` VARCHAR(255) NULL,
  `Content` JSON NULL,
  `StartDate` DATETIME NULL,
  `EndDate` DATETIME NULL,
  PRIMARY KEY (`TodoID`, `L_ListID`),
  INDEX `fk_Todos_Lists1_idx` (`L_ListID` ASC) VISIBLE,
  CONSTRAINT `fk_Todos_Lists1`
    FOREIGN KEY (`L_ListID`)
    REFERENCES `TodoSchema`.`Lists` (`ListID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TodoSchema`.`Catagory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Catagory` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Catagory` (
  `CatID` INT NOT NULL AUTO_INCREMENT,
  `L_ListID` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `X` INT NOT NULL,
  `Y` INT NOT NULL,
  `Width` INT NOT NULL,
  `Height` INT NOT NULL,
  PRIMARY KEY (`CatID`, `L_ListID`),
  INDEX `fk_Types_Lists1_idx` (`L_ListID` ASC) VISIBLE,
  CONSTRAINT `fk_Types_Lists1`
    FOREIGN KEY (`L_ListID`)
    REFERENCES `TodoSchema`.`Lists` (`ListID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TodoSchema`.`Invite_List`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Invite_List` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Invite_List` (
  `Users_Email` VARCHAR(255) NOT NULL,
  `L_ListID` INT NOT NULL,
  `Write_Privilege` TINYINT NOT NULL,
  `Owner` TINYINT NOT NULL,
  `invite_accepted` TINYTEXT NULL,
  PRIMARY KEY (`Users_Email`, `L_ListID`),
  INDEX `fk_Users_has_Lists_Lists1_idx` (`L_ListID` ASC) VISIBLE,
  INDEX `fk_Users_has_Lists_Users1_idx` (`Users_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Lists_Users1`
    FOREIGN KEY (`Users_Email`)
    REFERENCES `TodoSchema`.`Users` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Lists_Lists1`
    FOREIGN KEY (`L_ListID`)
    REFERENCES `TodoSchema`.`Lists` (`ListID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
