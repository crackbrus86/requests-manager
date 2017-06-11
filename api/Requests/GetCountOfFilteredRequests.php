<?php
include_once("../wpdb-connect.php");
$competition = strip_tags(stripslashes(trim($_POST["competition"])));
$startDate = strip_tags(stripslashes(trim($_POST["startDate"])));
$endDate = strip_tags(stripslashes(trim($_POST["endDate"])));
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$requests_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_requests 
WHERE $tb_requests.current_competition = '$competition'  AND ($tb_requests.create_date BETWEEN  '$startDate' AND '$endDate')", ''));
print_r($requests_count);