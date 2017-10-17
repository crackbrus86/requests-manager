<?php
include_once("../wpdb-connect.php");
$tb_age_categories = $wpdb->get_blog_prefix() . 'rm_category_age';
$sql = $wpdb->prepare("SELECT * FROM $tb_age_categories", "");
$ageCategories = $wpdb->get_results($sql);
$return = json_encode($ageCategories);
print_r($return);