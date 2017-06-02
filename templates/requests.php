<?php
    wp_register_script( 'requests_script', plugins_url( '../js/requests.js', __FILE__ ) );
    wp_enqueue_script(  'requests_script');
echo "Hello requests";