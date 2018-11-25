class appModal1 {
    constructor() {
        this.modal = $('#addPlayModal1').on("hidden.bs.modal", () =>  { this.reset(); });
        this.title = $('#modal1Title');
        this.image = $('#playImg');
        this.playName = $('#playName');
        this.playUrl = $('#playUrl');
        this.btn = $('#modal1Btn');
        this.tempName;
        this.tempUrl;
    }
   
    edit(play) {
      this.title.text("Edit Playlist");
      this.image.attr("src",play.image);
      this.playName.val(play.name);
      this.playUrl.val(play.image);
      this.btn.attr("onclick",null);
      this.btn.off('click').on("click", () => {  this.saveAndGo(play); });
      this.show();
      play.getSongs();
    }
    saveAndGo(play) {
      if(this.playName.val().replace(/\s/g, '').length < 2) {
        return this.playName.closest("div").css("color","red");
      }
      this.isValidImageUrl(this.playUrl, true, play);
    }
    reset() {
      this.title.text("Add new Playlist");
      this.image.attr("src","img/noimage.png");
      this.playName.val('');
      this.playUrl.val('');
      this.btn.attr("onclick","pageModal1.saveNGoModal2()");
    }
    show() {
      this.modal.modal('show');
    }
    hide() {
      this.modal.modal('hide');
    }

    saveNGoModal2() {
      this.tempName = this.playName.val();
      this.tempUrl = this.playUrl.val();
      if(this.playName.val().replace(/\s/g, '').length < 2) {
        if(!this.playName.hasClass("shake-horizontal")) {
          this.playName.addClass("shake-horizontal");
              setTimeout(() => {
                  this.playName.removeClass("shake-horizontal");
              }, 800);
          }
          return this.playName.closest("div").css("color","red");
      }
      this.playName.closest("div").css("color","black");
      this.isValidImageUrl(this.playUrl);
    }
  
    isValidImageUrl(url, bool=false, play=false) {
      if(url.val().length > 0) {
          $('img[id$=playImg]').load(url.val(),(response, status, xhr) => {
              if (status == "error") 
                  this.saveNGoModal2onErr();
              else 
                  this.saveNGoModal2onSuc(bool, play);
              });
      } else {
        this.saveNGoModal2onErr();
      }
    }
  
    saveNGoModal2onSuc(bool, play) {
      this.playUrl.closest("div").css("color","black");
      this.playName.closest("div").css("color","black");
      if(!bool) {
        this.hide();
        pageModal2.show();
        pageModal2.addSongLine();
        pageModal2.addSongLine();
      } else {
        play.name = this.playName.val();
        play.image = this.playUrl.val();
        const data = {
          name: play.name,
          image: play.image
        }
        play.upDate(data);
        this.hide();
        pageModal2.edit(play, bool);
        this.btn.off("click");
      }
    }
  
    saveNGoModal2onErr() {
      if(!this.playUrl.hasClass("shake-horizontal")) {
      this.playUrl.addClass("shake-horizontal");
          setTimeout(() => {
              this.playUrl.removeClass("shake-horizontal");
          }, 800);
      }
      this.playUrl.closest("div").css("color","red");
    }

 }