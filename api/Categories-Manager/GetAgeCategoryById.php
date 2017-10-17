<?php
include_once("../wpdb-connect.php");
$id = strip_tags(stripslashes(trim($_POST["id"])));
$tb_age_categories = $wpdb->get_blog_prefix() . 'rm_category_age';
$sql = $wpdb->prepare("SELECT * FROM $tb_age_categories WHERE id = %d", $id);
$result = $wpdb->get_results($sql);
$ageCategory = json_encode($result);
print_r($ageCategory);