<?php
require_once("../wpdb-connect.php");
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$userId = $_POST["userId"];
$user = $wpdb->get_results("SELECT * FROM $tb_users WHERE id = $userId");
$result = json_encode($user);
print_r($result);