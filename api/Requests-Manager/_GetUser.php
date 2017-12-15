<?php
    include_once("../wpdb-connect.php");
    $tb_name = $wpdb->get_blog_prefix()."rm_users";
    foreach($_POST as $item => $value):
        $data[$item] = stripslashes(trim($value));
    endforeach;
    $user = $wpdb->get_row("SELECT id, region, last_name_pass, first_name_pass, serial_number_pass, number_pass, 
    expiration_date_pass, individual_number, phone, email, photo_national_pass_id, 
    photo_international_pass_id, accreditation_photo_id FROM $tb_name WHERE last_name = '$data[surname]' AND first_name = '$data[firstName]'
    AND middle_name = '$data[middleName]' AND birth_date = '$data[birthDate]'");

   $return = json_encode($user);
    echo $return;