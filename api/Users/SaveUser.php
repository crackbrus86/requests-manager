<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $userId = strip_tags(stripslashes(trim($_POST["id"])));
    $region = strip_tags(stripslashes(trim($_POST["region"])));
    $lastNamePass = strip_tags(stripslashes(trim($_POST["lastNamePass"])));
    $firstNamePass = strip_tags(stripslashes(trim($_POST["firstNamePass"])));
    $seria = strip_tags(stripslashes(trim($_POST["seria"])));
    $passNumb = strip_tags(stripslashes(trim($_POST["passNumb"])));
    $passExpire = strip_tags(stripslashes(trim($_POST["passExpire"])));
    $indNumber = strip_tags(stripslashes(trim($_POST["indNumber"])));
    $phone = strip_tags(stripslashes(trim($_POST["phone"])));
    $email = strip_tags(stripslashes(trim($_POST["email"])));
    $natPassId = strip_tags(stripslashes(trim($_POST["natPassId"])));
    $forPassId = strip_tags(stripslashes(trim($_POST["forPassId"])));
    $accId = strip_tags(stripslashes(trim($_POST["accId"])));
    $query = $wpdb->query("UPDATE $tb_users SET region = '$region', last_name_pass = '$lastNamePass', first_name_pass = '$firstNamePass',
    serial_number_pass = '$seria', number_pass = '$passNumb', expiration_date_pass = '$passExpire', individual_number = '$indNumber',
    phone = '$phone', email = '$email', photo_national_pass_id = '$natPassId', photo_international_pass_id = '$forPassId',  accreditation_photo_id = '$accId'
    WHERE id = '$userId'");
    print_r($query);
}