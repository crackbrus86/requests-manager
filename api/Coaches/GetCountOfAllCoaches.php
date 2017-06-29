<?php
include_once("../wpdb-connect.php");
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$coaches_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_coaches ", ''));
echo $coaches_count;