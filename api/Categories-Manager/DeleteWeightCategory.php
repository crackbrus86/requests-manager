<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_weight_category = $wpdb->get_blog_prefix() . 'rm_category_weight';
    $removeId = strip_tags(stripslashes(trim($_POST['id'])));
    $wpdb->delete($tb_weight_category, array('id' => $removeId), array('%d'));
    echo "true";
endif;