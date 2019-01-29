<?php
require_once("../wpdb-connect.php");
require_once("../functions.php");

if(current_user_can("edit_others_pages"))
{
    $coachTable = $wpdb->get_blog_prefix() . "rm_coaches";
    $passportTable = $wpdb->get_blog_prefix() . "rm_for_passport";
    $coachId = esc_sql($_GET["coachId"]);

    $sources = array();
    $sql = $wpdb->prepare("SELECT photo_national_pass_id AS nPassId, photo_international_pass_id AS interPassId, accreditation_photo_id AS aPhotoId 
                            FROM $coachTable 
                            WHERE id = %d", $coachId);
            $coachResult = $wpdb->get_row($sql);
            populatePhotosSrc($coachResult);

    $sql = $wpdb->prepare("SELECT PassportPhotoId FROM $passportTable WHERE UserId = %d", $coachId);
    $passportResult = $wpdb->get_results($sql);
    populatePhotosSrc(NULL, $passportResult);
    $sources = json_encode($sources);
    print_r($sources);
}