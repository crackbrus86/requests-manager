<?php
include_once("../wpdb-connect.php");
$id = strip_tags(stripslashes(trim($_POST["id"])));
$tb_weight_categories = $wpdb->get_blog_prefix() . 'rm_category_weight';
$sql = $wpdb->prepare("SELECT * FROM $tb_weight_categories WHERE id= %d", $id);
$result = $wpdb->get_results($sql);
$weightCategory = json_encode($result);
print_r($weightCategory);