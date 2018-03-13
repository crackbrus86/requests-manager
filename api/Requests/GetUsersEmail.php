<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $year = esc_sql(strip_tags(stripcslashes(trim($_POST['year']))));
    $games = implode(',', $_POST['games']);
    $sql = $wpdb->prepare("SELECT DISTINCT us.email FROM $tb_requests rq
        JOIN $tb_users us
            ON us.id = rq.user_id
        WHERE rq.current_competition IN (".$games.") AND rq.year = %s", $year);
    $result = $wpdb->get_results($sql);
    echo json_encode($result);
endif;