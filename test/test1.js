const expect = require("chai").expect;
const item = require("../lib/album.js");

describe("Album module", ()=> {
    it("returns requested album", () => {
        const result = item.getItem("Domestica");
        expect(result).to.deep.equal({artist:"Cursive", song:"The Martyr", album:"Domestica"});
    });

    it("fails w/ invalid album", () => {
        const result = item.getItem("What Me Worry?");
        expect(result).to.be.undefined;
    });

    it("returns found item was deleted from array", () => {
        const result = item.deleteItem("Person Pitch");
        expect(result.deleted).to.be.true;
    });

    it("fails to delete item not found in array", () => {
        const result = item.deleteItem("Monster");
        expect(result.deleted).to.be.false;
    });

    it("returns added new item exists in array", () => {
        newAlbum = {artist:"What", song:"Who", album:"Where"}
        const result = item.addItem(newAlbum);
        expect(result.added).to.be.true;
    });

    it("fails to add existing item to array", () => {
        newAlbum = {artist:"Roisin Murphy", song:"Night of the Dancing Flame", album: "Ruby Blue"}
        const result = item.addItem(newAlbum);
        expect(result.added).to.be.false;
    })


});