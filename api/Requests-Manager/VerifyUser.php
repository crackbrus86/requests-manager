<?php
    include('../wpdb-connect.php');
    $tb_users = $wpdb->get_blog_prefix()."rm_users";
    $surname = strip_tags(stripslashes(trim($_POST["surname"])));
    $firstName = strip_tags(stripslashes(trim($_POST["firstName"])));
    $middleName = strip_tags(stripslashes(trim($_POST["middleName"])));
    $birthDate = strip_tags(stripslashes(trim($_POST["birthDate"])));

    $sql = $wpdb->prepare("SELECT id, email FROM $tb_users WHERE last_name = %s AND first_name = %s
    AND middle_name = %s AND birth_date = %s", $surname, $firstName, $middleName, $birthDate);
    $user = $wpdb->get_row($sql);
    $output = new stdClass();
    $output->status = 0;
    $output->target = (int) $user->id;
    if($user){
        $code = mt_rand(1000, 9999);
        $tb_verify = $wpdb->get_blog_prefix()."rm_verify";
        $delete = $wpdb->prepare("DELETE FROM $tb_verify WHERE user_id = %d", $user->id);
        $wpdb->query($delete);
        $insert = $wpdb->prepare("INSERT INTO $tb_verify (user_id, code) VALUES (%d, %d)", $user->id, $code);
        if($wpdb->query($insert)) {
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $headers .= 'From: Eudemo <crackbrus86@gmail.com>' . "\r\n";
            $headers .= 'Cc: ' . "\r\n";
            $headers .= 'Bcc: ' . "\r\n";
            $for = $user->email;
            $subject = "Підтвердження email";
            $message = "Ваш код доступу: $code";
            mail($for, $subject, $message, $headers);
            $output->status = 1;        
        }
    }
    echo json_encode($output);