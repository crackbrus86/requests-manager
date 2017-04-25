<?php
require_once( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;
$photoId = $_POST["photoId"];
$img = wp_get_attachment_image($photoId, "medium");
$img = str_replace('width="1"', 'width="100%"', $img);
$img = str_replace('height="1"', '', $img);
print_r($img);