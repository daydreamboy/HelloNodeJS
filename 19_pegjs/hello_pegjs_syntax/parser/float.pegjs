FLOAT
    = str: $(('-')? [0-9]+ '.' [0-9]+) {
        return parseFloat(str);
    }