<?php
require_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $limit = $_GET["limit"];
    $offset = $_GET["offset"];
    $sql = $wpdb->prepare("SELECT first_name_pass AS name, last_name_pass AS surname, photo_national_pass_id, photo_international_pass_id, accreditation_photo_id 
    FROM $tb_users LIMIT %d OFFSET %d", $limit, $offset);
    $users = $wpdb->get_results($sql);

    if(count($users)){
        $photos = array();

        foreach($users as $user){
            $pathPnp = wp_get_attachment_url($user->photo_national_pass_id);
            $pathPip = wp_get_attachment_url($user->photo_international_pass_id);
            $pathAp = wp_get_attachment_url($user->accreditation_photo_id);
            array_push($photos, $pathPnp, $pathPip, $pathAp);
        }
        
        $zip = new ZipArchive();
        $tmp_file = tempnam(".", "");
        $zip->open($tmp_file, ZipArchive::CREATE);
    
        foreach($photos as $photo){
            $download_file = file_get_contents($photo);
            $zip->addFromString(getFileName($users, $photo),$download_file);
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

function getFileName($users, $path){
    foreach($users as $user){
        $pathPnp = wp_get_attachment_url($user->photo_national_pass_id);
        $pathPip = wp_get_attachment_url($user->photo_international_pass_id);
        $pathAp = wp_get_attachment_url($user->accreditation_photo_id);
        $tmp_file_name = explode(".", basename($path));
        $ext = $tmp_file_name[(count($tmp_file_name) - 1)];         
        if(basename($pathPnp) == basename($path)){
            return "nat_pass_".$user->name."_".$user->surname.".".$ext;
        }
        if(basename($pathPip) == basename($path)){
            return "zak_pass_".$user->name."_".$user->surname.".".$ext;
        }   
        if(basename($pathAp) == basename($path)){
            return "acr_pass_".$user->name."_".$user->surname.".".$ext;
        }              
    }

}