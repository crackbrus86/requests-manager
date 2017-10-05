<?php
    wp_register_script( 'rm_mask', plugins_url( '../js/jquery.mask.min.js', __FILE__ ) );
    wp_enqueue_script(  'rm_mask'); 
    wp_register_script( 'coaches_entry_script', plugins_url( '../js/coaches/coaches-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'coaches_entry_script'); 
?>
<div id="coaches-app"></div>