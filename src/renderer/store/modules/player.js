let state = {
    playingMusic:{
      image_url:'',
      artists:'未知作者',
      music_name:'未知歌曲',
      play_url:'',
    },
    playingMusicIndex:'',
    musicList: [],
    progress:"",
    currentTime:0,
  };
  
  let mutations = {
    SET_MUSICLIST(state, musicList) {
      state.musicList = musicList;
    },
    SET_PROGRESS(state, progress) {
      state.progress = progress;
    },
    SET_PLAYINGMUSIC(state, music) {
      state.playingMusic = music;
    },
    SET_PLAYINGMUSICINDEX(state, index) {
      state.playingMusicIndex = index;
    },
    SET_CURRENT_TIME(state, currentTime) {
      state.currentTime = currentTime;
    }
  };
  let getters = {
    getPlayingMusicList: () => {
      return state.musicList;
    },
    getProgress: () => {
      return state.progress;
    },
    getPlayingMusic: () => {
      return state.playingMusic;
    },
    getPlayingMusicIndex: () => {
      return state.playingMusicIndex;
    }
  };
  
  let actions = {
    setPlayerState({musicList, progress, playingMusic, playingMusicIndex}) {
      commit('SET_MUSICLIST', musicList);
      commit('SET_PROGRESS', progress);
      commit('SET_PLAYINGMUSIC', playingMusic);
      commit('SET_PLAYINGMUSICINDEX', playingMusicIndex);
    },
    async getMusicById({state, commit}, {id, platform, token}) {
      const { data } = await Axios.post('http://zlclclc.cn/id', {id, platform, token})
      const promise = new Promise(function(resolve, reject){
        if(data.code === 200) {
          resolve(data)
          commit('SET_PLAYINGMUSIC', data.song.list) 
        } else {
          reject(data)
          commit('SET_PLAYINGMUSIC', {})
        }
      })
      return promise
    }
  };
  
  export default {
    state,
    mutations,
    getters,
    actions,
  };