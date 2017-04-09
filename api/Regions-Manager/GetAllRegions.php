<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_regions';
$regions = $wpdb->get_results( "SELECT * FROM $tb_name" );
$return = json_encode($regions);
print_r($return);