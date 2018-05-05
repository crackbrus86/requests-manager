<?php
    require_once("../wpdb-connect.php");
    if(current_user_can("edit_others_pages")):
        $tb_profiles = $wpdb->get_blog_prefix() . "rm_profiles";
        $profile = esc_sql($_POST["profile"]);
        $sql = $wpdb->prepare("UPDATE $tb_profiles SET Name = %s, Surname = %s, Nation = %s, Gender = %s, Age = %s, Category = %s, 
        Experience = %s, Squat = %s, BenchPress = %s, Deadlift = %s, Total = %s, Job = %s, Photo = %d WHERE ProfileId = %d", $profile["name"], $profile["surname"], 
        $profile["nation"], $profile["gender"], $profile["age"], $profile["category"], $profile["experience"], $profile["squat"], $profile["benchPress"], 
        $profile["deadlift"], $profile["total"], $profile["job"], $profile["photo"], $profile["profileId"]);
        if($wpdb->query($sql)) echo "Profile was updated";
    endif;