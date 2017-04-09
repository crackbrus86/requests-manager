<?php
    wp_register_script( 'regions_manager_script', plugins_url( '../js/regions-manager.js', __FILE__ ) );
    wp_enqueue_script(  'regions_manager_script');
?>
<style>
    tbody{
        max-height: 262px;
        overflow: auto;
        display: block;
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    table{
        display: block;
    }
</style> 

<div class="row">
    <div class="col-md-12 regions-section">
        <h4>Області України</h4>
        <table class="table table-striped">
        <thead><tr><th width="80px">#</th><th width="100%">Назва</th><th width="80px"></th><th width="80px"></th></tr></thead>
        <tbody id="regionsTable"></tbody>
        </table> 
        <form id="regionsForm">
            <div class="form-group">
                <label for="regionName">Область</label>
                <input type="text" class="form-control" name="region" id="regionName" placeholder="Хмельницька область">
            </div>                      
            <input type="button" class="btn btn-default" value="Додати" />
            <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>        
            <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>          
        </form>               
    </div>
</div>

<div class="modal fade" id="regionsModal" tabindex="-1" role="dialog" aria-labelledby="regionsModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="regionsModalLabel">Редагувати область</h4>
            </div>
            <div class="modal-body">
                <form id="editRegion">
                    <div class="form-group">
                        <label for="editRegionName">Назва змагань</label>
                        <input type="text" class="form-control" name="region" id="editRegionName">
                    </div>
                    <input type="hidden" class="form-control" name="id" id="editRegionId">                                     
                  </form> 
             </div>                         
             <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-primary" id="updateRegion">Зберегти</button>
             </div>
         </div>
     </div>
</div>

<div class="modal fade bs-example-modal-sm" id="confirmRegionDialog" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="mySmallModalLabel">Видалити область</h4>
            </div>
            <div class="modal-body">
                <p><i class="fa fa-exclamation-triangle" style="color: red" aria-hidden="true"></i> Ви впевнені, що хочете видалити цю область?</p>
                <form id="removeRegion"><input type="hidden" class="form-control" name="id" id="removeRegionId"></form>
            </div>                         
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-danger" id="deleteRegion">Видалити</button>
            </div>                    
        </div>
    </div>
</div>