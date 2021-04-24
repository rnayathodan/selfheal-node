let _ = require('lodash');
class LCSDistance {
  constructor() {}
  equals(a, b) {
    return a.tag == b.tag && a.id == b.id;
  }
  distance(path1, path2) {
    let X = path1.getNodes();
    let Y = path2.getNodes();
    const m = X.length;
    const n = Y.length;
    let L = Array();

    for (let i = 0; i <= m; i++) {
      L[i] = Array();
      for (let j = 0; j <= n; j++) {
        if (i == 0 || j == 0) {
          L[i][j] = 0;
        } else if (this.equals(X[i - 1], Y[j - 1])) {
          L[i][j] = L[i - 1][j - 1] + 1;
        } else {
          L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
        }
      }
    }

    return L[m][n];
  }

}

module.exports = {
  LCSDistance
}
