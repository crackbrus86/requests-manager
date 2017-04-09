(function($, undefined) {
    $(document).ready(function() {
        var dir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

        var beforeGames = {
            form: '#gameBefore',
            submit: '#gameBefore input[type=button]',
            tableBodyId: '#beforeGamesTable',
            modalFormId: '#editGame',
            alertText: '',
            editButtonClass: 'edit-before-game',
            removeButtonClass: 'remove-before-game',
            removingModalFormId: '#removeGame',
            getGamesController: dir + 'GetBeforeGames',
            setGamesController: dir + 'InsertBeforeGame',
            getGameController: dir + 'GetBeforeGameById',
            updateGameController: dir + 'UpdateBeforeGame',
            removeGameController: dir + 'DeleteBeforeGame',
            wrapper: '.before-games-section'
        };

        var actualGames = {
            form: '#gameActual',
            submit: '#gameActual input[type=button]',
            tableBodyId: '#actualGamesTable',
            modalFormId: '#editGame',
            alertText: '',
            editButtonClass: 'edit-actual-game',
            removeButtonClass: 'remove-actual-game',
            removingModalFormId: '#removeGame',
            getGamesController: dir + 'GetActualGames',
            setGamesController: dir + 'InsertActualGame',
            getGameController: dir + 'GetActualGameById',
            updateGameController: dir + 'UpdateActualGame',
            removeGameController: dir + 'DeleteActualGame',
            wrapper: '.actual-games-section'
        };

        var beforeGamesList = getGames(beforeGames);
        mapData(beforeGamesList, beforeGames);

        var actualGamesList = getGames(actualGames);
        mapData(actualGamesList, actualGames);

        $(beforeGames.submit).live('click', function() {
            if (validateInput(beforeGames)) {
                setGame(beforeGames);
                $(beforeGames.form + ' input[type=text]')[0].value = '';
            }
        });

        $(actualGames.submit).live('click', function() {
            if (validateInput(actualGames)) {
                setGame(actualGames);
                $(actualGames.form + ' input[type=text]')[0].value = '';
            }
        });

        $('.has-error input').live('blur', function(e) {
            if (e.target.value.length) {
                $('.has-error').removeClass('has-error');
            }
        });

        $('.edit-before-game').live('click', function(e) {
            var game = getGame(beforeGames, e.target.dataset['item']);
            $('#editGameName').val(game[0].name);
            $('#editGameType option[value=' + game[0].type + ']').attr('selected', 'selected');
            $('#editGameId').val(game[0].id);
            $('#updateGame').addClass('update-before-game');
        });

        $('.edit-actual-game').live('click', function(e) {
            var game = getGame(actualGames, e.target.dataset['item']);
            $('#editGameName').val(game[0].name);
            $('#editGameType option[value=' + game[0].type + ']').attr('selected', 'selected');
            $('#editGameId').val(game[0].id);
            $('#updateGame').addClass('update-actual-game');
        });

        $('#updateGame').live('click', function(e) {
            if ($('#updateGame').hasClass('update-before-game')) {
                updateGame(beforeGames);
                $('#updateGame').removeClass('update-before-game');
                $('#myModal').modal('hide');
            }
            if ($('#updateGame').hasClass('update-actual-game')) {
                updateGame(actualGames);
                $('#updateGame').removeClass('update-actual-game');
                $('#myModal').modal('hide');
            }
        });

        $('.remove-before-game').live('click', function(e) {
            $('#confirmDialog').modal('show');
            $('#confirmDialog form input[type=hidden]').val(e.target.dataset['item']);
            $('#deleteGame').addClass('delete-before-game');
        });

        $('.remove-actual-game').live('click', function(e) {
            $('#confirmDialog').modal('show');
            $('#confirmDialog form input[type=hidden]').val(e.target.dataset['item']);
            $('#deleteGame').addClass('delete-actual-game');
        });

        $('#deleteGame').live('click', function(e) {
            if ($('#deleteGame').hasClass('delete-before-game')) {
                removeGame(beforeGames);
                $('#deleteGame').removeClass('delete-before-game');
                $('#confirmDialog').modal('hide');
            }
            if ($('#deleteGame').hasClass('delete-actual-game')) {
                removeGame(actualGames);
                $('#deleteGame').removeClass('delete-actual-game');
                $('#confirmDialog').modal('hide');
            }
        });

    });

    var gameTypes = ['пауерліфтинг', 'жим лежачи'];

    function setGame(game) {
        var data = $(game.form).serialize();
        showPreloader(game.wrapper);
        $.ajax({
            type: "POST",
            url: game.setGamesController + '.php',
            data: data,
            success: function(data) {
                if (data === 'true') {
                    game.alertText = 'Змагання було успішно додано!';
                    refreshGrid(game);
                }
            },
            error: function() {
                hidePreloader(game.wrapper);
                showErrorAlert(game);
                return false;
            }
        });
    }

    function updateGame(game) {
        var data = $(game.modalFormId).serialize();
        showPreloader(game.wrapper);
        $.ajax({
            type: 'POST',
            url: game.updateGameController + '.php',
            data: data,
            success: function(data) {
                if (data) {
                    game.alertText = "Змагання було успішно оновлено!";
                    refreshGrid(game);
                }
            },
            error: function() {
                hidePreloader(game.wrapper);
                showErrorAlert(game);
                return false;
            }
        });
    }

    function removeGame(game) {
        var data = $(game.removingModalFormId).serialize();
        showPreloader(game.wrapper);
        $.ajax({
            type: 'POST',
            url: game.removeGameController + '.php',
            data: data,
            success: function(data) {
                if (data == 'true') {
                    game.alertText = "Змагання було успішно видалено!";
                    refreshGrid(game);
                }
            },
            error: function() {
                hidePreloader(game.wrapper);
                showErrorAlert(game);
                return false;
            }
        });
    }

    function refreshGrid(game) {
        $(game.form + ' .alert-success').html(game.alertText);
        $(game.form + ' .alert-success').fadeIn(1000);
        var data = getGames(game);
        mapData(data, game);
        hidePreloader(game.wrapper);
        setTimeout(function() {
            $(game.form + ' .alert-success').fadeOut(500);
        }, 3000);
    }

    function showErrorAlert(game) {
        game.alertText = '<strong>Увага помилка!</strong> Нажаль під час операції сталася помилка. Спробуйте ще раз.';
        $(game.form + ' .alert-danger').html(game.alertText);
        $(game.form + ' .alert-danger').fadeIn(1000);
        setTimeout(function() {
            $(game.form + ' .alert-danger').fadeOut(500);
        }, 3000);

    }

    function getGame(game, gameId) {
        var gameData;
        $.ajax({
            type: "POST",
            url: game.getGameController + ".php",
            data: "id=" + gameId,
            async: false,
            success: function(data) {
                gameData = JSON.parse(data);
            },
            error: function() {
                showErrorAlert(game);
                return false;
            }
        });
        return gameData;
    }

    function getGames(game) {
        var games = [];
        $.ajax({
            url: game.getGamesController + ".php",
            async: false,
            success: function(data) {
                games = JSON.parse(data);
            }
        });
        return games;
    }

    function mapData(data, games) {
        var innerTable = '<tbody id="' + games.tableBodyId.slice(1) + '">';
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                var game = data[i];
                game.no = i;
                innerTable += '<tr><td width="80px">' + (game.no + 1) + '</td><td width="415px">' + game.name + '</td><td  width="180px">' + gameTypes[game.type] + '</td>' +
                    '<td><button type="button" class="btn btn-success ' + games.editButtonClass + '" data-toggle="modal" data-target="#myModal" data-item="' + game.id + '">Edit</button></td>' +
                    '<td><button type="button" class="btn btn-danger ' + games.removeButtonClass + '" data-item="' + game.id + '">Delete</button></td></tr>';
            }
        }
        innerTable += '</tbody>';
        $(games.tableBodyId).replaceWith(innerTable);
    }

    function validateInput(game) {
        var validationField = $(game.form + ' input[type=text]');
        if (!validationField[0].value) {
            $(game.form + " .form-group").addClass('has-error');
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