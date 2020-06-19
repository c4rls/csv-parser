class CSV {
  constructor() {
    this.labels = [];
    this.lines = [];
    this.size = 0;
  }

  readString(str, separator = ",") {
    const lines = [];
    const textLines = str.split(/\n/);

    textLines.forEach((textLine) => {
      const fields = textLine.split(separator);
      const line = [];
      fields.forEach((field) => {
        line.push(field);
      });

      lines.push(line);
    });

    this.lines = lines;
  }
}

module.exports = CSV;
