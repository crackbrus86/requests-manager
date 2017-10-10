<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_posts")):
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_divisions = $wpdb->get_blog_prefix()."rm_category_age";
    $tb_weightClass = $wpdb->get_blog_prefix()."rm_category_weight";
    
    $game = strip_tags(stripslashes(trim($_POST["game"])));
    $year = strip_tags(stripslashes(trim($_POST["year"])));

    $sql = $wpdb->prepare("SELECT $tb_requests.age_category AS divisionId, $tb_divisions.title AS division,
    $tb_requests.weight_category AS weightClassId, $tb_weightClass.title_w AS weightClass, $tb_users.last_name_pass AS lastName,
    $tb_users.first_name_pass AS firstName, $tb_users.birth_date AS born, $tb_requests.disciplines AS results
    FROM $tb_requests
        JOIN $tb_users
            ON $tb_requests.user_id = $tb_users.id
        JOIN $tb_divisions
            ON $tb_requests.age_category = $tb_divisions.id
        JOIN $tb_weightClass
            ON $tb_requests.weight_category = $tb_weightClass.id
        WHERE $tb_requests.current_competition = %d AND $tb_requests.year = %s ORDER BY $tb_requests.age_category", $game, $year);

        $nominations = $wpdb->get_results($sql);
        if(count($nominations)){
            for($i = 0; $i < count($nominations); $i++){
                $nominations[$i]->results = unserialize($nominations[$i]->results);
            }
        }
        $output = json_encode($nominations);
        print_r($output);
endif;