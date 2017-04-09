<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_actual_games';
$newtable = $wpdb->get_results( "SELECT * FROM $tb_name" );
$return = json_encode($newtable);
print_r($return);