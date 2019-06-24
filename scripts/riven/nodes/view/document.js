'use strict'

RIVEN.lib.Document = function DocumentNode (id, rect, ...params) {
  RIVEN.lib.Dom.call(this, id, rect)

  this.glyph = 'M150,60 L150,60 L240,150 L150,240 L60,150 Z M150,120 L150,120 L180,150 L150,180 L120,150 Z '

  // Modes
  this.modes = { state: '', view: '', theme: '' }

  this.receive = function (content = { title: 'Unknown' }) {
    document.title = content.title

    window.scrollTo(0, 0)

    this.setMode('view', content.view)
    this.setMode('theme', content.theme)

    if (content && content[this.id] !== null) {
      this.update(content[this.id])
      this.send(content[this.id])
    }
  }

  this.answer = function (q) {
    if (!params[0]) { return }
    if (!this.isInstalled) {
      this.install(this.request())
      window.addEventListener('scroll', this.onScroll)
    }
    document.body.appendChild(this.el)
  }

  this.setMode = function (mode, value) {
    if (this.modes[mode] === value) { return }

    if (mode === 'view') {
      if (this.view === value) {
        value = 'main'
        this.modes.theme = 'blanc'
      }
      if (value !== 'main') {
        this.modes.theme = 'noir'
      }
    }

    this.modes[mode] = value
    this.setClass(`state_${this.modes.state} view_${this.modes.view} theme_${this.modes.theme}`)
  }

  this.onScroll = function () {
    Ø('menu').setClass(window.scrollY > Ø('header').el.offsetHeight - 90 ? 'sticky' : '')
  }
}
