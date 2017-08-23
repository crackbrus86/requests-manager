<?php
	global $wpdb;
		$tb_name = $wpdb->get_blog_prefix() . 'rm_before_games';
		$charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset} COLLATE {$wpdb->collate}";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		$sql = "CREATE TABLE IF NOT EXISTS {$tb_name} (
					`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
					`name` VARCHAR(500) NOT NULL,
                    `type` INT
		) {$charset_collate};";
		dbDelta($sql);
        $tb_games = $wpdb->get_blog_prefix() . 'rm_actual_games';
        $createGamesTab = "CREATE TABLE IF NOT EXISTS {$tb_games} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `name` VARCHAR(500) NOT NULL,
            `type` INT,
            `year` VARCHAR(5),
            `expire_day` DATE
        ) {$charset_collate}";
        dbDelta($createGamesTab);
        $tb_category_age = $wpdb->get_blog_prefix() . 'rm_category_age';
        $createCategoryAgeTab = "CREATE TABLE IF NOT EXISTS {$tb_category_age} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `title` VARCHAR(200) NOT NULL
        ) {$charset_collate}";
        dbDelta($createCategoryAgeTab);
        $tb_category_weight = $wpdb->get_blog_prefix() . 'rm_category_weight';
        $createCategoryWeightTab = "CREATE TABLE IF NOT EXISTS {$tb_category_weight} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `title_w` VARCHAR(200) NOT NULL,
            `parent` INT
        ) {$charset_collate}";
        dbDelta($createCategoryWeightTab);
        $tb_regions = $wpdb->get_blog_prefix() . 'rm_regions';
        $createRegionsTab = "CREATE TABLE IF NOT EXISTS {$tb_regions} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `region` VARCHAR(200) NOT NULL
        ) {$charset_collate}";
        dbDelta($createRegionsTab);
        $tb_users = $wpdb->get_blog_prefix().'rm_users';
        $createUsersTab = "CREATE TABLE IF NOT EXISTS {$tb_users} (
            `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `last_name` VARCHAR(50) NOT NULL,
            `first_name` VARCHAR(30) NOT NULL,
            `middle_name` VARCHAR(30) NOT NULL,
            `birth_date` DATE NOT NULL,
            `region` INT NOT NULL,
            `last_name_pass` VARCHAR(50) NOT NULL,
            `first_name_pass` VARCHAR(30) NOT NULL,
            `serial_number_pass` VARCHAR(4) NOT NULL,
            `number_pass` VARCHAR(6) NOT NULL,
            `expiration_date_pass` DATE NOT NULL,
            `individual_number` VARCHAR(10) NOT NULL,
            `phone` VARCHAR(20) NOT NULL,
            `email` VARCHAR(50) NOT NULL,
            `photo_national_pass_id` BIGINT NOT NULL,
            `photo_international_pass_id` BIGINT NOT NULL,
            `accreditation_photo_id` BIGINT NOT NULL
        ) {$charset_collate}";
        dbDelta($createUsersTab);
        $tb_coaches = $wpdb->get_blog_prefix().'rm_coaches';
        $createCoachesTab = "CREATE TABLE IF NOT EXISTS {$tb_coaches} (
            `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `accompanies` VARCHAR(5) NOT NULL,
            `last_name` VARCHAR(50) NOT NULL,
            `first_name` VARCHAR(30) NOT NULL,
            `middle_name` VARCHAR(30) NOT NULL,
            `birth_date` DATE NOT NULL,
            `region` INT,
            `last_name_pass` VARCHAR(50),
            `first_name_pass` VARCHAR(30),
            `serial_number_pass` VARCHAR(4),
            `number_pass` VARCHAR(6),
            `expiration_date_pass` DATE,
            `individual_number` VARCHAR(10),
            `phone` VARCHAR(20),
            `email` VARCHAR(50),
            `photo_national_pass_id` BIGINT,
            `photo_international_pass_id` BIGINT,
            `accreditation_photo_id` BIGINT
        ) {$charset_collate}";
        dbDelta($createCoachesTab);
        $tb_requests = $wpdb->get_blog_prefix().'rm_requests';
        $createRequestsTab = "CREATE TABLE IF NOT EXISTS {$tb_requests} (
            `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `user_id` BIGINT NOT NULL,
            `create_date` DATE NOT NULL,
            `age_category` INT NOT NULL,
            `weight_category` INT NOT NULL,
            `current_competition` INT NOT NULL,
            `disciplines` VARCHAR(250) NOT NULL,
            `pre_competition` INT NOT NULL,
            `coaches` VARCHAR(500) NOT NULL,
            `doping` VARCHAR(250) NOT NULL,
            `visa` VARCHAR(250),
            'year' VARCHAR(4)
        ) {$charset_collate}";
        dbDelta($createRequestsTab);
        $tb_others = $wpdb->get_blog_prefix()."rm_others";
        $createOthersTab = "CREATE TABLE IF NOT EXISTS {$tb_others} (
            `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `president_name` VARCHAR(250),
            `president_region` INT
        ) {$charset_collate}";
        dbDelta($createOthersTab);
        $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
        $createVisaTab = "CREATE TABLE IF NOT EXISTS {$tb_visa} (
            `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `owner_type` VARCHAR(10) NOT NULL,
            `owner_id` BIGINT NOT NULL,
            `type` VARCHAR(2) NOT NULL,
            `term` DATE NOT NULL,
            `event` INT,
            `year` VARCHAR(5)
        ) {$charset_collate}";
        dbDelta($createVisaTab);