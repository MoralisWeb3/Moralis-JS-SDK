class MemoryCard {
  save(what) {
    this.saved = what;
  }

  get(where) {
    if (!this.saved) throw new Error('Nothing saved to memory card');

    // In case the saved data is not an object but a simple string or number
    if (where.length === 0) return this.getSaved();

    let tmp;
    let savedTmp = this.saved;
    for (let i = 0; i < where.length; i++) {
      tmp = savedTmp[where[i]];
      savedTmp = tmp;
    }

    return savedTmp;
  }

  getSaved() {
    return this.saved;
  }

  deleteSaved() {
    this.saved = undefined;
  }
}

module.exports = { MemoryCard };
