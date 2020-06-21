interface readStringConfig {
  separator?: string;
  labels?: 'first-line' | 'auto' | string[];
}

class CSV {
  labels: string[];

  lines: string[][];

  size: number;

  constructor() {
    this.labels = [];
    this.lines = [];
    this.size = 0;
  }

  readString(
    input: string,
    { separator = ',', labels = 'first-line' }: readStringConfig,
  ) {
    const lines: string[][] = [];
    let headLabels: string[] = [];
    const textLines = input.split(/\n/);

    textLines.forEach(textLine => {
      const fields = textLine.split(separator);
      lines.push(fields);
    });

    if (Array.isArray(labels)) {
      const firstLine = lines[0];

      if (labels.length === firstLine.length) headLabels = labels;
      else throw new Error('array of labels is not the size of a line');
    }

    if (labels === 'first-line') headLabels = lines.shift();

    if (labels === 'auto') {
      const firstLine = lines[0];
      if (firstLine.length)
        headLabels = firstLine.map((v, index) => index.toString());
    }

    this.labels = headLabels;
    this.lines = lines;
    this.size = lines.length;
  }

  toJSON(withLabels = true) {
    const { lines } = this;
    let result = [];

    if (withLabels) result.push(this.labels);

    result = result.concat(lines);

    return result;
  }
}

export default CSV;
