<?php
    include("../wpdb-connect.php");
    $tb_verify = $wpdb->get_blog_prefix()."rm_verify";
    $userId = strip_tags(stripslashes(trim($_POST["userId"])));
    $code = strip_tags(stripslashes(trim($_POST["code"])));

    $sql = $wpdb->prepare("SELECT id FROM $tb_verify WHERE user_id = %d AND code = %d", $userId, $code);
    $match = $wpdb->get_row($sql);

    $remove = $wpdb->prepare("DELETE FROM $tb_verify WHERE user_id = %d", $userId);
    $wpdb->query($remove);

    $visa = new stdClass();
    $visa->hasVisa = "false";
    $visa->type = "0";
    $visa->term = null;

    if($match){
        $tb_users = $wpdb->get_blog_prefix()."rm_users";
        $tb_for_passports = $wpdb->get_blog_prefix() . "rm_for_passport";
        $getUser = $wpdb->prepare("SELECT  id, region, last_name_pass, first_name_pass, serial_number_pass, number_pass, 
        expiration_date_pass, individual_number, phone, email, photo_national_pass_id, 
        photo_international_pass_id, accreditation_photo_id, n_pass, certificate_adel, foreign_pass_issued_by FROM $tb_users WHERE id = %d", $userId);
        $user = $wpdb->get_row($getUser);
        $user->visa = $visa;
        $sql = $wpdb->prepare("SELECT ForPassportId AS id, PassportNumber AS no, SerialNumber AS seria, 
        PassportPhotoId AS photoId, ExpirationDate AS expireDate, IssuedBy AS issuedBy FROM $tb_for_passports WHERE UserId = %d", $userId);
        $passports = $wpdb->get_results($sql);
        if(count($passports)) $user->passports = $passports;
        $return = json_encode($user);
        echo $return;        
    }else{
        $tb_regions = $wpdb->get_blog_prefix()."rm_regions";
        $regionId = $wpdb->get_row("SELECT id FROM $tb_regions LIMIT 1");
        $user = new stdClass();
        $user->id = $userId;
        $user->region = $regionId->id;
        $user->last_name_pass = "";
        $user->first_name_pass = "";
        $user->serial_number_pass = "";
        $user->number_pass = "";
        $user->expiration_date_pass = null;
        $user->individual_number = "";
        $user->phone = "";
        $user->email = "";
        $user->photo_national_pass_id = "";
        $user->photo_international_pass_id = "";
        $user->accreditation_photo_id = "";
        $user->n_pass = "";
        $user->certificate_adel = "";
        $user->visa = $visa;
        $user->foreign_pass_issued_by = null;
        $user->passports = array();
        $return = json_encode($user);
        echo $return; 
    }