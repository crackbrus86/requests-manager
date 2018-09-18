<?php
    wp_register_script( 'regions_bundle_script', plugins_url( '../js/dist/regions-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'regions_bundle_script');    
?>
<div id="regions-app"></div>