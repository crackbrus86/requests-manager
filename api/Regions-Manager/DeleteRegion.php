<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix() . 'rm_regions';
if(current_user_can('edit_others_pages')):
    $removeId = $_POST['id'];
    $wpdb->delete($tb_name, array('id' => $removeId), array('%d'));
    echo "true";
endif;