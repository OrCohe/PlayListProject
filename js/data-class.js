class appData {
    constructor() {
        this.playLists = [];
        this.isPlaying = false;
        this.musicPlayer;
        this.getAll();        
    }

    async getAll() {
        const data = await serverAPI.getAllPlayLists();
        data.data.forEach(element => {
            const play = new playList(element.name, element.image, element.id);
            this.playLists.push(play);
        });
        this.drawAll();
    }

    drawAll() {
        if(this.playLists.length == 0) return this.showEmpty();
        else {
            this.playLists.forEach(element => {
                if(!element.playing) element.draw();
            });
        }
    }

    async addPlay(name, url) {
        const playName = bigFirstLetter(name);
        const playUrl = url;
        let playData = {
            name: playName,
            image: playUrl,
            songs: []
        };
        if(checkValidSongs()) {
            playData.songs = checkValidSongs().songs;
            const servData = await serverAPI.addPlayList(playData);
            if(this.playLists.length == 0) $('.noDataImage').remove();
            const play = new playList(playName, playUrl, servData.data.id);
            this.playLists.push(play);
            pageModal2.hide();
            if(playName.toLowerCase().indexOf($('#sPlay').val().toLowerCase()) >= 0) {
                play.draw();
                $('#noFoundImage').remove();
            }
        } else {
            $('#errMsg').html("Please Fill all the fields in lines or Delete them! </br> Note that, Name length (2-20) and URL must be mp3!").css("display","block");
        }
    }

    async delete() {
        const id = $('#tarID').val();
        let idInArr;
        this.playLists.forEach(function (element,index) {
            if(element.id == id) return idInArr = index;
        });
        await serverAPI.deletePlayList(id);
        pageDelModal.hide();
        $(`#${id}`).attr("class","bounce-out-bottom");
        if(this.isPlaying === id) {
            $('.playCont').addClass("slide-out-right");
        } 
        setTimeout(() => {
            $(`#${id}`).remove();
            this.playLists.splice(idInArr,1);
            if(this.playLists.length == 0) this.showEmpty();
            if(this.isPlaying === id) {
                $('.playCont').remove();
                this.isPlaying = false;
            } 
          },    1100);
    }
    
    showSpecific() {
        const word = $.trim($('#sPlay').val());
        cleanContainer();
        if(word.length < 2) return this.drawAll();
        let count = 0;
        this.playLists.forEach(element => {
            if (element.name.toLowerCase().indexOf(word.toLowerCase()) >= 0 && !element.playing) {
                element.draw();
                count++;
            }
        });
        if(count == 0) return this.showEmpty();
    }

    showEmpty() {
        const cont = $(".container");
        const div = buildAndAppend("div","",cont,[{name:"class",value:"noDataImage"}]);
        buildAndAppend("img height=500px width=800px","",div,[{name:"src",value:"img/norecordfound.png"},{name:"id",value:"noFoundImage"}]);
        // const div = $("<div>").attr("class","noDataImage");
        // const img = $("<img height=300px width=400px>").attr('src', 'img/nodata.jpg');
        // cont.append(div);
        // div.append(img);
    }

}