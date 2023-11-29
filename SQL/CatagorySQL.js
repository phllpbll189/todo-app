function getCatagories(token, listID){
    return `select *
    from catagory
    where "${listID}" = (
        select L_ListID
        from Invite_List
        where Users_Email = (
            select email
            from Users
            where token = "${token}"
        )
    );`
}

function insertCat(Token, listID, {name, x, y, width, height}){
    return `call insertCat("${Token}","${listID}","${name}","${x}","${y}","${width}","${height}")`
}

function deleteCat(Token, listID, {CatID}){
    return `call deleteCat("${Token}", "${listID}", "${CatID}")`;
}

function updateCat(Token, listID, {CatID, name, x, y, width, height}){
    return`call UpdateCat("${Token}", "${listID}", "${CatID}", "${name}", "${x}", "${y}", "${width}", "${height}")`
}
module.exports = {
    getCatagories,
    insertCat,
    deleteCat,
    updateCat
}