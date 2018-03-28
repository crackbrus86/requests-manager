<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $search = strip_tags(stripslashes(trim($_POST["search"])));
    $search = $wpdb->esc_like($search);
    $search = '%' . $search . '%';

    $sql = $wpdb->prepare("SELECT  id, first_name AS firstName, last_name AS lastName, middle_name AS mName, birth_date AS born
    FROM $tb_users WHERE first_name LIKE %s OR last_name LIKE %s ORDER BY last_name ASC", $search, $search);
    $users = $wpdb->get_results($sql);
    $users = json_encode($users);
    print_r($users);
endif;