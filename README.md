# Multi Window Video

A tool to allow videos to be triggered and synchronized across multiple browser windows. The user can press a key on the keyboard to trigger various videos.

<!-- A screenshot of the project -->

## Contacts and documents

John Chipps-Harding (john@signal-noise.co.uk)

## Architecture

This project runs in multiple browser windows on the same machine. They communicate using the standard `BroadcastChannel` system.

### Specifics

Place videos within the `/videos` folder and configure the system by changing the config object within `/src/index.js`.

Example config:
```javascript
const config = {
  videos: [
    {
       // What keyboard key to press to trigger this state
      key: "1",

       // A list of videos to play on each screen. This example supports 3 screens.
      src: ["./videos/w1_v1.mp4", "./videos/w2_v1.mp4", "./videos/w3_v1.mp4"]
    },
    {
      key: "2",
      src: ["./videos/w1_v2.mp4", "./videos/w2_v2.mp4", "./videos/w3_v2.mp4"]
    }
  ],

  // If true, all videos are muted, if false all but the first window will be muted.
  mute: false,

  // See below
  reloadOnEnd: false,

  sync: {
    // How often to check sync (2 seconds)
    interval: 2,

    // How much difference there can be before a sync is triggered.
    threshold: 0.3,

    // How much time at the beginning of the clip to ignore syncing.
    ignore: 1
  }
};
```

> **reloadOnEnd**: If `false`, it will rely on the browser natively looping the video. This can lead to sync issues. If `true`, when the video finishes it will force a reload of the video. Generally this leads to better sync but a 'flash' can be seen when reloading (fade to black to avoid this artifact).

## Getting started

Follow these steps to get up and running:

1. Run `npm i` to install all dependencies.
2. Run `npm start` to launch the system.
3. Open as many browser windows as required and append a querystring onto URL to specify what `window` the browser is. E.g. a URL may be `http://localhost:8080?window=1`.

> Note: Windows are zero indexed, so the first window is **0**.

## Rules and tools

Are we using our standard approach to [workflow](https://www.notion.so/signalnoise/Workflow-dee5654bdde040a78352dbbceada5814), 
[linting and tooling](https://www.notion.so/signalnoise/Tools-and-services-0293826f65894a3eabec01916aa7b318)? If not 
specify the exceptions and rationale.
