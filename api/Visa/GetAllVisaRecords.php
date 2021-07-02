<?php
    require_once("../wpdb-connect.php");
    if(current_user_can("edit_others_pages")):
        $event = strip_tags(stripslashes(trim($_POST['event'])));
        $year = strip_tags(stripslashes(trim($_POST['year'])));
        $tb_request= $wpdb->get_blog_prefix() . 'rm_requests';
        $sql = $wpdb->prepare("SELECT user_id as user, coaches FROM $tb_request WHERE current_competition = %d AND year = %d", $event, $year);
        $records = $wpdb->get_results($sql);
        // echo "<pre>";
        // print_r($records);
        // echo "</pre>";        
        $users = array();
        $coaches = array();
        $tb_users = $wpdb->get_blog_prefix() . 'rm_users';
        $tb_coaches = $wpdb->get_blog_prefix() . 'rm_coaches';
        foreach($records as $record){
            array_push($users, fillArray($tb_users, $record->user, 'athlete'));
            $coachesTmp = unserialize($record->coaches);  
            $filteredCoaches = filterCoaches($coachesTmp);         
            if(!!$filteredCoaches && count($filteredCoaches) > 0){
                foreach($filteredCoaches as $coach){
                    array_push($coaches, fillArray($tb_coaches, $coach, 'coach'));
                }
            }
        }
        $coaches = array_map("unserialize", array_unique(array_map("serialize", $coaches)));     
        $results = array_merge($users, $coaches);        
        $records = appendVisaRecordsByForPassport($results);
        usort($records, function($a, $b)
        {
            return strcmp($a->fullName, $b->fullName);
        });
        $records = array_values(array_filter($records));
        $visaRecords = json_encode($records);
        echo $visaRecords;
    endif;

    function fillArray($table, $record, $type){
        global $wpdb;
        $sql = $wpdb->prepare("SELECT id, UPPER(CONCAT(last_name_pass,' ',first_name_pass)) AS fullName, %s AS role,
        birth_date AS born, CONCAT(serial_number_pass,number_pass) AS passNo,
        expiration_date_pass AS passExpires FROM $table WHERE id = %d", $type, $record);
        return $wpdb->get_row($sql);
    }

    function filterCoaches($coaches){
        $tmp = array();
        if(!!$coaches && count($coaches) > 0):
            foreach($coaches as $coach){
                if($coach[1] === "true") array_push($tmp, $coach[0]);
            } 
        endif;
        return $tmp;     
    }

    function appendVisaRecordsByForPassport($records){
        global $wpdb;
        $tb_for_passport = $wpdb->get_blog_prefix() . "rm_for_passport";
        if(!!$records && !count($records)) return array();
        $newRecords = array();
        for($i = 0; $i < count($records); $i++)
        {
            $record = $records[$i];
                $sql = $wpdb->prepare("SELECT PassportNumber AS no, SerialNumber AS seria, ExpirationDate AS expireDate FROM $tb_for_passport WHERE UserId = %d", $record->id);
                $passports = $wpdb->get_results($sql);
                if(!!$passport && count($passports))
                {
                    for($j = 0; $j < count($passports); $j++)
                    {
                        $passport = $passports[$j];

                        $newRecord = new stdClass();
                        $newRecord->born = $record->born;
                        $newRecord->fullName = $record->fullName;
                        $newRecord->id = $record->id;
                        $newRecord->passExpires = $passport->expireDate;
                        $newRecord->passNo = $passport->seria . $passport->no;
                        $newRecord->role = $record->role;
                        array_push($newRecords, $newRecord);
                    }
                }
        }
        $records = array_merge($records, $newRecords);
        return $records;
    }