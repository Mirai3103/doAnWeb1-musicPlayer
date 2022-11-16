function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

import { audioPlayer, artistThumbail, artistName, songName } from "./player";
function changeSong2(value) {
    const isPlaying = !audioPlayer.paused;
    audioPlayer.getElementsByTagName("source")[0].src = value.audioSrc;
    audioPlayer.load();
    artistThumbail.src = value.imageSrc;
    artistName.innerText = value.singer;
    songName.innerText = value.name;
    audioPlayer.play();
}

const useState = (defaultValue) => {
    let value = defaultValue;
    let trigger;

    const getValue = () => value;
    const setValue = (newValue) => {
        value = newValue;
        if (trigger) {
            trigger(getValue());
        }
    };
    const setTrigger = (t) => {
        trigger = t;
        t(getValue());
    };
    return [getValue, setValue, setTrigger];
};

const [getValue, setValue, setTigger] = useState([...queue]);
class Song {
    static id = 0;
    constructor(intialState) {
        this.state = intialState;
        // this.render();
        this.onChange = null;
        this.id = Song.id;
        Song.id++;
        this.eventListener = null;
    }
    getState() {
        return this.state;
    }
    setState(value) {
        this.state = value;
        // this.render();
        this.onChange();
    }
    setStateChangedListener(onChange) {
        this.onChange = onChange();
    }
    initEvent() {
        this.eventListener = !this.getState().playing
            ? () => {
                  changeSong2(this.getState());
                  setValue(
                      getValue().map((e) =>
                          e.id === this.getState().id ? { ...e, playing: true } : { ...e, playing: undefined }
                      )
                  );
              }
            : () => {
                  changeSong2(this.getState());
                  audioPlayer.pause();
                  setValue(
                      getValue().map((e) => {
                          return { ...e, playing: undefined };
                      })
                  );
              };

        document.getElementById(`song${this.id}`).addEventListener("click", this.eventListener);
    }
    removeEnvent() {
        document.getElementById(`song${this.id}`).removeEventListener("click", this.eventListener);
    }
    render() {
        return ` <div
                class="w-full shrink-0 text-xs bg-[#F2F5F5] flex items-center h-14 justify-between text-[#2B2D42]"
              >
              <div  class="flex gap-x-1 items-center">
              ${
                  this.getState().playing
                      ? ` <div class="w-10 ml-3"><div class="waveContainer w-10">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
        <div class="wave wave5"></div>
      </div></div>`
                      : `<div class="w-10  ml-3"></div>`
              }
                <span id="song${this.id}" class="cursor-pointer"><i class="${
            this.getState().playing ? "fa-sharp fa-solid fa-pause" : "fa-solid fa-play"
        } fa"></i></span>
    </div>
                <div class="flex items-center gap-x-5 min-w-[300px]">
                  <span class="w-8 h-8">
                    <img
                      src="${this.getState().imageSrc}"
                      class="object-cover"
                      alt="${this.getState().singer}"
                  /></span>
                  <div class="">
                    <div class="text-sm font-medium cursor-pointer">
                      ${this.getState().name}
                    </div>
                    <div class="text-[#909090] cursor-pointer hover:underline">
                      By  ${this.getState().singer}
                    </div>
                  </div>
                </div>
               <div class="flex gap-x-4 mr-3">
                <span>02:45</span>
                <span class="cursor-pointer"
                  ><i class="fa-light fa fa-heart"></i
                ></span>
                <span class="cursor-pointer"
                  ><i class="fa-sharp fa fa-solid fa-ellipsis"></i
                ></span>
                </div>
              </div>`;
    }
}
let component = [];

queue.forEach((e) => {
    const a = new Song(e);
    document.getElementById("trendingsong").appendChild(createElementFromHTML(a.render()));
    a.initEvent();
    component.push(a);
});
setTigger((que) => {
    component.forEach((c) => c.removeEnvent());
    component = [];
    document.getElementById("trendingsong").innerHTML = "";
    que.forEach((e) => {
        const a = new Song(e);
        document.getElementById("trendingsong").appendChild(createElementFromHTML(a.render()));
        a.initEvent();
        component.push(a);
    });
});
