<?php
    include_once("../wpdb-connect.php");
    if(current_user_can("edit_others_pages")){
        $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
        $tb_users = $wpdb->get_blog_prefix()."rm_users";
        $tb_coaches = $wpdb->get_blog_prefix()."rm_coaches";

        $event = strip_tags(stripslashes(trim($_POST["event"])));
        $year = strip_tags(stripslashes(trim($_POST["year"])));

        $sql = $wpdb->prepare("SELECT v.id, u.first_name_pass AS name, u.last_name_pass AS surname,
        v.owner_type AS role,
        u.birth_date AS born,
        CONCAT(u.serial_number_pass, u.number_pass) AS pass,
        u.expiration_date_pass AS passExpires,
        v.term AS visaExpires,
        v.type
        FROM $tb_visa AS v
        JOIN $tb_users AS u
        ON v.owner_id = u.id
        WHERE  v.owner_type='athlete' AND v.event = %d AND v.year = %s
        UNION
        SELECT v.id, c.first_name_pass AS name, c.last_name_pass AS surname,
        v.owner_type AS role,
        c.birth_date AS born,
        CONCAT(c.serial_number_pass, c.number_pass) AS pass,
        c.expiration_date_pass AS passExpires,
        v.term AS visaExpires,
        v.type
        FROM $tb_visa AS v
        JOIN $tb_coaches AS c
        ON v.owner_id = c.id      
        WHERE v.owner_type = 'coach' AND v.event = %d AND v.year = %s
        ORDER BY surname ASC", $event, $year, $event, $year);
        $result = $wpdb->get_results($sql);
        $visa_records = json_encode($result);
        print_r($visa_records);
    }