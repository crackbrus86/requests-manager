<?php
include_once("../wpdb-connect.php");
$tb_weight_categories = $wpdb->get_blog_prefix() . 'rm_category_weight';
$tb_age_categories = $wpdb->get_blog_prefix() . 'rm_category_age';
$sql = $wpdb->prepare("SELECT w.id, w.title_w, a.title
FROM $tb_weight_categories AS w
JOIN $tb_age_categories AS a
    ON w.parent = a.id", "");
$result = $wpdb->get_results($sql);
$weightCategories = json_encode($result);
print_r($weightCategories);