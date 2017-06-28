<div class="row users-wrapper">
    <div class="col-md-12 users-content-section">
        <h4>Спортсмени</h4>
        <div id="usersGrid">

        </div>
        <div id="usersPaging">

        </div>
    </div>
</div>

<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" style="z-index: 10000">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="userModalLabel">Редагувати дані спортсмена</h4>
            </div>
            <div class="modal-body">
                <form id="editUser">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="hidden" id="userId" />
                            <div class="form-group">
                                <label for="fullnameU">П.І.Б</label>
                                <input type="text" class="form-control" id="fullnameU" maxlength="50" readonly />
                            </div>
                            <div class="form-group">
                                <label for="birthDateU">Дата народження</label>
                                <input type="text" class="form-control" id="birthDateU" maxlength="10" readonly />
                            </div>
                            <div class="form-group">
                                <label for="regionU">Область</label>
                                <div><select class="form-control" id="regionU">
                                    <option></option>
                                </select></div>
                            </div>
                            <div class="form-group">
                                <label for="lastNamePassU">Прізвище як у закордонному паспорті</label>
                                <input type="text" class="form-control" id="lastNamePassU" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <label for="firstNamePassU">Ім'я як у закордонному паспорті</label>
                                <input type="text" class="form-control" id="firstNamePassU" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <label>Серія та номер закордонного паспорту</label>
                                <div class="row">
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" id="seriaOfpassU" placeholder="НН" maxlength="4" />
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" id="numberOfPassU" placeholder="ХХХХХХ" maxlength="8" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="termOfPassU">Термін дії паспорту</label>
                                <input type="date" class="form-control" id="termOfPassU" maxlength="10" placeholder="дд.мм.рррр" />
                            </div>                                                                                                            
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="indNumberU">Ідентифікаційний номер</label>
                                <input type="text" class="form-control" id="indNumberU" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <label for="phoneU">Номер телефону</label>
                                <input type="tel" class="form-control" id="phoneU" placeholder="+38 (999) 999-99-99" maxlength="20" />
                            </div>
                            <div class="form-group">
                                <label for="emailU">Електронна адреса</label>
                                <input type="email" class="form-control emailU" id="emailU" placeholder="email.adress@gmail.com" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <p><label for="photoOfNatPassIdU">Фото першої сторінки національного паспорту</label></p>
                                <button type="button" class="btn btn-default" id="uploadPhotoOfNatPassU" data-no="1">Завантажити фото</button>
                                <input type="hidden" name="photoOfNatPassIdU" id="photoOfNatPassIdU" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <p><label for="photoOfForPassU">Фото першої сторінки закордонного паспорту</label></p>
                                <button type="button" class="btn btn-default" id="uploadPhotoOfForPassU" data-no="1">Завантажити фото</button>
                                <input type="hidden" name="photoOfForPassIdU" id="photoOfForPassIdU" maxlength="10" />
                            </div>
                            <div class="form-group">
                                <p><label for="accreditationPhotoU">Фото для акредитації</label></p>
                                <button type="button" class="btn btn-default" id="uploadAccreditationPhotoU">Завантажити фото</button>
                                <input type="hidden" name="accreditationPhotoIdU" id="accreditationPhotoIdU" maxlength="10" />
                            </div>                                                        
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-primary" id="saveUser">Зберегти</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoModalU" id="uploadPhotoModalU" style="z-index: 15000">
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

<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="showPhotoModalU" id="showPhotoModalU" style="z-index: 15000">
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

<div class="modal fade bs-example-modal-sm" id="removeUser" tabindex="-1" role="dialog" aria-labelledby="removeUserLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Видалити спортсмена</h4>
            </div>
            <div class="modal-body">
                <p><i class="fa fa-exclamation-triangle" style="color: red" aria-hidden="true"></i> Ви впевнені, що хочете видалити цього спортсмена?</p>
                <form id="removeU"><input type="hidden" class="form-control" name="id" id="removeUId"> </form>
            </div>                         
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                    <button type="button" class="btn btn-danger" id="deleteU">Видалити</button>
                </div>                    
        </div>
    </div>
</div>