class BlitzrPlayer {
    constructor(target, options = {}) {
        this.el = document.getElementById(target)
        if (typeof this.el !== 'object') console.warn('Target is not a DOM element')
        this.src = 'http://player.blitzr.com/TRGjiHkD4jr6ZDh4P6'
        this.el.innerHTML = `<iframe src="${this.src}" scrolling="no" frameborder="no"></iframe>`
    }
}
