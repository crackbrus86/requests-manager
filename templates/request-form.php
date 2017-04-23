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
            <label for="surname">Прізвище</label>
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
            <input type="text" class="form-control" id="birthDate">
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
                <input type="text" class="form-control" id="termOfPass">
            </div>
            <div class="form-group">
                <label for="indNumber">Ідентифікаційний номер</label>
                <input type="text" class="form-control" id="indNumber" maxlength="10">
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
                <div><label for="currentCompetition">Змагання, на які подаєте заявку</label></div>
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
                        <input type="text" class="form-control" name="squat" class="discipline" id="squat" maxlength="6" value="00.00" />
                    </div>
                    <div class="col-md-3">
                        <label for="benchPress">Жим лежачи</label>
                        <input type="text" class="form-control" name="benchPress" class="discipline" id="benchPress" maxlength="6" value="00.00" />
                    </div>
                    <div class="col-md-3">
                        <label for="deadLift">Станова тяга</label>
                        <input type="text" class="form-control" name="deadLift" class="discipline" id="deadLift" maxlength="6" value="00.00" />
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
                <label for="phone">Номер телефону</label>
                <input type="tel" class="form-control" id="phone" placeholder="+38 (999) 999-99-99" maxlength="20" />
            </div>
            <div class="form-group">
                <label for="email">Електронна адреса</label>
                <input type="email" class="form-control" id="email" placeholder="email.adress@gmail.com" maxlength="50" />
            </div>
            <div class="form-group">
                <p>Дані тренера</p>
                <label class="radio-inline">
                    <input type="radio" name="hasCoach" value="false" checked /> Особисто
                </label>
                <label class="radio-inline">
                    <input type="radio" name="hasCoach" value="true" /> Тренер
                </label>
            </div>
            <div class="row coachForms">
                <div class="col-sm-12 bg-info" id="coachForm" style="display: none">
                    <div class="form-group">
                        <label>Тренер #1</label>
                    </div>
                    <div class="form-group">
                        <label for="coachLastName">Прізвище тренера</label>
                        <input type="text" class="form-control" name="coachLastName" id="coachLastName" placeholder="Прізвище" maxlength="50" />
                    </div>
                    <div class="form-group">
                        <label for="coachFirstName">Ім'я тренера</label>
                        <input type="text" class="form-control" name="coachFirstName" id="coachFirstName" placeholder="Ім'я" maxlength="30" />
                    </div>
                    <div class="form-group">
                        <label for="coachMiddleName">По-батькові тренера</label>
                        <input type="text" class="form-control" name="coachMiddleName" id="coachMiddleName" placeholder="По-батькові" maxlength="30" />
                    </div>
                    <div class="form-group">
                        <label for="coachBirthDate">Дата народження</label>
                        <input type="text" class="form-control" id="coachBirthDate">
                    </div>
                    <div class="form-group coachNo1">
                        <div><label>Чи супроводжує Вас на змагання?</label></div>
                        <label class="radio-inline">
                            <input type="radio" name="following" value="false" checked /> Ні
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="following" value="true" /> Так
                        </label>
                    </div>
                    <div id="coachAdvancedData" style="display: none">
                        <div class="form-group">
                            <label for="coachLastNameLikeInPass">Прізвище тренера як у закордонному паспорті</label>
                            <input type="text" class="form-control" name="coachLastNameLikeInPass" id="coachLastNameLikeInPass" placeholder="Surname" maxlength="50" />
                        </div>
                        <div class="form-group">
                            <label for="coachFirstNameLikeInPass">Ім'я тренера як у закордонному паспорті</label>
                            <input type="text" class="form-control" name="coachFirstNameLikeInPass" id="coachFirstNameLikeInPass" placeholder="Name" maxlength="30" />
                        </div>
                        <div class="form-group">
                            <label>Серія та номер закордонного паспорту тренера</label>
                            <div class="row">
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="coachSeriaOfpass" placeholder="НН" maxlength="4">
                                </div>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="coachNumberOfPass" placeholder="ХХХХХХ" maxlength="8">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="coachTermOfPass">Термін дії закордонного паспорту тренера</label>
                            <input type="text" class="form-control" id="coachTermOfPass">
                        </div>
                        <div class="form-group">
                            <label for="coachPhone">Номер телефону тренера</label>
                            <input type="tel" class="form-control" id="coachPhone" placeholder="+38 (999) 999-99-99" maxlength="20" />
                        </div>
                        <div class="form-group">
                            <label for="coachEmail">Електронна адреса тренера</label>
                            <input type="email" class="form-control" id="coachEmail" placeholder="email.adress@gmail.com" maxlength="50" />
                        </div>
                        <div class="form-group">
                            <label for="coachPhotoOfNatPass">Фото першої сторінки національного паспорту</label>
                            <input type="file" class="form-control" name="coachPhotoOfNatPass" id="coachPhotoOfNatPass" accept="image/jpeg,image/png" />
                        </div>
                        <div class="form-group">
                            <label for="coachPhotoOfForPass">Фото першої сторінки закордонного паспорту</label>
                            <input type="file" class="form-control" name="coachPhotoOfForPass" id="coachPhotoOfForPass" accept="image/jpeg,image/png" />
                        </div>
                        <div class="form-group">
                            <label for="coachAccreditationPhoto">Фото для акредитації</label>
                            <input type="file" class="form-control" name="coachAccreditationPhoto" id="coachAccreditationPhoto" accept="image/jpeg,image/png" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-info" id="appendCoach" style="display: none; margin-top: 10px">Додати ще</button>
            </div>
            <div class="form-group">
                <div><label>Чи здавали Ви допінг-контроль?</label></div>
                <label class="radio-inline">
                    <input type="radio" name="dopingControl" value="false" checked /> Ні
                </label>
                <label class="radio-inline">
                    <input type="radio" name="dopingControl" value="true" /> Так
                </label>
            </div>
            <div class="form-group" id="wrapDopingControlDate" style="display: none">
                <label for="dopingControlDate">Дата проходження допінг-контролю</label>
                <input type="text" class="form-control" id="dopingControlDate" />
            </div>
            <div class="form-group">
                <label for="photoOfNatPass">Фото першої сторінки національного паспорту</label>
                <input type="file" class="form-control" name="photoOfNatPass" id="photoOfNatPass" accept="image/jpeg,image/png" />
            </div>
            <div class="form-group">
                <label for="photoOfForPass">Фото першої сторінки закордонного паспорту</label>
                <input type="file" class="form-control" name="photoOfForPass" id="photoOfForPass" accept="image/jpeg,image/png" />
            </div>
            <div class="form-group">
                <label for="accreditationPhoto">Фото для акредитації</label>
                <input type="file" class="form-control" name="accreditationPhoto" id="accreditationPhoto" accept="image/jpeg,image/png" />
            </div>
            <div class="form-group">
                <div><label>Чи маєте Ви діючу візу?</label></div>
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
                    <input type="text" class="form-control" id="termOfVisa" />
                </div>
            </div>

            <button type="submit" class="btn btn-default">Надіслати</button>
        </div>
    </form>
</div>