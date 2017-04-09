<?php
include_once("../wpdb-connect.php");
$id =$_POST['id'];
$tb_name = $wpdb->get_blog_prefix() . 'rm_category_age';
$newtable = $wpdb->get_results( "SELECT * FROM $tb_name WHERE id=$id" );
$return = json_encode($newtable);
print_r($return);