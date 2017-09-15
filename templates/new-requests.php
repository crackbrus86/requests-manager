<?php
    wp_register_script( 'requests_entry_script', plugins_url( '../js/requests/requests-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'requests_entry_script');
?>          
<div id="requests-app"></div>