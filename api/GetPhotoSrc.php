<?php
require_once( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;
$photoId = $_POST["photoId"];
$src = wp_get_attachment_image_src($photoId);
print_r($src[0]);