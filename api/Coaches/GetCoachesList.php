<?php
require_once("../wpdb-connect.php");
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$sql = $wpdb->prepare("SELECT id, first_name AS name, last_name AS surname, middle_name AS mName
FROM $tb_coaches", "");
$coaches = $wpdb->get_results($sql);
print_r(json_encode($coaches));