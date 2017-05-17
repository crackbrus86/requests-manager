<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix()."rm_users";
if($_POST['spam'] === ''){
    $user = $_POST['user'];
    prepareUser($user);
    if($user['id']){
        if($wpdb->query("UPDATE $tb_name 
        SET last_name = '$user[lastName]', first_name = '$user[firstName]', middle_name = '$user[middleName]', birth_date = '$user[birthDate]', 
        last_name_pass = '$user[lastNameLikeInPass]', first_name_pass = '$user[firstNameLikeInPass]', serial_number_pass = '$user[seriaOfpass]', 
        number_pass = '$user[numberOfPass]', expiration_date_pass = '$user[termOfPass]', individual_number = '$user[indNumber]', phone = '$user[phone]', 
        email = '$user[email]', photo_national_pass_id = '$user[photoOfNatPassId]', photo_international_pass_id = '$user[photoOfForPassId]', 
        accreditation_photo_id = '$user[accreditationPhotoId]' WHERE id = '$user[id]'")){
            echo "User data were updated";
        }
    }else{
        if($wpdb->query("INSERT INTO $tb_name (last_name, first_name, middle_name, birth_date, last_name_pass, first_name_pass, 
        serial_number_pass, number_pass, expiration_date_pass, individual_number, phone, email, photo_national_pass_id, photo_international_pass_id, 
        accreditation_photo_id) 
        VALUES ('$user[lastName]', '$user[firstName]', '$user[middleName]', '$user[birthDate]', '$user[lastNameLikeInPass]', '$user[firstNameLikeInPass]', 
        '$user[seriaOfpass]', '$user[numberOfPass]', '$user[termOfPass]', '$user[indNumber]', '$user[phone]', '$user[email]', '$user[photoOfNatPassId]', 
        '$user[photoOfForPassId]', '$user[accreditationPhotoId]')")){
            echo $wpdb->insert_id;
        }else{
            echo "Error";
        } 
    } 
}else{
    echo "Refused";
}

function prepareUser($user){
    foreach ($user as $item => $value):
        $user[$item] = stripslashes(trim($value));
    endforeach;
}

