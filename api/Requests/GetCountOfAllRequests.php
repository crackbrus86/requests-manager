<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";

    $year = esc_sql(strip_tags(stripcslashes(trim($_POST['year']))));
    $game = esc_sql(strip_tags(stripcslashes(trim($_POST['game']))));

    $requests_count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $tb_requests WHERE year = %s AND current_competition = %d", $year, $game));
    echo $requests_count;
endif;