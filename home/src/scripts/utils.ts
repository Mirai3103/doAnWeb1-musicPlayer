export const createElementFromHTML = (htmlString: string) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};
export const getTotalTimeFromMp3Url = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(blob);
    const time = await new Promise((resolve) => {
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
            URL.revokeObjectURL(audio.src);
        });
    });
    // clear memory
    return covertTime(time as number);
};
export const covertTime = (timeMili: number) => {
    const time = timeMili / 1000;
    let mins: string | number = Math.floor(time / 60);
    if (mins < 10) {
        mins = "0" + String(mins);
    }
    let secs: string | number = Math.floor(time % 60);
    if (secs < 10) {
        secs = "0" + String(secs);
    }

    return mins + ":" + secs;
};

export const generateRandomArray = (src: any[], length: number) => {
    if (src.length < length) {
        return src;
    }
    const arr: any[] = [];
    for (let i = 0; i < length; i++) {
        let randomIndex: number;
        do {
            randomIndex = Math.floor(Math.random() * src.length);
        } while (arr.find((item) => item.id == src[randomIndex].id));
        arr.push(src[randomIndex]);
    }

    return arr;
};

export const formatNumber = (num: number, numberOfMaxDigit: number) => {
    //12 => 0012
    //123 => 0123
    let str = num + "";
    while (str.length < numberOfMaxDigit) {
        str = "0" + str;
    }
    return str;
};
