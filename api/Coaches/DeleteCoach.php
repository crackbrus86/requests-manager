<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    
    $sql = $wpdb->prepare("SELECT id, coaches FROM $tb_requests WHERE coaches LIKE %s", "%".$id."%");
    $relatedRequests = $wpdb->get_results($sql);
    foreach($relatedRequests as $item){
        $item->coaches = unserialize($item->coaches);
        foreach($item->coaches as $key => $coach){
            if(in_array($id, $coach)){
                array_splice($item->coaches, $key, 1);
            }
        }
        if(!count($item->coaches)){
            $item->coaches = serialize($item->coaches);
        }else{
            $item->coaches = serialize($item->coaches);
        } 
        $sql2 = $wpdb->prepare("UPDATE $tb_requests SET coaches = %s WHERE id = %d", $item->coaches, $item->id);
        if($wpdb->query($sql2)) echo "Coach was unassigned";
    }
    $sql3 = $wpdb->prepare("DELETE FROM $tb_coaches WHERE id = %d", $id);
    if($wpdb->query($sql3)) echo "Coach was removed";
}