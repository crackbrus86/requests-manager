<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $limit = $_GET["limit"];
    $offset = $_GET["offset"];
    $game = $_GET["game"];
    $year = $_GET["year"];
    $sql = $wpdb->prepare("SELECT user_id, coaches FROM $tb_requests WHERE current_competition = %d AND year = %d LIMIT %d OFFSET %d", $game, $year, $limit, $offset);
    $results = $wpdb->get_results($sql);      
    $usersId = Array();
    $coachesId = Array();
    if(count($results) > 0){
        foreach($results as $result){
            if(!in_array($result->user_id, $usersId)) array_push($usersId, $result->user_id);
            $coachesTmp = unserialize($result->coaches);
            takeCoaches($coachesTmp);
        }
    }

    $galleryCollection = Array();
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    getPerson($usersId, $tb_users);
    getPerson($coachesId, $tb_coaches);

    if(count($galleryCollection)){
        $photos = Array();

        foreach($galleryCollection as $item){
            $pathPnp = wp_get_attachment_url($item->photo_national_pass_id);
            $pathPip = wp_get_attachment_url($item->photo_international_pass_id);
            $pathAp = wp_get_attachment_url($item->accreditation_photo_id);
            array_push($photos, $pathPnp, $pathPip, $pathAp);
        }
        
        $zip = new ZipArchive();
        $tmp_file = tempnam(".","");
        $zip->open($tmp_file, ZipArchive::CREATE);

        foreach($photos as $photo){
            if(strlen($photo)){
                $download_file = file_get_contents($photo);
                $zip->addFromString(getFileName($galleryCollection, $photo), $download_file);
            }
        }

        $zip->close();
        header("Content-disposition: attachment; filename=Photos.zip");
        header('Content-type: application/zip');
        readfile($tmp_file);
        unlink($tmp_file);
    }else{
        echo "false";
    }    

endif;

function takeCoaches($coaches){
    global $coachesId;
    if(count($coaches) > 0){
        foreach($coaches as $coach){
            if(checkBoolString($coach[1]) && !in_array($coach[0], $coachesId)) array_push($coachesId, $coach[0]);
        }
    }
}

function checkBoolString($str = "false"){
    switch($str){
        case "false":
            return false;
        case "true":
            return true;
        default:
            return true;
    }
}

function getPerson($ids, $table){
    global $wpdb, $galleryCollection;
    foreach($ids as $key => $value){
        $sql = $wpdb->prepare("SELECT first_name_pass AS name, last_name_pass AS surname, photo_national_pass_id, photo_international_pass_id, accreditation_photo_id
        FROM $table WHERE id = %d", $value);
        $person = $wpdb->get_row($sql);
        if($person->name && $person->surname) array_push($galleryCollection, $person);
    }
}

function getFileName($persons, $path){
    foreach($persons as $person){
        $pathPnp = wp_get_attachment_url($person->photo_national_pass_id);
        $pathPip = wp_get_attachment_url($person->photo_international_pass_id);
        $pathAp = wp_get_attachment_url($person->accreditation_photo_id);
        $tmp_file_name = explode(".", basename($path));
        $ext = $tmp_file_name[(count($tmp_file_name) - 1)];         
        if(basename($pathPnp) == basename($path)){
            return "nat_pass_".$person->name."_".$person->surname.".".$ext;
        }
        if(basename($pathPip) == basename($path)){
            return "zak_pass_".$person->name."_".$person->surname.".".$ext;
        }   
        if(basename($pathAp) == basename($path)){
            return "acr_pass_".$person->name."_".$person->surname.".".$ext;
        }   
    }
}