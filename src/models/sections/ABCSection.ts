import { Section, SectionType } from ".";
import { Line } from "../lines";

export class ABCSection extends Section {
  public clone(): Section {
    const section = new ABCSection(this._label);
    this._lines.forEach((line) => {
      section.addLine(line.clone());
    });
    return section;
  }

  /**
   * Getter label
   * @return {string }
   */
  public get label(): string | null {
    return this._label;
  }
  private _label: string | null = null;
  public get attributes(): Record<string, string> {
    return this._attributes;
  }
  private _attributes: Record<string, string> = {};

  constructor(
    label: string | null = null,
    attributes: Record<string, string> = {},
  ) {
    super(SectionType.ABC);
    this._label = label;
    this._attributes = attributes;
  }

  public addLine(line: Line) {
    this._lines.push(line);
  }
}
