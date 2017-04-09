<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_category_weight';
foreach($_POST as $item => $value):
	$data[$item] = stripslashes(trim($value));
endforeach;
if(current_user_can('edit_others_pages')):
	$wpdb->insert( $tb_name,
		array( 'title_w' => $data['title_w'], 'parent' => $data['parent']),
		array( '%s', '%d')
	);
	echo "true";
endif;