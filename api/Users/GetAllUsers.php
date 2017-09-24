<?php
require_once("../wpdb-connect.php");
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$limit = strip_tags(stripslashes(trim($_POST["limit"])));
$offset = strip_tags(stripslashes(trim($_POST["offset"])));

$sql = $wpdb->prepare("SELECT id, first_name AS firstName, last_name AS lastName, middle_name AS mName, birth_date AS born
FROM $tb_users ORDER BY last_name ASC LIMIT %d OFFSET %d", $limit, $offset);
$users = $wpdb->get_results($sql);
$users = json_encode($users);
print_r($users);