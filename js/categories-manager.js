(function($, undefined) {
    $(document).ready(function() {
        var dir = '../wp-content/plugins/requests-manager/api/Categories-Manager/';

        ageCategories = {
            form: '#ageCategories',
            submit: '#ageCategories input[type=button]',
            tableBodyId: '#ageCategoriesTable',
            modalFormId: '#editCategory',
            alertText: '',
            editButtonClass: 'edit-age-category',
            removeButtonClass: 'remove-age-category',
            removingModalFormId: '#removeCategory',
            setCategoryController: dir + 'InsertAgeCategory',
            getCategoriesController: dir + 'GetAgeCategories',
            getCategoryController: dir + 'GetAgeCategoryById',
            updateCategoryController: dir + 'UpdateAgeCategory',
            removeCategoryController: dir + 'DeleteAgeCategory',
            wrapper: '.age-categories-section'
        }

        weightCategories = {
            form: '#weightCategories',
            submit: '#weightCategories input[type=button]',
            tableBodyId: '#weightCategoriesTable',
            modalFormId: '#editCategory',
            alertText: '',
            editButtonClass: 'edit-weight-category',
            removeButtonClass: 'remove-weight-category',
            removingModalFormId: '#removeCategory',
            setCategoryController: dir + 'InsertWeightCategory',
            getCategoriesController: dir + 'GetWeightCategories',
            getCategoryController: dir + 'GetWeightCategoryById',
            updateCategoryController: dir + 'UpdateWeightCategory',
            removeCategoryController: dir + 'DeleteWeightCategory',
            wrapper: '.weight-categories-section'
        }

        var ageCategoriesList = getCategories(ageCategories);
        mapData(ageCategoriesList, ageCategories);
        var weightCategoriesList = getCategories(weightCategories);
        mapData(weightCategoriesList, weightCategories);

        if (ageCategoriesList) {
            fillAgeCategoriesSelect(ageCategoriesList);
        }

        $(ageCategories.submit).live('click', function() {
            if (validateInput(ageCategories)) {
                setCategory(ageCategories);
                $(ageCategories.form + ' input[type=text]')[0].value = '';
            }
        });

        $(weightCategories.submit).live('click', function() {
            if (validateInput(weightCategories)) {
                setCategory(weightCategories);
                $(weightCategories.form + ' input[type=text]')[0].value = '';
            }
        });

        $('.' + ageCategories.editButtonClass).live('click', function(e) {
            $('#SelectAge').remove();
            var category = getCategory(ageCategories, e.target.dataset['item']);
            $('#editCategoryTitle').val(category[0].title);
            $('#editCategoryId').val(category[0].id);
            $('#updateCategory').addClass('update-age-category');
        });
        $('.' + weightCategories.editButtonClass).live('click', function(e) {
            $('#SelectAge').remove();
            var category = getCategory(weightCategories, e.target.dataset['item']);
            $('#editCategoryTitle').val(category[0].title_w);
            $('#editCategoryId').val(category[0].id);
            tmpAgeCategoriesList = getCategories(ageCategories);
            $('#editCategory').append(appendListOfParents(tmpAgeCategoriesList, category[0].parent));
            $('#updateCategory').addClass('update-weight-category');
        });

        $('#updateCategory').live('click', function(e) {
            if ($('#updateCategory').hasClass('update-age-category')) {
                updateCategory(ageCategories, weightCategories);
                $('#updateCategory').removeClass('update-age-category');
                $('#categoriesModal').modal('hide');
            }
            if ($('#updateCategory').hasClass('update-weight-category')) {
                updateCategory(weightCategories, null);
                $('#updateCategory').removeClass('update-weight-category');
                $('#categoriesModal').modal('hide');
            }
        });

        $('.' + ageCategories.removeButtonClass).live('click', function(e) {
            $('#confirmCategoryDialog').modal('show');
            $('#confirmCategoryDialog form input[type=hidden]').val(e.target.dataset['item']);
            $('#deleteCategory').addClass('delete-age-category');
        });

        $('.' + weightCategories.removeButtonClass).live('click', function(e) {
            $('#confirmCategoryDialog').modal('show');
            $('#confirmCategoryDialog form input[type=hidden]').val(e.target.dataset['item']);
            $('#deleteCategory').addClass('delete-weight-category');
        });

        $('#deleteCategory').live('click', function(e) {
            if ($('#deleteCategory').hasClass('delete-age-category')) {
                removeCategory(ageCategories, weightCategories);
                $('#deleteCategory').removeClass('delete-age-category');
                $('#confirmCategoryDialog').modal('hide');
            }
            if ($('#deleteCategory').hasClass('delete-weight-category')) {
                removeCategory(weightCategories, null);
                $('#deleteCategory').removeClass('delete-weight-category');
                $('#confirmCategoryDialog').modal('hide');
            }
        });

        $('.has-error input').live('blur', function(e) {
            if (e.target.value.length) {
                $('.has-error').removeClass('has-error');
            }
        });
    });

    function setCategory(category) {
        var data = $(category.form).serialize();
        showPreloader(category.wrapper);
        $.ajax({
            type: "POST",
            url: category.setCategoryController + '.php',
            data: data,
            success: function(data) {
                if (data === 'true') {
                    category.alertText = 'Вікову категорію було успішно додано!';
                    refreshGrid(category);
                }
            },
            error: function() {
                hidePreloader(category.wrapper);
                showErrorAlert(category);
                return false;
            }
        });
    }

    function getCategories(category) {
        var categories = [];
        $.ajax({
            url: category.getCategoriesController + ".php",
            async: false,
            success: function(data) {
                categories = JSON.parse(data);
            }
        });
        return categories;
    }

    function getCategory(category, categoryId) {
        var categoryData;
        $.ajax({
            type: "POST",
            url: category.getCategoryController + ".php",
            data: "id=" + categoryId,
            async: false,
            success: function(data) {
                categoryData = JSON.parse(data);
            },
            error: function() {
                showErrorAlert(category);
                return false;
            }
        });
        return categoryData;
    }

    function updateCategory(category, secondCategory) {
        var data = $(category.modalFormId).serialize();
        showPreloader(category.wrapper);
        $.ajax({
            type: 'POST',
            url: category.updateCategoryController + '.php',
            data: data,
            success: function(data) {
                if (data) {
                    category.alertText = "Категорію було успішно оновлено!";
                    refreshGrid(category);
                    if (secondCategory) {
                        secondCategory.alertText = category.alertText;
                        refreshGrid(secondCategory);
                    }
                }
            },
            error: function() {
                hidePreloader(category.wrapper);
                showErrorAlert(category);
                return false;
            }
        });
    }

    function removeCategory(category, secondCategory) {
        var data = $(category.removingModalFormId).serialize();
        showPreloader(category.wrapper);
        $.ajax({
            type: 'POST',
            url: category.removeCategoryController + '.php',
            data: data,
            success: function(data) {
                if (data == 'true') {
                    category.alertText = "Категорію було успішно видалено!";
                    refreshGrid(category);
                    if (category.form = '#ageCategories') {
                        secondCategory.alertText = category.alertText;
                        refreshGrid(secondCategory);
                    }
                }
            },
            error: function() {
                hidePreloader(category.wrapper);
                showErrorAlert(category);
                return false;
            }
        });
    }

    function refreshGrid(category) {
        $(category.form + ' .alert-success').html(category.alertText);
        $(category.form + ' .alert-success').fadeIn(1000);
        var data = getCategories(category);
        mapData(data, category);
        if (category.form == '#ageCategories') fillAgeCategoriesSelect(data);
        hidePreloader(category.wrapper);
        setTimeout(function() {
            $(category.form + ' .alert-success').fadeOut(500);
        }, 3000);
    }

    function mapData(data, categories) {
        var innerTable = '<tbody id="' + categories.tableBodyId.slice(1) + '">';
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                var category = data[i];
                category.no = i;
                innerTable += '<tr><td width="80px">' + (category.no + 1) + '</td>';
                if (categories.form == '#weightCategories') {
                    innerTable += '<td width="415px">' + category.title_w + '</td>';
                    innerTable += '<td width="180px">' + category.title + '</td>';
                } else {
                    innerTable += '<td width="595px">' + category.title + '</td>';
                }
                innerTable += '<td><button type="button" class="btn btn-success ' + categories.editButtonClass + '" data-toggle="modal" data-target="#categoriesModal" data-item="' + category.id + '">Edit</button></td>' +
                    '<td><button type="button" class="btn btn-danger ' + categories.removeButtonClass + '" data-item="' + category.id + '">Delete</button></td></tr>';
            }
        }
        innerTable += '</tbody>';
        $(categories.tableBodyId).replaceWith(innerTable);
    }

    function showErrorAlert(category) {
        category.alertText = '<strong>Увага помилка!</strong> Нажаль під час операції сталася помилка. Спробуйте ще раз.';
        $(category.form + ' .alert-danger').html(category.alertText);
        $(category.form + ' .alert-danger').fadeIn(1000);
        setTimeout(function() {
            $(category.form + ' .alert-danger').fadeOut(500);
        }, 3000);

    }

    function validateInput(category) {
        var validationField = $(category.form + ' input[type=text]');
        if (!validationField[0].value) {
            $(category.form + " .form-group").addClass('has-error');
            return false;
        }
        return true;
    }

    function showPreloader(selector) {
        $(selector + " table").css("opacity", "0.3");
        $(selector).append('<span class="fa-spin fa fa-circle-o-notch" style="position: absolute; top: 50%; left: 50%;"></span>');
    }

    function hidePreloader(selector) {
        $(selector + " table").css("opacity", "1");
        $(selector + " .fa-spin").remove();
    }

    function fillAgeCategoriesSelect(data) {
        $('#weightCategoryAge').html('');
        var select = '';
        for (var i = 0; i < data.length; i++) {
            select = (i == 0) ? 'selected ' : '';
            $('#weightCategoryAge').append('<option value="' + data[i].id + '" ' + select + '>' + data[i].title + '</option>');
        }
    }

    function appendListOfParents(data, id) {
        var select = '';
        $insertSelect = '<div class="form-group" id="SelectAge">';
        $insertSelect += '<label for="editWeightCategoryParent">Вагова категорія:</label>';
        $insertSelect += '<div><select name="parent" id="editWeightCategoryParent">';
        for (var i = 0; i < data.length; i++) {
            select = (data[i].id === id) ? 'selected ' : '';
            $insertSelect += '<option value="' + data[i].id + '" ' + select + ' >' + data[i].title + '</option>';
        }
        $insertSelect += '</select></div>';
        $insertSelect += '</div>';
        return $insertSelect;
    }

})(jQuery)