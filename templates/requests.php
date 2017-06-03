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

<div class="modal fade" id="requestModal" tabindex="-1" role="dialog" aria-labelledby="requestModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="requestModalLabel">Редагувати заявку</h4>
            </div>
            <div class="modal-body">
                <form id="editRequest">

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-primary" id="saveRequest">Зберегти</button>
            </div>
        </div>
    </div>
</div>