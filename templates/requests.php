<?php
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