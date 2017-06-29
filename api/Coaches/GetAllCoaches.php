<?php
require_once("../wpdb-connect.php");
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$limit = strip_tags(stripcslashes(trim($_POST["limit"])));
$offset = strip_tags(stripcslashes(trim($_POST["offset"])));
$coaches = $wpdb->get_results("SELECT id, first_name, last_name, middle_name, birth_date 
FROM $tb_coaches ORDER BY last_name ASC LIMIt $limit OFFSET $offset");
$coaches = json_encode($coaches);
print_r($coaches);