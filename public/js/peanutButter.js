// Script for showing and hiding elements on the page
$(document).ready(function(){
  $('.nav a').click(function(e){

    e.preventDefault();
    e.stopPropagation();

    //Hide all navLinks, show on click
    $('.navLink').hide();
    $($(this).attr('data-element')).show();

    //Needed to close document ready function
    return false;
  });
  $('.song').click(function(e){

    e.preventDefault();
    e.stopPropagation();
  
    //Hide all navLinks, show on click
    $('.navLink').hide();
    $($(this).attr('data-element')).show();

    //Needed to close document ready function
    return false;
  });
  //Click listener on each song
  $(".song").click(songClicked);
  function songClicked(e) {
    //Pulls the song id (finds out which song was clicked and store into songSelected)
    var songSelected = $(this).attr("id");
    //Function call to update lyrics to selected song
    renderSong(songSelected);

    if (songSelected == "Hips Don't Lie") {
      $('#songChords').load("/apitesting/chordsShakira.html");
    } else if (songSelected == "Creep") {
      $('#songChords').load("/apitesting/chordsRadiohead.html");
    } else if (songSelected == "Space Oddity") {
      $('#songChords').load("/apitesting/chordsBowie.html");
    } else if (songSelected == "Smells Like Teen Spirit") {
      $('#songChords').load("/apitesting/chordsNirvana.html");
    }
    $.getJSON('apitesting/youtubeLinks.json', function(data) {
      $('#videoPlayer').prop("src", data[songSelected]);
    })
  }
});

  //Youtube Player script
  var tag = document.createElement("Script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("Script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  function onYouTubeIframeAPIReady() {
      player = new YT.Player('videoPlayer', {
        events : {
          "onReady" : readyToPlay
        }
      });
  }
  function readyToPlay(event) {
    event.target.playVideo
  }

  //Update Script
  function renderSong(songName) {

    //Changes lyric format to html appropriate format (takes all newlines in javascript language and changes them to html language <br> breaks)
  function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  }

  //Gets lyric data from json file and replaces class lyricText with data from the JSON file
  $.getJSON('apitesting/shakira.json', function(data){
    $('#lyricText').html(nl2br(data[songName]));
  });
    $.getJSON('apitesting/shakira.json', function(data){
    $('.lyricTitle').text(songName);
  });
      $.getJSON('apitesting/info.json', function(data){
    $('#songInformation').html(nl2br(data[songName]));
  });
}

/* Script for Accordion Widgets*/
$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.in").each(function(){
      $(this).siblings(".panel-heading").find(".glyphicon").addClass("rotate");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
      $(this).parent().find(".glyphicon").addClass("rotate");
    }).on('hide.bs.collapse', function(){
      $(this).parent().find(".glyphicon").removeClass("rotate");
    });
});
