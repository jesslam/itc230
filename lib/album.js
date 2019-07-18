
let library = [
    {artist:"DeVotchKa", song:"Such a Lovely Thing", album:"How it Ends"},
    {artist:"Deefhoof", song:"Midnight Bicycle Mystery", album:"The Runners Four"},
    {artist:"Led Zeppelin", song:"Bron-Y-Aur Stomp", album:"Led Zeppelin III"},
    {artist:"N.E.R.D", song:"Sooner or Later", album:"Seeing Sounds"},
    {artist:"Panda Bear", song:"Ponytail", album:"Person Pitch"},
    {artist:"Wolf Parade", song:"Modern World", album:"Apologies to the Queen Mary"},
    {artist:"Deefhoof", song:"Choco Fight", album:"Friend Opportunity"},
    {artist:"The Blow", song:"Parentheses", album:"Paper Television"},
    {artist:"Architecture in Helsinki", song:"Frenchy I'm Faking", album:"In Case We Die"},
    {artist:"Cursive", song:"The Martyr", album:"Domestica"},
    {artist:"Roisin Murphy", song:"Night of the Dancing Flame", album: "Ruby Blue"}
    ];

const getAll = () => {
    return library
};

const getItem = (album) => {
    return library.find((data) => {
        return data.album.toLowerCase() === album.toLowerCase()
    });
};

const deleteItem = (album) => {
    let index = library.findIndex((data) => {
        return data.album.toLowerCase() === album.toLowerCase()
    });
        if (index === -1) {
            return {deleted:false};
        } else {
            library.splice(index, 1) 
            return {deleted:true};
        };
    };

module.exports = { getAll, getItem, deleteItem }