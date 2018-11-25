class appModal2 {
    constructor() {
        this.modal = $('#addPlayModal2').on("hidden.bs.modal", () =>  { this.reset(); });
        this.title = $('#modal2Title');
        this.songCont = $('#songsCont');
        this.btn = $('#modal2FinishBtn');
        this.err = $('#errMsg');
    }
    edit(play) {
        play.songs.forEach(element => {
            this.addSongLine(element.name, element.url);
        });
        this.show();
        this.btn.attr("onclick",null);
        this.btn.off('click').on("click", () => { this.saveAndGo(play); });
    }

    saveAndGo(play) {
        if(checkValidSongs()) {
            const songs = checkValidSongs();
            play.upDateSongs(songs);
            this.hide();
            if(play.id == pageData.musicPlayer.id) {
                $('.playCont').addClass("slide-out-right");
                setTimeout(() => {
                    $('.playCont').remove();
                    if(play.playing) { pageData.musicPlayer = new MusicPlayer(play.image, songs.songs, play.name, play.id); }
                }, 1100);
            }
            
        } else {
            $('#errMsg').html("Please Fill all the fields in lines or Delete them! </br> Note that, Name length (2-20) and URL must be mp3!").css("display","block");
        }
        
    }

    addSongLine(name='', url='') {
        const songDiv = buildAndAppend("div","",this.songCont,[{name:"id",value:"lineDiv"}]);
        const divOne = buildAndAppend("div","",songDiv);
        const divTwo = buildAndAppend("div","",songDiv);
        buildAndAppend("label","Song Name:",divOne);
        buildAndAppend("input","",divOne,[
            {name:"type",value:"text"},{name:"name",value:"song[]"},
            {name:"id",value:"songName"},{name:"value",value:`${name}`}])
        buildAndAppend("label","Song URL:",divTwo);
        buildAndAppend("input","",divTwo,[
            {name:"type",value:"text"},{name:"name",value:"url[]"},
            {name:"id",value:"songUrl"},{name:"value",value:`${url}`}])
        const delBtn = buildAndAppend("button","",songDiv,[{name:"id",value:"delLineBtn"},{name:"class",value:"icon-delete"}]);
        delBtn.on("click",() => { 
            const count = $("input[name='song[]']").length;
            if(count > 1) {
                delBtn.closest("#lineDiv").remove();
            } else {
                this.err.html("You need at least 1 song to continue!").css("display","block");
            }
        });
    }
    reset() {
        this.title.text("Add Playlist Songs");
        $('#songsCont div').remove();
        this.btn.attr("onclick","pageData.addPlay(pageModal1.tempName,pageModal1.tempUrl)");
        this.err.html('');
    }
    show() {
        this.modal.modal('show');
    }
    hide() {
        this.modal.modal('hide');
    }
}