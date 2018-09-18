<?php
    wp_register_script( 'others_script_bundle', plugins_url( '../js/dist/others-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'others_script_bundle');    
?>
<div id="others-app"></div>