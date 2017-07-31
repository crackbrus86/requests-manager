var dir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

export const GetPreCompetitions = () => {
        return jQuery.ajax({
            url: dir + "GetBeforeGames.php",
            type: "POST"
        })    
}

export const GetPreCompetition = (id) => {
    return jQuery.ajax({
        url: dir + "GetBeforeGameById.php",
        type: "POST",
        data: id
    })
}

export const UpdatePreCompetition = (contract) => {
    return jQuery.ajax({
        url: dir + "UpdateBeforeGame.php",
        type: "POST",
        data: contract
    })
}

export const CreatePreCompetition = (contract) => {
    return jQuery.ajax({
        url: dir + "InsertBeforeGame.php",
        type: "POST",
        data: contract
    })
}

export const DeletePreCompetition = (id) => {
    return jQuery.ajax({
        url: dir + "DeleteBeforeGame.php",
        type: "POST",
        data: id
    })
}

export const GetCompetitions = () => {
    return jQuery.ajax({
        url: dir + "GetActualGames.php",
        type: "POST"
    })
}

export const GetCompetition = (id) => {
    return jQuery.ajax({
        url: dir + "GetActualGameById.php",
        type: "POST",
        data: id
    })
}

export const UpdateCompetition = (contract) => {
    return jQuery.ajax({
        url: dir + "UpdateActualGame.php",
        type: "POST",
        data: contract
    })
}

export const CreateCompetition = (contract) => {
    return jQuery.ajax({
        url: dir + "InsertActualGame.php",
        type: "POST",
        data: contract
    })
}

export const DeleteCompetition = (id) => {
    return jQuery.ajax({
        url: dir + "DeleteActualGame.php",
        type: "POST",
        data: id
    })
}