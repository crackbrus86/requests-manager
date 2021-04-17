<?php
include_once("../wpdb-connect.php");
include_once("../functions.php");
$tb_weight_categories = $wpdb->get_blog_prefix() . 'rm_category_weight';
$sql = $wpdb->prepare("SELECT * FROM $tb_weight_categories", "");
$result = $wpdb->get_results($sql);
$result = array_map("addWeightField", $result);
usort($result, "sortByWeigth");
$weightCategories = json_encode($result);
print_r($weightCategories);