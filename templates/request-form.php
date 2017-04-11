<?php
    wp_register_style('rm_bootstrap', plugins_url( '../css/bootstrap.css', __FILE__ ));
    wp_enqueue_style( 'rm_bootstrap');
    wp_register_script( 'bootstrap', plugins_url( '../js/bootstrap.js', __FILE__ ) );
    wp_enqueue_script(  'bootstrap');  
    wp_register_style('rm_jquery_ui_style', plugins_url( '../css/jquery-ui.min.css', __FILE__ ));
    wp_enqueue_style( 'rm_jquery_ui_style');
    wp_register_style('rm_jquery_ui_datepicker_style', plugins_url( '../css/jquery-ui.theme.min.css', __FILE__ ));
    wp_enqueue_style( 'rm_jquery_ui_datepicker_style');    
    wp_register_script( 'rm_jquery_ui_datepicker', plugins_url( '../js/jquery-ui.min.js', __FILE__ ) );
    wp_enqueue_script(  'rm_jquery_ui_datepicker');    
    wp_register_script( 'rm_jquery_ui_datepicker_uk', plugins_url( '../js/datepicker-uk.js', __FILE__ ) );
    wp_enqueue_script(  'rm_jquery_ui_datepicker_uk'); 
    wp_register_script( 'rm_request_form', plugins_url( '../js/request-form.js', __FILE__ ) );
    wp_enqueue_script(  'rm_request_form');     
?>
<div id="RequestForm">
    <form>
        <div class="form-group">
            <label for="surname">Прівзвище</label>
            <input type="text" class="form-control" id="surname" placeholder="Прізвище">
        </div>
        <div class="form-group">
            <label for="firstName">Ім'я</label>
            <input type="text" class="form-control" id="firstName" placeholder="Ім'я">
        </div>
        <div class="form-group">
            <label for="middleName">По-батькові</label>
            <input type="text" class="form-control" id="middleName" placeholder="По-батькові">
        </div>
        <div class="form-group">
            <label for="birthDate">Дата народження</label>
            <input type="text" id="birthDate">
        </div>
        <div class="form-group">
            <label>Серія та номер закордонного паспорту</label>
            <div class="row">
                <div class="col-md-4">
                    <input type="text" class="form-control" id="seriaOfpass" placeholder="AA">
                </div>
                <div class="col-md-8">
                    <input type="number" class="form-control" id="numberOfPass" placeholder="ХХХХХХ">
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-default">Надіслати</button>
    </form>
</div>