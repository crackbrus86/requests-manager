<?php
include_once("../wpdb-connect.php");
$id = strip_tags(stripslashes(trim($_POST['id'])));
$tb_actual_games = $wpdb->get_blog_prefix() . 'rm_actual_games';
$sql = $wpdb->prepare("SELECT * FROM $tb_actual_games WHERE id = %d", $id);
$result = $wpdb->get_results($sql);
$actualGame = json_encode($result);
print_r($actualGame);