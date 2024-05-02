//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/music`;

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    music: {},
    queue: [],
    currentSong: null,
    downloading: [],
  }),
  actions: {
    async search(query) {

      this.music = { loading: true };
      await fetchWrapper
        .get(baseUrl + '/search/' + query)
        .then((music) => (this.music = music))
        .catch((error) => (this.music = { error }));
    },
    async getArtist(artist_id){
      this.music = { loading: true };
      await fetchWrapper
        .get(baseUrl + '/artist/' + artist_id)
        .then((music) => (this.music = music))
        .catch((error) => (this.music = { error }));
    },
    async getTrack(track_id){
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrl + '/track/' + track_id)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      })
    },
    async downloadFromSpotifyId(spotify_id){
      return new Promise((resolve, reject) => {
        fetchWrapper
          .post(baseUrl + '/download/spotify/' + spotify_id)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      })
    }
  }
});