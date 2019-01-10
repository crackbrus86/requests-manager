<?php
include_once("wpdb-connect.php");

function savePassports($passports, $userId, $table){
    global $wpdb;
    if(!count($passports)) return;
    for($i = 0; $i < count($passports); $i++)
    {
        $passport = $passports[$i];

        if($passport["id"])
        {
            $sql = $wpdb->prepare("UPDATE $table SET UserId = %d, SerialNumber = %s, PassportNumber = %s, PassportPhotoId = %d, ExpirationDate = %s WHERE ForPassportId = %d", 
            $userId, $passport["seria"], $passport["no"], $passport["photoId"], $passport['expireDate'], $passport["id"]);
        }else{
            $sql = $wpdb->prepare("INSERT INTO $table (UserId, SerialNumber, PassportNumber, PassportPhotoId, ExpirationDate) VALUES (%d, %s, %s, %d, %s)", 
            $userId, $passport["seria"], $passport["no"], $passport["photoId"], $passport["expireDate"]);
        }
        $wpdb->query($sql);
    }
    $numbers = array_map("getPassportNumbers", $passports);
    $numbers = implode(",", $numbers);
    $sql = $wpdb->prepare("DELETE FROM $table WHERE UserId = %d AND PassportNumber NOT IN (" . $numbers . ")", $userId);
    $wpdb->query($sql);
}

function getPassportNumbers($passport){
    return $passport["no"];
}