<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');
$pdfId = $_POST['pdfId'];
$url = wp_get_attachment_url($pdfId);
print_r($url);
?>