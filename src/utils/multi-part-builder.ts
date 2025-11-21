// See https://github.com/googleworkspace/drive-quickeditors/blob/b74d9e19285e579532f6501dbc8f9acf43becb1b/web/src/components/drive/multipart.js#L22

export class MultiPartBuilder {
  private boundary: string;
  private mimeType: string;
  private parts: string[] = [];
  private body: string | null = null;
  constructor(mimeType: string = "multiPart/mixed") {
    this.boundary = Math.random().toString(36).slice(2);
    this.mimeType = `${mimeType}; boundary=${this.boundary}`;
  }

  append(mimeType: string, content: string) {
    if (this.body !== null) {
      throw new Error("MultiPartBuilder has already been finalized.");
    }
    this.parts.push(
      `\r\n--${this.boundary}\r\n`,
      `Content-Type: ${mimeType}\r\n\r\n`,
      content,
    );
    return this;
  }

  finish() {
    if (this.parts.length === 0) {
      throw new Error("No multiPart parts have been added.");
    }
    if (this.body === null) {
      this.parts.push(`\r\n--${this.boundary}--`);
      this.body = this.parts.join("");
      // TODO - switch to blob once gapi.client.request allows it
      // this.body = new Blob(this.parts, {type: this.mimeType});
    }
    return {
      type: this.mimeType,
      body: this.body,
    };
  }
}
