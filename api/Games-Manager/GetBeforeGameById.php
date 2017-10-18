<?php
include_once("../wpdb-connect.php");
$id = strip_tags(stripslashes(trim($_POST['id'])));
$tb_before_games = $wpdb->get_blog_prefix() . 'rm_before_games';
$sql = $wpdb->prepare("SELECT * FROM $tb_before_games WHERE id = %d", $id);
$result = $wpdb->get_results($sql);
$beforeGame = json_encode($result);
print_r($beforeGame);