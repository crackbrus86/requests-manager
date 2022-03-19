<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

if(!file_exists(ABSPATH . '/wp-content/uploads/pictures/'))
{
    mkdir(ABSPATH . '/wp-content/uploads/pictures/', 0755, true);
}

foreach($_FILES as $file)
{
    if($file['error'] === 0)
    {
        if($file['type'] !== 'application/pdf')
        {
            echo "File must be in PDF format!\n";
            exit;
        }

        if(is_uploaded_file($file['tmp_name']))
        {
            $filename = $file['name'];
            $tmp_file_name = explode('.', $filename);
            $extension = $tmp_file_name[(count($tmp_file_name) - 1)];
            $str_unique_part = time();
            $new_filename = transliterate(str_replace('.' . $extension, '', $filename)) . $str_unique_part . '.' . $extension;

            if(!move_uploaded_file($file['tmp_name'], ABSPATH . '/wp-content/uploads/pictures/' . $new_filename))
            {
                die("Error on move uploaded file");
            }else{
                $url = ABSPATH . '/wp-content/uploads/pictures/' . $new_filename;
                $type = $file['type'];
                $attachment_id = upload_file_as_attachment($filename, $url, $type);
                echo $attachment_id;
            }
        }
    }
}

function upload_file_as_attachment($file, $url, $type)
{
    $filename = $file;
    $attachment = array(
        'post_mime_type' => $type,
        'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
        'post_content' => '',
        'post_status' => 'inherit',
        'guid' => $url
    );
    $attachment_id = wp_insert_attachment($attachment, $url);
    return intval($attachment_id) > 0 ? $attachment_id : false;
}

function transliterate($str)
{
    $trans = array("а"=>"a","б"=>"b","в"=>"v","г"=>"g","д"=>"d","е"=>"e", 
            "ё"=>"yo","ж"=>"j","з"=>"z","и"=>"i","й"=>"i","к"=>"k","л"=>"l", 
            "м"=>"m","н"=>"n","о"=>"o","п"=>"p","р"=>"r","с"=>"s","т"=>"t", 
            "у"=>"y","ф"=>"f","х"=>"h","ц"=>"c","ч"=>"ch", "ш"=>"sh","щ"=>"shh",
            "ы"=>"i","э"=>"e","ю"=>"u","я"=>"ya","ї"=>"i","'"=>"","ь"=>"","Ь"=>"",
            "ъ"=>"","Ъ"=>"","і"=>"i","А"=>"A","Б"=>"B","В"=>"V","Г"=>"G","Д"=>"D",
            "Е"=>"E", "Ё"=>"Yo","Ж"=>"J","З"=>"Z","И"=>"I","Й"=>"I","К"=>"K", "Л"=>"L",
            "М"=>"M","Н"=>"N","О"=>"O","П"=>"P", "Р"=>"R","С"=>"S","Т"=>"T","У"=>"Y",
            "Ф"=>"F", "Х"=>"H","Ц"=>"C","Ч"=>"Ch","Ш"=>"Sh","Щ"=>"Sh", "Ы"=>"I","Э"=>"E",
            "Ю"=>"U","Я"=>"Ya","Ї"=>"I","І"=>"I");
    $res=str_replace(" ","-",strtr(strtolower($str),$trans));
    $res=preg_replace("|[^a-zA-Z0-9-]|","",$res);
    return $res;
}
?>