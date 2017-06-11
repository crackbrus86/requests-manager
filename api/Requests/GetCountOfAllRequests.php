<?php
include_once("../wpdb-connect.php");
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$requests_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_requests ", ''));
echo $requests_count;