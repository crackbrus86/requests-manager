<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $id = $_POST["id"];
    $sql = $wpdb->prepare("SELECT id, last_name AS surname, first_name AS name, middle_name AS mName, birth_date AS born,
    region, last_name_pass AS latSurname, first_name_pass AS latFirstName, serial_number_pass AS passSeria, number_pass AS passNo,
    expiration_date_pass AS passExpire, individual_number AS iin, phone, email, photo_national_pass_id AS pnpId,
    photo_international_pass_id AS pipId, accreditation_photo_id AS apId FROM $tb_coaches WHERE id = %d", $id);
    $result = $wpdb->get_results($sql);
    $coach = json_encode($result);
    print_r($coach);
endif;