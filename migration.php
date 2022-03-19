<?php
require_once('../../../wp-load.php');
global $wpdb;
$tb_users = $wpdb->get_blog_prefix().'rm_users';
$result = $wpdb->get_results("ALTER TABLE $tb_users ADD certificate_adel BIGINT DEFAULT NULL");
echo "Done";
?>