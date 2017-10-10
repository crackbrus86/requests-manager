<?php
    wp_register_script( 'nominations_entry_script', plugins_url( '../js/nominations/nominations-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'nominations_entry_script'); 
?>
<div id="nom-app"></div>