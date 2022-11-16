export class Track {
    public id: number = 0;
    public name: string;
    public url: string;
    public artistName: string;
    public genre?: string | undefined;
    public thumbnailUrl?: string | undefined;
    public artistImgUrl?: string | undefined;
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
    public currentTrack: Track | null;
    public trackList: TrackNode | null;
    public isPlaying: boolean;
    public isRepeat: boolean;
    public isMute: boolean;
    public volume: number;
    public currentTrackNode: TrackNode | null;
    private trackEndEvent: ((e: Event) => void)[] = [];
    private trackPauseEvent: ((e: Event) => void)[] = [];
    private trackStartEvent: ((e: Event) => void)[] = [];
    private trackPlayingEvent: ((e: Event) => void)[] = [];
    constructor(audio: HTMLAudioElement) {
        this.audio = audio;
        this.currentTrack = null;
        this.trackList = null;
        this.isPlaying = false;
        this.isRepeat = false;
        this.isMute = false;
        this.volume = 1;
        this.currentTrackNode = null;
        this.initEvent();
    }
    private initEvent() {
        this.audio.addEventListener("ended", (e) => {
            this.trackEndEvent.forEach((callback) => {
                callback(e);
            });
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
    }
    public play() {
        this.audio.play();
        this.isPlaying = true;
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
        this.currentTrack = track;
    }

    public setTrackList(trackList: TrackNode) {
        this.trackList = trackList;
    }

    public nextTrack() {
        if (this.currentTrackNode) {
            if (this.currentTrackNode.next) {
                this.currentTrackNode = this.currentTrackNode.next;
                this.setTrack(this.currentTrackNode.track);
                this.play();
            } else {
                this.stop();
            }
        }
    }

    public prevTrack() {
        if (this.currentTrackNode) {
            if (this.currentTrackNode.next) {
                this.currentTrackNode = this.currentTrackNode.next;
                this.setTrack(this.currentTrackNode.track);
                this.play();
            } else {
                this.stop();
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
