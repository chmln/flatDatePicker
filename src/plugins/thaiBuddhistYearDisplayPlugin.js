//thaiBuddhistYearDisplayPlugin for flatpickr@^4.6.13
//Plugin author: Chaiyaboon Sruayiam
//Plugin author email: chaiyaboon.s@outlook.co.th
//You can add character 'B' or 'b' into 'dateFormat' flatpickr config on initial state to render Buddhist full year, e.g. 2543, 2556, 2563, and etc.
/*
Example #  =>
    let flatpickrInstance = this.flatpickr({
        "dateFormat": "d F B", <-- look at this one. Start with 'd' the day and then 'F' the full month and then 'B' the full Buddhist year.
        "mode": "range",
        "time_24hr": true,
    });
Example # 2 =>
    let flatpickrInstance = this.flatpickr({
        "dateFormat": "d F b", <-- look at this one. Start with 'd' the day and then 'F' the full month and then 'b' the last two digits of Buddhist year.
        "mode": "range",
        "time_24hr": true,
    });
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.thaiBuddhistYearDisplayPlugin = factory());
}(this, (function () {
    'use strict';

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        }
        catch (error) {
            return event.target;
        }
    }

    var defaultConfig = {
        showConsoleFlag: false,
    };
    function thaiBuddhistYearDisplayPlugin(pluginConfig) {
        let config = __assign(__assign({}, defaultConfig), pluginConfig);
        return function (fp) {

            if (fp.config.noCalendar || fp.isMobile)
                return {};

            let doNothing = function () { return undefined; };
            let monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
            let pad = function (number, length) {
                if (length === void 0) { length = 2; }
                return ("000" + number).slice(length * -1);
            };
            let formats = {
                // get the date in UTC
                Z: function (date) { return date.toISOString(); },
                // weekday name, short, e.g. Thu
                D: function (date, locale, options) {
                    return locale.weekdays.shorthand[formats.w(date, locale, options)];
                },
                // full month name e.g. January
                F: function (date, locale, options) {
                    return monthToStr(formats.n(date, locale, options) - 1, false, locale);
                },
                // padded hour 1-12
                G: function (date, locale, options) {
                    return pad(formats.h(date, locale, options));
                },
                // hours with leading zero e.g. 03
                H: function (date) { return pad(date.getHours()); },
                // day (1-30) with ordinal suffix e.g. 1st, 2nd
                J: function (date, locale) {
                    return locale.ordinal !== undefined
                        ? date.getDate() + locale.ordinal(date.getDate())
                        : date.getDate();
                },
                // AM/PM
                K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
                // shorthand month e.g. Jan, Sep, Oct, etc
                M: function (date, locale) {
                    return monthToStr(date.getMonth(), true, locale);
                },
                // seconds 00-59
                S: function (date) { return pad(date.getSeconds()); },
                // unix timestamp
                U: function (date) { return date.getTime() / 1000; },
                W: function (date, _, options) {
                    return options.getWeek(date);
                },
                // full year e.g. 2016, padded (0001-9999)
                Y: function (date) { return pad(date.getFullYear(), 4); },
                // day in month, padded (01-30)
                d: function (date) { return pad(date.getDate()); },
                // hour from 1-12 (am/pm)
                h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
                // minutes, padded with leading zero e.g. 09
                i: function (date) { return pad(date.getMinutes()); },
                // day in month (1-30)
                j: function (date) { return date.getDate(); },
                // weekday name, full, e.g. Thursday
                l: function (date, locale) {
                    return locale.weekdays.longhand[date.getDay()];
                },
                // padded month number (01-12)
                m: function (date) { return pad(date.getMonth() + 1); },
                // the month number (1-12)
                n: function (date) { return date.getMonth() + 1; },
                // seconds 0-59
                s: function (date) { return date.getSeconds(); },
                // Unix Milliseconds
                u: function (date) { return date.getTime(); },
                // number of the day of the week
                w: function (date) { return date.getDay(); },
                // last two digits of year e.g. 16 for 2016
                y: function (date) { return String(date.getFullYear()).substring(2); },
                // full Buddhist year e.g. [2016 + 543 = 2559], padded (0001-9999)
                B: function (date) { return String(date.getFullYear() + 543) },
                // last two digits of Buddhist year e.g. 59 for [2016 + 543 = 2559]
                b: function (date) { return String(date.getFullYear() + 543).substring(2); },
            };

            let createDateParser = function (_a) {
                var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
                return function (date, givenFormat, timeless, customLocale) {
                    if (date !== 0 && !date)
                        return undefined;
                    var locale = customLocale || l10n;
                    var parsedDate;
                    var dateOrig = date;
                    if (date instanceof Date)
                        parsedDate = new Date(date.getTime());
                    else if (typeof date !== "string" &&
                        date.toFixed !== undefined // timestamp
                    )
                        // create a copy
                        parsedDate = new Date(date);
                    else if (typeof date === "string") {
                        // date string
                        var format = givenFormat || (config || defaults).dateFormat;
                        var datestr = String(date).trim();
                        if (datestr === "today") {
                            parsedDate = new Date();
                            timeless = true;
                        }
                        else if (config && config.parseDate) {
                            parsedDate = config.parseDate(date, format);
                        }
                        else if (/Z$/.test(datestr) ||
                            /GMT$/.test(datestr) // datestrings w/ timezone
                        ) {
                            parsedDate = new Date(date);
                        }
                        else {
                            var matched = void 0, ops = [];
                            for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                                var token_1 = format[i];
                                var isBackSlash = token_1 === "\\";
                                var escaped = format[i - 1] === "\\" || isBackSlash;
                                if (tokenRegex[token_1] && !escaped) {
                                    regexStr += tokenRegex[token_1];
                                    var match = new RegExp(regexStr).exec(date);
                                    if (match && (matched = true)) {
                                        ops[token_1 !== "Y" ? "push" : "unshift"]({
                                            fn: revFormat[token_1],
                                            val: match[++matchIndex],
                                        });
                                    }
                                }
                                else if (!isBackSlash)
                                    regexStr += "."; // don't really care
                            }
                            parsedDate =
                                !config || !config.noCalendar
                                    ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                                    : new Date(new Date().setHours(0, 0, 0, 0));
                            ops.forEach(function (_a) {
                                var fn = _a.fn, val = _a.val;
                                return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                            });
                            parsedDate = matched ? parsedDate : undefined;
                        }
                    }
                    /* istanbul ignore next */
                    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                        config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                        return undefined;
                    }
                    if (timeless === true)
                        parsedDate.setHours(0, 0, 0, 0);
                    return parsedDate;
                };
            };

            let createDateFormatter = function (_a) {
                var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
                return function (dateObj, frmt, overrideLocale) {
                    var locale = overrideLocale || l10n;
                    if (config.formatDate !== undefined && !isMobile) {
                        return config.formatDate(dateObj, frmt, locale);
                    }
                    return frmt
                        .split("")
                        .map(function (c, i, arr) {
                            return formats[c] && arr[i - 1] !== "\\"
                                ? formats[c](dateObj, locale, config)
                                : c !== "\\"
                                    ? c
                                    : "";
                        })
                        .join("");
                };
            };

            return __assign({
                onChange: function () {
                    if (config.showConsoleFlag) {
                        console.log("onChange");
                    }

                },
                onClose: function () {
                    if (config.showConsoleFlag) {
                        console.log("onClose");
                    }
                },
                onDayCreate: function () {
                    if (config.showConsoleFlag) {
                        console.log("onDayCreate");
                    }
                    for (let i = 0; i < fp.yearElements.length; i++) {
                        let eachYearElement = fp.yearElements[i];
                        eachYearElement.value = (fp.currentYear + 543).toString();
                    }
                },
                onDestroy: function () {
                    if (config.showConsoleFlag) {
                        console.log("onDestroy");
                    }
                },
                onKeyDown: function () {
                    if (config.showConsoleFlag) {
                        console.log("onKeyDown");
                    }
                },
                onMonthChange: function () {
                    if (config.showConsoleFlag) {
                        console.log("onMonthChange");
                    }
                    for (let i = 0; i < fp.yearElements.length; i++) {
                        let eachYearElement = fp.yearElements[i];
                        eachYearElement.value = (fp.currentYear + 543).toString();
                    }

                    setTimeout(()=>{
                        if (config.showConsoleFlag) {
                            console.log("onMonthChange.setTimeout");
                        }
                        for (let i = 0; i < fp.yearElements.length; i++) {
                            let eachYearElement = fp.yearElements[i];
                            eachYearElement.value = (fp.currentYear + 543).toString();
                        }
                    },1);
                },
                onOpen: function () {
                    if (config.showConsoleFlag) {
                        console.log("onOpen");
                    }
                    for (let i = 0; i < fp.yearElements.length; i++) {
                        let eachYearElement = fp.yearElements[i];
                        eachYearElement.value = (fp.currentYear + 543).toString();
                    }
                },
                onParseConfig: function () {
                    if (config.showConsoleFlag) {
                        console.log("onParseConfig");
                    }
                },
                onReady: function () {
                    if (config.showConsoleFlag) {
                        console.log("onReady");
                    }
                    if (typeof fp.config.locale !== "object" &&
                        typeof flatpickr.l10ns[fp.config.locale] === "undefined")
                        fp.config.errorHandler(new Error("flatpickr: invalid locale " + fp.config.locale));
                    fp.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof fp.config.locale === "object"
                        ? fp.config.locale
                        : fp.config.locale !== "default"
                            ? flatpickr.l10ns[fp.config.locale]
                            : undefined));
                    
                    var userConfig = __assign(__assign({}, pluginConfig), JSON.parse(JSON.stringify(fp.element.dataset || {})));
                    if (userConfig.time_24hr === undefined &&
                        flatpickr.defaultConfig.time_24hr === undefined) {
                        fp.config.time_24hr = fp.l10n.time_24hr;
                    }
                    fp.formatDate = createDateFormatter(fp);
                    fp.parseDate = createDateParser({ config: fp.config, l10n: fp.l10n });

                    fp.calendarContainer.classList.add("buddhist-calendar-flatpickr");

                },
                onValueUpdate: function () {
                    if (config.showConsoleFlag) {
                        console.log("onValueUpdate");
                    }
                    for (let i = 0; i < fp.yearElements.length; i++) {
                        let eachYearElement = fp.yearElements[i];
                        eachYearElement.value = (fp.currentYear + 543).toString();
                    }
                },
                onYearChange: function () {
                    if (config.showConsoleFlag) {
                        console.log("onYearChange");
                    }
                    for (let i = 0; i < fp.yearElements.length; i++) {
                        let eachYearElement = fp.yearElements[i];
                        eachYearElement.value = (fp.currentYear + 543).toString();
                    }
                    
                },
                onPreCalendarPosition: function () {
                    if (config.showConsoleFlag) {
                        console.log("onPreCalendarPosition");
                    }

                },


            });
        };
    }

    return thaiBuddhistYearDisplayPlugin;

})));
