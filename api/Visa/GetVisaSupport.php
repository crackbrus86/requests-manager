<?php
include_once("../wpdb-connect.php");
global $wpdb;
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$competition = strip_tags(stripcslashes(trim($_POST["competition"])));
$startDate = strip_tags(stripcslashes(trim($_POST["startDate"])));
$endDate = strip_tags(stripcslashes(trim($_POST["endDate"])));
$query = $wpdb->get_results("SELECT user_id, coaches, visa FROM $tb_requests 
WHERE current_competition = $competition AND (create_date BETWEEN '$startDate' AND '$endDate')");
$list = Array();
$big_list = Array();
foreach($query as $item){
    $item->coaches = unserialize($item->coaches);
    $item->visa = unserialize($item->visa);
    $visa = $item->visa;
    $coaches = $item->coaches;
    if($visa['hasVisa'] == "false"){
        $user = Array($item->user_id, "user");
        array_push($list, $user);
    }
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
$big_list = json_encode($big_list);
print_r($big_list);

function get_private_data($item, $table, $wpdb){
        $result = $wpdb->get_results("SELECT last_name, first_name, birth_date, serial_number_pass, number_pass, expiration_date_pass FROM $table WHERE id = $item[0] ");
        $result[0]->id = $item[0];
        $result[0]->type = $item[1];
        return $result[0];
}