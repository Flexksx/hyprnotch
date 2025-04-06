export class WeatherCondition {
  private text: string;
  private icon: string;
  private code: number;

  constructor(text: string, icon: string, code: number) {
    this.text = text;
    this.icon = icon;
    this.code = code;
  }

  getText(): string {
    return this.text;
  }
  getIcon(): string {
    return this.icon;
  }
  getCode(): number {
    return this.code;
  }
}
