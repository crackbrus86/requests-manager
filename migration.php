<?php
require_once('../../../wp-load.php');
global $wpdb;
// $tb_users = $wpdb->get_blog_prefix().'rm_users';
// $result = $wpdb->get_results("ALTER TABLE $tb_users ADD certificate_adel BIGINT DEFAULT NULL");

//01 Apr 2023
$tb_others = $wpdb->get_blog_prefix() . 'rm_others';
$result = $wpdb->get_results("ALTER TABLE $tb_others ADD president_name_latin VARCHAR(250) DEFAULT NULL");
$result = $wpdb->get_results("ALTER TABLE $tb_others ADD date_of_birth DATE DEFAULT NULL");
$result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_no_prefix VARCHAR(4) DEFAULT NULL");
$result = $wpdb->get_results("ALTER TABLE $tb_others ADD foreign_pass_no VARCHAR(6) DEFAULT NULL");

echo "Done";
?>