export class GenerateIdError extends Error {
  constructor() {
    super("Unable to generate file id");
  }
}
