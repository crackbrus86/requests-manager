<?php
    wp_register_script('form_script', plugins_url( '../js/form.js', __FILE__ ) );
    wp_enqueue_script('form_script'); 
    wp_register_script( 'others_script', plugins_url( '../js/others.js', __FILE__ ) );
    wp_enqueue_script(  'others_script');
?>
            <div class="row others-wrapper">
                <div class="col-md-6 president-section">
                    <h4>Голова делегації</h4>
                    <form id="presidentForm">
                        <div class="form-group">
                            <label for="fullNamePr">П.І.Б.</label>
                            <input type="text" class="form-control" name="name" id="fullNamePr" />
                        </div>
                        <div class="form-group">
                            <label for="regionPr">Область</label>
                            <select  class="form-control" id="regionPr">
                            <option></option>
                            </select>
                        </div>  
                        <input type="hidden" id="idPr" />                      
                        <input type="button" class="btn btn-default" value="Зберегти" />
                        <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>        
                        <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>          
                    </form>
                </div>
            </div>