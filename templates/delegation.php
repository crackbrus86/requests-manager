<div class="row delegation-wrapper">
    <div class="col-md-12 delegation-content-section">
        <h4>Делегація</h4>
        <div style="margin: 10px 0 20px; background-color: #f7f7f7; border: 1px solid #ccc; border-radius: 4px; padding: 5px 5px;">
            <h4>Фільтрувати</h4>
            <form class="form-inline" id="filterDelegation" style="float: left;">
                <div class="form-group">
                    <label for="competitionFilterDelegation">Змагання</label>
                    <select class="form-control" id="competitionFilterDelegation">
                    <option></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="startDateDelegation">Від:</label>
                    <input type="date" class="form-control" id="startDateDelegation" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <div class="form-group">
                    <label for="endDateDelegation">До:</label>
                    <input type="date" class="form-control" id="endDateDelegation" maxlength="10" placeholder="дд.мм.рррр" />
                </div>
                <button type="button" class="btn btn-info" id="runFilterDelegation">Фільтрувати</button>
            </form>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-1"><button class="word-export-delegation btn btn-default"> Експорт в Word </button></div>
                <div class="col-md-1"><button class="print-delegation btn btn-default"> Друкувати </button></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div id="delegationGrid">

                </div>
            </div>
        </div>
    </div>
</div>