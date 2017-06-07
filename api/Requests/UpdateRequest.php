<?php
include_once("../wpdb-connect.php");
if(current_user_can('edit_others_pages')):
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
    echo "<pre>";
    print_r($request);
    echo "</pre>";
endif;