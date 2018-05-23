cc.Class({
  name: 'ImageSet',
  extends: cc.Component,
  properties: {
    list: {
      type: cc.SpriteFrame,
      default: []
    },
    _indices: [],
    indices: {
      type: cc.Integer,
      default: []
    }
  },
  onLoad () {
    this.init();
    this.showAt(this.indices);
  },
  init () {
    const root = this.node;
    this.nodes = this.list.map((frame, i) => {
      const n = new cc.Node(`imageset-${i}`);
      const sprite = n.addComponent(cc.Sprite);
      sprite.spriteFrame = frame;
      this.node.addChild(n);
      n.active = false;
      n.width = root.width;
      n.height = root.height;
      return n;
    });
  },
  addComponentsAt (i, compInstances) {
    const n = this.nodes[i];
    if (!n) return;
    if (Array.isArray(compInstances)) {
      compInstances.forEach(c => n.addComponent(c));
    } else {
      n.addComponent(compInstances);
    }
  },
  showAt(indices, hideOthers = false) {
    if (hideOthers) {
      this.nodes.forEach(it => it.active = false);
    }
    if (typeof indices === 'number') indices = [indices];
    indices.forEach(i => {
      let n = this.nodes[i];
      if (n) {
        n.active = true;
      }
    })
  }
});