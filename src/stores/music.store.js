//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/music`;
const baseUrlPlex = `${import.meta.env.VITE_API_URL}/plex`;
const baseWebSocketUrl = import.meta.env.VITE_API_URL.replace(
  "https://",
  "ws://"
).replace("http://", "ws://");

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
    tracks: [],
    websocket: null,
    playing: {
      title: "",
      artist: "",
      album: "",
      thumb: "",
    },
    lyrics: "",
  }),
  getters: {
    isLoading() {
      return this.music.loading || false;
    },
  },
  actions: {
    async getPlaying() {
      fetchWrapper
        .get(baseUrlPlex + "/playing")
        .then((playing) => (this.playing = playing))
        .catch((error) => console.error(error));
    },
    async getPlayingLyrics() {
      fetchWrapper
        .get(baseUrlPlex + "/playing/lyrics")
        .then(
          (lyrics) =>
            (this.lyrics = lyrics.lyrics
              .replace(/\n\n/g, "<br>")
              .replace(/\n/g, "<br>"))
        )
        .catch((error) => console.error(error));
    },
    sendWebSocket(action, message) {
      if (this.websocket) {
        console.log(
          JSON.stringify({
            action: action,
            message: message,
          })
        );
        this.websocket.send(
          JSON.stringify({
            action: action,
            message: message,
          })
        );
        return true;
      }
      console.log("Websocket not connected.");
      return false;
    },
    connectWebSocket() {
      this.websocket = new WebSocket(baseWebSocketUrl);

      this.websocket.onopen = () => {
        console.log("WebSocket is connected.");

        this.sendWebSocket("message", "hello");
      };

      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle the received data
        console.log(data);

        if (data.action === "song_downloading") {
          if (!this.downloading.includes(data.song?.spotify_id)) {
            this.downloading.push(data.song?.spotify_id);
          }
        } else if (data.action === "song_downloaded") {
          if (this.downloading.includes(data.song?.spotify_id)) {
            this.downloading = this.downloading.filter(
              (id) => id !== data.song?.spotify_id
            );

            this.tracks.push(data.song);
          }
        } else if (data.action === "song_deleted") {
          this.tracks = this.tracks.filter(
            (track) => track.spotify_id !== data.song?.spotify_id
          );
        }

        if (data.tracks) {
          this.tracks = data.tracks;
        }

        if (data.queue) {
          this.queue = data.queue;
        }
      };

      this.websocket.onclose = () => {
        console.log("WebSocket is closed.");
      };

      this.websocket.onerror = (error) => {
        console.error("WebSocket encountered an error: ", error);
      };
    },
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

    async deleteTrack(track_id) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .delete(baseUrl + "/track/" + track_id)
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          })
          .catch((error) => reject(error));
      });
    },

    async downloadFromData(data) {
      // this.downloading.push(data);
      return new Promise((resolve, reject) => {
        fetchWrapper
          .post(baseUrl + "/download/data", data)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      });
    },
    async downloadFromSpotifyId(spotify_id) {
      // this.downloading.push(spotify_id);
      // return new Promise((resolve, reject) => {
      //   fetchWrapper
      //     .post(baseUrl + "/download/spotify/" + spotify_id)
      //     .then((track) => resolve(track))
      //     .catch((error) => reject(error));
      // });
    },
    async downloadTrack(track_id) {
      const track_data = this.music.tracks.find(
        (track) => track.spotify_id === track_id
      );

      await this.downloadFromData(track_data);
    },
  },
});