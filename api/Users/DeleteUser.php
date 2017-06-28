<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $query = $wpdb->query("DELETE FROM $tb_users WHERE id = '$id'");
    print_r($query);
    $query2 = $wpdb->query("DELETE FROM $tb_requests WHERE user_id = '$id'");
    print_r($query2);
}