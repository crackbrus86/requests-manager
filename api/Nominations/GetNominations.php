<?php
include_once("../wpdb-connect.php");
$tb_requests = $wpdb->get_blog_prefix()."rm_requests";
$tb_user = $wpdb->get_blog_prefix() . "rm_users";
$tb_category_weight = $wpdb->get_blog_prefix() . 'rm_category_weight';
$tb_category_age = $wpdb->get_blog_prefix() . 'rm_category_age';
$competition = strip_tags(stripcslashes(trim($_POST["competition"])));
$startDate = strip_tags(stripcslashes(trim($_POST["startDate"])));
$endDate = strip_tags(stripcslashes(trim($_POST["endDate"])));
$nominations = $wpdb->get_results("SELECT $tb_requests.age_category AS age, $tb_category_age.title AS ageRank, 
$tb_requests.weight_category AS class, $tb_category_weight.title_w AS weight, $tb_user.last_name AS lastName, $tb_user.first_name AS firstName,
$tb_user.birth_date AS birthDate, $tb_requests.disciplines AS results
FROM $tb_requests
    JOIN $tb_user 
        ON $tb_requests.user_id = $tb_user.id
    JOIN $tb_category_age
    ON $tb_requests.age_category = $tb_category_age.id
    JOIN $tb_category_weight
    ON $tb_requests.weight_category = $tb_category_weight.id
WHERE $tb_requests.current_competition = $competition AND ($tb_requests.create_date BETWEEN  '$startDate' AND '$endDate')
ORDER BY $tb_requests.age_category" );
for($i = 0; $i < count($nominations); $i++){
    $nominations[$i]->results = unserialize($nominations[$i]->results);
}
$nomObj = json_encode($nominations);
print_r($nomObj);