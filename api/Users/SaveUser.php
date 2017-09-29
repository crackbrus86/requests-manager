<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $region = strip_tags(stripslashes(trim($_POST["region"])));
    $latLastName = strip_tags(stripslashes(trim($_POST["latLastName"])));
    $latFirstName = strip_tags(stripslashes(trim($_POST["latFirstName"])));
    $passSeria = strip_tags(stripslashes(trim($_POST["passSeria"])));
    $passNo = strip_tags(stripslashes(trim($_POST["passNo"])));
    $passExpire = strip_tags(stripslashes(trim($_POST["passExpire"])));
    $iin = strip_tags(stripslashes(trim($_POST["iin"])));
    $phone = strip_tags(stripslashes(trim($_POST["phone"])));
    $email = strip_tags(stripslashes(trim($_POST["email"])));
    $pnpId = strip_tags(stripslashes(trim($_POST["pnpId"])));
    $pipId = strip_tags(stripslashes(trim($_POST["pipId"])));
    $apId = strip_tags(stripslashes(trim($_POST["apId"])));

    $sql = $wpdb->prepare("UPDATE $tb_users SET region = %d, last_name_pass = %s, first_name_pass = %s, serial_number_pass = %s, number_pass = %s,
    expiration_date_pass = %s, individual_number = %s, phone = %s, email = %s, photo_national_pass_id = %d, photo_international_pass_id = %d,
    accreditation_photo_id = %d WHERE id = %d", $region, $latLastName, $latFirstName, $passSeria, $passNo, $passExpire, $iin, $phone, $email, 
    $pnpId, $pipId, $apId, $id);

    if($wpdb->query($sql)){
        echo "Athlete was updated";
    }
}