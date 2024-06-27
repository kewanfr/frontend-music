//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/music`;
const baseUrlAPI = `${import.meta.env.VITE_API_URL}`;
const baseUrlPlex = `${import.meta.env.VITE_API_URL}/plex`;
import { socket } from "@/socket";
import { useToast } from "vue-toast-notification";

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    results: {
      tracks: [],
      artits: [],
    },
    lyricsQuery: "",
    queue: [],

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
    lyricsResults: [],
  }),
  getters: {
    isLoading() {
      return this.results.loading || false;
    },
  },
  actions: {
    async findLyrics(query) {
      return new Promise((resolve, reject) => {
        console.log(query);
        fetchWrapper
          .get(baseUrlAPI + "/lyrics/find/" + query)
          .then((lyrics) => {
            // console.log(lyrics);
            this.lyrics = lyrics.lyrics
              ?.replace(/\n\n/g, "<br>")
              .replace(/\n/g, "<br>");
            // console.log(lyrics);
            resolve(lyrics);
          })
          .catch((error) => reject(error));
      });
    },
    async searchLyrics(query) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(baseUrlAPI + "/lyrics/search/" + query)
          .then((results) => {
            this.lyricsResults = results;
            // console.log(results);
            resolve(results);
          })
          .catch((error) => reject(error));
      });
    },
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
              ?.replace(/\n\n/g, "<br>")
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
      const $toast = useToast();

      $toast.error("Impossible de se connecter au serveur.", {
        duration: 5000,
      });
      console.log("Websocket not connected.");
      return false;
    },
    connectWebSocket() {
      socket.on("connect", () => {
        if (this.websocket) {
          this.websocket.disconnect();
          this.websocket = null;

          return;
        }

        const $toast = useToast();

        $toast.success("Connecté au serveur.", {
          duration: 800,
        });
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
          console.log(data);

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
            $toast.info(
              `Téléchargement de ${data.song?.name} - ${data.song?.artists}`,
              {
                duration: 5000,
              }
            );
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

            $toast.success(
              `${data.song?.name} - ${data.song?.artists} Téléchargé.`,
              {
                duration: 5000,
              }
            );
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
            $toast.error(
              `${data.song?.name} - ${data.song?.artists} Supprimé.`,
              {
                duration: 5000,
              }
            );
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

            $toast.error(
              `${data.song?.name} - ${data.song?.artists} n'a pas pu être téléchargé.`,
              {
                duration: 5000,
              }
            );
          }
          if (data.tracks) {
            this.tracks = data.tracks.reverse();
          }
          if (data.queue) {
            this.queue = data.queue;
          }
        });
      });
    },
    async searchData(query, type = "track", limit = 40) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(
            baseUrl + "/search/" + query + "?type=" + type + "&limit=" + limit
          )
          .then((results) => resolve(results))
          .catch((error) => reject(error));
      });
    },
    async search(query) {
      if (!query) return;
      this.results = { loading: true };
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

      this.results = {
        loading: true,
        tracks: [],
        artists: [],
      };

      this.results.artists = (
        await this.searchData(query, "artist", 2)
      ).artists;
      this.results.tracks = (await this.searchData(query, "track", 40)).tracks;

      this.results.loading = false;
    },
    async getArtist(artist_id) {
      this.results = { loading: true };
      await fetchWrapper
        .get(baseUrl + "/artist/" + artist_id)
        .then((artistTracks) => {
          this.results = {
            tracks: artistTracks,
            artists: [],
          };
        })
        .catch((error) => (this.results = { error }));
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
            this.results.loading = false;
            this.results.tracks = [track];
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
            this.results.loading = false;
            this.results.tracks = [track];
            return resolve(track);
          })
          .catch((error) => reject(error));
      });
    },
    async downloadTrack(track_id) {
      const track_data = this.results.tracks.find(
        (track) =>
          track.spotify_id === track_id || track.youtube_id === track_id
      );

      await this.downloadFromData(track_data);
    },
  },
});