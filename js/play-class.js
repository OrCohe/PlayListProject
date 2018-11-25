class playList {
    constructor(name, image, id) {
        this.name = name;
        this.image = image;
        this.id = id;
        this.songs = [];
        this.play;
        this.del;
        this.edit;
        this.correctPlay;
        this.playing = false;
        this.bandName;
        this.pageImage;
    }

    draw() {
        const cont = $('.row');
        this.correctPlay = buildAndAppend("div","",cont,[{name:"id",value:this.id},{name:"class",value:"circ bounce-in-top"}]);
        this.bandName = buildAndAppend("div",`${this.name}`,this.correctPlay,[{name:"id",value:"bandName"}]);
        const bandImage = buildAndAppend("div","",this.correctPlay,[{name:"id",value:"bandImage"}]);
        this.pageImage = buildAndAppend("img","",bandImage,[{name:"id",value:"pListDiv"},{name:"src",value:this.image}]);
        this.play = buildAndAppend("button","",bandImage,[{name:"id",value:"btnPlay"},{name:"class",value:"icon-play"}]);
        this.play.on("click", () => {
            this.playMusic();
            });
        this.del = buildAndAppend("button","",bandImage,[{name:"id",value:"btnDel"},{name:"class",value:"icon-delete"}]);
        this.del.on("click", () => {
            pageDelModal.show();
            $('#tarID').val(this.id);
            });
        this.edit = buildAndAppend("button","",bandImage,[{name:"id",value:"btnEdit"},{name:"class",value:"icon-edit"}]);
        this.edit.on("click", () => {
            pageModal1.edit(this);
            pageModal1.show();
            });
        new CircleType($(this.bandName)[0]).radius(150);
    }

    async getSongs(toPlay=false) {
        const servData = await serverAPI.getPlayListSongs(this.id);
        this.songs = servData.data.songs;
        if(toPlay) {
            this.startPlaying();
        }
    }

    startPlaying() {
        const image = $(`#${this.id}`).children('div').children('img');
        if(pageData.isPlaying) {
            $('.playCont').addClass("slide-out-right");
            setTimeout(() => {
                $('.playCont').remove();
                pageData.musicPlayer = new MusicPlayer(this.image, this.songs, this.name, this.id);
                image.attr("class","playing");
                this.playing = true;
                this.play.attr("class","icon-pause");
                pageData.isPlaying = this.id;
            }, 1100); 
        } else {
            pageData.musicPlayer = new MusicPlayer(this.image, this.songs, this.name, this.id);
            image.attr("class","playing");
            this.playing = true;
            this.play.attr("class","icon-pause");
            pageData.isPlaying = this.id;
        }
    }

    async upDate(newData) {
        await serverAPI.upDatePlayProp(this.id, newData);
        this.bandName.text(newData.name);
        this.pageImage.attr("src",newData.image);
        new CircleType($(this.bandName)[0]).radius(150);
    }

    async upDateSongs(newData) {
        await serverAPI.upDatePlaySongs(this.id, newData);
        this.songs = newData.songs;
    }
    
    playMusic() {
        if(!this.playing) {
            if(pageData.isPlaying) {
                let idInArr;
                pageData.playLists.forEach((element,index) => {
                    if(element.id == pageData.isPlaying) return idInArr = index;
                });
                $(`#${pageData.isPlaying}`).children('div').children('img').removeAttr("class");
                pageData.playLists[idInArr].correctPlay.css("display","inline");
                pageData.playLists[idInArr].playing = false;
                pageData.playLists[idInArr].play.attr("class","icon-play");
                new CircleType($(pageData.playLists[idInArr].bandName)[0]).radius(150);
            }
            this.getSongs(true);
            this.correctPlay.css("display","none");
            
        } else {
            const image = $(`#${this.id}`).children('div').children('img');
            image.removeAttr("class");
            this.playing = false;
            this.play.attr("class","icon-play");
            pageData.isPlaying = false;
            
        }
    }
}

