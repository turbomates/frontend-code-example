let cssVarPoly = {
  init() {
    cssVarPoly.ratifiedVars = {}
    cssVarPoly.varsByBlock = {}
    cssVarPoly.oldCSS = {}

    cssVarPoly.findCSS()
    cssVarPoly.updateCSS()
  },

  findCSS() {
    let styleBlocks = document.querySelectorAll('style:not(.inserted),link[type="text/css"]')
    let counter = 1
    ;[].forEach.call(styleBlocks, function(block) {
      let theCSS
      if (block.nodeName === 'STYLE') {
        block.classList.add('polyfilled')
        theCSS = block.innerHTML
        cssVarPoly.findSetters(theCSS, counter)
      } else if (block.nodeName === 'LINK') {
        cssVarPoly.getLink(block.getAttribute('href'), counter, function(counter, request) {
          cssVarPoly.findSetters(request.responseText, counter)
          cssVarPoly.oldCSS[counter] = request.responseText
          cssVarPoly.updateCSS()
        })
        theCSS = ''
      }

      cssVarPoly.oldCSS[counter] = theCSS
      counter++
    })
  },

  findSetters(theCSS, counter) {
    cssVarPoly.varsByBlock[counter] = theCSS.match(/(--.+:.+;)/g) || []
  },

  updateCSS() {
    cssVarPoly.ratifySetters(cssVarPoly.varsByBlock)
    cssVarPoly.ratifyInnerSetters(cssVarPoly.ratifiedVars)
    for (let curCSSID in cssVarPoly.oldCSS) {
      let newCSS = cssVarPoly.replaceGetters(cssVarPoly.oldCSS[curCSSID], cssVarPoly.ratifiedVars)
      if (document.querySelector('#inserted' + curCSSID)) {
        document.querySelector('#inserted' + curCSSID).innerHTML = newCSS
      } else {
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = newCSS
        style.classList.add('inserted')
        style.id = 'inserted' + curCSSID
        document.getElementsByTagName('head')[0].appendChild(style)
      }
    }
  },

  replaceGetters(curCSS, varList) {
    for (let theVar in varList) {
      let getterRegex = new RegExp('var\\(\\s*' + theVar + '\\s*\\)', 'g')
      curCSS = curCSS.replace(getterRegex, varList[theVar])
      let getterRegex2 = new RegExp('var\\(\\s*.+\\s*,\\s*(.+)\\)', 'g')
      let matches = curCSS.match(getterRegex2)
      if (matches) {
        matches.forEach(function(match) {
          curCSS = curCSS.replace(match, match.match(/var\(.+,\s*(.+)\)/)[1])
        })
      }
    }
    return curCSS
  },

  ratifySetters(varList) {
    for (let curBlock in varList) {
      let curVars = varList[curBlock]
      curVars.forEach(function(theVar) {
        let matches = theVar.split(/:\s*/)
        cssVarPoly.ratifiedVars[matches[0]] = matches[1].replace(/;/, '')
      })
    }
  },

  ratifyInnerSetters(ratifyVars) {
    var nameVars = Object.keys(cssVarPoly.ratifiedVars)

    for (var ratifidVar in cssVarPoly.ratifiedVars) {
      cssVarPoly.ratifiedVars[ratifidVar] = cssVarPoly.ratifiedVars[ratifidVar].replace(
        /(var\((--[a-zA-Z0-9_-]+)\))/g,
        match => cssVarPoly.ratifiedVars[match.substring(4, match.length - 1)]
      )
    }
  },

  getLink(url, counter, success) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.overrideMimeType('text/css;')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (typeof success === 'function') {
          success(counter, request)
        }
      } else {
        console.warn('an error was returned from:', url)
      }
    }

    request.onerror = function() {
      console.warn('we could not get anything from:', url)
    }

    request.send()
  },
}

if (window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')) {
  console.log('Your browser supports CSS variables.')
} else {
  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      Array.prototype.slice.call(mutation.addedNodes)[0].localName === 'style' && cssVarPoly.init()
    }
  })

  observer.observe(document.head, {
    attributes: true,
    childList: true,
  })
}
