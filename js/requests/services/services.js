var gamesDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

export const getOpenedGames = (contract) => {
    return jQuery.ajax({
        url: gamesDir + "GetOpenedActualGames.php",
        type: "POST",
        data: contract
    })
}