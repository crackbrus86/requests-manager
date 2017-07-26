<?php
    // wp_register_script( 'games_manager_script', plugins_url( '../js/games-manager.js', __FILE__ ) );
    // wp_enqueue_script(  'games_manager_script');
    wp_register_script( 'games_manager_entry_script', plugins_url( '../js/games/games-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'games_manager_entry_script');
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
            <div class="row games-wrapper">
                <div class="col-md-6 before-games-section">
                    <h4>Відбіркові змагання</h4>
                    <table class="table table-striped">
                    <thead><tr><th width="80px">#</th><th width="415px">Назва</th><th width="180px">Тип</th><th></th><th></th></tr></thead>
                    <tbody id="beforeGamesTable">
                    </tbody>
                    </table>
                    <form id="gameBefore">
                        <div class="form-group">
                            <label for="gameBeforeName">Назва змагань</label>
                            <input type="text" class="form-control" name="name" id="gameBeforeName" placeholder="Кубок України">
                        </div>
                        <div class="form-group">
                            <label for="gameBeforeType">Тип змагань</label>
                            <select name="type" id="gameBeforeType">
                            <option value="0" selected>пауерліфтинг</option>
                            <option value="1">жим лежачи</option>
                            </select>
                        </div>                        
                        <input type="button" class="btn btn-default" value="Додати" />
                        <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>        
                        <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>          
                    </form>
                </div>
                <div class="col-md-6 actual-games-section">
                    <h4>Змагання, на які подається заявка</h4>
                    <table class="table table-striped">
                    <thead><tr><th width="80px">#</th><th width="415px">Назва</th><th width="180px">Тип</th><th></th><th></th></tr></thead>
                    <tbody id="actualGamesTable">
                    </tbody>
                    </table>
                    <form id="gameActual">
                        <div class="form-group">
                            <label for="gameActualName">Назва змагань</label>
                            <input type="text" class="form-control" name="name" id="gameActualName" placeholder="Чемпіонат Європи з пауерліфтингу">
                        </div>
                        <div class="form-group">
                            <label for="gameActualType">Тип змагань</label>
                            <select name="type" id="gameActualType">
                            <option value="0" selected>пауерліфтинг</option>
                            <option value="1">жим лежачи</option>
                            </select>
                        </div>                        
                        <input type="button" class="btn btn-default" value="Додати" />
                        <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>  
                        <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>                  
                    </form>                    
                </div>
            </div>

            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Редагувати змагання</h4>
                        </div>
                        <div class="modal-body">
                            <form id="editGame">
                                <div class="form-group">
                                    <label for="editGameName">Назва змагань</label>
                                    <input type="text" class="form-control" name="name" id="editGameName">
                                 </div>
                                 <div class="form-group">
                                    <label for="editGameType">Тип змагань</label>
                                    <select name="type" id="editGameType">
                                        <option value="0">пауерліфтинг</option>
                                        <option value="1">жим лежачи</option>
                                     </select>
                                  </div>  
                                  <input type="hidden" class="form-control" name="id" id="editGameId">                                     
                            </form> 
                        </div>                         
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                            <button type="button" class="btn btn-primary" id="updateGame">Зберегти</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-sm" id="confirmDialog" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Видалити змагання</h4>
                    </div>
                        <div class="modal-body">
                            <p><i class="fa fa-exclamation-triangle" style="color: red" aria-hidden="true"></i> Ви впевнені, що хочете видалити це змагання?</p>
                            <form id="removeGame"><input type="hidden" class="form-control" name="id" id="removeGameId"> </form>
                        </div>                         
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                            <button type="button" class="btn btn-danger" id="deleteGame">Видалити</button>
                        </div>                    
                </div>
            </div>
            </div>
            <div id="games-app"></div>