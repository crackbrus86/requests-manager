<?php
include_once("../wpdb-connect.php");
$tb_age_category = $wpdb->get_blog_prefix() . 'rm_category_age';
$tb_weight_category = $wpdb->get_blog_prefix() . 'rm_category_weight';
if(current_user_can('edit_others_pages')):
    $removeId = $_POST['id'];
    $wpdb->delete($tb_age_category, array('id' => $removeId), array('%d'));
    $wpdb->delete($tb_weight_category, array('parent' => $removeId), array('%d'));
    echo "true";
endif;