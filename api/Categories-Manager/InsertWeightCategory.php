<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
	$tb_weight_categories = $wpdb->get_blog_prefix() . 'rm_category_weight';
	$title = $_POST["title"];
	$parent = $_POST["parent"];
	$sql = $wpdb->prepare("INSERT INTO $tb_weight_categories (title_w, parent) VALUES (%s, %s)", $title, $parent);
	if($wpdb->query($sql)) echo "Category was created";
endif;