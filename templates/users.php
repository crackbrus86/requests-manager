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