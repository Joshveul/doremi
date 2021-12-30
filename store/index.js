export const state = () => ({
  activeUsers: [],
  songOptionsOpen: false,
  selectedSong: {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One artist'
  },
  nowPlayingSong: {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  },
  searchTerm: '',
  searchResults: [{
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }, {
    color: '#1F7087',
    thumbnail: 'https://i.ytimg.com/vi/enmHYsoCMkQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAuNn05YAA8gcFHKl8UjuS7z4r6Yg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  }],
  selectedSessionOpen: false,
  selectedSession: {},
  queueOpen: false
})

export const mutations = {
  setSongOptionsOpen (state, isOpen) {
    state.songOptionsOpen = isOpen
  },
  setSelectedSong (state, songData) {
    state.selectedSong = songData
  },
  setSelectedSessionOpen (state, isOpen) {
    state.selectedSessionOpen = isOpen
  },
  setSelectedSession (state, songData) {
    state.selectedSession = songData
  },
  setQueueOpen (state, isOpen) {
    state.queueOpen = isOpen
  },
  setNowPlayingSong (state, songData) {
    state.NowPlayingSong = songData
  },
  setSearchTerm (state, searchTerm) {
    state.searchTerm = searchTerm
  }
}
