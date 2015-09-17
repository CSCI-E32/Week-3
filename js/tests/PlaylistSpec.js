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
    xdescribe('addSong', function(){
      xit('should add a song to the playlist', function(){

      });
    });
  });


});
