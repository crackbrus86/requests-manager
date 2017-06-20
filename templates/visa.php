<div class="row nominations-wrapper">
    <div class="col-md-12 visa-content-section">
        <h4>Візова підтримка</h4>
        <div style="margin: 10px 0 20px; background-color: #f7f7f7; border: 1px solid #ccc; border-radius: 4px; padding: 5px 5px;">
            <h4>Фільтрувати</h4>
            <form class="form-inline" id="filterVisa" style="float: left;">
                <div class="form-group">
                    <label for="competitionFilterVisa">Змагання</label>
                    <select class="form-control" id="competitionFilterVisa">
                    <option></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="startDateVisa">Від:</label>
                    <input type="date" class="form-control" id="startDateVisa" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <div class="form-group">
                    <label for="endDateVisa">До:</label>
                    <input type="date" class="form-control" id="endDateVisa" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <button type="button" class="btn btn-info" id="runFilterVisa">Фільтрувати</button>
            </form>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-1"><button class="word-export-visa btn btn-default"> Експорт в Word </button></div>
                <div class="col-md-1"><button class="print-visa btn btn-default"> Друкувати </button></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div id="visaGrids">

                </div>
            </div>
        </div>
    </div>
</div>