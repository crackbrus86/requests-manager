<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages"))
{
    $requestTable = $wpdb->get_blog_prefix() . "rm_requests";
    $userTable = $wpdb->get_blog_prefix() . "rm_users";
    $coachTable = $wpdb->get_blog_prefix() . "rm_coaches";
    $passportsTable = $wpdb->get_blog_prefix() . "rm_for_passport";
    $id = esc_sql($_POST["id"]);
    $sql = $wpdb->prepare("SELECT user_id AS userId, coaches FROM $requestTable WHERE id = %d", $id);
    $result = $wpdb->get_row($sql);
    $result->coaches = unserialize($result->coaches);
    $sources = array();
    $sql = $wpdb->prepare("SELECT photo_national_pass_id AS nPassId, photo_international_pass_id AS interPassId, accreditation_photo_id AS aPhotoId FROM
            $userTable WHERE id = %d", $result->userId);
    $userResult = $wpdb->get_row($sql);
    populatePhotosSrc($userResult);

    $sql = $wpdb->prepare("SELECT PassportPhotoId FROM $passportsTable WHERE UserId = %d", $result->userId);
    $passportResult = $wpdb->get_results($sql);
    populatePhotosSrc(NULL, $passportResult);

    if(count($result->coaches) > 0)
    {
        $coaches = $result->coaches;
        foreach($coaches as $coach)
        {
            $sql = $wpdb->prepare("SELECT photo_national_pass_id AS nPassId, photo_international_pass_id AS interPassId, accreditation_photo_id AS aPhotoId FROM
            $coachTable WHERE id = %d", $coach[0]);
            $coachResult = $wpdb->get_row($sql);
            populatePhotosSrc($coachResult);

            $sql = $wpdb->prepare("SELECT PassportPhotoId FROM $passportsTable WHERE UserId = %d", $coach[0]);
            $coachPassportResult = $wpdb->get_results($sql);
            populatePhotosSrc(NULL, $coachPassportResult);
        }
    }
    $sources = json_encode($sources);
    print_r($sources);
}

function populatePhotosSrc($object = NULL, $photoIds = NULL)
{
    global $sources;
    if($object)
    {
        array_push($sources,
            wp_get_attachment_url($object->nPassId),
            wp_get_attachment_url($object->interPassId),
            wp_get_attachment_url($object->aPhotoId)
        );
    }
    if($photoIds)
    {
        for($i = 0; $i < count($photoIds); $i++)
        {
            array_push($sources, 
                wp_get_attachment_url($photoIds[$i]->PassportPhotoId)
            );
        }
    }
}