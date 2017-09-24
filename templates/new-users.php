<?php
    wp_register_script( 'users_entry_script', plugins_url( '../js/users/users-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'users_entry_script'); 
?>
<div id="users-app"></div>