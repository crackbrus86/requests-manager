<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tableRequests = $wpdb->get_blog_prefix() . "rm_requests";
    $tableUsers = $wpdb->get_blog_prefix() . "rm_users";
    $year = esc_sql(strip_tags(stripslashes(trim($_POST["year"]))));
    $games = implode(",", $_POST["games"]);
    $sql = $wpdb->prepare("SELECT b.phone FROM $tableRequests a
    JOIN $tableUsers b ON b.id = a.user_id
    WHERE a.current_competition IN (" . $games . ") AND a.year = %s", $year);
    $result = $wpdb->get_results($sql);
    echo json_encode($result);
endif;