class Path {
  constructor(nodes) {
    if (Array.isArray(nodes)) {
      this.nodes = nodes;
    } else {
      this.nodes = Array();
      this.nodes.push(nodes)
    }
  }
  getNodes() {
    return this.nodes;
  }

  setNodes(nodes) {
    this.nodes = nodes;
  }
  getLastNode() {
    return this.nodes[this.nodes.length - 1];
  }
  getXPath() {
    let xpath = '';
    this.nodes.map(function(n) {
      xpath += '/' + n.tag;
      if (n.classes.length)
        xpath += "[contains(@class, '" + n.classes + "')]"
    })
    return xpath;
  }


}
module.exports = {
  Path
}
