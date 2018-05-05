<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_actual_games';
foreach($_POST as $item => $value):
	$data[$item] = stripslashes(trim($value));
endforeach;
if(current_user_can('edit_others_pages')):
	$wpdb->insert( $tb_name,
		array( 'name' => $data['name'], 'type' => $data['type'], 'year' => $data['year'], 'active' => $data['active'], 'area' => $data['area']),
		array( '%s', '%d', '%s', '%s', '%s')
	);
	echo "true";
endif;