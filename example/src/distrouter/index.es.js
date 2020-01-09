import { useContext, useCallback, createElement, useMemo, useState, useEffect, Children, isValidElement, createContext } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

//Core
//Dumb data
var dumbdata = {
    data: {},
    current: "/",
    processRoute: function (data) { return !data; },
    redirect: function (data) { }
};
var RouterContext = createContext(dumbdata);
//# sourceMappingURL=Router.js.map

//Turn a string guard into a object
function buildGuard(guardstring) {
    var split = guardstring.split(":");
    //No arguments
    if (split.length == 1) {
        return { name: split[0] };
    }
    else {
        var _arguments = split[1].split(",");
        return { name: split[0], arguments: _arguments };
    }
}
//Turn a prop into a guard string
function printGuard(props) {
    var response = [];
    for (var key in props) {
        var prop = props[key];
        //has argument
        if (prop !== true) {
            response.push(key + ":" + prop);
        }
        //without argument
        else {
            response.push(key);
        }
    }
    return response;
}
//# sourceMappingURL=guard.js.map

//Check router authentication and only pass if none is given
function guest(_arguments, data) {
    //No auth given
    if (!("auth" in data.router))
        return true;
    //Check for guest
    return !data.router["auth"];
}
//# sourceMappingURL=guest.js.map

//Check router authentication and only pass if none is given
function logged(_arguments, data) {
    //No auth given
    if (!("auth" in data.router))
        return false;
    //Check for log
    return !!data.router["auth"];
}
//# sourceMappingURL=logged.js.map

//Check route validation
function when(_arguments, data) {
    //No when required
    if (!("when" in data.route))
        return true;
    //Validate
    return !!data.route["when"];
}
//# sourceMappingURL=when.js.map

//Test if the current path passes
function testPath(path, current, exact) {
    if (exact === void 0) { exact = true; }
    //Paths
    var splitpath = path.split("/").filter(function (value) { return value !== ""; });
    var splitcurrent = current.split("/").filter(function (value) { return value !== ""; });
    //Data
    var data = {};
    //Match root
    if (splitpath.length == 0 && splitcurrent.length == 0)
        return data;
    //Exact match force
    if (splitpath.length !== splitcurrent.length && exact)
        return false;
    //Loop all parts
    for (var i = 0; i < splitpath.length; i++) {
        //Is a data compartiment
        if (splitpath[i].match(/\{\S+\}/)) {
            var name = splitpath[i].replace(/\{/, "").replace(/\}/, "");
            data[name] = splitcurrent[i];
        }
        //Equivalent match
        else {
            //Current ends earlier
            if (!splitcurrent[i])
                return false;
            //Part matches
            if (splitpath[i] !== splitcurrent[i])
                return false;
        }
    }
    //Route matches
    return data;
}
// site.com/home/hi
// site.com/home/hi/
// site.com/hi
//# sourceMappingURL=route.js.map

//Helpers
//Check route validation path
function path(_arguments, data) {
    //No path required
    if (!("path" in data.route))
        return true;
    //Is exact match
    var exact = data.route["exact"] ? data.route["exact"] : true;
    //Validate
    return testPath(data.route["path"], data.context["current"], exact);
}
//# sourceMappingURL=path.js.map

//When this route is applied, it will insert the title into the browser
//Be careful to not stack this guard, since one will override another
function title(_arguments, data) {
    var basetitle = data.router["basetitle"];
    var subtitle = data.route["title"];
    //Update page title
    if (basetitle && subtitle)
        document.title = basetitle + " - " + subtitle;
    else if (basetitle)
        document.title = basetitle;
    else
        document.title = subtitle;
    //No need of blocking
    return true;
}
//# sourceMappingURL=title.js.map

//Guard functions
//Bundle of default guards
var bundle = {
    guest: guest,
    logged: logged,
    when: when,
    path: path,
    title: title,
};
//# sourceMappingURL=index.js.map

function Router(_a) {
    //----------------------------
    // Properties
    //----------------------------
    var _b = _a.basepath, basepath = _b === void 0 ? "/" : _b, _c = _a.guards, guards = _c === void 0 ? {} : _c, props = __rest(_a, ["basepath", "guards"]);
    //states
    var _d = useState(window.location.pathname), current = _d[0], setcurrent = _d[1];
    var readyguards = useState(__assign({}, bundle, guards))[0];
    //----------------------------
    // Callbacks
    //----------------------------
    var onProcessRoute = useCallback(function (data) {
        //Remove reserved props
        var to = data.to, guard = data.guard, clearedProps = __rest(data, ["to", "guard"]);
        //Check priority guards
        var prioritydata = onProcessGuard(guard, data);
        if (!prioritydata)
            return false;
        //Check non priority guards
        var nonprioritydata = onProcessGuard(printGuard(clearedProps), data, false);
        if (!nonprioritydata)
            return false;
        //Route matches
        return __assign({}, prioritydata, nonprioritydata);
    }, [current, props]);
    var onProcessGuard = useCallback(function (guards, route, priority) {
        if (priority === void 0) { priority = true; }
        //Props that will be filled to the route by the end of the process
        var data = {};
        //Guard check not necessary
        if (guards === undefined)
            return true;
        //Validate guards
        var _guards = Array.isArray(guards) ? guards : [guards];
        //Loop guards
        for (var i = 0; i < _guards.length; i++) {
            //Build guard
            var guard = buildGuard(_guards[i]);
            //Guard available
            if (guard.name in readyguards) {
                var response = readyguards[guard.name](guard.arguments, { route: route, router: props, context: context });
                //Guard fail
                if (!response)
                    return false;
                //Fill data
                if (typeof response === "object")
                    data = __assign({}, data, response);
            }
            else if (priority) {
                console.warn("Requested guard [" + _guards[i] + "] was not found.");
            }
        }
        //All guards passes
        return data;
    }, [current, props]);
    var onRedirect = useCallback(function (newpath) {
        setcurrent((basepath == "/" ? "" : basepath) + newpath);
    }, [current]);
    var handleHash = useCallback(function (event) {
        event.preventDefault();
        if (window.location.pathname != current) {
            setcurrent(window.location.pathname);
        }
    }, [current]);
    //----------------------------
    // Effects
    //----------------------------
    //Event binding
    useEffect(function () {
        window.addEventListener("popstate", handleHash, false);
        //Unbind
        return function () {
            document.removeEventListener("hashchange", handleHash, false);
        };
    }, []);
    useEffect(function () {
        //Update browser
        if (window.location.pathname != current) {
            window.history.pushState("", window.document.title, current);
        }
    }, [current]);
    //----------------------------
    // Render
    //----------------------------
    var context = {
        current: current,
        processRoute: onProcessRoute,
        processGuard: onProcessGuard,
        redirect: onRedirect,
        data: props,
    };
    return (createElement(RouterContext.Provider, { value: context }, props.children));
}

function Route(_a) {
    //----------------------------
    // Properties
    //----------------------------
    var _b = _a.to, to = _b === void 0 ? function () { return null; } : _b, props = __rest(_a, ["to"]);
    //contexts
    var _c = useContext(RouterContext), processRoute = _c.processRoute, current = _c.current, data = _c.data;
    //----------------------------
    // Memos
    //----------------------------
    var Component = useCallback(function () {
        var response = processRoute(props);
        //Route passes
        if (response && to !== null) {
            return createElement(to, __assign({}, props, response));
        }
        //Route not passes
        return null;
    }, [current, data]);
    //----------------------------
    // Render
    //----------------------------
    return createElement(Component, null);
}
//# sourceMappingURL=Route.js.map

function Route$1(_a) {
    //----------------------------
    // Properties
    //----------------------------
    var props = __rest(_a, []);
    //contexts
    var _b = useContext(RouterContext), redirect = _b.redirect, current = _b.current;
    //----------------------------
    // Callbacks
    //----------------------------
    var onClick = useCallback(function (event) {
        //Prevent page reload
        event.preventDefault();
        //Add extra functionality
        if ("onClick" in props)
            props.onClick(event);
        //Redirect
        redirect(props.to[0] == "/" ? props.to : ("/" + props.to));
    }, [props]);
    //----------------------------
    // Memos
    //----------------------------
    var propclassName = useMemo(function () {
        var activable = props.active;
        var baseclassname = props.className;
        if (!activable)
            return baseclassname ? baseclassname : "";
        if (current === props.to) {
            return (baseclassname ? (baseclassname + " ") : "") + (activable === true ? "active" : activable);
        }
        return (baseclassname ? (baseclassname + " ") : "");
    }, [props, current]);
    //----------------------------
    // Render
    //----------------------------
    var domprop = __rest(props, ["active", "to", "className"]);
    return (createElement("a", __assign({ onClick: onClick, href: "#" }, domprop, { className: propclassName }), props.children));
}
//# sourceMappingURL=Link.js.map

function Switch(_a) {
    //----------------------------
    // Properties
    //----------------------------
    var props = __rest(_a, []);
    //States
    var _b = useState(), ComponentToRender = _b[0], setcomponent = _b[1];
    //Contexts
    var _c = useContext(RouterContext), processRoute = _c.processRoute, current = _c.current, data = _c.data;
    //----------------------------
    // Effects
    //----------------------------
    useEffect(function () {
        var children = Children.toArray(props.children);
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var _a = child.props, to = _a.to, childprops = __rest(_a, ["to"]);
            //Check if child is valid
            if (!isValidElement(child))
                continue;
            //Check if route passes
            var result = processRoute(childprops);
            if (result) {
                var newprops = __assign({}, childprops, result);
                //Is a component
                if (isValidElement(to))
                    return setcomponent(to);
                //Is a literal
                else
                    return setcomponent(createElement(to, newprops));
            }
        }
        //No child selected
        return setcomponent(null);
    }, [current, data]);
    //----------------------------
    // Render
    //----------------------------
    return ComponentToRender ? ComponentToRender : null;
}
//# sourceMappingURL=Switch.js.map

//Modules components
//Separated components
var Router$1 = Router;
var Route$2 = Route;
var Link = Route$1;
var Switch$1 = Switch;
//Contexts
var RouterContext$1 = RouterContext;
//Bundled
var bundled = {
    //Components
    Router: Router,
    Route: Route,
    Link: Route$1,
    Switch: Switch,
    //Contexts
    RouterContext: RouterContext,
};
//# sourceMappingURL=index.js.map

export default bundled;
export { Router$1 as Router, Route$2 as Route, Link, Switch$1 as Switch, RouterContext$1 as RouterContext };
//# sourceMappingURL=index.es.js.map
