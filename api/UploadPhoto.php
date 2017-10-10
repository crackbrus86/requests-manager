<?php
require_once( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );

if (!file_exists(ABSPATH .'/wp-content/uploads/pictures/')) {
    mkdir(ABSPATH .'/wp-content/uploads/pictures/', 0755, true);
}

foreach($_FILES as $file) {
	if ($file['error'] === 0) {
        $image = getimagesize($file['tmp_name']);
        if($image['mime'] != 'image/jpeg' && $image['mime'] != 'image/png'){
            echo "Sorry, we only accept JPEG and PNG images\n";
            exit;
        }
		if (is_uploaded_file($file['tmp_name'])) {
                $file_name = $file['name'];
                $tmp_file_name = explode(".", $file_name);
                $ext = $tmp_file_name[(count($tmp_file_name) - 1)]; 
                $str_unique = time();
                $new_file_name =  transliteration(str_replace('.'.$ext, '', $file_name)).$str_unique.'.'.$ext;
			if(!move_uploaded_file($file['tmp_name'], ABSPATH .'/wp-content/uploads/pictures/'.$new_file_name))
				die("Error");
			else 
                $file_url = ABSPATH .'/wp-content/uploads/pictures/'.$new_file_name;
                $file_type = $file['type'];
                $attachment_id = upload_user_file( $file_name, $file_url, $file_type);
                $nonce = wp_nonce_url( admin_url( 'tools.php?page=regenerate-thumbnails&goback=1&ids=' . $attachment_id ), 'regenerate-thumbnails' );
				echo $attachment_id;
		}
	}	
}
function upload_user_file( $file, $file_url, $file_type) {
          $filename = $file;
          $attachment = array(
              'post_mime_type' => $file_type,
              'post_title' => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
              'post_content' => '',
              'post_status' => 'inherit',
              'guid' => $file_url
          );
          $attachment_id = wp_insert_attachment( $attachment, $file_url );
          require_once($_SERVER['DOCUMENT_ROOT'].'/wp-admin/includes/image.php');
          $attachment_data = wp_generate_attachment_metadata( $attachment_id, $filename );
          wp_update_attachment_metadata( $attachment_id, $attachment_data );
          if( 0 < intval( $attachment_id ) ) {
                return $attachment_id;
          }
      return false;
}

function transliteration($str){
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