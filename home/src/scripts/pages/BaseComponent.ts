export default abstract class BaseComponent {
    public name: string = "";
    abstract render(): void;
    abstract destroy(): void;
}
