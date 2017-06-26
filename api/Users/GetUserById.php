<?php
require_once("../wpdb-connect.php");
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$userId = $_POST["userId"];
$user = $wpdb->get_results("SELECT * FROM $tb_users WHERE id = $userId");
// $user = $wpdb->get_results("SELECT id, last_name, first_name, middle_name, birth_date, region, last_name_pass, first_name_pass,
// serial_number_pass, number_pass, expiration_date_pass, individual_number, phone, email, 
// photo_national_pass_id, photo_international_pass_id, accreditation_photo_id FROM $tb_users WHERE id = $userId");
$result = json_encode($user);
print_r($result);