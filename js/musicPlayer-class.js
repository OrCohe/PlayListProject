class MusicPlayer {
    constructor(image, songs, name, id) {
        this.image = image;
        this.songs = songs;
        this.name = name;
        this.id = id;
        this.idInArr;
        pageData.playLists.forEach((element,index) => {
            if(element.id == this.id) return this.idInArr = index;
        });
        this.isPlaying = false;
        this.lastPlayed = 0;
        this.timer = 0;
        this.draw();
    }
    draw() {
        const container = $('.playerContainer');  
        const playerDiv = buildAndAppend("div","",container,[{name:"class",value:"playCont slide-in-left"}]);
        const imageDiv = buildAndAppend("div","",playerDiv,[{name:"id",value:"playerImage"}]);
        buildAndAppend("img height=300px width=300px","",imageDiv,[{name:"src",value:this.image}]);
        const playBtn = buildAndAppend("button","",imageDiv,[{name:"id",value:"playerPlay"},{name:"class",value:"icon-play"}]);
        playBtn.on("click",() => this.checkStatus(this.lastPlayed));
        const audio = buildAndAppend("audio controls","",playerDiv,[{name:"id",value:"playNow"}]);
        audio.on("canplay", () => {
            audio[0].play();
            this.isPlaying = true;
        });
        audio.on("play", () => this.play(this.lastPlayed) );
        audio.on("pause", () => this.pause());
        audio.on("ended", () => this.playNext()); 
        buildAndAppend("source","",audio,[{name:"type",value:"audio/ogg"},{name:"src",value:this.songs[0].url}]);
        buildAndAppend("source","",audio,[{name:"type",value:"audio/mpeg"},{name:"src",value:this.songs[0].url}]);
        const songs = buildAndAppend("div","",playerDiv,[{name:"class",value:"songsList"}]);
        buildAndAppend("p",this.name,playerDiv);
        const delBtn = buildAndAppend("button","",playerDiv,[{name:"id",value:"playerDel"},{name:"class",value:"icon-delete"}]);
        delBtn.on("click",() => this.delete());
        const editBtn = buildAndAppend("button","",playerDiv,[{name:"id",value:"playerEdit"},{name:"class",value:"icon-edit"}]);
        editBtn.on("click",() => this.edit());
        this.songs.forEach((element,index) => {
            const abc = buildAndAppend("span",`<span>${index+1}.</span> ${element.name}`,songs,[{name:"id",value:`line${index}`}]);
            abc.on("click", () => {
                this.timer = 0;
                this.play(index, true);  
            });
            abc.on("mouseover", () => {
                if(this.lastPlayed != index) { abc.children().addClass("icon-play"); }
            }).on("mouseout", () => {
                if(this.lastPlayed != index) { abc.children().removeClass("icon-play"); }
            });
        });
        playerDiv.css("display","block");
    }

    checkStatus(index) {
        if(this.isPlaying) {
            this.pause();
        } else {
            this.play(index);
        }
    }

    playNext() {
        if(this.lastPlayed+1 < this.songs.length) {
            this.timer = 0;
            this.play(this.lastPlayed+1);
        }
    }

    play(index, ask=false) {
        const btn = $('#playerPlay');
        const image = $('#playerImage').children('img');
        const audio = $('#playNow');
        const lineOld = $(`#line${this.lastPlayed}`);
        const lineNew = $(`#line${index}`);
        if(!this.isPlaying || ask) {
            audio.attr("src",this.songs[index].url);
            $(audio)[0].currentTime = this.timer;
        }
        const numSign = $("<span>").html(`${this.lastPlayed+1}.`);
        lineOld.children('span').remove();
        lineOld.prepend(numSign);
        lineOld.removeClass("linePlaying");
        const playSign = $("<span>").attr("class","icon-play");
        lineNew.children('span').remove();
        lineNew.prepend(playSign);
        lineNew.addClass("linePlaying");
        this.isPlaying = true;
        this.lastPlayed = index;
        btn.removeAttr("class");
        btn.attr("class","icon-pause");
        image.attr("class","playing");
        document.title = `${this.name}: ${this.songs[index].name}`;
    }
    pause() {
        const btn = $('#playerPlay');
        const image = $('#playerImage').children('img');
        const audio = $('#playNow');
        this.isPlaying = false;
        this.timer = $(audio)[0].currentTime;
        audio[0].pause();
        btn.removeAttr("class");
        btn.attr("class","icon-play");
        image.removeAttr("class");
    }
    delete() {
        $(`#delModal`).modal("show");
        $('#tarID').val(this.id);
    }

    edit() {
        pageModal1.edit(pageData.playLists[this.idInArr]);
        pageModal1.show();
    }


}