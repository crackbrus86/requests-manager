<?php
require_once("../wpdb-connect.php");
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$limit = strip_tags(stripcslashes(trim($_POST["limit"])));
$offset = strip_tags(stripcslashes(trim($_POST["offset"])));
$users = $wpdb->get_results("SELECT id, first_name, last_name, middle_name, birth_date 
FROM $tb_users ORDER BY last_name ASC LIMIt $limit OFFSET $offset");
$users = json_encode($users);
print_r($users);