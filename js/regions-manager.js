(function($, undefined) {
    $(document).ready(function() {
        var dir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";
        regions = {
            form: '#regionsForm',
            submit: '#regionsForm input[type=button]',
            tableBodyId: '#regionsTable',
            modalFormId: '#editRegion',
            alertText: '',
            editButtonClass: 'edit-region',
            removeButtonClass: 'remove-region',
            removingModalFormId: '#removeRegion',
            getRegionsController: dir + 'GetAllRegions',
            setRegionsController: dir + 'InsertRegion',
            getRegionController: dir + 'GetRegionById',
            updateRegionController: dir + 'UpdateRegion',
            removeRegionController: dir + 'DeleteRegion',
            wrapper: '.regions-section'
        }

        var regionsList = getRegions(regions);
        mapData(regionsList, regions);

        $(regions.submit).live('click', function() {
            if (validateInput(regions)) {
                setRegion(regions);
                $(regions.form + ' input[type=text]')[0].value = '';
            }
        });

        $('.' + regions.editButtonClass).live('click', function(e) {
            var region = getRegion(regions, e.target.dataset['item']);
            $('#editRegionName').val(region[0].region);
            $('#editRegionId').val(region[0].id);
            $('#updateRegion').addClass('update-region');
        });

        $('#updateRegion').live('click', function() {
            updateRegion(regions);
            $('#regionsModal').modal('hide');
        });

        $('.' + regions.removeButtonClass).live('click', function(e) {
            $('#confirmRegionDialog').modal('show');
            $('#confirmRegionDialog form input[type=hidden]').val(e.target.dataset['item']);
        });

        $('#deleteRegion').live('click', function() {
            removeRegion(regions);
            $('#confirmRegionDialog').modal('hide');
        });
    });

    function mapData(data, regions) {
        innerTable = '<tbody id="' + regions.tableBodyId.slice(1) + '" >';
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                var region = data[i];
                region.no = i;
                innerTable += '<tr><td width="80px">' + (region.no + 1) + '</td><td width="100%">' + region.region + '</td>' +
                    '<td width="80x"><button type="button" class="btn btn-success ' + regions.editButtonClass + '" data-toggle="modal" data-target="#regionsModal" data-item="' + region.id + '">Edit</button></td>' +
                    '<td width="80x"><button type="button" class="btn btn-danger ' + regions.removeButtonClass + '" data-item="' + region.id + '">Delete</button></td></tr>';
            }
        }
        innerTable += '</tbody>';
        $(regions.tableBodyId).replaceWith(innerTable);
    }

    function getRegions(regions) {
        var regionsList = [];
        $.ajax({
            url: regions.getRegionsController + '.php',
            async: false,
            success: function(data) {
                regionsList = JSON.parse(data);
            }
        });
        return regionsList;
    }

    function getRegion(region, regionId) {
        var regionData;
        $.ajax({
            type: 'POST',
            url: region.getRegionController + '.php',
            data: 'id=' + regionId,
            async: false,
            success: function(data) {
                regionData = JSON.parse(data);
            },
            error: function() {
                showErrorAlert(region);
                return false;
            }
        });
        return regionData;
    }

    function setRegion(region) {
        var data = $(region.form).serialize();
        showPreloader(region.wrapper);
        $.ajax({
            type: 'POST',
            url: region.setRegionsController + '.php',
            data: data,
            success: function(data) {
                if (data === 'true') {
                    region.alertText = 'Область було успішно додано!';
                    refreshGrid(region);
                }
            },
            error: function() {
                hidePreloader(region.wrapper);
                showErrorAlert(region);
                return false;
            }
        });
    }

    function updateRegion(region) {
        var data = $(region.modalFormId).serialize();
        showPreloader(region.wrapper);
        $.ajax({
            type: 'POST',
            url: region.updateRegionController + '.php',
            data: data,
            success: function(data) {
                if (data) {
                    region.alertText = 'Область було успішно оновлено!';
                    refreshGrid(region);
                }
            },
            error: function() {
                hidePreloader(region.wrapper);
                showErrorAlert(region);
                return false;
            }
        });
    }

    function refreshGrid(region) {
        $(region.form + ' .alert-success').html(region.alertText);
        $(region.form + ' .alert-success').fadeIn(1000);
        var data = getRegions(region);
        mapData(data, regions);
        hidePreloader(region.wrapper);
        setTimeout(function() {
            $(region.form + ' .alert-success').fadeOut(500);
        }, 3000);
    }

    function removeRegion(region) {
        var data = $(region.removingModalFormId).serialize();
        showPreloader(region.wrapper);
        $.ajax({
            type: 'POST',
            url: region.removeRegionController + '.php',
            data: data,
            success: function(data) {
                if (data == 'true') {
                    region.alertText = 'Змагання було успішно видалено!';
                    refreshGrid(region);
                }
            },
            error: function() {
                hidePreloader(region.wrapper);
                showErrorAlert(region);
                return false;
            }
        });
    }

    function showErrorAlert(region) {
        region.alertText = '<strong>Увага помилка!</strong> Нажаль під час операції сталася помилка. Спробуйте ще раз.';
        $(region.form + ' .alert-danger').html(region.alertText);
        $(region.form + ' .alert-danger').fadeIn(1000);
        setTimeout(function() {
            $(region.form + ' .alert-danger').fadeOut(500);
        }, 3000);

    }

    function validateInput(region) {
        var validationField = $(region.form + ' input[type=text]');
        if (!validationField[0].value) {
            $(region.form + " .form-group").addClass('has-error');
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
})(jQuery);