<?php
require_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_for_passports = $wpdb->get_blog_prefix() . "rm_for_passport";
    $id = $_POST["id"];
    $sql = $wpdb->prepare("SELECT id, last_name AS lastName, first_name AS firstName, middle_name AS mName, birth_date AS born,
    region, last_name_pass AS latLastName, first_name_pass AS latFirstName, serial_number_pass AS passSeria, number_pass AS passNo,
    expiration_date_pass AS passExpire, individual_number AS iin, phone, email, photo_national_pass_id AS pnpId, photo_international_pass_id AS pipId,
    accreditation_photo_id AS apId, n_pass, certificate_adel, foreign_pass_issued_by AS foreignPassIssuedBy FROM $tb_users WHERE id = %d", $id);
    $user = $wpdb->get_results($sql);
    $sql = $wpdb->prepare("SELECT ForPassportId AS id, PassportNumber AS no, SerialNumber AS seria, PassportPhotoId AS photoId, ExpirationDate AS expireDate,
            IssuedBy AS issuedBy
            FROM $tb_for_passports WHERE UserId = %d", $id);
    $passports = $wpdb->get_results($sql);
    $response = new stdClass();
    $response->user = $user;
    $response->passports = $passports;
    $result = json_encode($response);
    print_r($result);
endif;