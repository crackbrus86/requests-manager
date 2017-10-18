<?php
include("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $sql = $wpdb->prepare("DELETE FROM $tb_visa WHERE id = %d", $id);
    if($wpdb->query($sql)) echo "Visa was deleted";
}