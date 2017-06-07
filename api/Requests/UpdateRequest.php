<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    include_once("../Requests-Manager/RequestModel.php");
    $request = new RequestBody();
    $requestId = strip_tags(stripcslashes(trim($_POST["id"])));
    $request->ageCategory = strip_tags(stripcslashes(trim($_POST["ageCat"])));
    $request->weightCategory = strip_tags(stripcslashes(trim($_POST["weigthCat"])));
    $request->currentCompetition = strip_tags(stripcslashes(trim($_POST["competiton"])));
    $request->disciplines = serialize($_POST["results"]);
    $request->preCompetition = strip_tags(stripcslashes(trim($_POST["preCompetition"])));
    $request->doping = serialize($_POST["doping"]);
    $request->visa = serialize($_POST["visa"]);
    
    $query = $wpdb->query("UPDATE $tb_requests SET age_category = '$request->ageCategory', weight_category = '$request->weightCategory',
    current_competition = '$request->currentCompetition', disciplines = '$request->disciplines', pre_competition = '$request->preCompetition',
    doping = '$request->doping', visa = '$request->visa' WHERE id = '$requestId'");
    print_r($query);
endif;