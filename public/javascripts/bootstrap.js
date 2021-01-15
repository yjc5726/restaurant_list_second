/*!
  * Bootstrap v5.0.0-beta1 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core'))
    : typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory)
      : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper))
}(this, function (Popper) {
  'use strict'

  function _interopNamespace (e) {
    if (e && e.__esModule) return e
    const n = Object.create(null)
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k)
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k]
            }
          })
        }
      })
    }
    n.default = e
    return Object.freeze(n)
  }

  const Popper__namespace = /* #__PURE__ */_interopNamespace(Popper)

  function _defineProperties (target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass (Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  function _extends () {
    _extends = Object.assign || function (target) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i]

        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

    return _extends.apply(this, arguments)
  }

  function _inheritsLoose (subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
    subClass.__proto__ = superClass
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000
  const MILLISECONDS_MULTIPLIER = 1000
  const TRANSITION_END = 'transitionend' // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  const toType = function toType (obj) {
    if (obj === null || obj === undefined) {
      return '' + obj
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const getUID = function getUID (prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID)
    } while (document.getElementById(prefix))

    return prefix
  }

  const getSelector = function getSelector (element) {
    let selector = element.getAttribute('data-bs-target')

    if (!selector || selector === '#') {
      const hrefAttr = element.getAttribute('href')
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null
    }

    return selector
  }

  const getSelectorFromElement = function getSelectorFromElement (element) {
    const selector = getSelector(element)

    if (selector) {
      return document.querySelector(selector) ? selector : null
    }

    return null
  }

  const getElementFromSelector = function getElementFromSelector (element) {
    const selector = getSelector(element)
    return selector ? document.querySelector(selector) : null
  }

  const getTransitionDurationFromElement = function getTransitionDurationFromElement (element) {
    if (!element) {
      return 0
    } // Get transition-duration of the element

    const _window$getComputedSt = window.getComputedStyle(element)
    let transitionDuration = _window$getComputedSt.transitionDuration
    let transitionDelay = _window$getComputedSt.transitionDelay

    const floatTransitionDuration = Number.parseFloat(transitionDuration)
    const floatTransitionDelay = Number.parseFloat(transitionDelay) // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    } // If multiple durations are defined, take the first

    transitionDuration = transitionDuration.split(',')[0]
    transitionDelay = transitionDelay.split(',')[0]
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
  }

  const triggerTransitionEnd = function triggerTransitionEnd (element) {
    element.dispatchEvent(new Event(TRANSITION_END))
  }

  const isElement = function isElement (obj) {
    return (obj[0] || obj).nodeType
  }

  const emulateTransitionEnd = function emulateTransitionEnd (element, duration) {
    let called = false
    const durationPadding = 5
    const emulatedDuration = duration + durationPadding

    function listener () {
      called = true
      element.removeEventListener(TRANSITION_END, listener)
    }

    element.addEventListener(TRANSITION_END, listener)
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element)
      }
    }, emulatedDuration)
  }

  const typeCheckConfig = function typeCheckConfig (componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      const expectedTypes = configTypes[property]
      const value = config[property]
      const valueType = value && isElement(value) ? 'element' : toType(value)

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'))
      }
    })
  }

  const isVisible = function isVisible (element) {
    if (!element) {
      return false
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      const elementStyle = getComputedStyle(element)
      const parentNodeStyle = getComputedStyle(element.parentNode)
      return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden'
    }

    return false
  }

  const findShadowRoot = function findShadowRoot (element) {
    if (!document.documentElement.attachShadow) {
      return null
    } // Can find the shadow root otherwise it'll return the document

    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode()
      return root instanceof ShadowRoot ? root : null
    }

    if (element instanceof ShadowRoot) {
      return element
    } // when we don't find a shadow root

    if (!element.parentNode) {
      return null
    }

    return findShadowRoot(element.parentNode)
  }

  const noop = function noop () {
    return function () {}
  }

  const reflow = function reflow (element) {
    return element.offsetHeight
  }

  const getjQuery = function getjQuery () {
    const _window = window
    const jQuery = _window.jQuery

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery
    }

    return null
  }

  const onDOMContentLoaded = function onDOMContentLoaded (callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      callback()
    }
  }

  const isRTL = document.documentElement.dir === 'rtl'

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const mapData = (function () {
    const storeData = {}
    let id = 1
    return {
      set: function set (element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key: key,
            id: id
          }
          id++
        }

        storeData[element.bsKey.id] = data
      },
      get: function get (element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null
        }

        const keyProperties = element.bsKey

        if (keyProperties.key === key) {
          return storeData[keyProperties.id]
        }

        return null
      },
      delete: function _delete (element, key) {
        if (typeof element.bsKey === 'undefined') {
          return
        }

        const keyProperties = element.bsKey

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id]
          delete element.bsKey
        }
      }
    }
  }())

  const Data = {
    setData: function setData (instance, key, data) {
      mapData.set(instance, key, data)
    },
    getData: function getData (instance, key) {
      return mapData.get(instance, key)
    },
    removeData: function removeData (instance, key) {
      mapData.delete(instance, key)
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/
  const stripNameRegex = /\..*/
  const stripUidRegex = /::\d+$/
  const eventRegistry = {} // Events storage

  let uidEvent = 1
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'])
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent (element, uid) {
    return uid && uid + '::' + uidEvent++ || element.uidEvent || uidEvent++
  }

  function getEvent (element) {
    const uid = getUidEvent(element)
    element.uidEvent = uid
    eventRegistry[uid] = eventRegistry[uid] || {}
    return eventRegistry[uid]
  }

  function bootstrapHandler (element, fn) {
    return function handler (event) {
      event.delegateTarget = element

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn)
      }

      return fn.apply(element, [event])
    }
  }

  function bootstrapDelegationHandler (element, selector, fn) {
    return function handler (event) {
      const domElements = element.querySelectorAll(selector)

      for (let target = event.target; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target

            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn)
            }

            return fn.apply(target, [event])
          }
        }
      } // To please ESLint

      return null
    }
  }

  function findHandler (events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null
    }

    const uidEventList = Object.keys(events)

    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]]

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event
      }
    }

    return null
  }

  function normalizeParams (originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string'
    const originalHandler = delegation ? delegationFn : handler // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    let typeEvent = originalTypeEvent.replace(stripNameRegex, '')
    const custom = customEvents[typeEvent]

    if (custom) {
      typeEvent = custom
    }

    const isNative = nativeEvents.has(typeEvent)

    if (!isNative) {
      typeEvent = originalTypeEvent
    }

    return [delegation, originalHandler, typeEvent]
  }

  function addHandler (element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return
    }

    if (!handler) {
      handler = delegationFn
      delegationFn = null
    }

    const _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn)
    const delegation = _normalizeParams[0]
    const originalHandler = _normalizeParams[1]
    const typeEvent = _normalizeParams[2]

    const events = getEvent(element)
    const handlers = events[typeEvent] || (events[typeEvent] = {})
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null)

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff
      return
    }

    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''))
    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler)
    fn.delegationSelector = delegation ? handler : null
    fn.originalHandler = originalHandler
    fn.oneOff = oneOff
    fn.uidEvent = uid
    handlers[uid] = fn
    element.addEventListener(typeEvent, fn, delegation)
  }

  function removeHandler (element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector)

    if (!fn) {
      return
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector))
    delete events[typeEvent][fn.uidEvent]
  }

  function removeNamespacedHandlers (element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {}
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey]
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector)
      }
    })
  }

  var EventHandler = {
    on: function on (element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false)
    },
    one: function one (element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true)
    },
    off: function off (element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return
      }

      const _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn)
      const delegation = _normalizeParams2[0]
      const originalHandler = _normalizeParams2[1]
      const typeEvent = _normalizeParams2[2]

      const inNamespace = typeEvent !== originalTypeEvent
      const events = getEvent(element)
      const isNamespace = originalTypeEvent.startsWith('.')

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null)
        return
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1))
        })
      }

      const storeElementEvent = events[typeEvent] || {}
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '')

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers]
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector)
        }
      })
    },
    trigger: function trigger (element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null
      }

      const $ = getjQuery()
      const typeEvent = event.replace(stripNameRegex, '')
      const inNamespace = event !== typeEvent
      const isNative = nativeEvents.has(typeEvent)
      let jQueryEvent
      let bubbles = true
      let nativeDispatch = true
      let defaultPrevented = false
      let evt = null

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args)
        $(element).trigger(jQueryEvent)
        bubbles = !jQueryEvent.isPropagationStopped()
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped()
        defaultPrevented = jQueryEvent.isDefaultPrevented()
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents')
        evt.initEvent(typeEvent, bubbles, true)
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        })
      } // merge custom information in our event

      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get () {
              return args[key]
            }
          })
        })
      }

      if (defaultPrevented) {
        evt.preventDefault()
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt)
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault()
      }

      return evt
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.0.0-beta1'

  const BaseComponent = /* #__PURE__ */(function () {
    function BaseComponent (element) {
      if (!element) {
        return
      }

      this._element = element
      Data.setData(element, this.constructor.DATA_KEY, this)
    }

    const _proto = BaseComponent.prototype

    _proto.dispose = function dispose () {
      Data.removeData(this._element, this.constructor.DATA_KEY)
      this._element = null
    }
    /** Static */

    BaseComponent.getInstance = function getInstance (element) {
      return Data.getData(element, this.DATA_KEY)
    }

    _createClass(BaseComponent, null, [{
      key: 'VERSION',
      get: function get () {
        return VERSION
      }
    }])

    return BaseComponent
  }())

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'alert'
  const DATA_KEY = 'bs.alert'
  const EVENT_KEY = '.' + DATA_KEY
  const DATA_API_KEY = '.data-api'
  const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]'
  const EVENT_CLOSE = 'close' + EVENT_KEY
  const EVENT_CLOSED = 'closed' + EVENT_KEY
  const EVENT_CLICK_DATA_API = 'click' + EVENT_KEY + DATA_API_KEY
  const CLASSNAME_ALERT = 'alert'
  const CLASSNAME_FADE = 'fade'
  const CLASSNAME_SHOW = 'show'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Alert = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Alert, _BaseComponent)

    function Alert () {
      return _BaseComponent.apply(this, arguments) || this
    }

    const _proto = Alert.prototype

    // Public
    _proto.close = function close (element) {
      const rootElement = element ? this._getRootElement(element) : this._element

      const customEvent = this._triggerCloseEvent(rootElement)

      if (customEvent === null || customEvent.defaultPrevented) {
        return
      }

      this._removeElement(rootElement)
    } // Private

    _proto._getRootElement = function _getRootElement (element) {
      return getElementFromSelector(element) || element.closest('.' + CLASSNAME_ALERT)
    }

    _proto._triggerCloseEvent = function _triggerCloseEvent (element) {
      return EventHandler.trigger(element, EVENT_CLOSE)
    }

    _proto._removeElement = function _removeElement (element) {
      const _this = this

      element.classList.remove(CLASSNAME_SHOW)

      if (!element.classList.contains(CLASSNAME_FADE)) {
        this._destroyElement(element)

        return
      }

      const transitionDuration = getTransitionDurationFromElement(element)
      EventHandler.one(element, TRANSITION_END, function () {
        return _this._destroyElement(element)
      })
      emulateTransitionEnd(element, transitionDuration)
    }

    _proto._destroyElement = function _destroyElement (element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }

      EventHandler.trigger(element, EVENT_CLOSED)
    } // Static

    Alert.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY)

        if (!data) {
          data = new Alert(this)
        }

        if (config === 'close') {
          data[config](this)
        }
      })
    }

    Alert.handleDismiss = function handleDismiss (alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault()
        }

        alertInstance.close(this)
      }
    }

    _createClass(Alert, null, [{
      key: 'DATA_KEY',
      // Getters
      get: function get () {
        return DATA_KEY
      }
    }])

    return Alert
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()))
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Alert to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME]
      $.fn[NAME] = Alert.jQueryInterface
      $.fn[NAME].Constructor = Alert

      $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Alert.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'button'
  const DATA_KEY$1 = 'bs.button'
  const EVENT_KEY$1 = '.' + DATA_KEY$1
  const DATA_API_KEY$1 = '.data-api'
  const CLASS_NAME_ACTIVE = 'active'
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]'
  const EVENT_CLICK_DATA_API$1 = 'click' + EVENT_KEY$1 + DATA_API_KEY$1
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Button = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Button, _BaseComponent)

    function Button () {
      return _BaseComponent.apply(this, arguments) || this
    }

    const _proto = Button.prototype

    // Public
    _proto.toggle = function toggle () {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE))
    } // Static

    Button.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$1)

        if (!data) {
          data = new Button(this)
        }

        if (config === 'toggle') {
          data[config]()
        }
      })
    }

    _createClass(Button, null, [{
      key: 'DATA_KEY',
      // Getters
      get: function get () {
        return DATA_KEY$1
      }
    }])

    return Button
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault()
    const button = event.target.closest(SELECTOR_DATA_TOGGLE)
    let data = Data.getData(button, DATA_KEY$1)

    if (!data) {
      data = new Button(button)
    }

    data.toggle()
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$1]
      $.fn[NAME$1] = Button.jQueryInterface
      $.fn[NAME$1].Constructor = Button

      $.fn[NAME$1].noConflict = function () {
        $.fn[NAME$1] = JQUERY_NO_CONFLICT
        return Button.jQueryInterface
      }
    }
  })

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData (val) {
    if (val === 'true') {
      return true
    }

    if (val === 'false') {
      return false
    }

    if (val === Number(val).toString()) {
      return Number(val)
    }

    if (val === '' || val === 'null') {
      return null
    }

    return val
  }

  function normalizeDataKey (key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return '-' + chr.toLowerCase()
    })
  }

  const Manipulator = {
    setDataAttribute: function setDataAttribute (element, key, value) {
      element.setAttribute('data-bs-' + normalizeDataKey(key), value)
    },
    removeDataAttribute: function removeDataAttribute (element, key) {
      element.removeAttribute('data-bs-' + normalizeDataKey(key))
    },
    getDataAttributes: function getDataAttributes (element) {
      if (!element) {
        return {}
      }

      const attributes = {}
      Object.keys(element.dataset).filter(function (key) {
        return key.startsWith('bs')
      }).forEach(function (key) {
        let pureKey = key.replace(/^bs/, '')
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
        attributes[pureKey] = normalizeData(element.dataset[key])
      })
      return attributes
    },
    getDataAttribute: function getDataAttribute (element, key) {
      return normalizeData(element.getAttribute('data-bs-' + normalizeDataKey(key)))
    },
    offset: function offset (element) {
      const rect = element.getBoundingClientRect()
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      }
    },
    position: function position (element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NODE_TEXT = 3
  const SelectorEngine = {
    matches: function matches (element, selector) {
      return element.matches(selector)
    },
    find: function find (selector, element) {
      let _ref

      if (element === void 0) {
        element = document.documentElement
      }

      return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector))
    },
    findOne: function findOne (selector, element) {
      if (element === void 0) {
        element = document.documentElement
      }

      return Element.prototype.querySelector.call(element, selector)
    },
    children: function children (element, selector) {
      let _ref2

      const children = (_ref2 = []).concat.apply(_ref2, element.children)

      return children.filter(function (child) {
        return child.matches(selector)
      })
    },
    parents: function parents (element, selector) {
      const parents = []
      let ancestor = element.parentNode

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor)
        }

        ancestor = ancestor.parentNode
      }

      return parents
    },
    prev: function prev (element, selector) {
      let previous = element.previousElementSibling

      while (previous) {
        if (previous.matches(selector)) {
          return [previous]
        }

        previous = previous.previousElementSibling
      }

      return []
    },
    next: function next (element, selector) {
      let next = element.nextElementSibling

      while (next) {
        if (this.matches(next, selector)) {
          return [next]
        }

        next = next.nextElementSibling
      }

      return []
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2 = 'carousel'
  const DATA_KEY$2 = 'bs.carousel'
  const EVENT_KEY$2 = '.' + DATA_KEY$2
  const DATA_API_KEY$2 = '.data-api'
  const ARROW_LEFT_KEY = 'ArrowLeft'
  const ARROW_RIGHT_KEY = 'ArrowRight'
  const TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch

  const SWIPE_THRESHOLD = 40
  const Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  }
  const DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  }
  const DIRECTION_NEXT = 'next'
  const DIRECTION_PREV = 'prev'
  const DIRECTION_LEFT = 'left'
  const DIRECTION_RIGHT = 'right'
  const EVENT_SLIDE = 'slide' + EVENT_KEY$2
  const EVENT_SLID = 'slid' + EVENT_KEY$2
  const EVENT_KEYDOWN = 'keydown' + EVENT_KEY$2
  const EVENT_MOUSEENTER = 'mouseenter' + EVENT_KEY$2
  const EVENT_MOUSELEAVE = 'mouseleave' + EVENT_KEY$2
  const EVENT_TOUCHSTART = 'touchstart' + EVENT_KEY$2
  const EVENT_TOUCHMOVE = 'touchmove' + EVENT_KEY$2
  const EVENT_TOUCHEND = 'touchend' + EVENT_KEY$2
  const EVENT_POINTERDOWN = 'pointerdown' + EVENT_KEY$2
  const EVENT_POINTERUP = 'pointerup' + EVENT_KEY$2
  const EVENT_DRAG_START = 'dragstart' + EVENT_KEY$2
  const EVENT_LOAD_DATA_API = 'load' + EVENT_KEY$2 + DATA_API_KEY$2
  const EVENT_CLICK_DATA_API$2 = 'click' + EVENT_KEY$2 + DATA_API_KEY$2
  const CLASS_NAME_CAROUSEL = 'carousel'
  const CLASS_NAME_ACTIVE$1 = 'active'
  const CLASS_NAME_SLIDE = 'slide'
  const CLASS_NAME_END = 'carousel-item-end'
  const CLASS_NAME_START = 'carousel-item-start'
  const CLASS_NAME_NEXT = 'carousel-item-next'
  const CLASS_NAME_PREV = 'carousel-item-prev'
  const CLASS_NAME_POINTER_EVENT = 'pointer-event'
  const SELECTOR_ACTIVE = '.active'
  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item'
  const SELECTOR_ITEM = '.carousel-item'
  const SELECTOR_ITEM_IMG = '.carousel-item img'
  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev'
  const SELECTOR_INDICATORS = '.carousel-indicators'
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]'
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]'
  const PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  }
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Carousel = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Carousel, _BaseComponent)

    function Carousel (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._items = null
      _this._interval = null
      _this._activeElement = null
      _this._isPaused = false
      _this._isSliding = false
      _this.touchTimeout = null
      _this.touchStartX = 0
      _this.touchDeltaX = 0
      _this._config = _this._getConfig(config)
      _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element)
      _this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
      _this._pointerEvent = Boolean(window.PointerEvent)

      _this._addEventListeners()

      return _this
    } // Getters

    const _proto = Carousel.prototype

    // Public
    _proto.next = function next () {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT)
      }
    }

    _proto.nextWhenVisible = function nextWhenVisible () {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next()
      }
    }

    _proto.prev = function prev () {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV)
      }
    }

    _proto.pause = function pause (event) {
      if (!event) {
        this._isPaused = true
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element)
        this.cycle(true)
      }

      clearInterval(this._interval)
      this._interval = null
    }

    _proto.cycle = function cycle (event) {
      if (!event) {
        this._isPaused = false
      }

      if (this._interval) {
        clearInterval(this._interval)
        this._interval = null
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval()

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval)
      }
    }

    _proto.to = function to (index) {
      const _this2 = this

      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element)

      const activeIndex = this._getItemIndex(this._activeElement)

      if (index > this._items.length - 1 || index < 0) {
        return
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this2.to(index)
        })
        return
      }

      if (activeIndex === index) {
        this.pause()
        this.cycle()
        return
      }

      const direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV

      this._slide(direction, this._items[index])
    }

    _proto.dispose = function dispose () {
      _BaseComponent.prototype.dispose.call(this)

      EventHandler.off(this._element, EVENT_KEY$2)
      this._items = null
      this._config = null
      this._interval = null
      this._isPaused = null
      this._isSliding = null
      this._activeElement = null
      this._indicatorsElement = null
    } // Private

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, Default, config)
      typeCheckConfig(NAME$2, config, DefaultType)
      return config
    }

    _proto._handleSwipe = function _handleSwipe () {
      const absDeltax = Math.abs(this.touchDeltaX)

      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }

      const direction = absDeltax / this.touchDeltaX
      this.touchDeltaX = 0 // swipe left

      if (direction > 0) {
        this.prev()
      } // swipe right

      if (direction < 0) {
        this.next()
      }
    }

    _proto._addEventListeners = function _addEventListeners () {
      const _this3 = this

      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this3._keydown(event)
        })
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this3.pause(event)
        })
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this3.cycle(event)
        })
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners()
      }
    }

    _proto._addTouchEventListeners = function _addTouchEventListeners () {
      const _this4 = this

      const start = function start (event) {
        if (_this4._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this4.touchStartX = event.clientX
        } else if (!_this4._pointerEvent) {
          _this4.touchStartX = event.touches[0].clientX
        }
      }

      const move = function move (event) {
        // ensure swiping with one touch and not pinching
        if (event.touches && event.touches.length > 1) {
          _this4.touchDeltaX = 0
        } else {
          _this4.touchDeltaX = event.touches[0].clientX - _this4.touchStartX
        }
      }

      const end = function end (event) {
        if (_this4._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this4.touchDeltaX = event.clientX - _this4.touchStartX
        }

        _this4._handleSwipe()

        if (_this4._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this4.pause()

          if (_this4.touchTimeout) {
            clearTimeout(_this4.touchTimeout)
          }

          _this4.touchTimeout = setTimeout(function (event) {
            return _this4.cycle(event)
          }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval)
        }
      }

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault()
        })
      })

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event)
        })
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event)
        })

        this._element.classList.add(CLASS_NAME_POINTER_EVENT)
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event)
        })
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event)
        })
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event)
        })
      }
    }

    _proto._keydown = function _keydown (event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return
      }

      switch (event.key) {
        case ARROW_LEFT_KEY:
          event.preventDefault()
          this.prev()
          break

        case ARROW_RIGHT_KEY:
          event.preventDefault()
          this.next()
          break
      }
    }

    _proto._getItemIndex = function _getItemIndex (element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : []
      return this._items.indexOf(element)
    }

    _proto._getItemByDirection = function _getItemByDirection (direction, activeElement) {
      const isNextDirection = direction === DIRECTION_NEXT
      const isPrevDirection = direction === DIRECTION_PREV

      const activeIndex = this._getItemIndex(activeElement)

      const lastItemIndex = this._items.length - 1
      const isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement
      }

      const delta = direction === DIRECTION_PREV ? -1 : 1
      const itemIndex = (activeIndex + delta) % this._items.length
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex]
    }

    _proto._triggerSlideEvent = function _triggerSlideEvent (relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget)

      const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element))

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      })
    }

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement (element) {
      if (this._indicatorsElement) {
        const indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement)

        for (let i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(CLASS_NAME_ACTIVE$1)
        }

        const nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)]

        if (nextIndicator) {
          nextIndicator.classList.add(CLASS_NAME_ACTIVE$1)
        }
      }
    }

    _proto._updateInterval = function _updateInterval () {
      const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element)

      if (!element) {
        return
      }

      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10)

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval
        this._config.interval = elementInterval
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval
      }
    }

    _proto._slide = function _slide (direction, element) {
      const _this5 = this

      const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element)

      const activeElementIndex = this._getItemIndex(activeElement)

      const nextElement = element || activeElement && this._getItemByDirection(direction, activeElement)

      const nextElementIndex = this._getItemIndex(nextElement)

      const isCycling = Boolean(this._interval)
      let directionalClassName
      let orderClassName
      let eventDirectionName

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_START
        orderClassName = CLASS_NAME_NEXT
        eventDirectionName = DIRECTION_LEFT
      } else {
        directionalClassName = CLASS_NAME_END
        orderClassName = CLASS_NAME_PREV
        eventDirectionName = DIRECTION_RIGHT
      }

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false
        return
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName)

      if (slideEvent.defaultPrevented) {
        return
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return
      }

      this._isSliding = true

      if (isCycling) {
        this.pause()
      }

      this._setActiveIndicatorElement(nextElement)

      this._activeElement = nextElement

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName)
        reflow(nextElement)
        activeElement.classList.add(directionalClassName)
        nextElement.classList.add(directionalClassName)
        const transitionDuration = getTransitionDurationFromElement(activeElement)
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName, orderClassName)
          nextElement.classList.add(CLASS_NAME_ACTIVE$1)
          activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName)
          _this5._isSliding = false
          setTimeout(function () {
            EventHandler.trigger(_this5._element, EVENT_SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            })
          }, 0)
        })
        emulateTransitionEnd(activeElement, transitionDuration)
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$1)
        nextElement.classList.add(CLASS_NAME_ACTIVE$1)
        this._isSliding = false
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        })
      }

      if (isCycling) {
        this.cycle()
      }
    } // Static

    Carousel.carouselInterface = function carouselInterface (element, config) {
      let data = Data.getData(element, DATA_KEY$2)

      let _config = _extends({}, Default, Manipulator.getDataAttributes(element))

      if (typeof config === 'object') {
        _config = _extends({}, _config, config)
      }

      const action = typeof config === 'string' ? config : _config.slide

      if (!data) {
        data = new Carousel(element, _config)
      }

      if (typeof config === 'number') {
        data.to(config)
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError('No method named "' + action + '"')
        }

        data[action]()
      } else if (_config.interval && _config.ride) {
        data.pause()
        data.cycle()
      }
    }

    Carousel.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config)
      })
    }

    Carousel.dataApiClickHandler = function dataApiClickHandler (event) {
      const target = getElementFromSelector(this)

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return
      }

      const config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this))

      const slideIndex = this.getAttribute('data-bs-slide-to')

      if (slideIndex) {
        config.interval = false
      }

      Carousel.carouselInterface(target, config)

      if (slideIndex) {
        Data.getData(target, DATA_KEY$2).to(slideIndex)
      }

      event.preventDefault()
    }

    _createClass(Carousel, null, [{
      key: 'Default',
      get: function get () {
        return Default
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$2
      }
    }])

    return Carousel
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler)
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE)

    for (let i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2))
    }
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$2]
      $.fn[NAME$2] = Carousel.jQueryInterface
      $.fn[NAME$2].Constructor = Carousel

      $.fn[NAME$2].noConflict = function () {
        $.fn[NAME$2] = JQUERY_NO_CONFLICT
        return Carousel.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3 = 'collapse'
  const DATA_KEY$3 = 'bs.collapse'
  const EVENT_KEY$3 = '.' + DATA_KEY$3
  const DATA_API_KEY$3 = '.data-api'
  const Default$1 = {
    toggle: true,
    parent: ''
  }
  const DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  }
  const EVENT_SHOW = 'show' + EVENT_KEY$3
  const EVENT_SHOWN = 'shown' + EVENT_KEY$3
  const EVENT_HIDE = 'hide' + EVENT_KEY$3
  const EVENT_HIDDEN = 'hidden' + EVENT_KEY$3
  const EVENT_CLICK_DATA_API$3 = 'click' + EVENT_KEY$3 + DATA_API_KEY$3
  const CLASS_NAME_SHOW = 'show'
  const CLASS_NAME_COLLAPSE = 'collapse'
  const CLASS_NAME_COLLAPSING = 'collapsing'
  const CLASS_NAME_COLLAPSED = 'collapsed'
  const WIDTH = 'width'
  const HEIGHT = 'height'
  const SELECTOR_ACTIVES = '.show, .collapsing'
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="collapse"]'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Collapse = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Collapse, _BaseComponent)

    function Collapse (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._isTransitioning = false
      _this._config = _this._getConfig(config)
      _this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + '[href="#' + element.id + '"],' + (SELECTOR_DATA_TOGGLE$1 + '[data-bs-target="#' + element.id + '"]'))
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1)

      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i]
        const selector = getSelectorFromElement(elem)
        const filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === element
        })

        if (selector !== null && filterElement.length) {
          _this._selector = selector

          _this._triggerArray.push(elem)
        }
      }

      _this._parent = _this._config.parent ? _this._getParent() : null

      if (!_this._config.parent) {
        _this._addAriaAndCollapsedClass(_this._element, _this._triggerArray)
      }

      if (_this._config.toggle) {
        _this.toggle()
      }

      return _this
    } // Getters

    const _proto = Collapse.prototype

    // Public
    _proto.toggle = function toggle () {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this.hide()
      } else {
        this.show()
      }
    }

    _proto.show = function show () {
      const _this2 = this

      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      let actives
      let activesData

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this2._config.parent === 'string') {
            return elem.getAttribute('data-bs-parent') === _this2._config.parent
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE)
        })

        if (actives.length === 0) {
          actives = null
        }
      }

      const container = SelectorEngine.findOne(this._selector)

      if (actives) {
        const tempActiveData = actives.find(function (elem) {
          return container !== elem
        })
        activesData = tempActiveData ? Data.getData(tempActiveData, DATA_KEY$3) : null

        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW)

      if (startEvent.defaultPrevented) {
        return
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide')
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$3, null)
          }
        })
      }

      const dimension = this._getDimension()

      this._element.classList.remove(CLASS_NAME_COLLAPSE)

      this._element.classList.add(CLASS_NAME_COLLAPSING)

      this._element.style[dimension] = 0

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED)
          element.setAttribute('aria-expanded', true)
        })
      }

      this.setTransitioning(true)

      const complete = function complete () {
        _this2._element.classList.remove(CLASS_NAME_COLLAPSING)

        _this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW)

        _this2._element.style[dimension] = ''

        _this2.setTransitioning(false)

        EventHandler.trigger(_this2._element, EVENT_SHOWN)
      }

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1)
      const scrollSize = 'scroll' + capitalizedDimension
      const transitionDuration = getTransitionDurationFromElement(this._element)
      EventHandler.one(this._element, TRANSITION_END, complete)
      emulateTransitionEnd(this._element, transitionDuration)
      this._element.style[dimension] = this._element[scrollSize] + 'px'
    }

    _proto.hide = function hide () {
      const _this3 = this

      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE)

      if (startEvent.defaultPrevented) {
        return
      }

      const dimension = this._getDimension()

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px'
      reflow(this._element)

      this._element.classList.add(CLASS_NAME_COLLAPSING)

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW)

      const triggerArrayLength = this._triggerArray.length

      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i]
          const elem = getElementFromSelector(trigger)

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED)
            trigger.setAttribute('aria-expanded', false)
          }
        }
      }

      this.setTransitioning(true)

      const complete = function complete () {
        _this3.setTransitioning(false)

        _this3._element.classList.remove(CLASS_NAME_COLLAPSING)

        _this3._element.classList.add(CLASS_NAME_COLLAPSE)

        EventHandler.trigger(_this3._element, EVENT_HIDDEN)
      }

      this._element.style[dimension] = ''
      const transitionDuration = getTransitionDurationFromElement(this._element)
      EventHandler.one(this._element, TRANSITION_END, complete)
      emulateTransitionEnd(this._element, transitionDuration)
    }

    _proto.setTransitioning = function setTransitioning (isTransitioning) {
      this._isTransitioning = isTransitioning
    }

    _proto.dispose = function dispose () {
      _BaseComponent.prototype.dispose.call(this)

      this._config = null
      this._parent = null
      this._triggerArray = null
      this._isTransitioning = null
    } // Private

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, Default$1, config)
      config.toggle = Boolean(config.toggle) // Coerce string values

      typeCheckConfig(NAME$3, config, DefaultType$1)
      return config
    }

    _proto._getDimension = function _getDimension () {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT
    }

    _proto._getParent = function _getParent () {
      const _this4 = this

      let parent = this._config.parent

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0]
        }
      } else {
        parent = SelectorEngine.findOne(parent)
      }

      const selector = SELECTOR_DATA_TOGGLE$1 + '[data-bs-parent="' + parent + '"]'
      SelectorEngine.find(selector, parent).forEach(function (element) {
        const selected = getElementFromSelector(element)

        _this4._addAriaAndCollapsedClass(selected, [element])
      })
      return parent
    }

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass (element, triggerArray) {
      if (!element || !triggerArray.length) {
        return
      }

      const isOpen = element.classList.contains(CLASS_NAME_SHOW)
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED)
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED)
        }

        elem.setAttribute('aria-expanded', isOpen)
      })
    } // Static

    Collapse.collapseInterface = function collapseInterface (element, config) {
      let data = Data.getData(element, DATA_KEY$3)

      const _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), typeof config === 'object' && config ? config : {})

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false
      }

      if (!data) {
        data = new Collapse(element, _config)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"')
        }

        data[config]()
      }
    }

    Collapse.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config)
      })
    }

    _createClass(Collapse, null, [{
      key: 'Default',
      get: function get () {
        return Default$1
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$3
      }
    }])

    return Collapse
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
      event.preventDefault()
    }

    const triggerData = Manipulator.getDataAttributes(this)
    const selector = getSelectorFromElement(this)
    const selectorElements = SelectorEngine.find(selector)
    selectorElements.forEach(function (element) {
      const data = Data.getData(element, DATA_KEY$3)
      let config

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent
          data._parent = data._getParent()
        }

        config = 'toggle'
      } else {
        config = triggerData
      }

      Collapse.collapseInterface(element, config)
    })
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$3]
      $.fn[NAME$3] = Collapse.jQueryInterface
      $.fn[NAME$3].Constructor = Collapse

      $.fn[NAME$3].noConflict = function () {
        $.fn[NAME$3] = JQUERY_NO_CONFLICT
        return Collapse.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4 = 'dropdown'
  const DATA_KEY$4 = 'bs.dropdown'
  const EVENT_KEY$4 = '.' + DATA_KEY$4
  const DATA_API_KEY$4 = '.data-api'
  const ESCAPE_KEY = 'Escape'
  const SPACE_KEY = 'Space'
  const TAB_KEY = 'Tab'
  const ARROW_UP_KEY = 'ArrowUp'
  const ARROW_DOWN_KEY = 'ArrowDown'
  const RIGHT_MOUSE_BUTTON = 2 // MouseEvent.button value for the secondary button, usually the right button

  const REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + '|' + ARROW_DOWN_KEY + '|' + ESCAPE_KEY)
  const EVENT_HIDE$1 = 'hide' + EVENT_KEY$4
  const EVENT_HIDDEN$1 = 'hidden' + EVENT_KEY$4
  const EVENT_SHOW$1 = 'show' + EVENT_KEY$4
  const EVENT_SHOWN$1 = 'shown' + EVENT_KEY$4
  const EVENT_CLICK = 'click' + EVENT_KEY$4
  const EVENT_CLICK_DATA_API$4 = 'click' + EVENT_KEY$4 + DATA_API_KEY$4
  const EVENT_KEYDOWN_DATA_API = 'keydown' + EVENT_KEY$4 + DATA_API_KEY$4
  const EVENT_KEYUP_DATA_API = 'keyup' + EVENT_KEY$4 + DATA_API_KEY$4
  const CLASS_NAME_DISABLED = 'disabled'
  const CLASS_NAME_SHOW$1 = 'show'
  const CLASS_NAME_DROPUP = 'dropup'
  const CLASS_NAME_DROPEND = 'dropend'
  const CLASS_NAME_DROPSTART = 'dropstart'
  const CLASS_NAME_NAVBAR = 'navbar'
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="dropdown"]'
  const SELECTOR_FORM_CHILD = '.dropdown form'
  const SELECTOR_MENU = '.dropdown-menu'
  const SELECTOR_NAVBAR_NAV = '.navbar-nav'
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  const PLACEMENT_TOP = isRTL ? 'top-end' : 'top-start'
  const PLACEMENT_TOPEND = isRTL ? 'top-start' : 'top-end'
  const PLACEMENT_BOTTOM = isRTL ? 'bottom-end' : 'bottom-start'
  const PLACEMENT_BOTTOMEND = isRTL ? 'bottom-start' : 'bottom-end'
  const PLACEMENT_RIGHT = isRTL ? 'left-start' : 'right-start'
  const PLACEMENT_LEFT = isRTL ? 'right-start' : 'left-start'
  const Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  }
  const DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  }
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Dropdown = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Dropdown, _BaseComponent)

    function Dropdown (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._popper = null
      _this._config = _this._getConfig(config)
      _this._menu = _this._getMenuElement()
      _this._inNavbar = _this._detectNavbar()

      _this._addEventListeners()

      return _this
    } // Getters

    const _proto = Dropdown.prototype

    // Public
    _proto.toggle = function toggle () {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return
      }

      const isActive = this._element.classList.contains(CLASS_NAME_SHOW$1)

      Dropdown.clearMenus()

      if (isActive) {
        return
      }

      this.show()
    }

    _proto.show = function show () {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element)
      const relatedTarget = {
        relatedTarget: this._element
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget)

      if (showEvent.defaultPrevented) {
        return
      } // Totally disable Popper for Dropdowns in Navbar

      if (!this._inNavbar) {
        if (typeof Popper__namespace === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)')
        }

        let referenceElement = this._element

        if (this._config.reference === 'parent') {
          referenceElement = parent
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0]
          }
        }

        this._popper = Popper.createPopper(referenceElement, this._menu, this._getPopperConfig())
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        let _ref;

        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop())
        })
      }

      this._element.focus()

      this._element.setAttribute('aria-expanded', true)

      this._menu.classList.toggle(CLASS_NAME_SHOW$1)

      this._element.classList.toggle(CLASS_NAME_SHOW$1)

      EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget)
    }

    _proto.hide = function hide () {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this._element)
      const relatedTarget = {
        relatedTarget: this._element
      }
      const hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget)

      if (hideEvent.defaultPrevented) {
        return
      }

      if (this._popper) {
        this._popper.destroy()
      }

      this._menu.classList.toggle(CLASS_NAME_SHOW$1)

      this._element.classList.toggle(CLASS_NAME_SHOW$1)

      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget)
    }

    _proto.dispose = function dispose () {
      _BaseComponent.prototype.dispose.call(this)

      EventHandler.off(this._element, EVENT_KEY$4)
      this._menu = null

      if (this._popper) {
        this._popper.destroy()

        this._popper = null
      }
    }

    _proto.update = function update () {
      this._inNavbar = this._detectNavbar()

      if (this._popper) {
        this._popper.update()
      }
    } // Private

    _proto._addEventListeners = function _addEventListeners () {
      const _this2 = this

      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault()
        event.stopPropagation()

        _this2.toggle()
      })
    }

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config)
      typeCheckConfig(NAME$4, config, this.constructor.DefaultType)
      return config
    }

    _proto._getMenuElement = function _getMenuElement () {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0]
    }

    _proto._getPlacement = function _getPlacement () {
      const parentDropdown = this._element.parentNode

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT
      } // We need to trim the value because custom properties can also include spaces

      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end'

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM
    }

    _proto._detectNavbar = function _detectNavbar () {
      return this._element.closest('.' + CLASS_NAME_NAVBAR) !== null
    }

    _proto._getPopperConfig = function _getPopperConfig () {
      const popperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            altBoundary: this._config.flip,
            rootBoundary: this._config.boundary
          }
        }]
      } // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }]
      }

      return _extends({}, popperConfig, this._config.popperConfig)
    } // Static

    Dropdown.dropdownInterface = function dropdownInterface (element, config) {
      let data = Data.getData(element, DATA_KEY$4)

      const _config = typeof config === 'object' ? config : null

      if (!data) {
        data = new Dropdown(element, _config)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"')
        }

        data[config]()
      }
    }

    Dropdown.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config)
      })
    }

    Dropdown.clearMenus = function clearMenus (event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return
      }

      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2)

      for (let i = 0, len = toggles.length; i < len; i++) {
        const parent = Dropdown.getParentFromElement(toggles[i])
        const context = Data.getData(toggles[i], DATA_KEY$4)
        const relatedTarget = {
          relatedTarget: toggles[i]
        }

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event
        }

        if (!context) {
          continue
        }

        const dropdownMenu = context._menu

        if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
          continue
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
          continue
        }

        const hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget)

        if (hideEvent.defaultPrevented) {
          continue
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          var _ref2;

          (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop())
          })
        }

        toggles[i].setAttribute('aria-expanded', 'false')

        if (context._popper) {
          context._popper.destroy()
        }

        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1)
        toggles[i].classList.remove(CLASS_NAME_SHOW$1)
        EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget)
      }
    }

    Dropdown.getParentFromElement = function getParentFromElement (element) {
      return getElementFromSelector(element) || element.parentNode
    }

    Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler (event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
        return
      }

      const parent = Dropdown.getParentFromElement(this)
      const isActive = this.classList.contains(CLASS_NAME_SHOW$1)

      if (event.key === ESCAPE_KEY) {
        const button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0]
        button.focus()
        Dropdown.clearMenus()
        return
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus()
        return
      }

      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible)

      if (!items.length) {
        return
      }

      let index = items.indexOf(event.target) // Up

      if (event.key === ARROW_UP_KEY && index > 0) {
        index--
      } // Down

      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
        index++
      } // index is -1 if the first keydown is an ArrowUp

      index = index === -1 ? 0 : index
      items[index].focus()
    }

    _createClass(Dropdown, null, [{
      key: 'Default',
      get: function get () {
        return Default$2
      }
    }, {
      key: 'DefaultType',
      get: function get () {
        return DefaultType$2
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$4
      }
    }])

    return Dropdown
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler)
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler)
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus)
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus)
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault()
    event.stopPropagation()
    Dropdown.dropdownInterface(this, 'toggle')
  })
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    return e.stopPropagation()
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$4]
      $.fn[NAME$4] = Dropdown.jQueryInterface
      $.fn[NAME$4].Constructor = Dropdown

      $.fn[NAME$4].noConflict = function () {
        $.fn[NAME$4] = JQUERY_NO_CONFLICT
        return Dropdown.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$5 = 'modal'
  const DATA_KEY$5 = 'bs.modal'
  const EVENT_KEY$5 = '.' + DATA_KEY$5
  const DATA_API_KEY$5 = '.data-api'
  const ESCAPE_KEY$1 = 'Escape'
  const Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true
  }
  const DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  }
  const EVENT_HIDE$2 = 'hide' + EVENT_KEY$5
  const EVENT_HIDE_PREVENTED = 'hidePrevented' + EVENT_KEY$5
  const EVENT_HIDDEN$2 = 'hidden' + EVENT_KEY$5
  const EVENT_SHOW$2 = 'show' + EVENT_KEY$5
  const EVENT_SHOWN$2 = 'shown' + EVENT_KEY$5
  const EVENT_FOCUSIN = 'focusin' + EVENT_KEY$5
  const EVENT_RESIZE = 'resize' + EVENT_KEY$5
  const EVENT_CLICK_DISMISS = 'click.dismiss' + EVENT_KEY$5
  const EVENT_KEYDOWN_DISMISS = 'keydown.dismiss' + EVENT_KEY$5
  const EVENT_MOUSEUP_DISMISS = 'mouseup.dismiss' + EVENT_KEY$5
  const EVENT_MOUSEDOWN_DISMISS = 'mousedown.dismiss' + EVENT_KEY$5
  const EVENT_CLICK_DATA_API$5 = 'click' + EVENT_KEY$5 + DATA_API_KEY$5
  const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure'
  const CLASS_NAME_BACKDROP = 'modal-backdrop'
  const CLASS_NAME_OPEN = 'modal-open'
  const CLASS_NAME_FADE = 'fade'
  const CLASS_NAME_SHOW$2 = 'show'
  const CLASS_NAME_STATIC = 'modal-static'
  const SELECTOR_DIALOG = '.modal-dialog'
  const SELECTOR_MODAL_BODY = '.modal-body'
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="modal"]'
  const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="modal"]'
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  const SELECTOR_STICKY_CONTENT = '.sticky-top'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Modal = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Modal, _BaseComponent)

    function Modal (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._config = _this._getConfig(config)
      _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element)
      _this._backdrop = null
      _this._isShown = false
      _this._isBodyOverflowing = false
      _this._ignoreBackdropClick = false
      _this._isTransitioning = false
      _this._scrollbarWidth = 0
      return _this
    } // Getters

    const _proto = Modal.prototype

    // Public
    _proto.toggle = function toggle (relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget)
    }

    _proto.show = function show (relatedTarget) {
      const _this2 = this

      if (this._isShown || this._isTransitioning) {
        return
      }

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        this._isTransitioning = true
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      })

      if (this._isShown || showEvent.defaultPrevented) {
        return
      }

      this._isShown = true

      this._checkScrollbar()

      this._setScrollbar()

      this._adjustDialog()

      this._setEscapeEvent()

      this._setResizeEvent()

      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this2.hide(event)
      })
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this2._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this2._element) {
            _this2._ignoreBackdropClick = true
          }
        })
      })

      this._showBackdrop(function () {
        return _this2._showElement(relatedTarget)
      })
    }

    _proto.hide = function hide (event) {
      const _this3 = this

      if (event) {
        event.preventDefault()
      }

      if (!this._isShown || this._isTransitioning) {
        return
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2)

      if (hideEvent.defaultPrevented) {
        return
      }

      this._isShown = false

      const transition = this._element.classList.contains(CLASS_NAME_FADE)

      if (transition) {
        this._isTransitioning = true
      }

      this._setEscapeEvent()

      this._setResizeEvent()

      EventHandler.off(document, EVENT_FOCUSIN)

      this._element.classList.remove(CLASS_NAME_SHOW$2)

      EventHandler.off(this._element, EVENT_CLICK_DISMISS)
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS)

      if (transition) {
        const transitionDuration = getTransitionDurationFromElement(this._element)
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this3._hideModal(event)
        })
        emulateTransitionEnd(this._element, transitionDuration)
      } else {
        this._hideModal()
      }
    }

    _proto.dispose = function dispose () {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$5)
      })

      _BaseComponent.prototype.dispose.call(this)
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      EventHandler.off(document, EVENT_FOCUSIN)
      this._config = null
      this._dialog = null
      this._backdrop = null
      this._isShown = null
      this._isBodyOverflowing = null
      this._ignoreBackdropClick = null
      this._isTransitioning = null
      this._scrollbarWidth = null
    }

    _proto.handleUpdate = function handleUpdate () {
      this._adjustDialog()
    } // Private

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, Default$3, config)
      typeCheckConfig(NAME$5, config, DefaultType$3)
      return config
    }

    _proto._showElement = function _showElement (relatedTarget) {
      const _this4 = this

      const transition = this._element.classList.contains(CLASS_NAME_FADE)

      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog)

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element)
      }

      this._element.style.display = 'block'

      this._element.removeAttribute('aria-hidden')

      this._element.setAttribute('aria-modal', true)

      this._element.setAttribute('role', 'dialog')

      this._element.scrollTop = 0

      if (modalBody) {
        modalBody.scrollTop = 0
      }

      if (transition) {
        reflow(this._element)
      }

      this._element.classList.add(CLASS_NAME_SHOW$2)

      if (this._config.focus) {
        this._enforceFocus()
      }

      const transitionComplete = function transitionComplete () {
        if (_this4._config.focus) {
          _this4._element.focus()
        }

        _this4._isTransitioning = false
        EventHandler.trigger(_this4._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        })
      }

      if (transition) {
        const transitionDuration = getTransitionDurationFromElement(this._dialog)
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete)
        emulateTransitionEnd(this._dialog, transitionDuration)
      } else {
        transitionComplete()
      }
    }

    _proto._enforceFocus = function _enforceFocus () {
      const _this5 = this

      EventHandler.off(document, EVENT_FOCUSIN) // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && !_this5._element.contains(event.target)) {
          _this5._element.focus()
        }
      })
    }

    _proto._setEscapeEvent = function _setEscapeEvent () {
      const _this6 = this

      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault()

            _this6.hide()
          } else if (!_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this6._triggerBackdropTransition()
          }
        })
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS)
      }
    }

    _proto._setResizeEvent = function _setResizeEvent () {
      const _this7 = this

      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this7._adjustDialog()
        })
      } else {
        EventHandler.off(window, EVENT_RESIZE)
      }
    }

    _proto._hideModal = function _hideModal () {
      const _this8 = this

      this._element.style.display = 'none'

      this._element.setAttribute('aria-hidden', true)

      this._element.removeAttribute('aria-modal')

      this._element.removeAttribute('role')

      this._isTransitioning = false

      this._showBackdrop(function () {
        document.body.classList.remove(CLASS_NAME_OPEN)

        _this8._resetAdjustments()

        _this8._resetScrollbar()

        EventHandler.trigger(_this8._element, EVENT_HIDDEN$2)
      })
    }

    _proto._removeBackdrop = function _removeBackdrop () {
      this._backdrop.parentNode.removeChild(this._backdrop)

      this._backdrop = null
    }

    _proto._showBackdrop = function _showBackdrop (callback) {
      const _this9 = this

      const animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : ''

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div')
        this._backdrop.className = CLASS_NAME_BACKDROP

        if (animate) {
          this._backdrop.classList.add(animate)
        }

        document.body.appendChild(this._backdrop)
        EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false
            return
          }

          if (event.target !== event.currentTarget) {
            return
          }

          if (_this9._config.backdrop === 'static') {
            _this9._triggerBackdropTransition()
          } else {
            _this9.hide()
          }
        })

        if (animate) {
          reflow(this._backdrop)
        }

        this._backdrop.classList.add(CLASS_NAME_SHOW$2)

        if (!animate) {
          callback()
          return
        }

        const backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop)
        EventHandler.one(this._backdrop, TRANSITION_END, callback)
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration)
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(CLASS_NAME_SHOW$2)

        const callbackRemove = function callbackRemove () {
          _this9._removeBackdrop()

          callback()
        }

        if (this._element.classList.contains(CLASS_NAME_FADE)) {
          const _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop)

          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove)
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration)
        } else {
          callbackRemove()
        }
      } else {
        callback()
      }
    }

    _proto._triggerBackdropTransition = function _triggerBackdropTransition () {
      const _this10 = this

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)

      if (hideEvent.defaultPrevented) {
        return
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden'
      }

      this._element.classList.add(CLASS_NAME_STATIC)

      const modalTransitionDuration = getTransitionDurationFromElement(this._dialog)
      EventHandler.off(this._element, TRANSITION_END)
      EventHandler.one(this._element, TRANSITION_END, function () {
        _this10._element.classList.remove(CLASS_NAME_STATIC)

        if (!isModalOverflowing) {
          EventHandler.one(_this10._element, TRANSITION_END, function () {
            _this10._element.style.overflowY = ''
          })
          emulateTransitionEnd(_this10._element, modalTransitionDuration)
        }
      })
      emulateTransitionEnd(this._element, modalTransitionDuration)

      this._element.focus()
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------

    _proto._adjustDialog = function _adjustDialog () {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight

      if (!this._isBodyOverflowing && isModalOverflowing && !isRTL || this._isBodyOverflowing && !isModalOverflowing && isRTL) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px'
      }

      if (this._isBodyOverflowing && !isModalOverflowing && !isRTL || !this._isBodyOverflowing && isModalOverflowing && isRTL) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px'
      }
    }

    _proto._resetAdjustments = function _resetAdjustments () {
      this._element.style.paddingLeft = ''
      this._element.style.paddingRight = ''
    }

    _proto._checkScrollbar = function _checkScrollbar () {
      const rect = document.body.getBoundingClientRect()
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth
      this._scrollbarWidth = this._getScrollbarWidth()
    }

    _proto._setScrollbar = function _setScrollbar () {
      const _this11 = this

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
          const actualPadding = element.style.paddingRight
          const calculatedPadding = window.getComputedStyle(element)['padding-right']
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding)
          element.style.paddingRight = Number.parseFloat(calculatedPadding) + _this11._scrollbarWidth + 'px'
        }) // Adjust sticky content margin

        SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
          const actualMargin = element.style.marginRight
          const calculatedMargin = window.getComputedStyle(element)['margin-right']
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin)
          element.style.marginRight = Number.parseFloat(calculatedMargin) - _this11._scrollbarWidth + 'px'
        }) // Adjust body padding

        const actualPadding = document.body.style.paddingRight
        const calculatedPadding = window.getComputedStyle(document.body)['padding-right']
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding)
        document.body.style.paddingRight = Number.parseFloat(calculatedPadding) + this._scrollbarWidth + 'px'
      }

      document.body.classList.add(CLASS_NAME_OPEN)
    }

    _proto._resetScrollbar = function _resetScrollbar () {
      // Restore fixed content padding
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
        const padding = Manipulator.getDataAttribute(element, 'padding-right')

        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right')
          element.style.paddingRight = padding
        }
      }) // Restore sticky content and navbar-toggler margin

      SelectorEngine.find('' + SELECTOR_STICKY_CONTENT).forEach(function (element) {
        const margin = Manipulator.getDataAttribute(element, 'margin-right')

        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right')
          element.style.marginRight = margin
        }
      }) // Restore body padding

      const padding = Manipulator.getDataAttribute(document.body, 'padding-right')

      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = ''
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right')
        document.body.style.paddingRight = padding
      }
    }

    _proto._getScrollbarWidth = function _getScrollbarWidth () {
      // thx d.walsh
      const scrollDiv = document.createElement('div')
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER
      document.body.appendChild(scrollDiv)
      const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
      return scrollbarWidth
    } // Static

    Modal.jQueryInterface = function jQueryInterface (config, relatedTarget) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$5)

        const _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), typeof config === 'object' && config ? config : {})

        if (!data) {
          data = new Modal(this, _config)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config](relatedTarget)
        }
      })
    }

    _createClass(Modal, null, [{
      key: 'Default',
      get: function get () {
        return Default$3
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$5
      }
    }])

    return Modal
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    const _this12 = this

    const target = getElementFromSelector(this)

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault()
    }

    EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return
      }

      EventHandler.one(target, EVENT_HIDDEN$2, function () {
        if (isVisible(_this12)) {
          _this12.focus()
        }
      })
    })
    let data = Data.getData(target, DATA_KEY$5)

    if (!data) {
      const config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this))

      data = new Modal(target, config)
    }

    data.show(this)
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$5]
      $.fn[NAME$5] = Modal.jQueryInterface
      $.fn[NAME$5].Constructor = Modal

      $.fn[NAME$5].noConflict = function () {
        $.fn[NAME$5] = JQUERY_NO_CONFLICT
        return Modal.jQueryInterface
      }
    }
  })

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'])
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i

  const allowedAttribute = function allowedAttribute (attr, allowedAttributeList) {
    const attrName = attr.nodeName.toLowerCase()

    if (allowedAttributeList.includes(attrName)) {
      if (uriAttrs.has(attrName)) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    const regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp
    }) // Check if a regular expression validates the attribute.

    for (let i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true
      }
    }

    return false
  }

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }
  function sanitizeHtml (unsafeHtml, allowList, sanitizeFn) {
    let _ref

    if (!unsafeHtml.length) {
      return unsafeHtml
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml)
    }

    const domParser = new window.DOMParser()
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')
    const allowlistKeys = Object.keys(allowList)

    const elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'))

    const _loop = function _loop (i, len) {
      let _ref2

      const el = elements[i]
      const elName = el.nodeName.toLowerCase()

      if (!allowlistKeys.includes(elName)) {
        el.parentNode.removeChild(el)
        return 'continue'
      }

      const attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes)

      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || [])
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName)
        }
      })
    }

    for (let i = 0, len = elements.length; i < len; i++) {
      const _ret = _loop(i)

      if (_ret === 'continue') continue
    }

    return createdDocument.body.innerHTML
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$6 = 'tooltip'
  const DATA_KEY$6 = 'bs.tooltip'
  const EVENT_KEY$6 = '.' + DATA_KEY$6
  const CLASS_PREFIX = 'bs-tooltip'
  const BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g')
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn'])
  const DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    container: '(string|element|boolean)',
    fallbackPlacements: '(null|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object)'
  }
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL ? 'right' : 'left'
  }
  const Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    container: false,
    fallbackPlacements: null,
    boundary: 'clippingParents',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  }
  const Event$1 = {
    HIDE: 'hide' + EVENT_KEY$6,
    HIDDEN: 'hidden' + EVENT_KEY$6,
    SHOW: 'show' + EVENT_KEY$6,
    SHOWN: 'shown' + EVENT_KEY$6,
    INSERTED: 'inserted' + EVENT_KEY$6,
    CLICK: 'click' + EVENT_KEY$6,
    FOCUSIN: 'focusin' + EVENT_KEY$6,
    FOCUSOUT: 'focusout' + EVENT_KEY$6,
    MOUSEENTER: 'mouseenter' + EVENT_KEY$6,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY$6
  }
  const CLASS_NAME_FADE$1 = 'fade'
  const CLASS_NAME_MODAL = 'modal'
  const CLASS_NAME_SHOW$3 = 'show'
  const HOVER_STATE_SHOW = 'show'
  const HOVER_STATE_OUT = 'out'
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner'
  const TRIGGER_HOVER = 'hover'
  const TRIGGER_FOCUS = 'focus'
  const TRIGGER_CLICK = 'click'
  const TRIGGER_MANUAL = 'manual'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Tooltip = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Tooltip, _BaseComponent)

    function Tooltip (element, config) {
      let _this

      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
      }

      _this = _BaseComponent.call(this, element) || this // private

      _this._isEnabled = true
      _this._timeout = 0
      _this._hoverState = ''
      _this._activeTrigger = {}
      _this._popper = null // Protected

      _this.config = _this._getConfig(config)
      _this.tip = null

      _this._setListeners()

      return _this
    } // Getters

    const _proto = Tooltip.prototype

    // Public
    _proto.enable = function enable () {
      this._isEnabled = true
    }

    _proto.disable = function disable () {
      this._isEnabled = false
    }

    _proto.toggleEnabled = function toggleEnabled () {
      this._isEnabled = !this._isEnabled
    }

    _proto.toggle = function toggle (event) {
      if (!this._isEnabled) {
        return
      }

      if (event) {
        const dataKey = this.constructor.DATA_KEY
        let context = Data.getData(event.delegateTarget, dataKey)

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig())
          Data.setData(event.delegateTarget, dataKey, context)
        }

        context._activeTrigger.click = !context._activeTrigger.click

        if (context._isWithActiveTrigger()) {
          context._enter(null, context)
        } else {
          context._leave(null, context)
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this)

          return
        }

        this._enter(null, this)
      }
    }

    _proto.dispose = function dispose () {
      clearTimeout(this._timeout)
      EventHandler.off(this._element, this.constructor.EVENT_KEY)
      EventHandler.off(this._element.closest('.' + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler)

      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip)
      }

      this._isEnabled = null
      this._timeout = null
      this._hoverState = null
      this._activeTrigger = null

      if (this._popper) {
        this._popper.destroy()
      }

      this._popper = null
      this.config = null
      this.tip = null

      _BaseComponent.prototype.dispose.call(this)
    }

    _proto.show = function show () {
      const _this2 = this

      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements')
      }

      if (this.isWithContent() && this._isEnabled) {
        const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW)
        const shadowRoot = findShadowRoot(this._element)
        const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element)

        if (showEvent.defaultPrevented || !isInTheDom) {
          return
        }

        const tip = this.getTipElement()
        const tipId = getUID(this.constructor.NAME)
        tip.setAttribute('id', tipId)

        this._element.setAttribute('aria-describedby', tipId)

        this.setContent()

        if (this.config.animation) {
          tip.classList.add(CLASS_NAME_FADE$1)
        }

        const placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement

        const attachment = this._getAttachment(placement)

        this._addAttachmentClass(attachment)

        const container = this._getContainer()

        Data.setData(tip, this.constructor.DATA_KEY, this)

        if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip)
        }

        EventHandler.trigger(this._element, this.constructor.Event.INSERTED)
        this._popper = Popper.createPopper(this._element, tip, this._getPopperConfig(attachment))
        tip.classList.add(CLASS_NAME_SHOW$3)
        const customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass

        if (customClass) {
          let _tip$classList;

          (_tip$classList = tip.classList).add.apply(_tip$classList, customClass.split(' '))
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          let _ref;

          (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop())
          })
        }

        const complete = function complete () {
          const prevHoverState = _this2._hoverState
          _this2._hoverState = null
          EventHandler.trigger(_this2._element, _this2.constructor.Event.SHOWN)

          if (prevHoverState === HOVER_STATE_OUT) {
            _this2._leave(null, _this2)
          }
        }

        if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
          const transitionDuration = getTransitionDurationFromElement(this.tip)
          EventHandler.one(this.tip, TRANSITION_END, complete)
          emulateTransitionEnd(this.tip, transitionDuration)
        } else {
          complete()
        }
      }
    }

    _proto.hide = function hide () {
      const _this3 = this

      if (!this._popper) {
        return
      }

      const tip = this.getTipElement()

      const complete = function complete () {
        if (_this3._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip)
        }

        _this3._cleanTipClass()

        _this3._element.removeAttribute('aria-describedby')

        EventHandler.trigger(_this3._element, _this3.constructor.Event.HIDDEN)

        if (_this3._popper) {
          _this3._popper.destroy()

          _this3._popper = null
        }
      }

      const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE)

      if (hideEvent.defaultPrevented) {
        return
      }

      tip.classList.remove(CLASS_NAME_SHOW$3) // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        let _ref2;

        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop)
        })
      }

      this._activeTrigger[TRIGGER_CLICK] = false
      this._activeTrigger[TRIGGER_FOCUS] = false
      this._activeTrigger[TRIGGER_HOVER] = false

      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        const transitionDuration = getTransitionDurationFromElement(tip)
        EventHandler.one(tip, TRANSITION_END, complete)
        emulateTransitionEnd(tip, transitionDuration)
      } else {
        complete()
      }

      this._hoverState = ''
    }

    _proto.update = function update () {
      if (this._popper !== null) {
        this._popper.update()
      }
    } // Protected

    _proto.isWithContent = function isWithContent () {
      return Boolean(this.getTitle())
    }

    _proto.getTipElement = function getTipElement () {
      if (this.tip) {
        return this.tip
      }

      const element = document.createElement('div')
      element.innerHTML = this.config.template
      this.tip = element.children[0]
      return this.tip
    }

    _proto.setContent = function setContent () {
      const tip = this.getTipElement()
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle())
      tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3)
    }

    _proto.setElementContent = function setElementContent (element, content) {
      if (element === null) {
        return
      }

      if (typeof content === 'object' && isElement(content)) {
        if (content.jquery) {
          content = content[0]
        } // content is a DOM node or a jQuery

        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = ''
            element.appendChild(content)
          }
        } else {
          element.textContent = content.textContent
        }

        return
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn)
        }

        element.innerHTML = content
      } else {
        element.textContent = content
      }
    }

    _proto.getTitle = function getTitle () {
      let title = this._element.getAttribute('data-bs-original-title')

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title
      }

      return title
    }

    _proto.updateAttachment = function updateAttachment (attachment) {
      if (attachment === 'right') {
        return 'end'
      }

      if (attachment === 'left') {
        return 'start'
      }

      return attachment
    } // Private

    _proto._getPopperConfig = function _getPopperConfig (attachment) {
      const _this4 = this

      const flipModifier = {
        name: 'flip',
        options: {
          altBoundary: true
        }
      }

      if (this.config.fallbackPlacements) {
        flipModifier.options.fallbackPlacements = this.config.fallbackPlacements
      }

      const defaultBsConfig = {
        placement: attachment,
        modifiers: [flipModifier, {
          name: 'preventOverflow',
          options: {
            rootBoundary: this.config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: '.' + this.constructor.NAME + '-arrow'
          }
        }, {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: function fn (data) {
            return _this4._handlePopperPlacementChange(data)
          }
        }],
        onFirstUpdate: function onFirstUpdate (data) {
          if (data.options.placement !== data.placement) {
            _this4._handlePopperPlacementChange(data)
          }
        }
      }
      return _extends({}, defaultBsConfig, this.config.popperConfig)
    }

    _proto._addAttachmentClass = function _addAttachmentClass (attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + '-' + this.updateAttachment(attachment))
    }

    _proto._getContainer = function _getContainer () {
      if (this.config.container === false) {
        return document.body
      }

      if (isElement(this.config.container)) {
        return this.config.container
      }

      return SelectorEngine.findOne(this.config.container)
    }

    _proto._getAttachment = function _getAttachment (placement) {
      return AttachmentMap[placement.toUpperCase()]
    }

    _proto._setListeners = function _setListeners () {
      const _this5 = this

      const triggers = this.config.trigger.split(' ')
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this5._element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event)
          })
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN
          const eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT
          EventHandler.on(_this5._element, eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event)
          })
          EventHandler.on(_this5._element, eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event)
          })
        }
      })

      this._hideModalHandler = function () {
        if (_this5._element) {
          _this5.hide()
        }
      }

      EventHandler.on(this._element.closest('.' + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler)

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        })
      } else {
        this._fixTitle()
      }
    }

    _proto._fixTitle = function _fixTitle () {
      const title = this._element.getAttribute('title')

      const originalTitleType = typeof this._element.getAttribute('data-bs-original-title')

      if (title || originalTitleType !== 'string') {
        this._element.setAttribute('data-bs-original-title', title || '')

        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
          this._element.setAttribute('aria-label', title)
        }

        this._element.setAttribute('title', '')
      }
    }

    _proto._enter = function _enter (event, context) {
      const dataKey = this.constructor.DATA_KEY
      context = context || Data.getData(event.delegateTarget, dataKey)

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig())
        Data.setData(event.delegateTarget, dataKey, context)
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW
        return
      }

      clearTimeout(context._timeout)
      context._hoverState = HOVER_STATE_SHOW

      if (!context.config.delay || !context.config.delay.show) {
        context.show()
        return
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show()
        }
      }, context.config.delay.show)
    }

    _proto._leave = function _leave (event, context) {
      const dataKey = this.constructor.DATA_KEY
      context = context || Data.getData(event.delegateTarget, dataKey)

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig())
        Data.setData(event.delegateTarget, dataKey, context)
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false
      }

      if (context._isWithActiveTrigger()) {
        return
      }

      clearTimeout(context._timeout)
      context._hoverState = HOVER_STATE_OUT

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide()
        return
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide()
        }
      }, context.config.delay.hide)
    }

    _proto._isWithActiveTrigger = function _isWithActiveTrigger () {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true
        }
      }

      return false
    }

    _proto._getConfig = function _getConfig (config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element)
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr]
        }
      })

      if (config && typeof config.container === 'object' && config.container.jquery) {
        config.container = config.container[0]
      }

      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {})

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        }
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString()
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString()
      }

      typeCheckConfig(NAME$6, config, this.constructor.DefaultType)

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn)
      }

      return config
    }

    _proto._getDelegateConfig = function _getDelegateConfig () {
      const config = {}

      if (this.config) {
        for (const key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key]
          }
        }
      }

      return config
    }

    _proto._cleanTipClass = function _cleanTipClass () {
      const tip = this.getTipElement()
      const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX)

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim()
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass)
        })
      }
    }

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange (popperData) {
      const state = popperData.state

      if (!state) {
        return
      }

      this.tip = state.elements.popper

      this._cleanTipClass()

      this._addAttachmentClass(this._getAttachment(state.placement))
    } // Static

    Tooltip.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$6)

        const _config = typeof config === 'object' && config

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Tooltip(this, _config)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config]()
        }
      })
    }

    _createClass(Tooltip, null, [{
      key: 'Default',
      get: function get () {
        return Default$4
      }
    }, {
      key: 'NAME',
      get: function get () {
        return NAME$6
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$6
      }
    }, {
      key: 'Event',
      get: function get () {
        return Event$1
      }
    }, {
      key: 'EVENT_KEY',
      get: function get () {
        return EVENT_KEY$6
      }
    }, {
      key: 'DefaultType',
      get: function get () {
        return DefaultType$4
      }
    }])

    return Tooltip
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tooltip to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$6]
      $.fn[NAME$6] = Tooltip.jQueryInterface
      $.fn[NAME$6].Constructor = Tooltip

      $.fn[NAME$6].noConflict = function () {
        $.fn[NAME$6] = JQUERY_NO_CONFLICT
        return Tooltip.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$7 = 'popover'
  const DATA_KEY$7 = 'bs.popover'
  const EVENT_KEY$7 = '.' + DATA_KEY$7
  const CLASS_PREFIX$1 = 'bs-popover'
  const BSCLS_PREFIX_REGEX$1 = new RegExp('(^|\\s)' + CLASS_PREFIX$1 + '\\S+', 'g')

  const Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
  })

  const DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  })

  const Event$2 = {
    HIDE: 'hide' + EVENT_KEY$7,
    HIDDEN: 'hidden' + EVENT_KEY$7,
    SHOW: 'show' + EVENT_KEY$7,
    SHOWN: 'shown' + EVENT_KEY$7,
    INSERTED: 'inserted' + EVENT_KEY$7,
    CLICK: 'click' + EVENT_KEY$7,
    FOCUSIN: 'focusin' + EVENT_KEY$7,
    FOCUSOUT: 'focusout' + EVENT_KEY$7,
    MOUSEENTER: 'mouseenter' + EVENT_KEY$7,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY$7
  }
  const CLASS_NAME_FADE$2 = 'fade'
  const CLASS_NAME_SHOW$4 = 'show'
  const SELECTOR_TITLE = '.popover-header'
  const SELECTOR_CONTENT = '.popover-body'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Popover = /* #__PURE__ */(function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip)

    function Popover () {
      return _Tooltip.apply(this, arguments) || this
    }

    const _proto = Popover.prototype

    // Overrides
    _proto.isWithContent = function isWithContent () {
      return this.getTitle() || this._getContent()
    }

    _proto.setContent = function setContent () {
      const tip = this.getTipElement() // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle())

      let content = this._getContent()

      if (typeof content === 'function') {
        content = content.call(this._element)
      }

      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content)
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4)
    } // Private

    _proto._addAttachmentClass = function _addAttachmentClass (attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + '-' + this.updateAttachment(attachment))
    }

    _proto._getContent = function _getContent () {
      return this._element.getAttribute('data-bs-content') || this.config.content
    }

    _proto._cleanTipClass = function _cleanTipClass () {
      const tip = this.getTipElement()
      const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1)

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim()
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass)
        })
      }
    } // Static

    Popover.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$7)

        const _config = typeof config === 'object' ? config : null

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Popover(this, _config)
          Data.setData(this, DATA_KEY$7, data)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config]()
        }
      })
    }

    _createClass(Popover, null, [{
      key: 'Default',
      // Getters
      get: function get () {
        return Default$5
      }
    }, {
      key: 'NAME',
      get: function get () {
        return NAME$7
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$7
      }
    }, {
      key: 'Event',
      get: function get () {
        return Event$2
      }
    }, {
      key: 'EVENT_KEY',
      get: function get () {
        return EVENT_KEY$7
      }
    }, {
      key: 'DefaultType',
      get: function get () {
        return DefaultType$5
      }
    }])

    return Popover
  }(Tooltip))
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Popover to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$7]
      $.fn[NAME$7] = Popover.jQueryInterface
      $.fn[NAME$7].Constructor = Popover

      $.fn[NAME$7].noConflict = function () {
        $.fn[NAME$7] = JQUERY_NO_CONFLICT
        return Popover.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$8 = 'scrollspy'
  const DATA_KEY$8 = 'bs.scrollspy'
  const EVENT_KEY$8 = '.' + DATA_KEY$8
  const DATA_API_KEY$6 = '.data-api'
  const Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  }
  const DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  }
  const EVENT_ACTIVATE = 'activate' + EVENT_KEY$8
  const EVENT_SCROLL = 'scroll' + EVENT_KEY$8
  const EVENT_LOAD_DATA_API$1 = 'load' + EVENT_KEY$8 + DATA_API_KEY$6
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item'
  const CLASS_NAME_ACTIVE$2 = 'active'
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]'
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group'
  const SELECTOR_NAV_LINKS = '.nav-link'
  const SELECTOR_NAV_ITEMS = '.nav-item'
  const SELECTOR_LIST_ITEMS = '.list-group-item'
  const SELECTOR_DROPDOWN = '.dropdown'
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'
  const METHOD_OFFSET = 'offset'
  const METHOD_POSITION = 'position'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const ScrollSpy = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(ScrollSpy, _BaseComponent)

    function ScrollSpy (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._scrollElement = element.tagName === 'BODY' ? window : element
      _this._config = _this._getConfig(config)
      _this._selector = _this._config.target + ' ' + SELECTOR_NAV_LINKS + ', ' + _this._config.target + ' ' + SELECTOR_LIST_ITEMS + ', ' + _this._config.target + ' .' + CLASS_NAME_DROPDOWN_ITEM
      _this._offsets = []
      _this._targets = []
      _this._activeTarget = null
      _this._scrollHeight = 0
      EventHandler.on(_this._scrollElement, EVENT_SCROLL, function (event) {
        return _this._process(event)
      })

      _this.refresh()

      _this._process()

      return _this
    } // Getters

    const _proto = ScrollSpy.prototype

    // Public
    _proto.refresh = function refresh () {
      const _this2 = this

      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION
      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method
      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0
      this._offsets = []
      this._targets = []
      this._scrollHeight = this._getScrollHeight()
      const targets = SelectorEngine.find(this._selector)
      targets.map(function (element) {
        const targetSelector = getSelectorFromElement(element)
        const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null

        if (target) {
          const targetBCR = target.getBoundingClientRect()

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector]
          }
        }

        return null
      }).filter(function (item) {
        return item
      }).sort(function (a, b) {
        return a[0] - b[0]
      }).forEach(function (item) {
        _this2._offsets.push(item[0])

        _this2._targets.push(item[1])
      })
    }

    _proto.dispose = function dispose () {
      _BaseComponent.prototype.dispose.call(this)

      EventHandler.off(this._scrollElement, EVENT_KEY$8)
      this._scrollElement = null
      this._config = null
      this._selector = null
      this._offsets = null
      this._targets = null
      this._activeTarget = null
      this._scrollHeight = null
    } // Private

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {})

      if (typeof config.target !== 'string' && isElement(config.target)) {
        let id = config.target.id

        if (!id) {
          id = getUID(NAME$8)
          config.target.id = id
        }

        config.target = '#' + id
      }

      typeCheckConfig(NAME$8, config, DefaultType$6)
      return config
    }

    _proto._getScrollTop = function _getScrollTop () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
    }

    _proto._getScrollHeight = function _getScrollHeight () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }

    _proto._getOffsetHeight = function _getOffsetHeight () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
    }

    _proto._process = function _process () {
      const scrollTop = this._getScrollTop() + this._config.offset

      const scrollHeight = this._getScrollHeight()

      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight()

      if (this._scrollHeight !== scrollHeight) {
        this.refresh()
      }

      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1]

        if (this._activeTarget !== target) {
          this._activate(target)
        }

        return
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null

        this._clear()

        return
      }

      for (let i = this._offsets.length; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1])

        if (isActiveTarget) {
          this._activate(this._targets[i])
        }
      }
    }

    _proto._activate = function _activate (target) {
      this._activeTarget = target

      this._clear()

      const queries = this._selector.split(',').map(function (selector) {
        return selector + '[data-bs-target="' + target + '"],' + selector + '[href="' + target + '"]'
      })

      const link = SelectorEngine.findOne(queries.join(','))

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2)
        link.classList.add(CLASS_NAME_ACTIVE$2)
      } else {
        // Set triggered link as active
        link.classList.add(CLASS_NAME_ACTIVE$2)
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ', ' + SELECTOR_LIST_ITEMS).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$2)
          }) // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$2)
            })
          })
        })
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      })
    }

    _proto._clear = function _clear () {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2)
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2)
      })
    } // Static

    ScrollSpy.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$8)

        const _config = typeof config === 'object' && config

        if (!data) {
          data = new ScrollSpy(this, _config)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config]()
        }
      })
    }

    _createClass(ScrollSpy, null, [{
      key: 'Default',
      get: function get () {
        return Default$6
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$8
      }
    }])

    return ScrollSpy
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy))
    })
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$8]
      $.fn[NAME$8] = ScrollSpy.jQueryInterface
      $.fn[NAME$8].Constructor = ScrollSpy

      $.fn[NAME$8].noConflict = function () {
        $.fn[NAME$8] = JQUERY_NO_CONFLICT
        return ScrollSpy.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$9 = 'tab'
  const DATA_KEY$9 = 'bs.tab'
  const EVENT_KEY$9 = '.' + DATA_KEY$9
  const DATA_API_KEY$7 = '.data-api'
  const EVENT_HIDE$3 = 'hide' + EVENT_KEY$9
  const EVENT_HIDDEN$3 = 'hidden' + EVENT_KEY$9
  const EVENT_SHOW$3 = 'show' + EVENT_KEY$9
  const EVENT_SHOWN$3 = 'shown' + EVENT_KEY$9
  const EVENT_CLICK_DATA_API$6 = 'click' + EVENT_KEY$9 + DATA_API_KEY$7
  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu'
  const CLASS_NAME_ACTIVE$3 = 'active'
  const CLASS_NAME_DISABLED$1 = 'disabled'
  const CLASS_NAME_FADE$3 = 'fade'
  const CLASS_NAME_SHOW$5 = 'show'
  const SELECTOR_DROPDOWN$1 = '.dropdown'
  const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group'
  const SELECTOR_ACTIVE$1 = '.active'
  const SELECTOR_ACTIVE_UL = ':scope > li > .active'
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle'
  const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Tab = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Tab, _BaseComponent)

    function Tab () {
      return _BaseComponent.apply(this, arguments) || this
    }

    const _proto = Tab.prototype

    // Public
    _proto.show = function show () {
      const _this = this

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
        return
      }

      let previous
      const target = getElementFromSelector(this._element)

      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1)

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1
        previous = SelectorEngine.find(itemSelector, listElement)
        previous = previous[previous.length - 1]
      }

      let hideEvent = null

      if (previous) {
        hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
          relatedTarget: this._element
        })
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: previous
      })

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return
      }

      this._activate(this._element, listElement)

      const complete = function complete () {
        EventHandler.trigger(previous, EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        })
        EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
          relatedTarget: previous
        })
      }

      if (target) {
        this._activate(target, target.parentNode, complete)
      } else {
        complete()
      }
    } // Private

    _proto._activate = function _activate (element, container, callback) {
      const _this2 = this

      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1)
      const active = activeElements[0]
      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3)

      const complete = function complete () {
        return _this2._transitionComplete(element, active, callback)
      }

      if (active && isTransitioning) {
        const transitionDuration = getTransitionDurationFromElement(active)
        active.classList.remove(CLASS_NAME_SHOW$5)
        EventHandler.one(active, TRANSITION_END, complete)
        emulateTransitionEnd(active, transitionDuration)
      } else {
        complete()
      }
    }

    _proto._transitionComplete = function _transitionComplete (element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE$3)
        const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode)

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3)
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false)
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE$3)

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true)
      }

      reflow(element)

      if (element.classList.contains(CLASS_NAME_FADE$3)) {
        element.classList.add(CLASS_NAME_SHOW$5)
      }

      if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = element.closest(SELECTOR_DROPDOWN$1)

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE$3)
          })
        }

        element.setAttribute('aria-expanded', true)
      }

      if (callback) {
        callback()
      }
    } // Static

    Tab.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        const data = Data.getData(this, DATA_KEY$9) || new Tab(this)

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config]()
        }
      })
    }

    _createClass(Tab, null, [{
      key: 'DATA_KEY',
      // Getters
      get: function get () {
        return DATA_KEY$9
      }
    }])

    return Tab
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault()
    const data = Data.getData(this, DATA_KEY$9) || new Tab(this)
    data.show()
  })
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$9]
      $.fn[NAME$9] = Tab.jQueryInterface
      $.fn[NAME$9].Constructor = Tab

      $.fn[NAME$9].noConflict = function () {
        $.fn[NAME$9] = JQUERY_NO_CONFLICT
        return Tab.jQueryInterface
      }
    }
  })

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$a = 'toast'
  const DATA_KEY$a = 'bs.toast'
  const EVENT_KEY$a = '.' + DATA_KEY$a
  const EVENT_CLICK_DISMISS$1 = 'click.dismiss' + EVENT_KEY$a
  const EVENT_HIDE$4 = 'hide' + EVENT_KEY$a
  const EVENT_HIDDEN$4 = 'hidden' + EVENT_KEY$a
  const EVENT_SHOW$4 = 'show' + EVENT_KEY$a
  const EVENT_SHOWN$4 = 'shown' + EVENT_KEY$a
  const CLASS_NAME_FADE$4 = 'fade'
  const CLASS_NAME_HIDE = 'hide'
  const CLASS_NAME_SHOW$6 = 'show'
  const CLASS_NAME_SHOWING = 'showing'
  const DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  }
  const Default$7 = {
    animation: true,
    autohide: true,
    delay: 5000
  }
  const SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="toast"]'
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  const Toast = /* #__PURE__ */(function (_BaseComponent) {
    _inheritsLoose(Toast, _BaseComponent)

    function Toast (element, config) {
      let _this

      _this = _BaseComponent.call(this, element) || this
      _this._config = _this._getConfig(config)
      _this._timeout = null

      _this._setListeners()

      return _this
    } // Getters

    const _proto = Toast.prototype

    // Public
    _proto.show = function show () {
      const _this2 = this

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4)

      if (showEvent.defaultPrevented) {
        return
      }

      this._clearTimeout()

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$4)
      }

      const complete = function complete () {
        _this2._element.classList.remove(CLASS_NAME_SHOWING)

        _this2._element.classList.add(CLASS_NAME_SHOW$6)

        EventHandler.trigger(_this2._element, EVENT_SHOWN$4)

        if (_this2._config.autohide) {
          _this2._timeout = setTimeout(function () {
            _this2.hide()
          }, _this2._config.delay)
        }
      }

      this._element.classList.remove(CLASS_NAME_HIDE)

      reflow(this._element)

      this._element.classList.add(CLASS_NAME_SHOWING)

      if (this._config.animation) {
        const transitionDuration = getTransitionDurationFromElement(this._element)
        EventHandler.one(this._element, TRANSITION_END, complete)
        emulateTransitionEnd(this._element, transitionDuration)
      } else {
        complete()
      }
    }

    _proto.hide = function hide () {
      const _this3 = this

      if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        return
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4)

      if (hideEvent.defaultPrevented) {
        return
      }

      const complete = function complete () {
        _this3._element.classList.add(CLASS_NAME_HIDE)

        EventHandler.trigger(_this3._element, EVENT_HIDDEN$4)
      }

      this._element.classList.remove(CLASS_NAME_SHOW$6)

      if (this._config.animation) {
        const transitionDuration = getTransitionDurationFromElement(this._element)
        EventHandler.one(this._element, TRANSITION_END, complete)
        emulateTransitionEnd(this._element, transitionDuration)
      } else {
        complete()
      }
    }

    _proto.dispose = function dispose () {
      this._clearTimeout()

      if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        this._element.classList.remove(CLASS_NAME_SHOW$6)
      }

      EventHandler.off(this._element, EVENT_CLICK_DISMISS$1)

      _BaseComponent.prototype.dispose.call(this)

      this._config = null
    } // Private

    _proto._getConfig = function _getConfig (config) {
      config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), typeof config === 'object' && config ? config : {})
      typeCheckConfig(NAME$a, config, this.constructor.DefaultType)
      return config
    }

    _proto._setListeners = function _setListeners () {
      const _this4 = this

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this4.hide()
      })
    }

    _proto._clearTimeout = function _clearTimeout () {
      clearTimeout(this._timeout)
      this._timeout = null
    } // Static

    Toast.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        let data = Data.getData(this, DATA_KEY$a)

        const _config = typeof config === 'object' && config

        if (!data) {
          data = new Toast(this, _config)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError('No method named "' + config + '"')
          }

          data[config](this)
        }
      })
    }

    _createClass(Toast, null, [{
      key: 'DefaultType',
      get: function get () {
        return DefaultType$7
      }
    }, {
      key: 'Default',
      get: function get () {
        return Default$7
      }
    }, {
      key: 'DATA_KEY',
      get: function get () {
        return DATA_KEY$a
      }
    }])

    return Toast
  }(BaseComponent))
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Toast to jQuery only if jQuery is present
   */

  onDOMContentLoaded(function () {
    const $ = getjQuery()
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME$a]
      $.fn[NAME$a] = Toast.jQueryInterface
      $.fn[NAME$a].Constructor = Toast

      $.fn[NAME$a].noConflict = function () {
        $.fn[NAME$a] = JQUERY_NO_CONFLICT
        return Toast.jQueryInterface
      }
    }
  })

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta1): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const index_umd = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  }

  return index_umd
}))
// # sourceMappingURL=bootstrap.js.map
