<?php
    include("../wpdb-connect.php");
    $tb_verify = $wpdb->get_blog_prefix()."rm_verify";
    $userId = strip_tags(stripslashes(trim($_POST["userId"])));
    $code = strip_tags(stripslashes(trim($_POST["code"])));

    $sql = $wpdb->prepare("SELECT id FROM $tb_verify WHERE user_id = %d AND code = %d", $userId, $code);
    $match = $wpdb->get_row($sql);

    $remove = $wpdb->prepare("DELETE FROM $tb_verify WHERE user_id = %d", $userId);
    $wpdb->query($remove);

    if($match){
        print_r($match);
    }