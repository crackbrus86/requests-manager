<?php
require_once('../../../wp-load.php');
global $wpdb;

//08 Jul 2023
// $tb_for_passport = $wpdb->get_blog_prefix() . "rm_for_passport";
// $result = $wpdb->get_results("ALTER TABLE $tb_for_passport ADD IssuedBy VARCHAR(300) DEFAULT NULL");

// $tb_users = $wpdb->get_blog_prefix() . "rm_users";
// $result = $wpdb->get_results("ALTER TABLE $tb_users ADD foreign_pass_issued_by VARCHAR(300) DEFAULT NULL");

// $tb_coaches = $wpdb->get_blog_prefix() . "rm_coaches";
// $result = $wpdb->get_results("ALTER TABLE $tb_coaches ADD foreign_pass_issued_by VARCHAR(300) DEFAULT NULL");

// $tb_others = $wpdb->get_blog_prefix() . "rm_others";
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_issued_by VARCHAR(300) DEFAULT NULL");
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_expiration_date DATE DEFAULT NULL");
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD individual_no VARCHAR(10) DEFAULT NULL");

//01 Apr 2023
// $tb_users = $wpdb->get_blog_prefix().'rm_users';
// $result = $wpdb->get_results("ALTER TABLE $tb_users ADD certificate_adel BIGINT DEFAULT NULL");

//01 Apr 2023
// $tb_others = $wpdb->get_blog_prefix() . 'rm_others';
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD president_name_latin VARCHAR(250) DEFAULT NULL");
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD date_of_birth DATE DEFAULT NULL");
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_no_prefix VARCHAR(4) DEFAULT NULL");
// $result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_no VARCHAR(6) DEFAULT NULL");

//23 May 2023
// echo "Add ADEL Certificate to users table...";
// $tb_users = $wpdb->get_blog_prefix().'rm_users';
// $result = $wpdb->get_results("ALTER TABLE $tb_users ADD certificate_adel BIGINT DEFAULT NULL");

echo "Done";
?>