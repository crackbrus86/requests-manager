<?php
    wp_register_style('rm_bootstrap', plugins_url( '../css/bootstrap.css', __FILE__ ));
    wp_enqueue_style( 'rm_bootstrap');
    wp_register_script( 'rm_mask', plugins_url( '../js/jquery.mask.min.js', __FILE__ ) );
    wp_enqueue_script(  'rm_mask');    
    wp_register_script( 'rm_send_request', plugins_url( '../js/send-request/send-request-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'rm_send_request'); 
?>
<div id="send-request-app"></div>