<?php
require_once("../wpdb-connect.php");
if(current_user_can("edit_others_pages")){
    $profile = $_POST['profile'];
    $tb_profile = $wpdb->get_blog_prefix() . "rm_profiles";
    $sql = $wpdb->prepare("INSERT INTO $tb_profile (UserId, Name, Surname, Nation, Gender, Age, Category, Experience, Squat,
        BenchPress, Deadlift, Total, Job, Photo) VALUES(%d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d)", $profile['userId'], 
        $profile['name'], $profile['surname'], $profile['nation'], $profile['gender'], $profile['age'], $profile['category'], $profile['experience'], 
        $profile['squat'], $profile['benchPress'], $profile['deadlift'], $profile['total'], $profile['job'], $profile['photo']);
    if($wpdb->query($sql)){
        echo "Profile was saved";
    }
}