define(['jquery', 'Playlist'], function($, Playlist){

  var PlaylistView = function(config){
    // initialize

    this.config = config || {};
    this.$song = this.config.song || $('#song');
    this.$addSongForm = this.config.addSongForm || $('#addSongForm');
    this.$currentPlaylist = this.config.currentPlaylist || $('#currentPlaylist');

    this.playlist = new Playlist();

    this.listenAddSong();

    this.updatePlaylist();

  };
  PlaylistView.prototype.listenAddSong = function(){
    var that = this;
    this.$addSongForm.on('submit', function(event){
      that.playlist.addSong(that.$song.val());
      that.updatePlaylist();
      that.$song.val('');
      return false;
    });
  };
  PlaylistView.prototype.updatePlaylist = function() {
    this.playlist.updatePlaylist();
    this.updatePlaylistDom();
  };
  PlaylistView.prototype.updatePlaylistDom = function(){
    var that = this;
    var playlistDom = this.playlist.playlist.map(function(song, index){
      var removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("remove"));
      $(removeButton).click(function(){
        that.playlist.removeSong(index);
        that.updatePlaylistDom();
      });
      $(removeButton).addClass("btn");

      var li = document.createElement('li');
      li.appendChild(document.createTextNode(song.title));
      li.appendChild(removeButton);
      return li;
    });

    that.$currentPlaylist.html(playlistDom);

  };

  return PlaylistView;
});
