import App from "./main";

const config = {
  videos: [
    {
      key: "1",
      src: ["./videos/w1_v1.mp4", "./videos/w2_v1.mp4", "./videos/w3_v1.mp4"]
    },
    {
      key: "2",
      src: ["./videos/w1_v2.mp4", "./videos/w2_v2.mp4", "./videos/w3_v2.mp4"]
    }
  ]
};

new App("#content", config);
