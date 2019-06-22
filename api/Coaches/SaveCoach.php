<?php
require_once("../wpdb-connect.php");
require_once("../functions.php");

if(current_user_can("edit_others_pages")){
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $region = strip_tags(stripslashes(trim($_POST["region"])));
    $latSurname = strip_tags(stripslashes(trim($_POST["latSurname"])));
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
    $n_pass = strip_tags(stripslashes(trim($_POST["n_pass"])));
    $passports = esc_sql($_POST["passports"]);

    $sql = $wpdb->prepare("UPDATE $tb_coaches SET region = %d, last_name_pass = %s, first_name_pass = %s, serial_number_pass = %s, 
    number_pass = %s, expiration_date_pass = %s, individual_number = %s, phone = %s, email = %s, photo_national_pass_id = %d, 
    photo_international_pass_id = %d, accreditation_photo_id = %d, n_pass = %s WHERE id = %d", $region, $latSurname, $latFirstName, $passSeria,
    $passNo, $passExpire, $iin, $phone, $email, $pnpId, $pipId, $apId, $n_pass, $id);

    if($passports) savePassports($passports, $id, FALSE);

    if($wpdb->query($sql)){
        echo "Coach was updated";
    }
}