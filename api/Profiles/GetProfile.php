<?php
    require_once("../wpdb-connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_profiles = $wpdb->get_blog_prefix() . "rm_profiles";
        $userId = strip_tags(stripslashes(trim($_POST['userId'])));
        $sql = $wpdb->prepare("SELECT * FROM $tb_profiles WHERE UserId = %d", $userId);
        $profile = $wpdb->get_row($sql);
        $response = json_encode($profile);
        echo $response;
    endif;