//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/music`;
const baseUrlPlex = `${import.meta.env.VITE_API_URL}/plex`;
import { socket } from "@/socket";

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
    downloadingData: {},
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
    sendWebSocket(action, message = "") {
      if (this.websocket) {
        console.log(
          JSON.stringify({
            action: action,
            message: message,
          })
        );
        this.websocket.emit(
          "message",
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
      socket.on("connect", () => {
        console.log("Connected to WebSocket.");

        this.websocket = socket;

        socket.on("message", (message) => {
          // console.log(message);

          var data;
          try {
            data = JSON.parse(message);
          } catch (e) {
            data = message;
          }

          if (typeof data === "string") {
            data = { action: "message", message: data };
          }

          if (data.action === "song_downloading") {
            if (
              data.song?.spotify_id &&
              !this.downloading.includes(data.song?.spotify_id)
            ) {
              this.downloading.push(data.song?.spotify_id);
              const song_data = this.queue.find(
                (track) => track.spotify_id === data.song?.spotify_id
              );
              if (song_data) this.downloadingData = song_data;
            }
            if (
              data.song?.youtube_id &&
              !this.downloading.includes(data.song?.youtube_id)
            ) {
              this.downloading.push(data.song?.youtube_id);
              const song_data = this.queue.find(
                (track) => track.youtube_id === data.song?.youtube_id
              );
              if (song_data) this.downloadingData = song_data;
            }
          } else if (data.action === "song_downloaded") {
            if (
              data.song?.spotify_id &&
              this.downloading.includes(data.song?.spotify_id)
            ) {
              this.downloading = this.downloading.filter(
                (id) => id !== data.song?.spotify_id
              );
              if (this.downloadingData.spotify_id === data.song?.spotify_id)
                this.downloadingData = null;
              this.tracks.push(data.song);
            }
            if (
              data.song?.youtube_id &&
              this.downloading.includes(data.song?.youtube_id)
            ) {
              this.downloading = this.downloading.filter(
                (id) => id !== data.song?.youtube_id
              );
              if (this.downloadingData.youtube_id === data.song?.youtube_id)
                this.downloadingData = null;
              this.tracks.push(data.song);
            }
          } else if (data.action === "song_deleted") {
            if (data.song?.youtube_id) {
              this.tracks = this.tracks.filter(
                (track) => track.youtube_id !== data.song?.youtube_id
              );
            } else if (data.song?.spotify_id) {
              this.tracks = this.tracks.filter(
                (track) => track.spotify_id !== data.song?.spotify_id
              );
            }
          } else if (data.action === "song_error") {
            if (data.song?.spotify_id) {
              this.downloading = this.downloading.filter(
                (id) => id !== data.song?.spotify_id
              );
            }
            if (data.song?.youtube_id) {
              this.downloading = this.downloading.filter(
                (id) => id !== data.song?.youtube_id
              );
            }
          }
          if (data.tracks) {
            this.tracks = data.tracks;
          }
          if (data.queue) {
            this.queue = data.queue;
          }
        });
      });
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
      if (!query) return;
      this.music = { loading: true };
      let youtube_id = null;
      if (query.includes("youtube.com")) {
        youtube_id = query.split("v=")[1];
        // return this.downloadFromYoutubeId(youtube_id);
      } else if (query.includes("youtu.be")) {
        youtube_id = query.split("youtu.be/")[1];
        // return this.downloadFromYoutubeId(youtube_id);
      }
      if (youtube_id) {
        return await this.getTrackFromYoutubeId(youtube_id);
      }

      this.music = {
        loading: true,
        tracks: [],
        artists: [],
      };

      this.music.artists = (await this.searchData(query, "artist", 2)).artists;
      this.music.tracks = (await this.searchData(query, "track", 20)).tracks;

      this.music.loading = false;
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

    async scanPlexLibrary() {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrlPlex + "/scan")
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    async downloadFromSpotifyId(spotify_id) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .post(baseUrl + "/download/spotify/" + spotify_id)
          .then((track) => resolve(track))
          .catch((error) => reject(error));
      });
    },
    async getTrackFromYoutubeId(youtube_id) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrl + "/track/youtube/" + youtube_id)
          .then((track) => {
            this.music.loading = false;
            this.music.tracks = [track];
            return resolve(track);
          })
          .catch((error) => reject(error));
      });
    },
    async downloadFromYoutubeId(youtube_id) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrl + "/download/youtube/" + youtube_id)
          .then((track) => {
            this.tracks.push(track);
            this.music.loading = false;
            this.music.tracks = [track];
            return resolve(track);
          })
          .catch((error) => reject(error));
      });
    },
    async downloadTrack(track_id) {
      const track_data = this.music.tracks.find(
        (track) =>
          track.spotify_id === track_id || track.youtube_id === track_id
      );

      await this.downloadFromData(track_data);
    },
  },
});