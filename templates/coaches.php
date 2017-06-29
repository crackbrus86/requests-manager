<div class="row coaches-wrapper">
    <div class="col-md-12 coaches-content-section">
        <h4>Тренери</h4>
        <div id="coachesGrid">

        </div>
        <div id="coachesPaging">

        </div>
    </div>
</div>


<div class="modal fade" id="coachModal" tabindex="-1" role="dialog" aria-labelledby="coachModalLabel" style="z-index: 10000">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="coachModalLabel">Редагувати дані тренера</h4>
            </div>
            <div class="modal-body">
                <form id="editCoach">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="hidden" id="coachId" />
                            <div class="form-group">
                                <label for="fullnameC">П.І.Б</label>
                                <input type="text" class="form-control" id="fullnameC" maxlength="50" readonly />
                            </div>
                            <div class="form-group">
                                <label for="birthDateC">Дата народження</label>
                                <input type="text" class="form-control" id="birthDateC" maxlength="10" readonly />
                            </div>
                            <div class="form-group">
                                <label for="regionC">Область</label>
                                <div><select class="form-control" id="regionC">
                                    <option></option>
                                </select></div>
                            </div>
                            <div class="form-group">
                                <label for="lastNamePassC">Прізвище як у закордонному паспорті</label>
                                <input type="text" class="form-control" id="lastNamePassC" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <label for="firstNamePassC">Ім'я як у закордонному паспорті</label>
                                <input type="text" class="form-control" id="firstNamePassC" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <label>Серія та номер закордонного паспорту</label>
                                <div class="row">
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" id="seriaOfpassC" placeholder="НН" maxlength="4" />
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" id="numberOfPassC" placeholder="ХХХХХХ" maxlength="8" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="termOfPassC">Термін дії паспорту</label>
                                <input type="date" class="form-control" id="termOfPassC" maxlength="10" placeholder="дд.мм.рррр" />
                            </div>                                                                                                            
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="indNumberC">Ідентифікаційний номер</label>
                                <input type="text" class="form-control" id="indNumberC" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <label for="phoneC">Номер телефону</label>
                                <input type="tel" class="form-control" id="phoneC" placeholder="+38 (999) 999-99-99" maxlength="20" />
                            </div>
                            <div class="form-group">
                                <label for="emailC">Електронна адреса</label>
                                <input type="email" class="form-control emailC" id="emailC" placeholder="email.adress@gmail.com" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <p><label for="photoOfNatPassIdC">Фото першої сторінки національного паспорту</label></p>
                                <button type="button" class="btn btn-default" id="uploadPhotoOfNatPassC" data-no="1">Завантажити фото</button>
                                <input type="hidden" name="photoOfNatPassIdC" id="photoOfNatPassIdC" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <p><label for="photoOfForPassC">Фото першої сторінки закордонного паспорту</label></p>
                                <button type="button" class="btn btn-default" id="uploadPhotoOfForPassC" data-no="1">Завантажити фото</button>
                                <input type="hidden" name="photoOfForPassIdC" id="photoOfForPassIdC" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <p><label for="accreditationPhotoC">Фото для акредитації</label></p>
                                <button type="button" class="btn btn-default" id="uploadAccreditationPhotoC">Завантажити фото</button>
                                <input type="hidden" name="accreditationPhotoIdC" id="accreditationPhotoIdC" maxlength="10" />
                            </div>                                                        
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-primary" id="saveCoach">Зберегти</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoModalC" id="uploadPhotoModalC" style="z-index: 15000">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h6 class="modal-title"></h6>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="showPhotoModalC" id="showPhotoModalC" style="z-index: 15000">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-example-modal-sm" id="removeCoach" tabindex="-1" role="dialog" aria-labelledby="removeCoachLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Видалити тренера</h4>
            </div>
            <div class="modal-body">
                <p><i class="fa fa-exclamation-triangle" style="color: red" aria-hidden="true"></i> Ви впевнені, що хочете видалити цього тренера?</p>
                <form id="removeC"><input type="hidden" class="form-control" name="id" id="removeCId"> </form>
            </div>                         
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                    <button type="button" class="btn btn-danger" id="deleteC">Видалити</button>
                </div>                    
        </div>
    </div>
</div>