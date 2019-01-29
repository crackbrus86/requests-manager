<?php
require_once("../wpdb-connect.php");
require_once("../functions.php");

if(current_user_can("edit_others_pages"))
{
    $userTable = $wpdb->get_blog_prefix() . "rm_users";
    $passportTable = $wpdb->get_blog_prefix() . "rm_for_passport";
    $userId = esc_sql($_GET["userId"]);

    $sources = array();
    $sql = $wpdb->prepare("SELECT photo_national_pass_id AS nPassId, photo_international_pass_id AS interPassId, accreditation_photo_id AS aPhotoId 
                            FROM $userTable 
                            WHERE id = %d", $userId);
    $userResult = $wpdb->get_row($sql);
    populatePhotosSrc($userResult);

    $sql = $wpdb->prepare("SELECT PassportPhotoId FROM $passportTable WHERE UserId = %d", $userId);
    $passportResult = $wpdb->get_results($sql);
    populatePhotosSrc(NULL, $passportResult);
    $sources = json_encode($sources);
    print_r($sources);
}