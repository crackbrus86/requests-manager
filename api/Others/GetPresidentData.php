<?php
require_once("../wpdb-connect.php");
$tb_others = $wpdb->get_blog_prefix()."rm_others";

$president = $wpdb->get_results("SELECT id, president_name AS name, president_region AS region FROM $tb_others");
$return = json_encode($president);
print_r($return);
