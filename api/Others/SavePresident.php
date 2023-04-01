<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $tb_others = $wpdb->get_blog_prefix()."rm_others";
    foreach($_POST as $item => $value){
        $data[$item] = strip_tags(stripcslashes(trim($value)));
    }
    if(!$data["id"]){
        $query = $wpdb->query("INSERT INTO $tb_others (president_name, president_region, config_email, president_name_latin, date_of_birth, foreign_pass_no_prefix, foreign_pass_no) 
            VALUES ('$data[name]', '$data[region]', '$data[email]', '$data[nameLatin]', '$data[dateOfBirth]', '$data[foreignPassNoPrefix]', '$data[foreignPassNo]')");
    }else{
        $query = $wpdb->query("UPDATE $tb_others SET 
            president_name = '$data[name]', 
            president_region = '$data[region]', 
            config_email = '$data[email]',
            president_name_latin = '$data[nameLatin]',
            date_of_birth = '$data[dateOfBirth]',
            foreign_pass_no_prefix = '$data[foreignPassNoPrefix]',
            foreign_pass_no = '$data[foreignPassNo]'
        WHERE id = $data[id]");
    }
}