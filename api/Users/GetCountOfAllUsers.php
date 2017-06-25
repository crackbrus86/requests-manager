<?php
include_once("../wpdb-connect.php");
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$users_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_users ", ''));
echo $users_count;