<?php
include_once("../wpdb-connect.php");
$tb_weight_categories = $wpdb->get_blog_prefix() . 'rm_category_weight';
$sql = $wpdb->prepare("SELECT * FROM $tb_weight_categories", "");
$result = $wpdb->get_results($sql);
$weightCategories = json_encode($result);
print_r($weightCategories);