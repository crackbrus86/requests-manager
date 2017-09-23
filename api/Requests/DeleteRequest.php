<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $requestId = strip_tags(stripslashes(trim($_POST['id'])));
    $sql = $wpdb->prepare("DELETE FROM $tb_requests WHERE id = %d", $requestId);
    if($wpdb->query($sql)) echo "Request was deleted";
}