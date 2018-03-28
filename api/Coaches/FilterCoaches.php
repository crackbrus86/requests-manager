<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $search = strip_tags(stripslashes(trim($_POST["search"])));
    $search = $wpdb->esc_like($search);
    $search = "%" . $search . "%";
    $sql = $wpdb->prepare("SELECT id, first_name AS name, last_name AS surname, middle_name AS mName, birth_date AS born
    FROM $tb_coaches WHERE first_name LIKE %s OR last_name LIKE %s ORDER BY last_name ASC", $search, $search);
    $coaches = $wpdb->get_results($sql);
    $coaches = json_encode($coaches);
    print_r($coaches);
endif;