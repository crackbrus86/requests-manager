<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    include_once("../Requests-Manager/RequestModel.php");
    $request = new RequestBody();
    $requestId = strip_tags(stripslashes(trim($_POST["id"])));
    $request->ageCategory = strip_tags(stripslashes(trim($_POST["age"])));
    $request->weightCategory = strip_tags(stripslashes(trim($_POST["weight"])));
    $request->currentCompetition = strip_tags(stripslashes(trim($_POST["game"])));
    $request->disciplines = serialize($_POST["results"]);
    $request->preCompetition = strip_tags(stripslashes(trim($_POST["pregame"])));
    $request->doping = serialize($_POST["doping"]);
    $request->coaches = serialize($_POST["coaches"]);
    $request->year = strip_tags(stripslashes($_POST["year"]));
    
    $sql = $wpdb->prepare("UPDATE $tb_requests SET age_category = %d, weight_category = %d, current_competition = %d, disciplines = %s, 
    pre_competition = %d, doping = %s, coaches = %s, year = %s WHERE id = %d", $request->ageCategory, $request->weightCategory, $request->currentCompetition, 
    $request->disciplines, $request->preCompetition, $request->doping, $request->coaches, $request->year, $requestId);
    if($wpdb->query($sql)){
        echo "Request was updated";
    }
endif;