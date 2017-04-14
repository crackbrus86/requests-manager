<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_category_weight';
$tb_name_age = $wpdb->get_blog_prefix() . 'rm_category_age';
$weightCategories = $wpdb->get_results("SELECT $tb_name.id, $tb_name.title_w, $tb_name_age.title FROM $tb_name JOIN  $tb_name_age ON $tb_name.parent = $tb_name_age.id");
$return = json_encode($weightCategories);
print_r($return);