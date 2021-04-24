var HTMLParser = require('node-html-parser');
const {
  Node
} = require('./myNode.js')

class HtmlParser {
  traverse(node, index, treeDepth) {
    let attributesMap = node.attributes;
    var me = this;

    let builder = new Node(node.tagName && node.tagName.toLowerCase() || '', attributesMap && attributesMap.id || '', attributesMap && attributesMap.class || '', index, attributesMap, null, node.text);

    treeDepth.push(builder);
    let indexCounter = 0;

    node.childNodes.map(function(child) {
      if (child.nodeType == 1) {
        let bd = me.traverse(child, indexCounter++, treeDepth);
        if (bd) {
          builder.addChild(bd);
        }
      }
    });
    treeDepth.pop();
    return builder;
  }
  parse(html) {
    const root = HTMLParser.parse(html, {
      lowerCaseTagName: true
    });

    let tree = Array();
    let parsed = this.traverse(root.firstChild, 0, tree);
    return parsed;
  }

}

module.exports = {
  HtmlParser
}
