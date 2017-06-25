<?php
include_once("../wpdb-connect.php");
global $wpdb;
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$tb_others = $wpdb->get_blog_prefix()."rm_others";
$competition = strip_tags(stripcslashes(trim($_POST["competition"])));
$startDate = strip_tags(stripcslashes(trim($_POST["startDate"])));
$endDate = strip_tags(stripcslashes(trim($_POST["endDate"])));
$tb_regions = $wpdb->get_blog_prefix()."rm_regions";
$president = $wpdb->get_results("SELECT $tb_others.president_name AS name, $tb_regions.region AS region 
    FROM $tb_others
        JOIN $tb_regions
        ON $tb_others.president_region = $tb_regions.id");
$president[0]->type = "president";
$presidentName = explode(" ", $president[0]->name);
$president[0]->last_name = $presidentName[0];
$president[0]->first_name = $presidentName[1];
$president[0]->middle_name = $presidentName[2];
$query = $wpdb->get_results("SELECT user_id, coaches, visa FROM $tb_requests 
WHERE current_competition = $competition AND (create_date BETWEEN '$startDate' AND '$endDate')");
$list = Array();
$big_list = Array();
foreach($query as $item){
    $item->coaches = unserialize($item->coaches);
    $coaches = $item->coaches;
    $user = Array($item->user_id, "user");
    array_push($list, $user);
    if(count($coaches)){
        for($i = 0; $i < count($coaches); $i++){
            if($coaches[$i][1] == "true"){
                $coach = Array($coaches[$i][0], "coach");
                array_push($list, $coach);
            }
        }
    }
}
$list = array_unique($list, SORT_REGULAR);
foreach($list as $item){
    if($item[1] == "user") array_push($big_list, get_private_data($item, $tb_users, $wpdb));
    if($item[1] == "coach") array_push($big_list, get_private_data($item, $tb_coaches, $wpdb));
}
array_push($big_list, $president[0]);
$big_list = json_encode($big_list);
print_r($big_list);

function get_private_data($item, $table, $wpdb){
    $tb_regions = $wpdb->get_blog_prefix()."rm_regions";
    $result = $wpdb->get_results("SELECT $table.last_name, $table.first_name, $table.middle_name, $tb_regions.region
    FROM $table 
        JOIN $tb_regions
            ON $table.region = $tb_regions.id
    WHERE $table.id = $item[0] ");
    $result[0]->id = $item[0];
    $result[0]->type = $item[1];
    return $result[0];
}