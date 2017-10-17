<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_age_categories = $wpdb->get_blog_prefix() . 'rm_category_age';
    $title = $_POST["title"] ;
    $id = $_POST["id"];
	$wpdb->update($tb_age_categories,
    array('title' => $title),
    array('id' => $id),
    array('%s'),
    array('%d')
    );
    echo "true";
endif;