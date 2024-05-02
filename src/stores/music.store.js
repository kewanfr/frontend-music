//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/music`;

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    music: {
      tracks: [],
      artists: [],
    },
    queue: [],
    currentSong: null,
    downloading: [],
  }),
  getters: {
    isLoading() {
      return this.music.loading || false;
    },
  },
  actions: {
    async searchData(query, type = "track", limit = 20) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(
            baseUrl + "/search/" + query + "?type=" + type + "&limit=" + limit
          )
          .then((music) => resolve(music))
          .catch((error) => reject(error));
      });
    },
    async search(query) {
      this.music = { loading: true };

      this.music = {
        tracks: [],
        artists: [],
      };

      this.music.tracks = (await this.searchData(query, "track", 20)).tracks;
      this.music.artists = (await this.searchData(query, "artist", 2)).artists;

      console.log(this.music);
    },
    async getArtist(artist_id) {
      this.music = { loading: true };
      await fetchWrapper
        .get(baseUrl + "/artist/" + artist_id)
        .then((artistTracks) => {
          this.music = {
            tracks: artistTracks,
            artists: [],
          };
        })
        .catch((error) => (this.music = { error }));
    },

    async getTrack(track_id) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrl + "/track/" + track_id)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      });
    },

    async downloadFromData(data) {
      this.downloading.push(data);
      return new Promise((resolve, reject) => {
        fetchWrapper
          .post(baseUrl + "/download", data)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      });
    },
    async downloadFromSpotifyId(spotify_id) {
      this.downloading.push(spotify_id);
      // return new Promise((resolve, reject) => {
      //   fetchWrapper
      //     .post(baseUrl + "/download/spotify/" + spotify_id)
      //     .then((track) => resolve(track))
      //     .catch((error) => reject(error));
      // });
    },
    async downloadTrack(track_id) {
      this.downloadFromSpotifyId(track_id);
    },
  },
});