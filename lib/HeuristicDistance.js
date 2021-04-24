const _ = require("lodash")
const levenshtein = require('js-levenshtein');
const {
  Node
} = require('./myNode.js')
class HeuristicNodeDistance {

  equalsIgnoreCase(a, b) {
    return _.isEqual(a.toLowerCase(), b.toLowerCase());
  }
  union(a, b) {
    return _.union([a, b]);
  }
  equals(a, b) {
    return _.isEqual(a, b);
  }
  calculateLevenshteinScore() {

  }
  intersect(a, b) {
    return _.intersection([a, b]);
  }
  difference(a, b) {
    return _.difference(a, b);
  }
  constructor(){
  }
  distance(n1, node2, LCSDistance, curPathHeight) {
    this.POINTS_FOR_TAG = 100.0;
    this.POINTS_FOR_LCS = 100.0;
    this.POINTS_FOR_ID = 50.0;
    this.POINTS_FOR_CLASS = 40.0;
    this.POINTS_FOR_VALUE = 30.0;
    this.POINTS_FOR_INDEX = 0;
    this.POINTS_FOR_OTHER_ATTRIBUTE = 30.0;

    let score = 0;
    if (curPathHeight == 0 || (curPathHeight > 5 && (LCSDistance / curPathHeight) < 0.7)) {
      return 0.0;
    } else {
      score += LCSDistance / curPathHeight * this.POINTS_FOR_LCS;
    }

    let node1=new Node(n1.tag, n1.id, n1.classes, n1.index, n1.other, null, n1.innerText);

    let propertyNames = this.union(_.keys(node1.getOtherAttributes()), _.keys(node2.getOtherAttributes()));
    let classNames = this.union(node1.getClasses(), node2.getClasses());
    let maximumScore = this.POINTS_FOR_TAG +
      this.POINTS_FOR_ID +
      this.POINTS_FOR_INDEX +
      this.POINTS_FOR_VALUE +
      this.POINTS_FOR_LCS +
      this.POINTS_FOR_CLASS +
      this.POINTS_FOR_OTHER_ATTRIBUTE;

    if (this.equalsIgnoreCase(node1.getTag(), node2.getTag())) {
      score += this.POINTS_FOR_TAG;
    }
    if (this.equals(node1.getIndex(), node2.getIndex())) {
      score += this.POINTS_FOR_INDEX;
    }
    if (node1.getId() != null && node2.getId() != null) {
      score += this.POINTS_FOR_ID * this.calculateLevenshteinScore(node1.getId(), node2.getId(), 0.3);
    }
    score += this.POINTS_FOR_VALUE * this.calculateLevenshteinScore(node1.getInnerText(), node2.getInnerText(), 0.3);

    let classesIntersect = this.intersect(node1.getClasses(), node2.getClasses());
    let intersectScore = classesIntersect.length * this.POINTS_FOR_CLASS;
    if (classNames.length > 0) {
      intersectScore /= classNames.length;
      score += intersectScore;
    } else {
      score += this.POINTS_FOR_CLASS;
    }

    let node1classesDifference = this.difference(node1.getClasses(), node2.getClasses());
    let node2classesDifference = this.difference(node2.getClasses(), node1.getClasses());
    let lengthDifference = this.union(node1classesDifference, node2classesDifference).length;
    if (lengthDifference > 0) {
      let classesScore = 0;
      if (node1classesDifference.length > 0) {
        classesScore = this.calculateClassesIntersectionByLevenshtein(
          node1classesDifference, node2.getClasses()
        );
      } else {
        classesScore = this.calculateClassesIntersectionByLevenshtein(
          node1.getClasses(), node2classesDifference
        );
      }
      if (classNames.length > 0) {
        classesScore /= classNames.length;
      }
      score += lengthDifference * this.POINTS_FOR_CLASS * classesScore;
    }
    let otherAttributesScore = 0;
    let me=this;
    propertyNames.map(function(propertyName) {
      let n1OtherAttributes=node1.getOtherAttributes();
      let n2OtherAttributes=node2.getOtherAttributes();
      let prop1=n1OtherAttributes[propertyName] || '';
      let prop2=n2OtherAttributes[propertyName] || '';
      otherAttributesScore += me.POINTS_FOR_OTHER_ATTRIBUTE * me.calculateLevenshteinScore(prop1, prop2, 0.75);
    });
    if (propertyNames.length > 0) {
      otherAttributesScore /= propertyNames.length;
      score += otherAttributesScore;
    } else {
      score += this.POINTS_FOR_OTHER_ATTRIBUTE;
    }

    return score / maximumScore;


  }
  calculateClassesIntersectionByLevenshtein(nodeClasses1, nodeClasses2) {
    let comparisonsNumber = 0;
    let scores = 0;
    let cl = this.calculateLevenshteinScore;
    nodeClasses1.map(function(classNameFirst) {
      nodeClasses2.map(function(classNameSecond) {
        scores += cl(classNameFirst, classNameSecond, 0.75);
        comparisonsNumber += 1;
      });
    });
    if (comparisonsNumber == 0) {
      return 0;
    }
    return scores / comparisonsNumber;
  }

  calculateLevenshteinScore(innerText1, innerText2, thresholdPercent) {
    if (innerText1 == null || innerText2 == null) {
      return 0;
    }
    innerText1 = innerText1.toLowerCase();
    innerText2 = innerText2.toLowerCase();
    let length = Math.max(innerText1.length, innerText2.length);
    if (length == 0) {
      return 1;
    }
    let distance = levenshtein(innerText1, innerText2);
    if (distance < 0) {
      return 0;
    }
    return (length - distance) / length;
  }

}

module.exports = { HeuristicNodeDistance }
