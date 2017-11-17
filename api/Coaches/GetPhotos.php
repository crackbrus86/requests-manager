<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $limit = $_GET["limit"];
    $offset = $_GET["offset"];
    $sql = $wpdb->prepare("SELECT first_name_pass AS name, last_name_pass AS surname, photo_national_pass_id, photo_international_pass_id, accreditation_photo_id
    FROM $tb_coaches LIMIT %d OFFSET %d", $limit, $offset);
    $coaches = $wpdb->get_results($sql);

    if(count($coaches)){
        $photos = array();

        foreach($coaches as $coach){
            $pathPnp = wp_get_attachment_url($coach->photo_national_pass_id);
            $pathPip = wp_get_attachment_url($coach->photo_international_pass_id);
            $pathAp = wp_get_attachment_url($coach->accreditation_photo_id);
            array_push($photos, $pathPnp, $pathPip, $pathAp);            
        }
        
        $zip = new ZipArchive();
        $tmp_file = tempnam(".", "");
        $zip->open($tmp_file, ZipArchive::CREATE);
    
        foreach($photos as $photo){
            if(strlen($photo)){
                $download_file = file_get_contents($photo);
                $zip->addFromString(getFileName($coaches, $photo),$download_file);
            }
        }
    
        $zip->close();
        header('Content-disposition: attachment; filename=Photos.zip');
        header('Content-type: application/zip');
        readfile($tmp_file);
        unlink($tmp_file);
    }else{
        echo "false";
    }

endif;

function getFileName($coaches, $path){
    foreach($coaches as $coach){
        $pathPnp = wp_get_attachment_url($coach->photo_national_pass_id);
        $pathPip = wp_get_attachment_url($coach->photo_international_pass_id);
        $pathAp = wp_get_attachment_url($coach->accreditation_photo_id);
        $tmp_file_name = explode(".", basename($path));
        $ext = $tmp_file_name[(count($tmp_file_name) - 1)];         
        if(basename($pathPnp) == basename($path)){
            return "nat_pass_".$coach->name."_".$coach->surname.".".$ext;
        }
        if(basename($pathPip) == basename($path)){
            return "zak_pass_".$coach->name."_".$coach->surname.".".$ext;
        }   
        if(basename($pathAp) == basename($path)){
            return "acr_pass_".$coach->name."_".$coach->surname.".".$ext;
        }   
    }
}