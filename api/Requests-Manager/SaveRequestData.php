<?php
include_once("../wpdb-connect.php");

$user = esc_sql($_POST["user"]);
$request = esc_sql($_POST["request"]);

$tb_users = $wpdb->get_blog_prefix()."rm_users";
$tb_visa = $wpdb->get_blog_prefix()."rm_visa";
if($user["id"]){
    $sql = $wpdb->prepare("UPDATE $tb_users SET region = %d, last_name = %s, first_name = %s, middle_name = %s, birth_date = %s, 
        last_name_pass = %s, first_name_pass = %s, serial_number_pass = %s, number_pass = %s, expiration_date_pass = %s, 
        individual_number = %s, phone = %s, email = %s, photo_national_pass_id = %d, photo_international_pass_id = %d, 
        accreditation_photo_id = %d WHERE id = %d", $user["region"], $user["lastName"], $user["firstName"], $user["middleName"], $user["birthDate"],
         $user["last_name_pass"], $user["first_name_pass"], $user["serial_number_pass"], $user["number_pass"], $user["expiration_date_pass"], 
         $user["individual_number"], $user["phone"], $user["email"], $user["photo_national_pass_id"], $user["photo_international_pass_id"], 
         $user["accreditation_photo_id"], $user["id"]);

    if($wpdb->query($sql)){
        echo "Participant's data is updated";
    }
    saveVisa($tb_visa, $user["visa"], "athlete", $user["id"], $request["event"], $request["eventYear"]);    
}else{
    $sql = $wpdb->prepare("INSERT INTO $tb_users (region, last_name, first_name, middle_name, birth_date, last_name_pass, first_name_pass, 
        serial_number_pass, number_pass, expiration_date_pass, individual_number, phone, email, photo_national_pass_id, photo_international_pass_id, 
        accreditation_photo_id) VALUES (%d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d, %d)", $user["region"], $user["lastName"], $user["firstName"], $user["middleName"], $user["birthDate"],
         $user["last_name_pass"], $user["first_name_pass"], $user["serial_number_pass"], $user["number_pass"], $user["expiration_date_pass"], 
         $user["individual_number"], $user["phone"], $user["email"], $user["photo_national_pass_id"], $user["photo_international_pass_id"], 
         $user["accreditation_photo_id"]);

    if($wpdb->query($sql)){
        echo "Participant's data is saved";
        $user["id"] = $wpdb->insert_id;
        saveVisa($tb_visa, $user["visa"], "athlete", $user["id"], $request["event"], $request["eventYear"]);
    }    
}

$coaches = esc_sql($_POST["coaches"]);
if(count($coaches)){
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    from($i = 0; $i < count($coaches); $i++){
        $coach = $coaches[$i];
        if($coach["id"] && $coach["isFollowing"] === "true"){
            $sql = $wpdb->prepare("UPDATE $tb_coaches SET region = %d, last_name_pass = %s, first_name_pass = %s, serial_number_pass = %s, number_pass = %s, 
                    expiration_date_pass = %s, individual_number = %s, phone = %s, email = %s, photo_national_pass_id = %d, photo_international_pass_id = %d, 
                    accreditation_photo_id = %d WHERE id = %d", $coach["region"], $coach["lastNamePass"], $coach["firstNamePass"], $coach["serialNumberPass"], 
                    $coach["numberPass"], $coach["expirationDatePass"], $coach["individualNumber"], $coach["phone"], $coach["email"], $coach["photoNationalPassId"],
                     $coach["photoInternationalPassId"], $coach["accreditationPhotoId"], $coach["id"]);
        }
    }
}

function saveVisa($table, $visa, $ownerType, $ownerId, $event, $year){
    global $wpdb;    
    echo "<pre>";
    print_r($visa);
    echo "</pre>";    
    if($visa["hasVisa"] === "false") {
        $sql = $wpdb->prepare("DELETE FROM $table WHERE owner_id = %d AND event = %d AND year = %s", $ownerId, $event, $year);
        if($wpdb->query($sql)) echo "Now this person has not any visa";
        return null;
    }
    $sql = $wpdb->prepare("SELECT id FROM $table WHERE owner_type = %s AND owner_id = %d AND type = %s AND event = %d AND year = %s", $ownerType, $ownerId, $visa["type"], $event, $year);
    $visaId = $wpdb->query($sql);
    if($visaId){
        $sqlVisa = $wpdb->prepare("UPDATE $table SET owner_type = %s, owner_id = %d, type = %s, term = %s, event = %d, year = %s WHERE id = %d", $ownerType, $ownerId, $visa["type"], $event, $year, $visa["term"], $visaId );
    }else{
        $sqlVisa = $wpdb->prepare("INSERT INTO $table (owner_type, owner_id, type, term, event, year) VALUES (%s, %d, %s, %s, %d, %s)", $ownerType, $ownerId, $visa["type"], $visa["term"], $event, $year);
    }
    if($wpdb->query($sqlVisa)){
        echo "Visa is saved";
    }
}