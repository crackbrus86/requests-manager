<?php
require_once("wpdb-connect.php");

function savePassports($passports, $userId, $isUser = TRUE){
    global $wpdb;
    $table = $wpdb->get_blog_prefix() . "rm_for_passport";
    $role = $isUser ? "athlete" : "coach";
    if(!count($passports)) return;
    for($i = 0; $i < count($passports); $i++)
    {
        $passport = $passports[$i];

        if($passport["id"])
        {
            $sql = $wpdb->prepare("UPDATE $table SET UserId = %d, SerialNumber = %s, PassportNumber = %s, PassportPhotoId = %d, ExpirationDate = %s, 
                                        UserRole = %s       
                                    WHERE ForPassportId = %d", 
                    $userId, $passport["seria"], $passport["no"], $passport["photoId"], $passport['expireDate'], $role, $passport["id"]);
        }else{
            $sql = $wpdb->prepare("INSERT INTO $table (UserId, SerialNumber, PassportNumber, PassportPhotoId, ExpirationDate, UserRole) 
                                        VALUES (%d, %s, %s, %d, %s, %s)", 
                    $userId, $passport["seria"], $passport["no"], $passport["photoId"], $passport["expireDate"], $role);
        }
        $wpdb->query($sql);
    }
    $numbers = array_map("getPassportNumbers", $passports);
    if(!count($numbers))
    {
        $sql = $wpdb->prepare("DELETE FROM $table WHERE UserId = %d", $userId);
    }else{
        $numbers = implode(",", $numbers);
        $sql = $wpdb->prepare("DELETE FROM $table WHERE UserId = %d AND PassportNumber NOT IN (" . $numbers . ")", $userId);
    }
    $wpdb->query($sql);
}

function getPassportNumbers($passport){
    return $passport["no"];
}