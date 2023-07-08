<?php
require_once("../wpdb-connect.php");
$tb_others = $wpdb->get_blog_prefix()."rm_others";

$president = $wpdb->get_results("SELECT 
    id,
    president_name AS name,
    president_region AS region,
    config_email AS email,
    president_name_latin AS nameLatin,
    date_of_birth AS dateOfBirth,
    foreign_pass_no_prefix AS foreignPassNoPrefix,
    foreign_pass_no AS foreignPassNo,
    foreign_pass_issued_by AS foreignPassIssuedBy,
    foreign_pass_expiration_date AS foreignPassExpirationDate,
    individual_no AS individualNo
FROM $tb_others");
$return = json_encode($president);
print_r($return);
