class Node {

  constructor(tag, id, classes, index, otherAttributes, children, innerText) {
    this.tag = tag;
    this.id = id;
    this.classes = classes;
    this.index = index;
    this.otherAttributes = otherAttributes;
    this.children = children || Array();
    this.innerText = innerText;
    this.parent = null;
  }

  getTag() {
    return this.tag;
  }

  getId() {
    return this.id;
  }

  getClasses() {
    return this.classes && this.classes.length && this.classes.split(' ') || [];
  }

  getIndex() {
    return this.index;
  }

  getOtherAttributes() {
    return this.otherAttributes;
  }

  getInnerText() {
    return this.innerText;
  }

  getChildren() {
    return this.children;
  }

  getParent() {
    return this.parent;
  }

  setParent(parent) {
    this.parent = parent;
  }

  hashCode() {
    return this.hashString('' + tag + id);
  }
  equals(b){
    console.log(this, b);
    return _.isEqual(this, b);
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  addChild(child){
    this.children.push(child)
  }


}
module.exports = { Node }
