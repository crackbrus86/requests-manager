<?php
include_once("../wpdb-connect.php");
include_once("RequestModel.php");
$tb_name = $wpdb->get_blog_prefix()."rm_users";
if($_POST['spam'] === ''){
    $request = new Request();
    $user = $_POST['user'];
    prepareItem($user);
    if($user['id']){
        $request->userId = $user['id'];
        if($wpdb->query("UPDATE $tb_name 
        SET last_name = '$user[lastName]', first_name = '$user[firstName]', middle_name = '$user[middleName]', birth_date = '$user[birthDate]', 
        last_name_pass = '$user[lastNameLikeInPass]', first_name_pass = '$user[firstNameLikeInPass]', serial_number_pass = '$user[seriaOfpass]', 
        number_pass = '$user[numberOfPass]', expiration_date_pass = '$user[termOfPass]', individual_number = '$user[indNumber]', phone = '$user[phone]', 
        email = '$user[email]', photo_national_pass_id = '$user[photoOfNatPassId]', photo_international_pass_id = '$user[photoOfForPassId]', 
        accreditation_photo_id = '$user[accreditationPhotoId]' WHERE id = '$user[id]'")){
            echo "User was successfully updated!";
        }
    }else{
        if($wpdb->query("INSERT INTO $tb_name (last_name, first_name, middle_name, birth_date, last_name_pass, first_name_pass, 
        serial_number_pass, number_pass, expiration_date_pass, individual_number, phone, email, photo_national_pass_id, photo_international_pass_id, 
        accreditation_photo_id) 
        VALUES ('$user[lastName]', '$user[firstName]', '$user[middleName]', '$user[birthDate]', '$user[lastNameLikeInPass]', '$user[firstNameLikeInPass]', 
        '$user[seriaOfpass]', '$user[numberOfPass]', '$user[termOfPass]', '$user[indNumber]', '$user[phone]', '$user[email]', '$user[photoOfNatPassId]', 
        '$user[photoOfForPassId]', '$user[accreditationPhotoId]')")){
            $request->userId = $wpdb->insert_id;
        }else{
            echo "Error";
        } 
    } 
    $request->coaches = array();
    $coaches = $_POST['coaches'];
    if(count($coaches)){
        $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
        for($i = 0; $i < count($coaches); $i++){
            $coach = $coaches[$i];
            prepareItem($coach);
            if($coach["id"] && $coach["isFollowing"] == true){
                array_push($request->coaches, array($coach['id'], $coach['isFollowing']));
                if($wpdb->query("UPDATE $tb_coaches
                SET last_name_pass = '$coach[coachLastNameLikeInPass]', first_name_pass = '$coach[coachFirstNameLikeInPass]', 
                    serial_number_pass = '$coach[coachSeriaOfpass]', number_pass = '$coach[coachNumberOfPass]', expiration_date_pass = '$coach[coachTermOfPass]', 
                    phone = '$coach[coachPhone]', email = '$coach[coachEmail]', photo_national_pass_id = '$coach[coachPhotoOfNatPassId]', 
                    photo_international_pass_id = '$coach[coachPhotoOfForPassId]', accreditation_photo_id = '$coach[coachAccreditationPhotoId]' WHERE id = '$coach[id]'")){
                        echo "Coach was successfully updated!";
                    }
            }elseif(!$coach["id"]){
                $clone = $wpdb->get_row("SELECT id FROM $tb_coaches WHERE  last_name = '$coach[lastName]' AND first_name = '$coach[firstName]'
                AND middle_name = '$coach[middleName]' AND birth_date = '$coach[coachBirthDate]'");  
                if(is_null($clone)){
                    if($wpdb->query("INSERT INTO $tb_coaches (accompanies, last_name, first_name, middle_name, birth_date, last_name_pass, first_name_pass, 
                        serial_number_pass, number_pass, expiration_date_pass, phone, email, photo_national_pass_id, photo_international_pass_id, 
                        accreditation_photo_id) 
                        VALUES ('$coach[isFollowing]', '$coach[lastName]', '$coach[firstName]', '$coach[middleName]', '$coach[coachBirthDate]', '$coach[coachLastNameLikeInPass]', '$coach[coachFirstNameLikeInPass]', 
                        '$coach[coachSeriaOfpass]', '$coach[coachNumberOfPass]', '$coach[coachTermOfPass]', '$coach[coachPhone]', '$coach[coachEmail]', '$coach[coachPhotoOfNatPassId]', 
                        '$coach[coachPhotoOfForPassId]', '$coach[coachAccreditationPhotoId]')")){
                            $new_id = $wpdb->insert_id;
                            
                            array_push($request->coaches, array($new_id, $coach['isFollowing']));
                        }else{
                            echo "Error";
                        }
                }else{
                    array_push($request->coaches, array($clone->id, $coach['isFollowing']));
                }
            }           

        }
    }
    $dataObject = DateTime::createFromFormat('D M d Y H:i:s T +', stripcslashes(trim($_POST['createDate'])));
    $request->createDate = date_format($dataObject,"Y-m-d");
    echo "<pre>";
    print_r($request);
    echo "</pre>";
}else{
    echo "Refused";
}

function prepareItem($item){
    foreach ($item as $key => $value):
        $item[$key] = stripslashes(trim($value));
    endforeach;
}

