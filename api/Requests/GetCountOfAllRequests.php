<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";

    $year = esc_sql(strip_tags(stripcslashes(trim($_POST['year']))));
    $games = implode(',', $_POST['games']);

    $requests_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_requests WHERE year = %s AND current_competition IN (".$games.")", $year));
    echo $requests_count;
endif;