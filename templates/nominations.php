<div class="row nominations-wrapper">
    <div class="col-md-12 nominations-content-section">
        <h4>Номінації</h4>
        <div style="margin: 10px 0 20px; background-color: #f7f7f7; border: 1px solid #ccc; border-radius: 4px; padding: 5px 5px;">
            <h4>Фільтрувати номінації</h4>
            <form class="form-inline" id="filterNom" style="float: left;">
                <div class="form-group">
                    <label for="competitionFilter">Змагання</label>
                    <select class="form-control" id="competitionFilterNom">
                    <option></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="startDate">Від:</label>
                    <input type="date" class="form-control" id="startDateNom" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <div class="form-group">
                    <label for="endDate">До:</label>
                    <input type="date" class="form-control" id="endDateNom" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <button type="button" class="btn btn-info" id="runFilterNom">Фільтрувати</button>
            </form>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-1"><button class="word-export btn btn-default"> Експорт в Word </button></div>
                <div class="col-md-1"><button class="print btn btn-default"> Друкувати </button></div>
            </div>
        </div>
        <div id="nominationsGrids">

        </div>
    </div>
</div>