export class Track {
    public id: number | string = "";
    public name: string;
    public url: string;
    public artistName: string;
    public genre?: string | undefined;
    public thumbnailUrl?: string | undefined;
    public artistImgUrl?: string | undefined;
    public totalTime: number = 0;

    constructor(
        name: string,
        url: string,
        artistName: string,
        genre?: string,
        thumbnailUrl?: string,
        artistImgUrl?: string
    ) {
        this.name = name;
        this.url = url;
        this.artistName = artistName;
        this.genre = genre;
        this.thumbnailUrl = thumbnailUrl;
        this.artistImgUrl = artistImgUrl;
    }
}

export class TrackNode {
    public track: Track;
    public next: TrackNode | null;
    constructor(track: Track) {
        this.track = track;
        this.next = null;
    }
}

export default class AudioPlayer {
    public audio: HTMLAudioElement;
    public currentTrackIndex: number = 0;
    public trackList: Track[] = [];
    public isPlaying: boolean;
    public isRepeat: boolean;
    public isMute: boolean;
    public isShuffle: boolean = false;
    public volume: number;
    private trackEndEvent: ((e: Event) => void)[] = [];
    private trackPauseEvent: ((e: Event) => void)[] = [];
    private trackStartEvent: ((e: Event) => void)[] = [];
    private trackPlayingEvent: ((e: Event) => void)[] = [];
    constructor(audio: HTMLAudioElement) {
        this.audio = audio;

        this.isPlaying = false;
        this.isRepeat = false;
        this.isMute = false;
        this.volume = 1;
        this.initEvent();
    }
    private initEvent() {
        this.audio.addEventListener("ended", (e) => {
            this.trackEndEvent.forEach((callback) => {
                callback(e);
            });
            this.moveToNextTrack();
        });
        this.audio.addEventListener("pause", (e) => {
            this.trackPauseEvent.forEach((callback) => {
                callback(e);
            });
        });
        this.audio.addEventListener("play", (e) => {
            this.trackStartEvent.forEach((callback) => {
                callback(e);
            });
        });
        this.audio.addEventListener("playing", (e) => {
            this.trackPlayingEvent.forEach((callback) => {
                callback(e);
            });
        });
        this.audio.addEventListener("timeupdate", (e) => {
            this.trackPlayingEvent.forEach((callback) => {
                callback(e);
            });
        });
    }
    public play() {
        console.log(this.audio);
        console.log(this.trackList);
        console.log(this.audio.getAttribute("src"), "ok");
        if (this.audio.getAttribute("src") == "#") {
            if (this.trackList.length > 0) {
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.audio.load();
                this.audio.play();
            }
            return;
        }
        this.audio.play();
        this.isPlaying = true;
    }
    public setCurrentTime(time: number) {
        this.audio.currentTime = time;
    }
    public getDuration() {
        return this.audio.duration;
    }
    public pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    public stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    public setVolume(volume: number) {
        this.audio.volume = volume;
        this.volume = volume;
    }

    public mute() {
        this.audio.volume = 0;
        this.isMute = true;
    }

    public unmute() {
        this.audio.volume = this.volume;
        this.isMute = false;
    }

    public setTrack(track: Track) {
        this.audio.src = track.url;
        this.audio.load();
        this.trackList.push(track);
        this.currentTrackIndex = this.trackList.length - 1;
    }

    public setTrackList(trackList: Track[]) {
        this.trackList = trackList;
    }

    public moveToNextTrack() {
        if (this.currentTrackIndex < this.trackList.length - 1) {
            if (this.isShuffle) {
                this.currentTrackIndex = Math.floor(Math.random() * this.trackList.length);
            } else {
                this.currentTrackIndex++;
            }
            this.audio.src = this.trackList[this.currentTrackIndex].url;
            this.audio.load();
            this.play();
        } else {
            if (this.isRepeat) {
                if (this.isShuffle) {
                    this.currentTrackIndex = Math.floor(Math.random() * this.trackList.length);
                } else {
                    this.currentTrackIndex = 0;
                }
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.audio.load();

                this.play();
            } else {
                this.stop();
            }
        }
    }
    public addTrack(track: Track) {
        this.trackList.push(track);
    }

    public getCurrentTrack() {
        return this.trackList[this.currentTrackIndex];
    }
    public moveToPrevTrack() {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            this.audio.src = this.trackList[this.currentTrackIndex].url;
            this.play();
        } else {
            if (this.isRepeat) {
                this.currentTrackIndex = this.trackList.length - 1;
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.play();
            } else {
                this.audio.currentTime = 0;
            }
        }
    }
    public onTrackEnd(callback: (e: Event) => void) {
        this.trackEndEvent.push(callback);
    }
    public onTrackPause(callback: (e: Event) => void) {
        this.trackPauseEvent.push(callback);
    }
    public onTrackStart(callback: (e: Event) => void) {
        this.trackStartEvent.push(callback);
    }
    public onTrackPlaying(callback: (e: Event) => void) {
        this.trackPlayingEvent.push(callback);
    }
}
