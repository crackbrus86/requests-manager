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
            if(count($filteredCoaches) > 0){
                foreach($filteredCoaches as $coach){
                    array_push($coaches, fillArray($tb_coaches, $coach, 'coach'));
                }
            }
        }
        $coaches = array_map("unserialize", array_unique(array_map("serialize", $coaches)));     
        $results = array_merge($users, $coaches);        
        foreach($results as $result){
            $visa = getVisaRecord($result, $event, $year);
            $result->visaId = ($visa) ? $visa->visaId : null;
            $result->visaType = ($visa) ? $visa->visaType : null;
            $result->visaExpires = ($visa) ? $visa->visaExpires : null;
        }
        // echo "<pre>";
        // print_r(appendVisaRecordsByForPassport($results));
        // echo "</pre>";         
        $visaRecords = json_encode($results);
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
        if(count($coaches) > 0):
            foreach($coaches as $coach){
                if($coach[1] === "true") array_push($tmp, $coach[0]);
            } 
        endif;
        return $tmp;     
    }

    function getVisaRecord($person, $event, $year){
        global $wpdb;
        $tb_visa = $wpdb->get_blog_prefix()."rm_visa";
        $sql = $wpdb->prepare("SELECT id AS visaId, type AS visaType, term AS visaExpires FROM $tb_visa WHERE 
        owner_type = %s AND owner_id = %d AND event = %d AND year = %d", $person->role, $person->id, $event, $year);
        $visa = $wpdb->get_row($sql);
        return $visa;
    }

    function appendVisaRecordsByForPassport($records){
        global $wpdb;
        $tb_for_passport = $wpdb->get_blog_prefix() . "rm_for_passport";
        if(!count($records)) return array();
        $newRecords = array();
        for($i = 0; $i < count($records); $i++)
        {
            $record = $records[$i];
            if($record->role == "athlete")
            {
                $sql = $wpdb->prepare("SELECT PassportNumber AS no, PassportSerialNumber AS seria, ExpirationDate AS expireDate FROM $tb_for_passport WHERE UserId = %d", $record->id);
                $passports = $wpdb->get_results($sql);

                if(count($passports))
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
                        $newRecord->visaExpires = $record->visaExpires;
                        $newRecord->visaId = $record->visaId;
                        $newRecord->visaType = $record->visaType;

                        array_push($newRecords, $newRecord);
                    }
                }
            }
        }
        $records = array_merge($records, $newRecords);
        return $records;
    }