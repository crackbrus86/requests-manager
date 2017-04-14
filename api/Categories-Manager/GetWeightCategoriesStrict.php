<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_category_weight';
$weightCategories = $wpdb->get_results("SELECT * FROM $tb_name");
$return = json_encode($weightCategories);
print_r($return);