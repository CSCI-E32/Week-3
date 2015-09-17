define(['Playlist', 'Song'], function(Playlist, Song){
  var playlist;
  describe('Playlist', function(){
    beforeEach(function(){
      var store = {};
      spyOn(sessionStorage, "getItem").and.callFake(function(key){
        return store[key] || '[]';
      });
      spyOn(sessionStorage, "setItem").and.callFake(function(key, value){
        store[key] = value + '';
      });
      spyOn(sessionStorage, "clear").and.callFake(function(){
        store = {};
      });
      sessionStorage.clear();

      playlist = new Playlist();

    });
    it("should start empty if there's nothing in sessionStorage", function(){
      expect(playlist.playlist.length).toBe(0);
    });
    it("should start with something if there's something in sessionStorage", function(){
      sessionStorage.setItem('playlist', JSON.stringify([new Song("song name")]));
      playlist = new Playlist();
      expect(playlist.playlist.length).not.toBe(0);
    });
    describe('addSong', function(){
      it('should add a song to the playlist array', function(){
        var title = "title of song";
        playlist.addSong(title);
        expect(playlist.playlist[0].title).toBe(title);
      });
      it('should call updatePlaylist', function(){
        spyOn(playlist, "updatePlaylist");
        playlist.addSong("something something something");
        expect(playlist.updatePlaylist).toHaveBeenCalled();
      });
    });
    describe('removeSong', function(){
      it("should remove the song from the array", function(){
        playlist.addSong("something something something");
        expect(playlist.playlist.length).toBe(1);
        playlist.removeSong(0);
        expect(playlist.playlist.length).toBe(0);
      });
      it('should call updatePlaylist', function(){
        spyOn(playlist, "updatePlaylist");
        playlist.addSong("something something something");
        playlist.removeSong(0);
        expect(playlist.updatePlaylist).toHaveBeenCalled();
      });
    });
    describe('updatePlaylist', function(){
      it('should set the sessionStorage for the object', function(){
        expect(sessionStorage.getItem('playlist')).toBe('[]');
        playlist.playlist.push(new Song('something new'));
        playlist.updatePlaylist();
        expect(sessionStorage.getItem('playlist')).toBe(JSON.stringify(playlist.playlist));
      });
    });
  });


});
