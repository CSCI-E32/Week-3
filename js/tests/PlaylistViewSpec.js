define(['jquery', 'Playlist', 'Song'], function($, Playlist, Song){
  var playListView;
  beforeEach(function(){
    playlistView = new PlaylistView({
      song: $('<input/>'),
      addSongForm: $('<form></form>'),
      currentPlaylist: $('<ul></ul>')
    });
  });
  describe("PlaylistView", function(){
    describe("submitting a form", function(){
      it("should wipe the text from the text field", function(){

      });

    });

  });



});
