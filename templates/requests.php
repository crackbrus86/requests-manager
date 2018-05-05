<?php
    wp_register_script( 'file_saver_script', plugins_url( '../js/FileSaver.min.js', __FILE__ ) );
    wp_enqueue_script(  'file_saver_script');   
    wp_register_script( 'wordexport_script', plugins_url( '../js/new.jquery.wordexport.js', __FILE__ ) );
    wp_enqueue_script(  'wordexport_script'); 
    wp_register_script( 'print_script', plugins_url( '../js/jQuery.print.js', __FILE__ ) );
    wp_enqueue_script(  'print_script');   
    wp_register_script( 'requests_entry_script', plugins_url( '../js/requests/requests-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'requests_entry_script'); 
?>          
<div id="requests-app"></div>