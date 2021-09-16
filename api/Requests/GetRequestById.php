<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tbReq = $wpdb->get_blog_prefix() . 'rm_requests';
    $tbUse = $wpdb->get_blog_prefix() . "rm_users";
    $tbReg = $wpdb->get_blog_prefix() . "rm_regions";
    $tbCoa = $wpdb->get_blog_prefix().'rm_coaches';
    $id = esc_sql($_POST["id"]);
    $sql = $wpdb->prepare("SELECT $tbReq.id AS id, $tbUse.id AS userId, $tbUse.first_name AS name, $tbUse.last_name AS surname,
    $tbUse.middle_name AS mName, $tbUse.birth_date AS born, $tbUse.region, $tbReq.age_category AS age, $tbReq.weight_category AS weight,
    $tbReq.current_competition AS game, $tbReq.pre_competition AS pregame, $tbReq.disciplines AS results, $tbReq.doping AS doping, $tbReq.coaches AS coaches,
    $tbReq.year
    FROM $tbReq 
        JOIN $tbUse
            ON $tbReq.user_id = $tbUse.id
        JOIN $tbReg
            ON $tbUse.region = $tbReg.id
    WHERE $tbReq.id = %d", $id);
    $request = $wpdb->get_results($sql);

    $request[0]->doping = unserialize($request[0]->doping);
    $request[0]->results = unserialize($request[0]->results);
    $request[0]->coaches = unserialize($request[0]->coaches);
    $request[0]->coach_details = array();
    if(!!$coaches && count($request[0]->coaches) > 0){
        $coaches = $request[0]->coaches;
        foreach($coaches as $coach){
            $coachSql = $wpdb->prepare("SELECT id, first_name AS name, last_name AS surname, middle_name AS mName FROM $tbCoa WHERE id = %d", $coach[0]);
            $coachDetails = $wpdb->get_results($coachSql);
            array_push($request[0]->coach_details, $coachDetails[0]);
        }
    }else{
        $request[0]->coaches = array();
    }

    $return = json_encode($request);
    print_r($return);
}