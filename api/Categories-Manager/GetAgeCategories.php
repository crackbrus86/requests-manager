<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_category_age';
$ageCategories = $wpdb->get_results( "SELECT * FROM $tb_name" );
$return = json_encode($ageCategories);
print_r($return);