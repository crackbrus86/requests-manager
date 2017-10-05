<?php
require_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $limit = strip_tags(stripslashes(trim($_POST["limit"])));
    $offset = strip_tags(stripslashes(trim($_POST["offset"])));
    $sql = $wpdb->prepare("SELECT id, first_name AS name, last_name AS surname, middle_name AS mName, birth_date AS born
    FROM $tb_coaches ORDER BY last_name ASC LIMIT %d OFFSET %d", $limit, $offset);
    $results = $wpdb->get_results($sql);
    $coaches = json_encode($results);
    print_r($coaches);
endif;