-- schema creation --
drop schema if exists restaurant;
create schema if not exists restaurant 
character set 'utf8mb4' collate 'utf8mb4_unicode_ci';

use restaurant;

-- tables creation --
drop table if exists restaurant_defn;
CREATE TABLE IF NOT EXISTS restaurant_defn (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_name VARCHAR(60) NOT NULL,
    FULLTEXT name_idx ( restaurant_name )
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists countries;
CREATE TABLE IF NOT EXISTS countries (
    country_code VARCHAR(4) PRIMARY KEY,
    country_name VARCHAR(60) NOT NULL
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists cities;
CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(60) NOT NULL,
    country_code VARCHAR(4),
    FULLTEXT city_idx ( city ),
    FULLTEXT state_idx ( state ),
    FOREIGN KEY (country_code)
        REFERENCES countries (country_code)
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists restaurant_branch;
CREATE TABLE IF NOT EXISTS restaurant_branch (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    latitude DECIMAL(10 , 10 ),
    longitude DECIMAL(10 , 10 ),
    street VARCHAR(60) NOT NULL,
    locality VARCHAR(60) NOT NULL,
    city_id INT,
    FULLTEXT street_idx ( street ),
    FULLTEXT locality_idx ( locality ),
    FOREIGN KEY (city_id)
        REFERENCES cities (id)
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists cuisine_defn;
CREATE TABLE IF NOT EXISTS cuisine_defn (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cuisine_name VARCHAR(50) NOT NULL,
    FULLTEXT name_idx ( cuisine_name )
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists dishes;
CREATE TABLE IF NOT EXISTS dishes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dish_name VARCHAR(100) NOT NULL,
    FULLTEXT name_idx ( dish_name )
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists restaurant_cuisine_map;
CREATE TABLE IF NOT EXISTS restaurant_cuisine_map (
    id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    cuisine_id INT,
    FOREIGN KEY (branch_id)
        REFERENCES restaurant_branch (id),
    FOREIGN KEY (cuisine_id)
        REFERENCES cuisine_defn (id)
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;

drop table if exists restaurant_menu;
CREATE TABLE IF NOT EXISTS restaurant_menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    dish_id INT,
    description VARCHAR(200) NOT NULL DEFAULT ''
)  DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_UNICODE_CI;