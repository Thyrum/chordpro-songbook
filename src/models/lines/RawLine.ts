import { Line, LineType } from "./Line";

export class RawLine extends Line {
  clone(): Line {
    return new RawLine(this.value);
  }
  /**
   * Getter value
   * @return {string}
   */
  public get value(): string {
    return this._value;
  }
  private _value: string;

  constructor(value: string) {
    super(LineType.Raw);
    this._value = value;
  }
}
