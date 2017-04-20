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
    wp_register_script( 'rm_mask', plugins_url( '../js/jquery.mask.min.js', __FILE__ ) );
    wp_enqueue_script(  'rm_mask');     
    wp_register_script( 'rm_request_form', plugins_url( '../js/request-form.js', __FILE__ ) );
    wp_enqueue_script(  'rm_request_form');   
        
?>
<div id="RequestForm">
    <form>
        <div class="form-group">
            <label for="surname">Прівзвище</label>
            <input type="text" class="form-control" id="surname" placeholder="Прізвище" maxlength="50">
        </div>
        <div class="form-group">
            <label for="firstName">Ім'я</label>
            <input type="text" class="form-control" id="firstName" placeholder="Ім'я" maxlength="30">
        </div>
        <div class="form-group">
            <label for="middleName">По-батькові</label>
            <input type="text" class="form-control" id="middleName" placeholder="По-батькові" maxlength="30">
        </div>
        <div class="form-group">
            <label for="birthDate">Дата народження</label>
            <input type="text" id="birthDate">
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="showNext">Далі</button>
        </div>
        <div class="anotherData" style="display: none">
            <div class="form-group">
                <label for="lastNameLikeInPass">Прізвище як у закордонному паспорті</label>
                <input type="text" class="form-control" id="lastNameLikeInPass" placeholder="Last Name" maxlength="50" />
            </div>
            <div class="form-group">
                <label for="firstNameLikeInPass">Ім'я як у закордонному паспорті</label>
                <input type="text" class="form-control" id="firstNameLikeInPass" placeholder="First Name" maxlength="30" />
            </div>
            <div class="form-group">
                <label>Серія та номер закордонного паспорту</label>
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="seriaOfpass" placeholder="НН" maxlength="4">
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" id="numberOfPass" placeholder="ХХХХХХ" maxlength="8">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="termOfPass">Термін дії паспорту</label>
                <input type="text" id="termOfPass">
            </div>
            <div class="form-group">
                <label for="indNumber">Ідентифікаційний номер</label>
                <input type="text" class="form-control" id="indNumber" maxlength="10">
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-md-6">
                        <div><label for="ageCategory">Вікова категорія</label></div>
                        <div><select id="ageCategory">
                            <option></option>
                        </select></div>
                    </div>
                    <div class="col-md-6">
                        <div><label for="weightCategory">Вагова категорія</label></div>
                        <div><select id="weightCategory">
                            <option></option>
                        </select></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div><label for="currentCompetition">Змагання, на які подаєте заявку</label></div>
                <div><select id="currentCompetition">
                    <option></option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <h5>Результат</h5>
                <div class="row">
                    <div class="col-md-3">
                        <label for="squat">Присідання</label>
                        <input type="text" name="squat" class="discipline" id="squat" maxlength="6" value="00.00" />
                    </div>
                    <div class="col-md-3">
                        <label for="benchPress">Жим лежачи</label>
                        <input type="text" name="benchPress" class="discipline" id="benchPress" maxlength="6" value="00.00" />
                    </div>
                    <div class="col-md-3">
                        <label for="deadLift">Станова тяга</label>
                        <input type="text" name="deadLift" class="discipline" id="deadLift" maxlength="6" value="00.00" />
                    </div>
                    <div class="col-md-3">
                        <label for="total">Сума</label>
                        <input type="text" name="total" id="total" maxlength="6" value="00.00" readonly />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div>
                    <label for="preCompetition">Відбіркові змагання</label>
                </div>
                <div>
                    <select id="preCompetition">
                    <option></option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Номер телефону</label>
                <input type="tel" id="phone" placeholder="+38 (999) 999-99-99" />
            </div>
            <div class="form-group">
                <label for="email">Електронна адреса</label>
                <input type="email" id="email" placeholder="email.adress@gmail.com" />
            </div>

            <button type="submit" class="btn btn-default">Надіслати</button>
        </div>
    </form>
</div>