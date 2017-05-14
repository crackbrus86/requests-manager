<?php
include_once("../wpdb-connect.php");
$tb_name = $wpdb->get_blog_prefix()."rm_users";
$user = $_POST['user'];
prepareUser($user);
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

function prepareUser($user){
    foreach ($user as $item => $value):
        $user[$item] = stripslashes(trim($value));
    endforeach;
}

