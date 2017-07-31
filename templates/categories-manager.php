<?php
    wp_register_script( 'categories_manager_script', plugins_url( '../js/categories-manager.js', __FILE__ ) );
    wp_enqueue_script(  'categories_manager_script');
    wp_register_script( 'categories_manager_entry_script', plugins_url( '../js/categories/categories-bundle.js', __FILE__ ) );
    wp_enqueue_script(  'categories_manager_entry_script');    
?> 
 <div class="row categories-wrapper">
                <div class="col-md-6 weight-categories-section">
                    <h4>Вагові категорії</h4>
                    <table class="table table-striped">
                    <thead><tr><th width="80px">#</th><th width="415px">Вагова категорія</th><th width="180px">Вікова категорія</th><th></th><th></th></tr></thead>
                    <tbody id="weightCategoriesTable">
                    </tbody>
                    </table>
                    <form id="weightCategories">
                        <div class="form-group">
                            <label for="weightCategory">Вагова категорія</label>
                            <input type="text" class="form-control" name="title_w" id="weightCategory" placeholder="до 74,00">
                        </div>
                        <div class="form-group">
                            <label for="weightCategoryAge">Вікова категорія</label>
                            <select name="parent" id="weightCategoryAge">

                            </select>
                        </div>                    
                        <input type="button" class="btn btn-default" value="Додати" />
                        <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>        
                        <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>          
                    </form>
                </div>
                <div class="col-md-6 age-categories-section">
                    <h4>Вікові категорії</h4>
                    <table class="table table-striped">
                    <thead><tr><th width="80px">#</th><th width="595px">Вікова категорія</th><th></th><th></th></tr></thead>
                    <tbody id="ageCategoriesTable">
                    </tbody>
                    </table>
                    <form id="ageCategories">
                        <div class="form-group">
                            <label for="ageCategory">Категорія</label>
                            <input type="text" class="form-control" name="title" id="ageCategory" placeholder="Юніори">
                        </div>                       
                        <input type="button" class="btn btn-default" value="Додати" />
                        <div class="alert alert-success" style="display: none; margin-top: 20px;" role="alert"></div>  
                        <div class="alert alert-danger" style="display: none; margin-top: 20px;" role="alert"></div>                  
                    </form>                    
                </div>
            </div>

            <div class="modal fade" id="categoriesModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Редагувати категорію</h4>
                        </div>
                        <div class="modal-body">
                            <form id="editCategory">
                                <div class="form-group">
                                    <label for="editCategoryTitle">Назва категорії</label>
                                    <input type="text" class="form-control" name="title" id="editCategoryTitle">
                                 </div>
                                  <input type="hidden" class="form-control" name="id" id="editCategoryId">                                     
                            </form> 
                        </div>                         
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                            <button type="button" class="btn btn-primary" id="updateCategory">Зберегти</button>
                        </div>
                    </div>
                </div>
            </div>         

            <div class="modal fade bs-example-modal-sm" id="confirmCategoryDialog" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Видалити категорію</h4>
                    </div>
                        <div class="modal-body">
                            <p><i class="fa fa-exclamation-triangle" style="color: red" aria-hidden="true"></i> Ви впевнені, що хочете видалити цю категорію?</p>
                            <form id="removeCategory"><input type="hidden" class="form-control" name="id" id="removeCategoryId"> </form>
                        </div>                         
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Скасувати</button>
                            <button type="button" class="btn btn-danger" id="deleteCategory">Видалити</button>
                        </div>                    
                </div>
            </div>
            </div>   
            <div id="categories-app"></div>            