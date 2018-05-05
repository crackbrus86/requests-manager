<?php
    require_once("../wpdb-connect.php");

    if(current_user_can("edit_others_pages")):
        $tb_profiles = $wpdb->get_blog_prefix() . "rm_profiles";
        $profileId = strip_tags(stripslashes(trim($_POST["profileId"])));
        $sql = $wpdb->prepare("DELETE FROM $tb_profiles WHERE ProfileId = %d", $profileId);
        if($wpdb->query($sql)) echo "Profile was deleted";
    endif;