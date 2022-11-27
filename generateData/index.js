const ZingMp3 = require("zingmp3-api");

(async () => {
    const a = await ZingMp3.getTop100();
    console.log(a);
})();
