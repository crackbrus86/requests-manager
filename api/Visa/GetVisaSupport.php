<?php
include_once("../wpdb-connect.php");
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$tb_users = $wpdb->get_blog_prefix()."rm_users";
$tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
$competition = strip_tags(stripcslashes(trim($_POST["competition"])));
$startDate = strip_tags(stripcslashes(trim($_POST["startDate"])));
$endDate = strip_tags(stripcslashes(trim($_POST["endDate"])));
$query = $wpdb->get_results("SELECT user_id, coaches, visa FROM $tb_requests 
WHERE current_competition = $competition AND (create_date BETWEEN '$startDate' AND '$endDate')");
$list = Array();
foreach($query as $item){
    $item->coaches = unserialize($item->coaches);
    $item->visa = unserialize($item->visa);
    $visa = $item->visa;
    if($visa['hasVisa'] == "false"){
        $user = Array($item->user_id, "user");
        array_push($list, $user);
    }
}
$result = json_encode($query);
// $list = json_encode($list);
print_r($result);
// print_r($list);