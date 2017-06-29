<?php
require_once("../wpdb-connect.php");
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$coachId = $_POST["coachId"];
$coach = $wpdb->get_results("SELECT * FROM $tb_coaches WHERE id = $coachId");
$result = json_encode($coach);
print_r($result);