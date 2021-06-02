<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $year = esc_sql(strip_tags(stripcslashes(trim($_POST['year']))));
    $games = implode(',', $_POST['games']);
    $sql = $wpdb->prepare("SELECT coaches FROM $tb_requests WHERE current_competition IN (".$games.") AND year = %s", $year);
    $results = $wpdb->get_results($sql); 
    $coachesId = Array();
    $coachEmails = Array();
    if(count($results) > 0){
        foreach($results as $result){
            $coachesTmp = unserialize($result->coaches);
            takeCoaches($coachesTmp);
        }
    }
    
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    if(count($coachesId) > 0){
        foreach ($coachesId as $coachId) {
            $sql = $wpdb->prepare("SELECT DISTINCT email FROM $tb_coaches WHERE id = %d", $coachId);
            $coach = $wpdb->get_row($sql);
            if($coach->email && !in_array($coach, $coachEmails)) array_push($coachEmails, $coach);
        }
    }

    echo json_encode($coachEmails);

endif;

function takeCoaches($coaches){
    global $coachesId;
    if(!!$coaches && count($coaches) > 0){
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