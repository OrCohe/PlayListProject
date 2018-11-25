class serverAPI {
    constructor() {
        this.url = "http://localhost/playlist/api/playlist";
    }
    async getAllPlayLists() {
        const result = await $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `${this.url}`});
        return result; 
    }
    async addPlayList(data) {
        const result = await $.ajax({
            method: 'POST',
            dataType: 'json',
            url: `${this.url}`,
            data: data});
        return result; 
    }
    async deletePlayList(id) {
        const result = await $.ajax({
            method: 'DELETE',
            url: `${this.url}/${id}`});
        return result; 
    }
    async getPlayListSongs(id) {
        const result = await $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `${this.url}/${id}/songs`});
        return result; 
    }
    async upDatePlayProp(id, data) {
        const result = await $.ajax({
            method: 'POST',
            dataType: 'json',
            url: `${this.url}/${id}`,
            data: data});
        return result; 
    }
    async upDatePlaySongs(id, data) {
        const result = await $.ajax({
            method: 'POST',
            dataType: 'json',
            url: `${this.url}/${id}/songs`,
            data: data});
        return result; 
    }
}
