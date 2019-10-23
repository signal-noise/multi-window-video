export default class Controller {
  constructor(videoSelector, config) {
    // Set DOM References
    this.video = document.querySelector(videoSelector);
    this.videoSource = this.video.querySelector("source");

    // Save the config object
    this.config = config;

    // Get the window index from the URL
    const urlParams = new URLSearchParams(window.location.search);
    this.windowIndex = parseInt(urlParams.get("window"));
    if (isNaN(this.windowIndex)) this.windowIndex = 0;

    this.setupVideo();
    this.setupBroadcaster();
    this.setupListeners();
  }

  setupVideo() {
    this.video.autoplay = true;
    if (this.config.muted || this.windowIndex > 0) this.video.muted = true;

    if (this.windowIndex === 0) {
      this.video.addEventListener("ended", () => {
        const next =
          this.currentVideo < this.config.videos.length - 1
            ? this.currentVideo + 1
            : 0;

        // Broadcast the index
        this.broadcaster.postMessage({
          type: "changeVideo",
          videoIndex: next
        });

        // Change the video locally
        this.currentVideo = next;
      });
    }

    this.video.addEventListener("click", () => this.video.requestFullscreen());
  }

  setupBroadcaster() {
    this.broadcaster = new BroadcastChannel("sn-presentation");
    this.broadcaster.onmessage = ev => {
      switch (ev.data.type) {
        case "changeVideo": {
          this.currentVideo = ev.data.videoIndex;
          break;
        }
        case "sync": {
          const diff = this.video.currentTime - ev.data.currentTime;
          if (
            this.video.currentTime > this.config.sync.ignore &&
            ev.data.currentTime > this.config.sync.ignore &&
            Math.abs(diff) > this.config.sync.threshold
          ) {
            this.video.currentTime = ev.data.currentTime;
          }
          break;
        }
      }
    };

    if (this.windowIndex !== 0) return;
    setInterval(() => {
      this.broadcaster.postMessage({
        type: "sync",
        currentTime: this.video.currentTime
      });
    }, this.config.sync.interval * 1000);
  }

  setupListeners() {
    document.addEventListener("keydown", event => {
      // Get the Unicode value
      var key = String.fromCharCode(event.keyCode);

      // Find the matching index from the config
      const videoIndex = this.config.videos.findIndex(
        video => video.key === key
      );

      // EXIT if not found
      if (videoIndex === -1) return;

      // Broadcast the index
      this.broadcaster.postMessage({ type: "changeVideo", videoIndex });

      // Change the video locally
      this.currentVideo = videoIndex;
    });
  }

  get currentVideo() {
    return this._currentVideo;
  }

  set currentVideo(index) {
    this._currentVideo = index;

    // Get the video for the specific window
    const video = this.config.videos[index].src[this.windowIndex];

    // Set the video and play!
    this.videoSource.src = video;
    this.video.load();
  }
}
