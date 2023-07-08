<?php
include_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")):
    global $wpdb;
    $tb_requests = $wpdb->get_blog_prefix()."rm_requests";
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";
    $tb_others = $wpdb->get_blog_prefix()."rm_others";
    $tb_regions = $wpdb->get_blog_prefix()."rm_regions";
    $game = strip_tags(stripslashes(trim($_POST["game"])));
    $year = strip_tags(stripslashes(trim($_POST["year"])));

    $delegation = Array();

    $sql = $wpdb->prepare("SELECT 
        $tb_others.president_name AS fullName, 
        $tb_regions.region AS region, 
        CONCAT('головний тренер, керівник делегації') AS role,
        $tb_others.president_name_latin AS fullNameLatin,
        $tb_others.date_of_birth AS dateOfBirth,
        CONCAT($tb_others.foreign_pass_no_prefix, $tb_others.foreign_pass_no) AS foreignPassData,
        $tb_others.foreign_pass_issued_by AS foreignPassIssuedBy,
        $tb_others.foreign_pass_expiration_date AS foreignPassExpirationDate,
        $tb_others.individual_no AS individualNo
    FROM $tb_others
        JOIN $tb_regions
        ON $tb_others.president_region = $tb_regions.id", "");
    $result = $wpdb->get_results($sql);
    $president = $result[0];
    array_push($delegation, $president);

    $sql_2 = $wpdb->prepare("SELECT user_id, coaches FROM $tb_requests WHERE current_competition = %d AND year = %s", $game, $year);
    $requests = $wpdb->get_results($sql_2);
    foreach($requests as $request){
        $request->coaches = unserialize($request->coaches);
        $sql_3 = $wpdb->prepare("SELECT CONCAT($tb_users.last_name,' ',$tb_users.first_name,' ',$tb_users.middle_name) AS fullName,
        $tb_regions.region AS region, CONCAT('спортсмен') AS role,
        CONCAT($tb_users.last_name_pass, ' ', $tb_users.first_name_pass) AS fullNameLatin,
        $tb_users.birth_date AS dateOfBirth,
        CONCAT($tb_users.serial_number_pass, $tb_users.number_pass) AS foreignPassData,
        $tb_users.foreign_pass_issued_by AS foreignPassIssuedBy,
        $tb_users.expiration_date_pass AS foreignPassExpirationDate,
        $tb_users.individual_number AS individualNo
        FROM $tb_users
            JOIN $tb_regions 
            ON $tb_users.region = $tb_regions.id
        WHERE $tb_users.id = %d", $request->user_id);
        $result = $wpdb->get_results($sql_3);
        $user = $result[0];
        array_push($delegation, $user);
        if(!!$request->coaches && !!count($request->coaches)){
            foreach($request->coaches as $coach){
                if($coach[1] === "true"){
                    $coach_id = $coach[0];
                    $sql_4 = $wpdb->prepare("SELECT CONCAT($tb_coaches.last_name,' ',$tb_coaches.first_name,' ',$tb_coaches.middle_name) AS fullName,
                    $tb_regions.region AS region, CONCAT('тренер') AS role,
                    CONCAT($tb_coaches.last_name_pass, ' ', $tb_coaches.first_name_pass) AS fullNameLatin,
                    $tb_coaches.birth_date AS dateOfBirth,
                    CONCAT($tb_coaches.serial_number_pass, $tb_coaches.number_pass) AS foreignPassData,
                    $tb_coaches.foreign_pass_issued_by AS foreignPassIssuedBy,
                    $tb_coaches.expiration_date_pass AS foreignPassExpirationDate,
                    $tb_coaches.individual_number AS individualNo
                    FROM $tb_coaches
                        JOIN $tb_regions
                        ON $tb_coaches.region = $tb_regions.id
                    WHERE $tb_coaches.id = %d", $coach_id);
                    $result = $wpdb->get_results($sql_4);
                    $coach_dlg = $result[0];
                    array_push($delegation, $coach_dlg);
                }
            }
        }
    }

    $delegation = array_values(array_filter(array_unique($delegation, SORT_REGULAR)));

    $delegation = json_encode($delegation);
    print_r($delegation);
endif;