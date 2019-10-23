const getVideoSrc = async page => {
  return await page.evaluate(() =>
    document.querySelector("video source").getAttribute("src")
  );
};

describe("displays page elements", () => {
  let page1;
  let page2;
  beforeAll(async () => {
    await page.goto(PATH, { waitUntil: "load" }); // eslint-disable-line

    page1 = await browser.newPage();
    await page1.goto(`${PATH}?window=1`, { waitUntil: "load" }); // eslint-disable-line

    page2 = await browser.newPage();
    await page2.goto(`${PATH}?window=2`, { waitUntil: "load" }); // eslint-disable-line
  });

  it("pages should contain a video elements", async () => {
    await expect(page).toMatchElement(`video`, { visible: true });
    await expect(page1).toMatchElement(`video`, { visible: true });
    await expect(page2).toMatchElement(`video`, { visible: true });
  });

  it("video srcs should be empty by default", async () => {
    const videoSrc = await getVideoSrc(page);
    expect(videoSrc).toBe("");

    const videoSrc1 = await getVideoSrc(page1);
    expect(videoSrc1).toBe("");

    const videoSrc2 = await getVideoSrc(page2);
    expect(videoSrc2).toBe("");
  });

  it("page 0 video src should change when video selected", async () => {
    await page.type("video", "1");
    const videoSrc = await getVideoSrc(page);
    expect(videoSrc).toBe("./videos/w1_v1.mp4");
  });

  it("page 1 video src should change when video selected", async () => {
    const videoSrc = await getVideoSrc(page1);
    expect(videoSrc).toBe("./videos/w2_v1.mp4");
  });

  it("page 2 video src should change when video selected", async () => {
    const videoSrc = await getVideoSrc(page2);
    expect(videoSrc).toBe("./videos/w3_v1.mp4");
  });

  it("page 0 video src should change when next video selected", async () => {
    await page.type("video", "2");
    const videoSrc = await getVideoSrc(page);
    expect(videoSrc).toBe("./videos/w1_v2.mp4");
  });

  it("page 1 video src should change when next video selected", async () => {
    const videoSrc = await getVideoSrc(page1);
    expect(videoSrc).toBe("./videos/w2_v2.mp4");
  });

  it("page 2 video src should change when next video selected", async () => {
    const videoSrc = await getVideoSrc(page2);
    expect(videoSrc).toBe("./videos/w3_v2.mp4");
  });

  it("page 0 video src should change if triggered by page 1", async () => {
    await page1.type("video", "1");
    const videoSrc = await getVideoSrc(page);
    expect(videoSrc).toBe("./videos/w1_v1.mp4");
  });

  it("page 0 video src should change if triggered by page 2", async () => {
    await page1.type("video", "2");
    const videoSrc = await getVideoSrc(page);
    expect(videoSrc).toBe("./videos/w1_v2.mp4");
  });
});
