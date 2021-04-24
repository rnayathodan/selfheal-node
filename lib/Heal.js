const axios = require('axios')
const {
  PathFinder
} = require('./PathFinder.js');
class Heal {

  constructor(url) {
    this.url = url;
  }

  async getNodePath  (url, locator, className, methodName) {
    const req_url=`${url}?locator=${locator}&className=${className}&methodName=${methodName}`;
    const resp = await axios.get(req_url);
    return resp.data;

  }
  async find(locator, className, methodName, html) {
    const nodePath = await this.getNodePath(this.url, locator, className, methodName)
    const pathFinder = new PathFinder()
    const derived = pathFinder.findElement(nodePath, html);
    if (!derived || !derived.length) {
      return null;
    }
    let xpath = 'xpath=' + derived[0].path.getXPath();

    return xpath;
  }

}
module.exports = {
  Heal
}
