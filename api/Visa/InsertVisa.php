<?php
    include("../wpdb-connect.php");
    if(current_user_can("edit_others_pages")){
        $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
        $ownerType = strip_tags(stripslashes($_POST["ownerType"]));
        $ownerId = strip_tags(stripslashes($_POST["ownerId"]));
        $type = strip_tags(stripslashes($_POST["type"]));
        $term = strip_tags(stripslashes($_POST["term"]));
        $event = strip_tags(stripslashes($_POST["event"]));
        $year = strip_tags(stripslashes($_POST["year"]));

        $sql = $wpdb->prepare("INSERT INTO $tb_visa (owner_type, owner_id, type, term, event, year) VALUES(%s, %d, %s, %s, %d, %s)", 
        $ownerType, $ownerId, $type, $term, $event, $year);
        if($wpdb->query($sql)) echo "Visa was inserted";
    }