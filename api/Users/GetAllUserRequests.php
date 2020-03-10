<?php
require_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $tb_actual_games = $wpdb->get_blog_prefix() . "rm_actual_games";
    $userId = $_GET["userId"];
    $year = $_GET["year"];
    $sql = $wpdb->prepare("SELECT a.id as requestId, b.name as eventTitle, b.id AS eventId, a.create_date AS createdDate, b.year AS eventYear
    FROM $tb_requests a
    JOIN $tb_actual_games b ON b.id = a.current_competition
    WHERE a.user_id = %d AND b.year = %d", $userId, $year);
    $result = $wpdb->get_results($sql);
    $response = json_encode($result);
    print_r($response);
endif;