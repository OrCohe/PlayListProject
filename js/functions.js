function buildAndAppend(element, text, to, att=[]) {
    const elem = $(`<${element}>`);
    elem.html(text);
    att.forEach(element => {
        elem.attr(element.name, element.value);
    });
    to.append(elem);
    return elem;
}

$(document).ready(function()  { 
    serverAPI = new serverAPI();
    pageData = new appData();
    pageModal1 = new appModal1();
    pageModal2 = new appModal2();
    pageDelModal = new ModalDel();
});

function cleanContainer() {
    $('.row').html("");
    $('.noDataImage').remove();
}


function checkValidSongs() {
    let isGood = true;
    const songNames = $("input[name='song[]']").map(function(){
        if(!$(this).val() || $(this).val().length > 20 || $(this).val().replace(/\s/g, '').length < 2) {
            $(this).closest("div").css("color","red");
            if(!$(this).hasClass("shake-horizontal")) {
            $(this).addClass("shake-horizontal");
                setTimeout(() => {
                    $(this).removeClass("shake-horizontal");
                }, 800);
            }
            isGood = false;
        } else {
            $(this).closest("div").css("color","black");
            return $(this).val();
        }
    }).get();
    const songUrls = $("input[name='url[]']").map(function(){
        if(!$(this).val() || ($(this).val().toLowerCase().indexOf(".mp3") == -1)) {
            $(this).closest("div").css("color","red");
             if(!$(this).hasClass("shake-horizontal")) {
                 $(this).addClass("shake-horizontal");
                setTimeout(() => {
                    $(this).removeClass("shake-horizontal");
                }, 800);
            }
            isGood = false;
        } else {
            $(this).closest("div").css("color","black");
            return $(this).val();   
        }
    }).get();
    const playData = {
        songs: []
    };
    for(let i = 0; i < songNames.length ; i++) {
        const songData = {
            name: bigFirstLetter(songNames[i]),
            url: songUrls[i]
        };
        playData.songs.push(songData);
    }
    if(!isGood) return false;
    else {
        return playData;
    }
}



function changeTempImg() {
    const image = $('#playUrl').val();
    $('img[id$=playImg]').load(image, function(response, status, xhr) {
        if (status == "error") 
            $(this).attr('src', 'img/noimage.png');
        else
            $(this).attr('src', image);
        });
}


function bigFirstLetter(str) {
    let newStr = str;
    const firstChar = newStr.substring( 0, 1 ).toUpperCase();
    const rest = newStr.substring( 1 );
    newStr = firstChar + rest;
    return newStr;
}