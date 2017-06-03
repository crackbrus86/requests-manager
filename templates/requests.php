<?php
    wp_register_script( 'polyfills_script', plugins_url( '../js/polyfills.js', __FILE__ ) );
    wp_enqueue_script(  'polyfills_script');
    wp_register_script( 'spinner_script', plugins_url( '../js/spinner.js', __FILE__ ) );
    wp_enqueue_script(  'spinner_script');
    wp_register_script( 'grid_script', plugins_url( '../js/grid.js', __FILE__ ) );
    wp_enqueue_script(  'grid_script');
    wp_register_script( 'requests_script', plugins_url( '../js/requests.js', __FILE__ ) );
    wp_enqueue_script(  'requests_script');
?>
<div class="row requests-wrapper">
    <div class="col-md-12 requests-content-section">
        <h4>Заявки</h4>
        <div id="requestsGrid">

        </div>
    </div>
</div>