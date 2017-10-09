<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $sql = $wpdb->prepare("DELETE FROM $tb_users WHERE id = %d", $id);
    if($wpdb->query($sql)) echo "User was deleted";
    $sql1 = $wpdb->prepare("DELETE FROM $tb_requests WHERE user_id = %d", $id);
    if($wpdb->query($sql1)) echo "Request was deleted";
    $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
    $sql2 = $wpdb->prepare("DELETE FROM $tb_visa WHERE owner_type = %s AND owner_id = %d", "athlete", $id);
    if($wpdb->query($sql2)) echo "Users visa records were removed";
}