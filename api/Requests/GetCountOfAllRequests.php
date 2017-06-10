<?php
include_once("../wpdb-connect.php");
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$count = $wpdb->query("SELECT COUNT(*) FROM $tb_requests");
echo $count;