<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_regions';
foreach($_POST as $item => $value):
	$data[$item] = stripslashes(trim($value));
endforeach;
if(current_user_can('edit_others_pages')):
	$wpdb->update($tb_name,
    array('region' => $data['region']),
    array('id' => $data['id']),
    array('%s'),
    array('%d')
    );
    echo "true";
endif;