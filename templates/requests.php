<?php
    wp_register_style('req_rm_jquery_ui_style', plugins_url( '../css/jquery-ui.min.css', __FILE__ ));
    wp_enqueue_style( 'req_rm_jquery_ui_style');
    wp_register_style('req_rm_jquery_ui_datepicker_style', plugins_url( '../css/jquery-ui.theme.min.css', __FILE__ ));
    wp_enqueue_style( 'req_rm_jquery_ui_datepicker_style');    
    wp_register_script( 'req_rm_jquery_ui', plugins_url( '../js/jquery-ui.min.js', __FILE__ ) );
    wp_enqueue_script(  'req_rm_jquery_ui');    
    wp_register_script( 'req_rm_jquery_ui_datepicker_uk', plugins_url( '../js/datepicker-uk.js', __FILE__ ) );
    wp_enqueue_script(  'req_rm_jquery_ui_datepicker_uk');    
    wp_register_script( 'polyfills_script', plugins_url( '../js/polyfills.js', __FILE__ ) );
    wp_enqueue_script(  'polyfills_script');
    wp_register_script( 'spinner_script', plugins_url( '../js/spinner.js', __FILE__ ) );
    wp_enqueue_script(  'spinner_script');
    wp_register_script( 'grid_script', plugins_url( '../js/grid.js', __FILE__ ) );
    wp_enqueue_script(  'grid_script');
    wp_register_script( 'form_script', plugins_url( '../js/form.js', __FILE__ ) );
    wp_enqueue_script(  'form_script');     
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
                    <div class="form-group">
                        <label for="fullname">П.І.Б</label>
                        <input type="text" class="form-control" id="fullname" maxlength="50" readonly />
                    </div>
                    <div class="form-group">
                        <label for="birthDate">Дата народження</label>
                        <input type="text" class="form-control" id="birthDate" maxlength="10" readonly />
                    </div>
                    <div class="form-group">
                        <label for="region">Область</label>
                        <input type="text" class="form-control" id="region" maxlength="50" readonly />
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6">
                                <div><label for="ageCategory">Вікова категорія</label></div>
                                <div><select class="form-control" id="ageCategory">
                            <option></option>
                        </select></div>
                            </div>
                            <div class="col-md-6">
                                <div><label for="weightCategory">Вагова категорія</label></div>
                                <div><select class="form-control" id="weightCategory">
                            <option></option>
                        </select></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div><label for="currentCompetition">Змагання, на які подається заявка</label></div>
                        <div><select class="form-control" id="currentCompetition">
                    <option></option>
                    </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <p class="bg-success"><strong>Результат</strong></p>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="squat">Присідання</label>
                                <input type="text" class="form-control discipline" name="squat" id="squat" maxlength="6" value="00.00" />
                            </div>
                            <div class="col-md-3">
                                <label for="benchPress">Жим лежачи</label>
                                <input type="text" class="form-control discipline" name="benchPress" id="benchPress" maxlength="6" value="00.00" />
                            </div>
                            <div class="col-md-3">
                                <label for="deadLift">Станова тяга</label>
                                <input type="text" class="form-control discipline" name="deadLift" id="deadLift" maxlength="6" value="00.00" />
                            </div>
                            <div class="col-md-3">
                                <label for="total">Сума</label>
                                <input type="text" class="form-control" name="total" id="total" maxlength="6" value="00.00" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="preCompetition">Відбіркові змагання</label>
                        </div>
                        <div>
                            <select class="form-control" id="preCompetition">
                    <option></option>
                    </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div><label>Чи здавав допінг-контроль?</label></div>
                        <label class="radio-inline">
                    <input type="radio" name="dopingControl" value="false" checked /> Ні
                </label>
                        <label class="radio-inline">
                    <input type="radio" name="dopingControl" value="true" /> Так
                </label>
                    </div>
                    <div class="form-group" id="wrapDopingControlDate" style="display: none">
                        <label for="dopingControlDate">Дата проходження допінг-контролю</label>
                        <input type="text" class="form-control" id="dopingControlDate" maxlength="10" placeholder="дд.мм.рррр" />
                    </div>
                    <div class="form-group">
                        <div><label>Чи має діючу візу?</label></div>
                        <label class="radio-inline">
                    <input type="radio" name="activeVisa" value="false" checked /> Ні
                </label>
                        <label class="radio-inline">
                    <input type="radio" name="activeVisa" value="true" /> Так
                </label>
                    </div>
                    <div id="visaFeatures" style="display: none">
                        <div class="form-group">
                            <label for="typeOfVisa">Тип діючої візи</label>
                            <select id="typeOfVisa" class="form-control">
                    <option value="0">Шенгенська віза</option>
                    <option value="1">Віза США</option>
                </select>
                        </div>
                        <div class="form-group">
                            <label for="termOfVisa">Термін дії візи</label>
                            <input type="text" class="form-control" id="termOfVisa" maxlength="10" placeholder="дд.мм.рррр" />
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-primary" id="saveRequest">Зберегти</button>
            </div>
        </div>
    </div>
</div>