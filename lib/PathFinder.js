var HTMLParser = require('node-html-parser');
const {
  Node
} = require('./myNode.js')
const {
  Path
} = require('./Path.js')
const {
  HtmlParser
} = require('./HtmlParser.js')
const {
  LCSDistance
} = require('./LCSDistance.js')
const {
  HeuristicNodeDistance
} = require('./HeuristicDistance.js')

const _ = require("lodash");
class PathFinder {

  constructor() {
    this.pathDistance = new LCSDistance();
    this.nodeDistance = new HeuristicNodeDistance();
    this.recoveryTries = 3;
    this.scoreCap = 0.6;
  }

  findNearest(path, newSource) {
    let found = this.find(path, newSource, 1);
    return found.isEmpty() ? null : found.get(0).getValue();
  }
  findElement(nodePath, destinationTree) {
    let htmlParser = new HtmlParser();
    let destination = htmlParser.parse(destinationTree);
    return this.find(new Path(nodePath), destination, this.recoveryTries, this.scoreCap);
  }

  find(path, newSource, bestGuessesCount) {
    return this.find(path, newSource, bestGuessesCount, -1);
  }

  find(path, newSource, bestGuessesCount, guessCap) {
    let nodeLimit = this.normalizeLimit(bestGuessesCount);
    let scoreLimit = this.normalizeScoreCap(guessCap);

    let destinationLeaves = this.findAllLeafPaths(newSource);

    let byPath = path.getLastNode();
    let pathLength = path.getNodes().length;

    let paths = Array();
    let maxLCSDistance = 0;
    var me = this;
    destinationLeaves.map(function(destinationLeaf) {
      let distance = me.pathDistance.distance(path, destinationLeaf);
      if (distance >= 1) {
        maxLCSDistance = Math.max(maxLCSDistance, distance);
        paths.push({
          path: destinationLeaf,
          distance: distance
        });
      }
    });

    let pathLengthToCheck = Math.min(maxLCSDistance, pathLength);
    paths = paths.map(function(p) {
      let cNode = p.path.getLastNode();
      let score = me.nodeDistance.distance(byPath, cNode, p.distance, pathLengthToCheck);
      p.score = score;
      return p;
    });
    let result = _.orderBy(paths, ['score'], ['desc']);
    result=_.filter(result, function(o) {
      return o.score >= scoreLimit;
    });

    return result;

  }

  findAllLeafPaths(node) {
    let paths = Array();
    let arr = Array();
    this.addLeafPath(node, paths, arr);
    return arr;
  }
  addLeafPath(element, paths, arr) {
    arr = arr || [];
    paths = paths || [];
    var me = this;
    let childrens = element.getChildren();
    paths.push(element);
    if (childrens == null || !childrens.length) {
      arr.push(new Path(paths));
      return arr;
    }
    childrens.map(function(child) {
      let npaths = paths.slice();
      me.addLeafPath(child, npaths, arr);
    });
  }


  normalizeScoreCap(value) {
    if (value > 1) {
      return -1;
    }
    return value;
  }

  normalizeLimit(value) {
    if (value < 0) {
      return 1;
    }
    return value;
  }
}
module.exports = {
  PathFinder
}
