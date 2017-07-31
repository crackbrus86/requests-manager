<?php
    wp_register_script( 'games_manager_entry_script', plugins_url( '../js/games/games-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'games_manager_entry_script');
?>          
<div id="games-app"></div>