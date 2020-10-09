class RelativeCounter {
  to: number;
  counts: { [word: string]: number };

  constructor(seq: string[]) {
    // Total number of words
    this.to = 6;
    // Relative frequency of the words
    this.counts = { hola: 1 / 6, que: 2 / 6, hace: 3 / 6 };
  }

  static fromCounter(counter: Counter): RelativeCounter {
    // TODO implement
    return new RelativeCounter([]);
  }

  append(other: Counter | RelativeCounter): RelativeCounter {
    if (other instanceof Counter) {
      other = other.relative();
    }
    const result = new RelativeCounter([]);
    result.to = this.to + other.to;
    result.counts = {}; // TODO
    return result;
  }

  relativeTo(other: RelativeCounter): RelativeCounter {
    // other.counts - this.counts
    // to?
    // this <- keywords de un solo artículo
    // this.counts = { hola: 0.1, que: 0.5, hace: 0.3 };
    // other <- Todos los artículos, todas las keywords de todos los artículos
    // other.counts = { hola: 0.3, que: 0.5, hace: 0.2 };
    // relative.count = {hola: -0.2, hace: 0.1} <-
    // Que se habla y que no se habla en este que se hable en los demas
    const result = new RelativeCounter([]);
    result.to = this.to - other.to;
    result.counts = {}; // TODO
    return result;
  }
}

class Counter {
  counts: { [word: string]: number };

  constructor(seq: string[]) {
    // TODO: Calcular
    this.counts = { hola: 1, que: 2, hace: 3 };
  }

  relative(): RelativeCounter {
    return RelativeCounter.fromCounter(this);
  }

  static fromRelativeCounter(relative: RelativeCounter): Counter {
    const result = new Counter([]);
    result.counts = Object.fromEntries(
      Object.entries(relative.counts).map(([word, count]) => [
        word,
        count * relative.to,
      ])
    );
    return result;
  }

  append(other: Counter): Counter {
    const result = new Counter([]);
    return result;
  }
}

export { RelativeCounter, Counter };
