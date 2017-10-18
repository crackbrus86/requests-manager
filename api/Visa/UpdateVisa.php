<?php
include("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_visa = $wpdb->get_blog_prefix()."rm_visa";

    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $type = strip_tags(stripslashes(trim($_POST["type"])));
    $expires = strip_tags(stripslashes(trim($_POST["expires"])));

    $sql = $wpdb->prepare("UPDATE $tb_visa SET type = %s, term = %s WHERE id = %d", $type, $expires, $id);
    if($wpdb->query($sql)) echo "Visa was updated";
}