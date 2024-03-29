
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
    //let length = library.length;
    let item = library.findIndex((data) => {
        //console.log(data);
        return data.album.toLowerCase() === album.toLowerCase()
    });
        if (item === -1) {
            console.log(length);
            return {deleted:false, index:library[index]}
        } else {
            library.splice(index, 1)
            console.log(index)
            //console.log(length)
            return {deleted:true, index:library[index]};
        };
    };

const addItem = (newAlbum) => {
    let search = library.findIndex((data) => {
        return data.album.toLowerCase() === newAlbum.album.toLowerCase()
    });
        if (search === -1) {
            console.log(search);
            library.push(newAlbum);
            return {added:true, length: library.length}
        } else {
            //let item = library.newAlbum[search]
            //console.log(item)
            console.log(search)
            return {added:false, length: library.length};

//            return newAlbum + " already exists and was not added."
        };
    };

module.exports = { getAll, getItem, deleteItem, addItem }