<?php
    require_once("../wpdb-connect.php");
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    foreach($_POST as $key => $value):
        $data[$key] = stripcslashes(trim($value));
    endforeach;
    $coach = $wpdb->get_row("SELECT id, region, last_name_pass, first_name_pass, serial_number_pass, number_pass, 
    expiration_date_pass, individual_number, phone, email, photo_national_pass_id, 
    photo_international_pass_id, accreditation_photo_id FROM $tb_coaches WHERE last_name = '$data[lastName]' AND first_name = '$data[firstName]'
    AND middle_name = '$data[middleName]' AND birth_date = '$data[birthDate]'");

   $return = json_encode($coach);
    echo $return;