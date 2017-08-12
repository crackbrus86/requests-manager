<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_actual_games';
$currentDay = strip_tags(stripslashes(trim($_POST["currentDay"])));
$newtable = $wpdb->get_results( "SELECT * FROM $tb_name WHERE expire_day >= '$currentDay'" );
$return = json_encode($newtable);
print_r($return);