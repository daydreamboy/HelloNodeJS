class StringTool {
    // @see https://stackoverflow.com/a/5040502
    TruncatingStyle = Object.freeze({
      truncatingNone: 0,
      truncatingHead: 1,
      truncatingTrail: 2,
      truncatingMiddle: 3
    });

    /**
     *
     * @param {*} string
     * @param {*} limitedLength
     * @param {*} separator
     * @param {*} truncatingStyle
     * @see https://stackoverflow.com/a/5723274
     */
    static truncateString(
      string,
      limitedLength,
      truncatingStyle,
      separator
    ) {
      if (string.length <= limitedLength) return string;
      if (truncatingStyle == TruncatingStyle.truncatingNone) return string;

      truncatingStyle = truncatingStyle || TruncatingStyle.truncatingTrail;
      separator = separator || "...";

      var separatorLength = separator.length;
      var showedLength = limitedLength - separatorLength;

      switch (truncatingStyle) {
        case TruncatingStyle.truncatingHead: {
          return separator + string.substr(string.length - showedLength);
        }
        case TruncatingStyle.truncatingTrail: {
          return string.substr(0, showedLength) + separator;
        }
        case TruncatingStyle.truncatingMiddle: {
          const frontCharsLength = Math.ceil(showedLength / 2);
          const backCharsLength = Math.floor(showedLength / 2);
          return (
            string.substr(0, frontCharsLength) +
            separator +
            string.substr(string.length - backCharsLength)
          );
        }
        case TruncatingStyle.truncatingNone:
        default: {
          return string;
        }
      }
    }
  }