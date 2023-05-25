-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TodoSchema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TodoSchema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `TodoSchema`;
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
  `U_Owner_Email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ListID`, `U_Owner_Email`),
  INDEX `fk_Lists_Users1_idx` (`U_Owner_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Lists_Users1`
    FOREIGN KEY (`U_Owner_Email`)
    REFERENCES `TodoSchema`.`Users` (`Email`)
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
  `O_Email` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CatID`, `L_ListID`, `O_Email`),
  INDEX `fk_Types_Lists1_idx` (`L_ListID` ASC, `O_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Types_Lists1`
    FOREIGN KEY (`L_ListID` , `O_Email`)
    REFERENCES `TodoSchema`.`Lists` (`ListID` , `U_Owner_Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TodoSchema`.`Todos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TodoSchema`.`Todos` ;

CREATE TABLE IF NOT EXISTS `TodoSchema`.`Todos` (
  `TodoID` INT NOT NULL AUTO_INCREMENT,
  `L_ListID` INT NOT NULL,
  `O_Email` VARCHAR(255) NOT NULL,
  `Index` INT NOT NULL,
  `Title` VARCHAR(255) NULL,
  `Content` JSON NULL,
  `StartDate` DATETIME NULL,
  `EndDate` DATETIME NULL,
  `C_CatID` INT NOT NULL,
  PRIMARY KEY (`TodoID`, `L_ListID`, `O_Email`),
  INDEX `fk_Todos_Lists1_idx` (`L_ListID` ASC, `O_Email` ASC) VISIBLE,
  INDEX `fk_Todos_Types1_idx` (`C_CatID` ASC) VISIBLE,
  CONSTRAINT `fk_Todos_Lists1`
    FOREIGN KEY (`L_ListID` , `O_Email`)
    REFERENCES `TodoSchema`.`Lists` (`ListID` , `U_Owner_Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Todos_Types1`
    FOREIGN KEY (`C_CatID`)
    REFERENCES `TodoSchema`.`Catagory` (`CatID`)
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
  `L_Owner_Email` VARCHAR(255) NOT NULL,
  `Write_Privilege` TINYINT NOT NULL,
  PRIMARY KEY (`Users_Email`, `L_ListID`, `L_Owner_Email`),
  INDEX `fk_Users_has_Lists_Lists1_idx` (`L_ListID` ASC, `L_Owner_Email` ASC) VISIBLE,
  INDEX `fk_Users_has_Lists_Users1_idx` (`Users_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Lists_Users1`
    FOREIGN KEY (`Users_Email`)
    REFERENCES `TodoSchema`.`Users` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Lists_Lists1`
    FOREIGN KEY (`L_ListID` , `L_Owner_Email`)
    REFERENCES `TodoSchema`.`Lists` (`ListID` , `U_Owner_Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
