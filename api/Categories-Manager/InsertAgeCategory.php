<?php
include_once("../wpdb-connect.php");
$tb_age_categories = $wpdb->get_blog_prefix() . 'rm_category_age';
foreach($_POST as $item => $value):
	$data[$item] = stripslashes(trim($value));
endforeach;
if(current_user_can('edit_others_pages')):
	$wpdb->insert( $tb_age_categories,
		array( 'title' => $data['title']),
		array( '%s')
	);
	echo "true";
endif;