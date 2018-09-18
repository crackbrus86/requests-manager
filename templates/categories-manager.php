<?php
    wp_register_script( 'categories_manager_entry_script', plugins_url( '../js/dist/categories-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'categories_manager_entry_script');    
?>   
<div id="categories-app"></div>            