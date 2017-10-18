<?php
include_once("../wpdb-connect.php");
$id = strip_tags(stripslashes(trim($_POST["id"])));
$tb_regions = $wpdb->get_blog_prefix() . 'rm_regions';
$sql = $wpdb->prepare("SELECT * FROM $tb_regions WHERE id = %d", $id);
$result = $wpdb->get_results($sql);
$region = json_encode($result);
print_r($region);