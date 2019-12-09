module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/uniqid/index.js":
/*!**************************************!*\
  !*** ./node_modules/uniqid/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* 
(The MIT License)
Copyright (c) 2014-2019 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(false){ var i, mac, networkInterfaces; } 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDIConstants = {
    noteOn: 0x90,
    noteOff: 0x80,
    cc: 0xb0,
    tick: 0x08,
    play: 0x0a,
    stop: 0x0c,
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./use-midi */ "./src/use-midi.ts"));
__export(__webpack_require__(/*! ./use-midi-connection-manager */ "./src/use-midi-connection-manager.ts"));
__export(__webpack_require__(/*! ./use-midi-control */ "./src/use-midi-control.ts"));
__export(__webpack_require__(/*! ./use-midi-controls */ "./src/use-midi-controls.ts"));
__export(__webpack_require__(/*! ./use-midi-note */ "./src/use-midi-note.ts"));
__export(__webpack_require__(/*! ./use-midi-notes */ "./src/use-midi-notes.ts"));
__export(__webpack_require__(/*! ./use-midi-message */ "./src/use-midi-message.ts"));
__export(__webpack_require__(/*! ./use-midi-clock */ "./src/use-midi-clock.ts"));
__export(__webpack_require__(/*! ./use-midi-output */ "./src/use-midi-output.ts"));


/***/ }),

/***/ "./src/use-connect-input.ts":
/*!**********************************!*\
  !*** ./src/use-connect-input.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
// By using useConnectInput at the beggining of an input hook, we prevent opening/maintaining connections with unused inputs.
// This may have reprecusions when more than one hook is used for the same input, and one of them unregisters.
exports.useConnectInput = function (input) {
    react_1.useEffect(function () {
        if (!input)
            return;
        if (!input.onmidimessage)
            input.onmidimessage = handleMIDIMessage;
        return function () { return (input.onmidimessage = null); };
    }, [input]);
};
// If listeners were kept in a general .listeners field then 100 functions listening for a noteOn event would get
// called for every clock tick. I imagine this would affect performance. There must be a better way than this as well!
function handleMIDIMessage(message) {
    var action = message.data[0] & 0xf0; // Mask channel/least significant bits;
    var leastSig = message.data[0] & 0x0f; // Mask action bits;
    var channel = leastSig + 1;
    for (var key in this.messageListeners) {
        this.messageListeners[key](message); // (value, control, channel)
    }
    switch (action) {
        case 0xb0: // Control Change Message
            for (var key in this.controlListeners) {
                this.controlListeners[key](message.data[2], message.data[1], channel); // (value, control, channel)
            }
            break;
        case 0x90: // Note On Message
            for (var key in this.noteOnListeners) {
                this.noteOnListeners[key](message.data[1], message.data[2], channel); // (note, velocity, channel)
            }
            break;
        case 0x80: // Note Off Message
            for (var key in this.noteOffListeners) {
                this.noteOffListeners[key](message.data[1], message.data[2], channel); // (note, velocity, channel)
            }
            break;
        case 0xf0: // Transport/Clock Message
            for (var key in this.clockListeners) {
                this.clockListeners[key](leastSig); // (type)
            }
            break;
        default:
            break;
    }
}


/***/ }),

/***/ "./src/use-midi-Note.ts":
/*!******************************!*\
  !*** ./src/use-midi-Note.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var uniqid_1 = __importDefault(__webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js"));
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDINote = function (input, _a) {
    var _b = _a === void 0 ? {} : _a, noteFilter = _b.target, channelFilter = _b.channel;
    use_connect_input_1.useConnectInput(input);
    var _c = react_1.useState(), value = _c[0], setValue = _c[1];
    var handleNoteOnMessage = function (message) {
        var note = message.target, velocity = message.value, channel = message.channel;
        if ((!noteFilter || noteFilter === note) &&
            (!channelFilter || channelFilter === channel)) {
            setValue({ note: note, on: true, velocity: velocity, channel: channel });
        }
    };
    var handleNoteOffMessage = function (message) {
        var note = message.target, velocity = message.value, channel = message.channel;
        if ((!noteFilter || noteFilter === note) &&
            (!channelFilter || channelFilter === channel)) {
            setValue({ note: note, on: false, velocity: velocity, channel: channel });
        }
    };
    react_1.useEffect(function () {
        if (!input)
            return;
        var id = uniqid_1.default();
        input.noteOnListeners[id + "-on"] = handleNoteOnMessage;
        input.noteOffListeners[id + "-off"] = handleNoteOffMessage;
        return function () {
            delete input.noteOnListeners[id + "-on"];
            delete input.noteOffListeners[id + "-off"];
        };
    }, [input]);
    return value;
};


/***/ }),

/***/ "./src/use-midi-clock.ts":
/*!*******************************!*\
  !*** ./src/use-midi-clock.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var uniqid_1 = __importDefault(__webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js"));
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
exports.useMIDIClock = function (input, division) {
    if (division === void 0) { division = 1; }
    use_connect_input_1.useConnectInput(input);
    var _a = react_1.useState(0), step = _a[0], setStep = _a[1];
    var _b = react_1.useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var handleClockMessage = function () {
        // Keep track of count through closure. Is there a better way?
        var steps = 0;
        return function (type) {
            switch (type) {
                case constants_1.MIDIConstants.tick:
                    steps++;
                    if (division === 1)
                        setStep(steps);
                    else if (steps % division === 0)
                        setStep(Math.floor(steps / division));
                    break;
                case constants_1.MIDIConstants.play:
                    setIsPlaying(true);
                    break;
                case constants_1.MIDIConstants.stop:
                    steps = 0;
                    setIsPlaying(false);
                    setStep(0);
                    break;
                default:
                    break;
            }
        };
    };
    react_1.useEffect(function () {
        if (!input)
            return;
        var id = uniqid_1.default();
        input.clockListeners[id] = handleClockMessage();
        return function () { return delete input.clockListeners[id]; };
    }, [input]);
    return [step, isPlaying];
};


/***/ }),

/***/ "./src/use-midi-connection-manager.ts":
/*!********************************************!*\
  !*** ./src/use-midi-connection-manager.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
exports.useMIDIConnectionManager = function (connections) {
    var connectionsAvaliable = connections.length > 0;
    var _a = react_1.useState(''), id = _a[0], setId = _a[1];
    react_1.useEffect(function () {
        var index = connections.findIndex(function (c) { return c.id === id; });
        // I believe setting the id to 0 here would result in an infinite loop if there actually aren't any connections
        if (index < 0)
            setId(connectionsAvaliable ? connections[0].id : '');
    }, [connections, id]);
    var connection = connections.find(function (i) { return i.id === id; });
    return [connection, setId];
};


/***/ }),

/***/ "./src/use-midi-control.ts":
/*!*********************************!*\
  !*** ./src/use-midi-control.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var uniqid_1 = __importDefault(__webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js"));
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDIControl = function (input, _a) {
    var _b = _a === void 0 ? {} : _a, controlFilter = _b.target, channelFilter = _b.channel;
    use_connect_input_1.useConnectInput(input);
    var _c = react_1.useState({
        control: controlFilter,
        value: 0,
        channel: channelFilter,
    }), value = _c[0], setValue = _c[1];
    var handleControlMessage = function (message) {
        var target = message.target, value = message.value, channel = message.channel;
        if ((!controlFilter || controlFilter === target) &&
            (!channelFilter || channelFilter === channel)) {
            setValue({ control: target, value: value, channel: channel });
        }
    };
    react_1.useEffect(function () {
        if (!input)
            return;
        var id = uniqid_1.default();
        input.controlListeners[id] = handleControlMessage;
        return function () { return delete input.controlListeners[id]; };
    }, [input, controlFilter, channelFilter]);
    return value;
};


/***/ }),

/***/ "./src/use-midi-controls.ts":
/*!**********************************!*\
  !*** ./src/use-midi-controls.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var use_midi_control_1 = __webpack_require__(/*! ./use-midi-control */ "./src/use-midi-control.ts");
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDIControls = function (input, controls, filter) {
    if (filter === void 0) { filter = {}; }
    use_connect_input_1.useConnectInput(input);
    var _a = react_1.useState(controls.map(function () { return 0; })), values = _a[0], setValues = _a[1];
    var _b = use_midi_control_1.useMIDIControl(input, filter), control = _b.control, value = _b.value;
    react_1.useEffect(function () {
        if (!input)
            return;
        var targetIndex = controls.indexOf(control);
        if (targetIndex > -1)
            setValues(values.map(function (v, i) { return (i === targetIndex ? value : v); }));
    }, [control, value]);
    return values;
};


/***/ }),

/***/ "./src/use-midi-message.ts":
/*!*********************************!*\
  !*** ./src/use-midi-message.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var uniqid_1 = __importDefault(__webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js"));
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDIMessage = function (input) {
    use_connect_input_1.useConnectInput(input);
    var _a = react_1.useState({}), message = _a[0], setMessage = _a[1];
    var handleMessage = function (message) {
        setMessage(message);
    };
    react_1.useEffect(function () {
        if (!input)
            return;
        var id = uniqid_1.default();
        input.messageListeners[id] = handleMessage;
        return function () { return delete input.messageListeners[id]; };
    }, [input]);
    return message;
};


/***/ }),

/***/ "./src/use-midi-note.ts":
/*!******************************!*\
  !*** ./src/use-midi-note.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var uniqid_1 = __importDefault(__webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js"));
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDINote = function (input, _a) {
    var _b = _a === void 0 ? {} : _a, noteFilter = _b.target, channelFilter = _b.channel;
    use_connect_input_1.useConnectInput(input);
    var _c = react_1.useState(), value = _c[0], setValue = _c[1];
    var handleNoteOnMessage = function (message) {
        var note = message.target, velocity = message.value, channel = message.channel;
        if ((!noteFilter || noteFilter === note) &&
            (!channelFilter || channelFilter === channel)) {
            setValue({ note: note, on: true, velocity: velocity, channel: channel });
        }
    };
    var handleNoteOffMessage = function (message) {
        var note = message.target, velocity = message.value, channel = message.channel;
        if ((!noteFilter || noteFilter === note) &&
            (!channelFilter || channelFilter === channel)) {
            setValue({ note: note, on: false, velocity: velocity, channel: channel });
        }
    };
    react_1.useEffect(function () {
        if (!input)
            return;
        var id = uniqid_1.default();
        input.noteOnListeners[id + "-on"] = handleNoteOnMessage;
        input.noteOffListeners[id + "-off"] = handleNoteOffMessage;
        return function () {
            delete input.noteOnListeners[id + "-on"];
            delete input.noteOffListeners[id + "-off"];
        };
    }, [input]);
    return value;
};


/***/ }),

/***/ "./src/use-midi-notes.ts":
/*!*******************************!*\
  !*** ./src/use-midi-notes.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var use_midi_Note_1 = __webpack_require__(/*! ./use-midi-Note */ "./src/use-midi-Note.ts");
var use_connect_input_1 = __webpack_require__(/*! ./use-connect-input */ "./src/use-connect-input.ts");
exports.useMIDINotes = function (input, filter) {
    if (filter === void 0) { filter = {}; }
    use_connect_input_1.useConnectInput(input);
    var _a = react_1.useState([]), notes = _a[0], setNotes = _a[1];
    var value = use_midi_Note_1.useMIDINote(input, filter);
    react_1.useEffect(function () {
        if (!input)
            return;
        if (value.on)
            setNotes(__spreadArrays(notes, [value]));
        else
            setNotes(notes.filter(function (n) { return n.note !== value.note; })); // Note off, remove note from array (maybe check for channel?)
    }, [input, value]);
    return notes;
};


/***/ }),

/***/ "./src/use-midi-output.ts":
/*!********************************!*\
  !*** ./src/use-midi-output.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
exports.useMIDIOutput = function (output) {
    if (!output)
        return {};
    var noteOn = function (note, velocity, channel) {
        if (velocity === void 0) { velocity = 127; }
        if (channel === void 0) { channel = 1; }
        var noteOnAndChannel = constants_1.MIDIConstants.noteOn | getChannel(channel);
        output.send([noteOnAndChannel, note, velocity]);
    };
    var noteOff = function (note, velocity, channel) {
        if (velocity === void 0) { velocity = 127; }
        if (channel === void 0) { channel = 1; }
        var noteOffAndChannel = constants_1.MIDIConstants.noteOff | getChannel(channel);
        output.send([noteOffAndChannel, note, velocity]);
    };
    var cc = function (value, control, channel) {
        if (control === void 0) { control = 0x14; }
        if (channel === void 0) { channel = 1; }
        var ccAndChannel = constants_1.MIDIConstants.cc | getChannel(channel);
        output.send([ccAndChannel, control, value]);
    };
    return { noteOn: noteOn, noteOff: noteOff, cc: cc };
};
var getChannel = function (channel) {
    if (channel < 1 || channel > 16)
        return 0; //Channel 1
    return channel - 1;
};


/***/ }),

/***/ "./src/use-midi.ts":
/*!*************************!*\
  !*** ./src/use-midi.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "react");
var defaultConnections = { inputs: [], outputs: [] };
exports.useMIDI = function () {
    var _a = react_1.useState(defaultConnections), connections = _a[0], setConnections = _a[1];
    var navigatorExists = typeof navigator !== 'undefined';
    var hasMIDI = Boolean(navigatorExists && navigator && navigator.requestMIDIAccess);
    react_1.useEffect(function () {
        if (hasMIDI) {
            navigator.requestMIDIAccess().then(function (access) {
                setConnections({
                    inputs: enrichInputs(Array.from(access.inputs.values())),
                    outputs: Array.from(access.outputs.values()),
                });
                access.onstatechange = function () {
                    setConnections({
                        inputs: enrichInputs(Array.from(access.inputs.values())),
                        outputs: Array.from(access.outputs.values()),
                    });
                };
            });
        }
    }, []);
    return {
        inputs: connections.inputs,
        outputs: connections.outputs,
        hasMIDI: hasMIDI,
    };
};
// Listeners can be added/deleted from individual inputs.
// This allows an input to have multiple 'onmidimessage' functions instead of setting/resetting one
var enrichInputs = function (inputs) {
    // Remeber that this is only adding properties to the input object, not really returning a new object.
    // This is a side effect that may present bugs/complications down the line.
    return inputs.map(function (input) {
        input.clockListeners = input.clockListeners || {};
        input.noteOnListeners = input.noteOnListeners || {};
        input.noteOffListeners = input.noteOffListeners || {};
        input.controlListeners = input.controlListeners || {};
        input.messageListeners = input.messageListeners || {};
        // input.onmidimessage = handleMIDIMessage; // This adds a listener by default, opening the connection and listening to every input
        return input;
    });
};


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pcWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91c2UtY29ubmVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlLW1pZGktTm90ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlLW1pZGktY2xvY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZS1taWRpLWNvbm5lY3Rpb24tbWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlLW1pZGktY29udHJvbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlLW1pZGktY29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZS1taWRpLW1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZS1taWRpLW5vdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZS1taWRpLW5vdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91c2UtbWlkaS1vdXRwdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZS1taWRpLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtC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Q0FBQztJQUNQLE9BQU87UUFDTCxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07UUFDMUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO1FBQzVCLE9BQU87S0FDUixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYseURBQXlEO0FBQ3pELG1HQUFtRztBQUNuRyxJQUFNLFlBQVksR0FBRyxVQUFDLE1BQWE7SUFDakMsc0dBQXNHO0lBQ3RHLDJFQUEyRTtJQUMzRSxhQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBVTtRQUNwQixLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1FBQ2xELEtBQUssQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDcEQsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDdEQsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDdEQsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDdEQsbUlBQW1JO1FBQ25JLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0FBUkYsQ0FRRSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0REwsa0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyogXG4oVGhlIE1JVCBMaWNlbnNlKVxuQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgSGFsw6FzeiDDgWTDoW0gPG1haWxAYWRhbWhhbGFzei5jb20+XG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vICBVbmlxdWUgSGV4YXRyaWRlY2ltYWwgSUQgR2VuZXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gIERlcGVuZGVuY2llc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52YXIgcGlkID0gcHJvY2VzcyAmJiBwcm9jZXNzLnBpZCA/IHByb2Nlc3MucGlkLnRvU3RyaW5nKDM2KSA6ICcnIDtcbnZhciBhZGRyZXNzID0gJyc7XG5pZih0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyAhPT0gJ2Z1bmN0aW9uJyl7XG4gICAgdmFyIG1hYyA9ICcnLCBuZXR3b3JrSW50ZXJmYWNlcyA9IHJlcXVpcmUoJ29zJykubmV0d29ya0ludGVyZmFjZXMoKTtcbiAgICBmb3IobGV0IGludGVyZmFjZV9rZXkgaW4gbmV0d29ya0ludGVyZmFjZXMpe1xuICAgICAgICBjb25zdCBuZXR3b3JrSW50ZXJmYWNlID0gbmV0d29ya0ludGVyZmFjZXNbaW50ZXJmYWNlX2tleV07XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5ldHdvcmtJbnRlcmZhY2UubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYobmV0d29ya0ludGVyZmFjZVtpXS5tYWMgJiYgbmV0d29ya0ludGVyZmFjZVtpXS5tYWMgIT0gJzAwOjAwOjAwOjAwOjAwOjAwJyl7XG4gICAgICAgICAgICAgICAgbWFjID0gbmV0d29ya0ludGVyZmFjZVtpXS5tYWM7IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFkZHJlc3MgPSBtYWMgPyBwYXJzZUludChtYWMucmVwbGFjZSgvXFw6fFxcRCsvZ2ksICcnKSkudG9TdHJpbmcoMzYpIDogJycgO1xufSBcblxuLy8gIEV4cG9ydHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIGFkZHJlc3MgKyBwaWQgKyBub3coKS50b1N0cmluZygzNikgKyAoc3VmZml4ID8gc3VmZml4IDogJycpOyB9XG5tb2R1bGUuZXhwb3J0cy5wcm9jZXNzID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIHBpZCArIG5vdygpLnRvU3RyaW5nKDM2KSArIChzdWZmaXggPyBzdWZmaXggOiAnJyk7IH1cbm1vZHVsZS5leHBvcnRzLnRpbWUgICAgPSBmdW5jdGlvbihwcmVmaXgsIHN1ZmZpeCl7IHJldHVybiAocHJlZml4ID8gcHJlZml4IDogJycpICsgbm93KCkudG9TdHJpbmcoMzYpICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKTsgfVxuXG4vLyAgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBub3coKXtcbiAgICB2YXIgdGltZSA9IERhdGUubm93KCk7XG4gICAgdmFyIGxhc3QgPSBub3cubGFzdCB8fCB0aW1lO1xuICAgIHJldHVybiBub3cubGFzdCA9IHRpbWUgPiBsYXN0ID8gdGltZSA6IGxhc3QgKyAxO1xufVxuIiwiZXhwb3J0IGNvbnN0IE1JRElDb25zdGFudHMgPSB7XG4gIG5vdGVPbjogMHg5MCxcbiAgbm90ZU9mZjogMHg4MCxcbiAgY2M6IDB4YjAsXG4gIHRpY2s6IDB4MDgsXG4gIHBsYXk6IDB4MGEsXG4gIHN0b3A6IDB4MGMsXG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi91c2UtbWlkaSc7XG5leHBvcnQgKiBmcm9tICcuL3VzZS1taWRpLWNvbm5lY3Rpb24tbWFuYWdlcic7XG5leHBvcnQgKiBmcm9tICcuL3VzZS1taWRpLWNvbnRyb2wnO1xuZXhwb3J0ICogZnJvbSAnLi91c2UtbWlkaS1jb250cm9scyc7XG5leHBvcnQgKiBmcm9tICcuL3VzZS1taWRpLW5vdGUnO1xuZXhwb3J0ICogZnJvbSAnLi91c2UtbWlkaS1ub3Rlcyc7XG5leHBvcnQgKiBmcm9tICcuL3VzZS1taWRpLW1lc3NhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi91c2UtbWlkaS1jbG9jayc7XG5leHBvcnQgKiBmcm9tICcuL3VzZS1taWRpLW91dHB1dCc7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiIsImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IElucHV0LCBNSURJTWVzc2FnZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBCeSB1c2luZyB1c2VDb25uZWN0SW5wdXQgYXQgdGhlIGJlZ2dpbmluZyBvZiBhbiBpbnB1dCBob29rLCB3ZSBwcmV2ZW50IG9wZW5pbmcvbWFpbnRhaW5pbmcgY29ubmVjdGlvbnMgd2l0aCB1bnVzZWQgaW5wdXRzLlxuLy8gVGhpcyBtYXkgaGF2ZSByZXByZWN1c2lvbnMgd2hlbiBtb3JlIHRoYW4gb25lIGhvb2sgaXMgdXNlZCBmb3IgdGhlIHNhbWUgaW5wdXQsIGFuZCBvbmUgb2YgdGhlbSB1bnJlZ2lzdGVycy5cbmV4cG9ydCBjb25zdCB1c2VDb25uZWN0SW5wdXQgPSAoaW5wdXQ6IElucHV0KSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGlmICghaW5wdXQub25taWRpbWVzc2FnZSkgaW5wdXQub25taWRpbWVzc2FnZSA9IGhhbmRsZU1JRElNZXNzYWdlO1xuICAgIHJldHVybiAoKSA9PiAoaW5wdXQub25taWRpbWVzc2FnZSA9IG51bGwpO1xuICB9LCBbaW5wdXRdKTtcbn07XG5cbi8vIElmIGxpc3RlbmVycyB3ZXJlIGtlcHQgaW4gYSBnZW5lcmFsIC5saXN0ZW5lcnMgZmllbGQgdGhlbiAxMDAgZnVuY3Rpb25zIGxpc3RlbmluZyBmb3IgYSBub3RlT24gZXZlbnQgd291bGQgZ2V0XG4vLyBjYWxsZWQgZm9yIGV2ZXJ5IGNsb2NrIHRpY2suIEkgaW1hZ2luZSB0aGlzIHdvdWxkIGFmZmVjdCBwZXJmb3JtYW5jZS4gVGhlcmUgbXVzdCBiZSBhIGJldHRlciB3YXkgdGhhbiB0aGlzIGFzIHdlbGwhXG5mdW5jdGlvbiBoYW5kbGVNSURJTWVzc2FnZShtZXNzYWdlOiBNSURJTWVzc2FnZSkge1xuICBjb25zdCBhY3Rpb24gPSBtZXNzYWdlLmRhdGFbMF0gJiAweGYwOyAvLyBNYXNrIGNoYW5uZWwvbGVhc3Qgc2lnbmlmaWNhbnQgYml0cztcbiAgY29uc3QgbGVhc3RTaWcgPSBtZXNzYWdlLmRhdGFbMF0gJiAweDBmOyAvLyBNYXNrIGFjdGlvbiBiaXRzO1xuICBjb25zdCBjaGFubmVsID0gbGVhc3RTaWcgKyAxO1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1lc3NhZ2VMaXN0ZW5lcnMpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ZW5lcnNba2V5XShtZXNzYWdlKTsgLy8gKHZhbHVlLCBjb250cm9sLCBjaGFubmVsKVxuICB9XG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSAweGIwOiAvLyBDb250cm9sIENoYW5nZSBNZXNzYWdlXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRyb2xMaXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5jb250cm9sTGlzdGVuZXJzW2tleV0obWVzc2FnZS5kYXRhWzJdLCBtZXNzYWdlLmRhdGFbMV0sIGNoYW5uZWwpOyAvLyAodmFsdWUsIGNvbnRyb2wsIGNoYW5uZWwpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDB4OTA6IC8vIE5vdGUgT24gTWVzc2FnZVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5ub3RlT25MaXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5ub3RlT25MaXN0ZW5lcnNba2V5XShtZXNzYWdlLmRhdGFbMV0sIG1lc3NhZ2UuZGF0YVsyXSwgY2hhbm5lbCk7IC8vIChub3RlLCB2ZWxvY2l0eSwgY2hhbm5lbClcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMHg4MDogLy8gTm90ZSBPZmYgTWVzc2FnZVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5ub3RlT2ZmTGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMubm90ZU9mZkxpc3RlbmVyc1trZXldKG1lc3NhZ2UuZGF0YVsxXSwgbWVzc2FnZS5kYXRhWzJdLCBjaGFubmVsKTsgLy8gKG5vdGUsIHZlbG9jaXR5LCBjaGFubmVsKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAweGYwOiAvLyBUcmFuc3BvcnQvQ2xvY2sgTWVzc2FnZVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jbG9ja0xpc3RlbmVycykge1xuICAgICAgICB0aGlzLmNsb2NrTGlzdGVuZXJzW2tleV0obGVhc3RTaWcpOyAvLyAodHlwZSlcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCB7IElucHV0LCBNZXNzYWdlLCBNSURJRmlsdGVyLCBNSURJTm90ZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgdXNlQ29ubmVjdElucHV0IH0gZnJvbSAnLi91c2UtY29ubmVjdC1pbnB1dCc7XG5cbmV4cG9ydCBjb25zdCB1c2VNSURJTm90ZSA9IChcbiAgaW5wdXQ6IElucHV0LFxuICB7IHRhcmdldDogbm90ZUZpbHRlciwgY2hhbm5lbDogY2hhbm5lbEZpbHRlciB9OiBNSURJRmlsdGVyID0ge31cbikgPT4ge1xuICB1c2VDb25uZWN0SW5wdXQoaW5wdXQpO1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlPE1JRElOb3RlPigpO1xuICBjb25zdCBoYW5kbGVOb3RlT25NZXNzYWdlID0gKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldDogbm90ZSwgdmFsdWU6IHZlbG9jaXR5LCBjaGFubmVsIH0gPSBtZXNzYWdlO1xuICAgIGlmIChcbiAgICAgICghbm90ZUZpbHRlciB8fCBub3RlRmlsdGVyID09PSBub3RlKSAmJlxuICAgICAgKCFjaGFubmVsRmlsdGVyIHx8IGNoYW5uZWxGaWx0ZXIgPT09IGNoYW5uZWwpXG4gICAgKSB7XG4gICAgICBzZXRWYWx1ZSh7IG5vdGUsIG9uOiB0cnVlLCB2ZWxvY2l0eSwgY2hhbm5lbCB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGhhbmRsZU5vdGVPZmZNZXNzYWdlID0gKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldDogbm90ZSwgdmFsdWU6IHZlbG9jaXR5LCBjaGFubmVsIH0gPSBtZXNzYWdlO1xuICAgIGlmIChcbiAgICAgICghbm90ZUZpbHRlciB8fCBub3RlRmlsdGVyID09PSBub3RlKSAmJlxuICAgICAgKCFjaGFubmVsRmlsdGVyIHx8IGNoYW5uZWxGaWx0ZXIgPT09IGNoYW5uZWwpXG4gICAgKSB7XG4gICAgICBzZXRWYWx1ZSh7IG5vdGUsIG9uOiBmYWxzZSwgdmVsb2NpdHksIGNoYW5uZWwgfSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gdW5pcWlkKCk7XG4gICAgaW5wdXQubm90ZU9uTGlzdGVuZXJzW2Ake2lkfS1vbmBdID0gaGFuZGxlTm90ZU9uTWVzc2FnZTtcbiAgICBpbnB1dC5ub3RlT2ZmTGlzdGVuZXJzW2Ake2lkfS1vZmZgXSA9IGhhbmRsZU5vdGVPZmZNZXNzYWdlO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkZWxldGUgaW5wdXQubm90ZU9uTGlzdGVuZXJzW2Ake2lkfS1vbmBdO1xuICAgICAgZGVsZXRlIGlucHV0Lm5vdGVPZmZMaXN0ZW5lcnNbYCR7aWR9LW9mZmBdO1xuICAgIH07XG4gIH0sIFtpbnB1dF0pO1xuICByZXR1cm4gdmFsdWU7XG59O1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyB1c2VDb25uZWN0SW5wdXQgfSBmcm9tICcuL3VzZS1jb25uZWN0LWlucHV0JztcbmltcG9ydCB7IE1JRElDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCB1c2VNSURJQ2xvY2sgPSAoaW5wdXQ6IElucHV0LCBkaXZpc2lvbiA9IDEpID0+IHtcbiAgdXNlQ29ubmVjdElucHV0KGlucHV0KTtcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpc1BsYXlpbmcsIHNldElzUGxheWluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsb2NrTWVzc2FnZSA9ICgpID0+IHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIGNvdW50IHRocm91Z2ggY2xvc3VyZS4gSXMgdGhlcmUgYSBiZXR0ZXIgd2F5P1xuICAgIGxldCBzdGVwcyA9IDA7XG4gICAgcmV0dXJuICh0eXBlOiBudW1iZXIpID0+IHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIE1JRElDb25zdGFudHMudGljazpcbiAgICAgICAgICBzdGVwcysrO1xuICAgICAgICAgIGlmIChkaXZpc2lvbiA9PT0gMSkgc2V0U3RlcChzdGVwcyk7XG4gICAgICAgICAgZWxzZSBpZiAoc3RlcHMgJSBkaXZpc2lvbiA9PT0gMClcbiAgICAgICAgICAgIHNldFN0ZXAoTWF0aC5mbG9vcihzdGVwcyAvIGRpdmlzaW9uKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTUlESUNvbnN0YW50cy5wbGF5OlxuICAgICAgICAgIHNldElzUGxheWluZyh0cnVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNSURJQ29uc3RhbnRzLnN0b3A6XG4gICAgICAgICAgc3RlcHMgPSAwO1xuICAgICAgICAgIHNldElzUGxheWluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0U3RlcCgwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gdW5pcWlkKCk7XG4gICAgaW5wdXQuY2xvY2tMaXN0ZW5lcnNbaWRdID0gaGFuZGxlQ2xvY2tNZXNzYWdlKCk7XG4gICAgcmV0dXJuICgpID0+IGRlbGV0ZSBpbnB1dC5jbG9ja0xpc3RlbmVyc1tpZF07XG4gIH0sIFtpbnB1dF0pO1xuICByZXR1cm4gW3N0ZXAsIGlzUGxheWluZ107XG59O1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IHVzZU1JRElDb25uZWN0aW9uTWFuYWdlciA9IChjb25uZWN0aW9uczogQ29ubmVjdGlvbltdKSA9PiB7XG4gIGNvbnN0IGNvbm5lY3Rpb25zQXZhbGlhYmxlID0gY29ubmVjdGlvbnMubGVuZ3RoID4gMDtcbiAgY29uc3QgW2lkLCBzZXRJZF0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGNvbm5lY3Rpb25zLmZpbmRJbmRleCgoYykgPT4gYy5pZCA9PT0gaWQpO1xuICAgIC8vIEkgYmVsaWV2ZSBzZXR0aW5nIHRoZSBpZCB0byAwIGhlcmUgd291bGQgcmVzdWx0IGluIGFuIGluZmluaXRlIGxvb3AgaWYgdGhlcmUgYWN0dWFsbHkgYXJlbid0IGFueSBjb25uZWN0aW9uc1xuICAgIGlmIChpbmRleCA8IDApIHNldElkKGNvbm5lY3Rpb25zQXZhbGlhYmxlID8gY29ubmVjdGlvbnNbMF0uaWQgOiAnJyk7XG4gIH0sIFtjb25uZWN0aW9ucywgaWRdKTtcbiAgY29uc3QgY29ubmVjdGlvbiA9IGNvbm5lY3Rpb25zLmZpbmQoKGkpID0+IGkuaWQgPT09IGlkKTtcbiAgcmV0dXJuIFtjb25uZWN0aW9uLCBzZXRJZF07XG59O1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCB7IElucHV0LCBNZXNzYWdlLCBNSURJRmlsdGVyIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyB1c2VDb25uZWN0SW5wdXQgfSBmcm9tICcuL3VzZS1jb25uZWN0LWlucHV0JztcblxuZXhwb3J0IGNvbnN0IHVzZU1JRElDb250cm9sID0gKFxuICBpbnB1dDogSW5wdXQsXG4gIHsgdGFyZ2V0OiBjb250cm9sRmlsdGVyLCBjaGFubmVsOiBjaGFubmVsRmlsdGVyIH06IE1JRElGaWx0ZXIgPSB7fVxuKSA9PiB7XG4gIHVzZUNvbm5lY3RJbnB1dChpbnB1dCk7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoe1xuICAgIGNvbnRyb2w6IGNvbnRyb2xGaWx0ZXIsXG4gICAgdmFsdWU6IDAsXG4gICAgY2hhbm5lbDogY2hhbm5lbEZpbHRlcixcbiAgfSk7XG4gIGNvbnN0IGhhbmRsZUNvbnRyb2xNZXNzYWdlID0gKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldCwgdmFsdWUsIGNoYW5uZWwgfSA9IG1lc3NhZ2U7XG4gICAgaWYgKFxuICAgICAgKCFjb250cm9sRmlsdGVyIHx8IGNvbnRyb2xGaWx0ZXIgPT09IHRhcmdldCkgJiZcbiAgICAgICghY2hhbm5lbEZpbHRlciB8fCBjaGFubmVsRmlsdGVyID09PSBjaGFubmVsKVxuICAgICkge1xuICAgICAgc2V0VmFsdWUoeyBjb250cm9sOiB0YXJnZXQsIHZhbHVlLCBjaGFubmVsIH0pO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaW5wdXQpIHJldHVybjtcbiAgICBjb25zdCBpZCA9IHVuaXFpZCgpO1xuICAgIGlucHV0LmNvbnRyb2xMaXN0ZW5lcnNbaWRdID0gaGFuZGxlQ29udHJvbE1lc3NhZ2U7XG4gICAgcmV0dXJuICgpID0+IGRlbGV0ZSBpbnB1dC5jb250cm9sTGlzdGVuZXJzW2lkXTtcbiAgfSwgW2lucHV0LCBjb250cm9sRmlsdGVyLCBjaGFubmVsRmlsdGVyXSk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSW5wdXQsIE1JRElGaWx0ZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHVzZU1JRElDb250cm9sIH0gZnJvbSAnLi91c2UtbWlkaS1jb250cm9sJztcbmltcG9ydCB7IHVzZUNvbm5lY3RJbnB1dCB9IGZyb20gJy4vdXNlLWNvbm5lY3QtaW5wdXQnO1xuXG5leHBvcnQgY29uc3QgdXNlTUlESUNvbnRyb2xzID0gKFxuICBpbnB1dDogSW5wdXQsXG4gIGNvbnRyb2xzOiBudW1iZXJbXSxcbiAgZmlsdGVyOiBNSURJRmlsdGVyID0ge31cbikgPT4ge1xuICB1c2VDb25uZWN0SW5wdXQoaW5wdXQpO1xuICBjb25zdCBbdmFsdWVzLCBzZXRWYWx1ZXNdID0gdXNlU3RhdGU8bnVtYmVyW10+KGNvbnRyb2xzLm1hcCgoKSA9PiAwKSk7XG4gIGNvbnN0IHsgY29udHJvbCwgdmFsdWUgfSA9IHVzZU1JRElDb250cm9sKGlucHV0LCBmaWx0ZXIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gY29udHJvbHMuaW5kZXhPZihjb250cm9sKTtcbiAgICBpZiAodGFyZ2V0SW5kZXggPiAtMSlcbiAgICAgIHNldFZhbHVlcyh2YWx1ZXMubWFwKCh2LCBpKSA9PiAoaSA9PT0gdGFyZ2V0SW5kZXggPyB2YWx1ZSA6IHYpKSk7XG4gIH0sIFtjb250cm9sLCB2YWx1ZV0pO1xuXG4gIHJldHVybiB2YWx1ZXM7XG59O1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCB7IElucHV0LCBNSURJTWVzc2FnZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgdXNlQ29ubmVjdElucHV0IH0gZnJvbSAnLi91c2UtY29ubmVjdC1pbnB1dCc7XG5cbmV4cG9ydCBjb25zdCB1c2VNSURJTWVzc2FnZSA9IChpbnB1dDogSW5wdXQpID0+IHtcbiAgdXNlQ29ubmVjdElucHV0KGlucHV0KTtcblxuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAobWVzc2FnZTogTUlESU1lc3NhZ2UpID0+IHtcbiAgICBzZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gdW5pcWlkKCk7XG4gICAgaW5wdXQubWVzc2FnZUxpc3RlbmVyc1tpZF0gPSBoYW5kbGVNZXNzYWdlO1xuICAgIHJldHVybiAoKSA9PiBkZWxldGUgaW5wdXQubWVzc2FnZUxpc3RlbmVyc1tpZF07XG4gIH0sIFtpbnB1dF0pO1xuXG4gIHJldHVybiBtZXNzYWdlO1xufTtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdW5pcWlkIGZyb20gJ3VuaXFpZCc7XG5pbXBvcnQgeyBJbnB1dCwgTWVzc2FnZSwgTUlESUZpbHRlciwgTUlESU5vdGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHVzZUNvbm5lY3RJbnB1dCB9IGZyb20gJy4vdXNlLWNvbm5lY3QtaW5wdXQnO1xuXG5leHBvcnQgY29uc3QgdXNlTUlESU5vdGUgPSAoXG4gIGlucHV0OiBJbnB1dCxcbiAgeyB0YXJnZXQ6IG5vdGVGaWx0ZXIsIGNoYW5uZWw6IGNoYW5uZWxGaWx0ZXIgfTogTUlESUZpbHRlciA9IHt9XG4pID0+IHtcbiAgdXNlQ29ubmVjdElucHV0KGlucHV0KTtcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZTxNSURJTm90ZT4oKTtcbiAgY29uc3QgaGFuZGxlTm90ZU9uTWVzc2FnZSA9IChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyB0YXJnZXQ6IG5vdGUsIHZhbHVlOiB2ZWxvY2l0eSwgY2hhbm5lbCB9ID0gbWVzc2FnZTtcbiAgICBpZiAoXG4gICAgICAoIW5vdGVGaWx0ZXIgfHwgbm90ZUZpbHRlciA9PT0gbm90ZSkgJiZcbiAgICAgICghY2hhbm5lbEZpbHRlciB8fCBjaGFubmVsRmlsdGVyID09PSBjaGFubmVsKVxuICAgICkge1xuICAgICAgc2V0VmFsdWUoeyBub3RlLCBvbjogdHJ1ZSwgdmVsb2NpdHksIGNoYW5uZWwgfSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBoYW5kbGVOb3RlT2ZmTWVzc2FnZSA9IChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyB0YXJnZXQ6IG5vdGUsIHZhbHVlOiB2ZWxvY2l0eSwgY2hhbm5lbCB9ID0gbWVzc2FnZTtcbiAgICBpZiAoXG4gICAgICAoIW5vdGVGaWx0ZXIgfHwgbm90ZUZpbHRlciA9PT0gbm90ZSkgJiZcbiAgICAgICghY2hhbm5lbEZpbHRlciB8fCBjaGFubmVsRmlsdGVyID09PSBjaGFubmVsKVxuICAgICkge1xuICAgICAgc2V0VmFsdWUoeyBub3RlLCBvbjogZmFsc2UsIHZlbG9jaXR5LCBjaGFubmVsIH0pO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaW5wdXQpIHJldHVybjtcbiAgICBjb25zdCBpZCA9IHVuaXFpZCgpO1xuICAgIGlucHV0Lm5vdGVPbkxpc3RlbmVyc1tgJHtpZH0tb25gXSA9IGhhbmRsZU5vdGVPbk1lc3NhZ2U7XG4gICAgaW5wdXQubm90ZU9mZkxpc3RlbmVyc1tgJHtpZH0tb2ZmYF0gPSBoYW5kbGVOb3RlT2ZmTWVzc2FnZTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGVsZXRlIGlucHV0Lm5vdGVPbkxpc3RlbmVyc1tgJHtpZH0tb25gXTtcbiAgICAgIGRlbGV0ZSBpbnB1dC5ub3RlT2ZmTGlzdGVuZXJzW2Ake2lkfS1vZmZgXTtcbiAgICB9O1xuICB9LCBbaW5wdXRdKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBJbnB1dCwgTUlESUZpbHRlciwgTUlESU5vdGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHVzZU1JRElOb3RlIH0gZnJvbSAnLi91c2UtbWlkaS1Ob3RlJztcbmltcG9ydCB7IHVzZUNvbm5lY3RJbnB1dCB9IGZyb20gJy4vdXNlLWNvbm5lY3QtaW5wdXQnO1xuXG5leHBvcnQgY29uc3QgdXNlTUlESU5vdGVzID0gKGlucHV0OiBJbnB1dCwgZmlsdGVyOiBNSURJRmlsdGVyID0ge30pID0+IHtcbiAgdXNlQ29ubmVjdElucHV0KGlucHV0KTtcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxNSURJTm90ZVtdPihbXSk7XG4gIGNvbnN0IHZhbHVlID0gdXNlTUlESU5vdGUoaW5wdXQsIGZpbHRlcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgIGlmICh2YWx1ZS5vbikgc2V0Tm90ZXMoWy4uLm5vdGVzLCB2YWx1ZV0pO1xuICAgIGVsc2Ugc2V0Tm90ZXMobm90ZXMuZmlsdGVyKChuKSA9PiBuLm5vdGUgIT09IHZhbHVlLm5vdGUpKTsgLy8gTm90ZSBvZmYsIHJlbW92ZSBub3RlIGZyb20gYXJyYXkgKG1heWJlIGNoZWNrIGZvciBjaGFubmVsPylcbiAgfSwgW2lucHV0LCB2YWx1ZV0pO1xuICByZXR1cm4gbm90ZXM7XG59O1xuIiwiLy8gaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBPdXRwdXQsIE1JRElGaWx0ZXIsIE1JRElOb3RlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBNSURJQ29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgdXNlTUlESU91dHB1dCA9IChvdXRwdXQ6IE91dHB1dCkgPT4ge1xuICBpZiAoIW91dHB1dCkgcmV0dXJuIHt9O1xuICBjb25zdCBub3RlT24gPSAobm90ZTogbnVtYmVyLCB2ZWxvY2l0eSA9IDEyNywgY2hhbm5lbCA9IDEpID0+IHtcbiAgICBjb25zdCBub3RlT25BbmRDaGFubmVsID0gTUlESUNvbnN0YW50cy5ub3RlT24gfCBnZXRDaGFubmVsKGNoYW5uZWwpO1xuICAgIG91dHB1dC5zZW5kKFtub3RlT25BbmRDaGFubmVsLCBub3RlLCB2ZWxvY2l0eV0pO1xuICB9O1xuICBjb25zdCBub3RlT2ZmID0gKG5vdGU6IG51bWJlciwgdmVsb2NpdHkgPSAxMjcsIGNoYW5uZWwgPSAxKSA9PiB7XG4gICAgY29uc3Qgbm90ZU9mZkFuZENoYW5uZWwgPSBNSURJQ29uc3RhbnRzLm5vdGVPZmYgfCBnZXRDaGFubmVsKGNoYW5uZWwpO1xuICAgIG91dHB1dC5zZW5kKFtub3RlT2ZmQW5kQ2hhbm5lbCwgbm90ZSwgdmVsb2NpdHldKTtcbiAgfTtcbiAgY29uc3QgY2MgPSAodmFsdWU6IG51bWJlciwgY29udHJvbCA9IDB4MTQsIGNoYW5uZWwgPSAxKSA9PiB7XG4gICAgY29uc3QgY2NBbmRDaGFubmVsID0gTUlESUNvbnN0YW50cy5jYyB8IGdldENoYW5uZWwoY2hhbm5lbCk7XG4gICAgb3V0cHV0LnNlbmQoW2NjQW5kQ2hhbm5lbCwgY29udHJvbCwgdmFsdWVdKTtcbiAgfTtcbiAgcmV0dXJuIHsgbm90ZU9uLCBub3RlT2ZmLCBjYyB9O1xufTtcblxuY29uc3QgZ2V0Q2hhbm5lbCA9IChjaGFubmVsOiBudW1iZXIpID0+IHtcbiAgaWYgKGNoYW5uZWwgPCAxIHx8IGNoYW5uZWwgPiAxNikgcmV0dXJuIDA7IC8vQ2hhbm5lbCAxXG4gIHJldHVybiBjaGFubmVsIC0gMTtcbn07XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSW5wdXQsIE91dHB1dCB9IGZyb20gJy4vdHlwZXMnO1xuXG50eXBlIENvbm5lY3Rpb25zID0ge1xuICBpbnB1dHM6IElucHV0W107XG4gIG91dHB1dHM6IE91dHB1dFtdO1xufTtcblxuY29uc3QgZGVmYXVsdENvbm5lY3Rpb25zOiBDb25uZWN0aW9ucyA9IHsgaW5wdXRzOiBbXSwgb3V0cHV0czogW10gfTtcblxuZXhwb3J0IGNvbnN0IHVzZU1JREkgPSAoKSA9PiB7XG4gIGNvbnN0IFtjb25uZWN0aW9ucywgc2V0Q29ubmVjdGlvbnNdID0gdXNlU3RhdGU8Q29ubmVjdGlvbnM+KFxuICAgIGRlZmF1bHRDb25uZWN0aW9uc1xuICApO1xuICBjb25zdCBuYXZpZ2F0b3JFeGlzdHMgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJztcbiAgY29uc3QgaGFzTUlESSA9IEJvb2xlYW4oXG4gICAgbmF2aWdhdG9yRXhpc3RzICYmIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3NcbiAgKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaGFzTUlESSkge1xuICAgICAgbmF2aWdhdG9yLnJlcXVlc3RNSURJQWNjZXNzKCkudGhlbigoYWNjZXNzOiBhbnkpID0+IHtcbiAgICAgICAgc2V0Q29ubmVjdGlvbnMoe1xuICAgICAgICAgIGlucHV0czogZW5yaWNoSW5wdXRzKEFycmF5LmZyb20oYWNjZXNzLmlucHV0cy52YWx1ZXMoKSkpLFxuICAgICAgICAgIG91dHB1dHM6IEFycmF5LmZyb20oYWNjZXNzLm91dHB1dHMudmFsdWVzKCkpLFxuICAgICAgICB9KTtcbiAgICAgICAgYWNjZXNzLm9uc3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgc2V0Q29ubmVjdGlvbnMoe1xuICAgICAgICAgICAgaW5wdXRzOiBlbnJpY2hJbnB1dHMoQXJyYXkuZnJvbShhY2Nlc3MuaW5wdXRzLnZhbHVlcygpKSksXG4gICAgICAgICAgICBvdXRwdXRzOiBBcnJheS5mcm9tKGFjY2Vzcy5vdXRwdXRzLnZhbHVlcygpKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW10pO1xuICByZXR1cm4ge1xuICAgIGlucHV0czogY29ubmVjdGlvbnMuaW5wdXRzLFxuICAgIG91dHB1dHM6IGNvbm5lY3Rpb25zLm91dHB1dHMsXG4gICAgaGFzTUlESSxcbiAgfTtcbn07XG5cbi8vIExpc3RlbmVycyBjYW4gYmUgYWRkZWQvZGVsZXRlZCBmcm9tIGluZGl2aWR1YWwgaW5wdXRzLlxuLy8gVGhpcyBhbGxvd3MgYW4gaW5wdXQgdG8gaGF2ZSBtdWx0aXBsZSAnb25taWRpbWVzc2FnZScgZnVuY3Rpb25zIGluc3RlYWQgb2Ygc2V0dGluZy9yZXNldHRpbmcgb25lXG5jb25zdCBlbnJpY2hJbnB1dHMgPSAoaW5wdXRzOiBhbnlbXSk6IElucHV0W10gPT5cbiAgLy8gUmVtZWJlciB0aGF0IHRoaXMgaXMgb25seSBhZGRpbmcgcHJvcGVydGllcyB0byB0aGUgaW5wdXQgb2JqZWN0LCBub3QgcmVhbGx5IHJldHVybmluZyBhIG5ldyBvYmplY3QuXG4gIC8vIFRoaXMgaXMgYSBzaWRlIGVmZmVjdCB0aGF0IG1heSBwcmVzZW50IGJ1Z3MvY29tcGxpY2F0aW9ucyBkb3duIHRoZSBsaW5lLlxuICBpbnB1dHMubWFwKChpbnB1dDogYW55KSA9PiB7XG4gICAgaW5wdXQuY2xvY2tMaXN0ZW5lcnMgPSBpbnB1dC5jbG9ja0xpc3RlbmVycyB8fCB7fTtcbiAgICBpbnB1dC5ub3RlT25MaXN0ZW5lcnMgPSBpbnB1dC5ub3RlT25MaXN0ZW5lcnMgfHwge307XG4gICAgaW5wdXQubm90ZU9mZkxpc3RlbmVycyA9IGlucHV0Lm5vdGVPZmZMaXN0ZW5lcnMgfHwge307XG4gICAgaW5wdXQuY29udHJvbExpc3RlbmVycyA9IGlucHV0LmNvbnRyb2xMaXN0ZW5lcnMgfHwge307XG4gICAgaW5wdXQubWVzc2FnZUxpc3RlbmVycyA9IGlucHV0Lm1lc3NhZ2VMaXN0ZW5lcnMgfHwge307XG4gICAgLy8gaW5wdXQub25taWRpbWVzc2FnZSA9IGhhbmRsZU1JRElNZXNzYWdlOyAvLyBUaGlzIGFkZHMgYSBsaXN0ZW5lciBieSBkZWZhdWx0LCBvcGVuaW5nIHRoZSBjb25uZWN0aW9uIGFuZCBsaXN0ZW5pbmcgdG8gZXZlcnkgaW5wdXRcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==