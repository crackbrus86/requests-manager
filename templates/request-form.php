<?php
    wp_register_script( 'file_saver_script', plugins_url( '../js/FileSaver.min.js', __FILE__ ) );
    wp_enqueue_script(  'file_saver_script');   
    wp_register_script( 'new_wordexport_script', plugins_url( '../js/new.jquery.wordexport.js', __FILE__ ) );
    wp_enqueue_script(  'new_wordexport_script'); 
    wp_register_script( 'print_script', plugins_url( '../js/jQuery.print.js', __FILE__ ) );
    wp_enqueue_script(  'print_script'); 
    wp_register_style('rm_bootstrap', plugins_url( '../css/bootstrap.css', __FILE__ ));
    wp_enqueue_style( 'rm_bootstrap');
    wp_register_script( 'rm_mask', plugins_url( '../js/jquery.mask.min.js', __FILE__ ) );
    wp_enqueue_script(  'rm_mask');    
    wp_register_script( 'rm_send_request', plugins_url( '../js/dist/send-request-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'rm_send_request'); 
?>
<div id="send-request-app"></div>