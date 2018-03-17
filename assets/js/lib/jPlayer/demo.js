$(document).ready(function(){

  var myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jplayer_N",
    cssSelectorAncestor: "#jp_container_N"
  }, [
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    },
    {
      title:"Song Title",
      artist:"Artist Info",
      mp3:"song src",
      poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
    }
  ], {
    playlistOptions: {
      enableRemoveControls: true,
      autoPlay: true
    },
    swfPath: "js/jPlayer",
    supplied: "webmv, ogv, m4v, oga, mp3",
    smoothPlayBar: true,
    keyEnabled: true,
    audioFullScreen: false
  });
  
  $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').removeClass('animate');
    $('.jp-play-me').removeClass('active');
    $('.jp-play-me').parent('li').removeClass('active');
  });

  $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').addClass('animate');
  });

  $(document).on('click', '.jp-play-me', function(e){
    e && e.preventDefault();
    var $this = $(e.target);
    if (!$this.is('a')) $this = $this.closest('a');

    $('.jp-play-me').not($this).removeClass('active');
    $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

    $this.toggleClass('active');
    $this.parent('li').toggleClass('active');
    if( !$this.hasClass('active') ){
      myPlaylist.pause();
    }else{
      var i = Math.floor(Math.random() * (1 + 7 - 1));
      myPlaylist.play(i);
    }
    
  });



  // video

  $("#jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Video Title",
        m4v: ".mv4 video src",
        ogv: ".ogv video src",
        webmv: ".webm video src",
        poster: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fd13yacurqjgara.cloudfront.net%2Fusers%2F179617%2Fscreenshots%2F2206988%2Fvibez-01.png&f=1"
      });
    },
    swfPath: "js",
    supplied: "webmv, ogv, m4v",
    size: {
      width: "100%",
      height: "auto",
      cssClass: "jp-video-360p"
    },
    globalVolume: true,
    smoothPlayBar: true,
    keyEnabled: true
  });

});