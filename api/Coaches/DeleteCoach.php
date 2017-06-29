<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $id = strip_tags(stripslashes(trim($_POST["id"])));
    $relatedRequests = $wpdb->get_results("SELECT id, coaches FROM $tb_requests WHERE coaches LIKE '%$id%'");
    // $relatedRequests = json_encode($relatedRequests);
    foreach($relatedRequests as $item){
        $item->coaches = unserialize($item->coaches);
        foreach($item->coaches as $key => $coach){
            if(in_array($id, $coach)){
                array_splice($item->coaches, $key, 1);
            }
        }
        if(!count($item->coaches)){
            $item->coaches = "individual" ;
        }else{
            $item->coaches = serialize($item->coaches);
        } 
        $query = $wpdb->query("UPDATE $tb_requests SET coaches = '$item->coaches' WHERE id = '$item->id'");
    }
    $query1 = $wpdb->query("DELETE FROM $tb_coaches WHERE id = '$id'");
    print_r($query1);
}