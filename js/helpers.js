export function capitalizeFullName(fullName){
    if(!fullName) return '';
    return fullName.split(' ').map(item => capitalizeName(item)).join(' ');
}

export function capitalizeName(name){
    let nameItems = [];
    if(name.includes('-'))
    {
        nameItems = name.split('-').map(n => n.trim());
    }else{
        nameItems.push(name);
    }
    return nameItems.map(item => {
        let nextItem = item.toLowerCase();
        return nextItem.length > 1 ? nextItem[0].toUpperCase() + nextItem.substring(1, nextItem.length) : nextItem[0];
    }).join(' - ');
}