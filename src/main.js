export default class Controller {
  constructor(root, config) {
    // Set DOM References
    this.root = document.querySelector(root);
    this.video = this.root.querySelector("video");
    this.videoSource = this.video.querySelector("source");

    // Save the config object
    this.config = config;

    // Get the window index from the URL
    const urlParams = new URLSearchParams(window.location.search);
    this.windowIndex = parseInt(urlParams.get("window"));
    if (isNaN(this.windowIndex)) this.windowIndex = 0;

    this.setupBroadcaster();
    this.setupListeners();
  }

  setupBroadcaster() {
    this.broadcaster = new BroadcastChannel("sn-presentation");

    this.broadcaster.onmessage = ev => this.changeVideo(ev.data.videoIndex);
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
      this.broadcaster.postMessage({ videoIndex });

      // Change the video locally
      this.changeVideo(videoIndex);
    });
  }

  changeVideo(index) {
    // Get the video for the specific window
    const video = this.config.videos[index].src[this.windowIndex];

    // Set the video and play!
    this.videoSource.setAttribute("src", video);
    this.video.load();
  }
}
