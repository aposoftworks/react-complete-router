var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var dumbdata = {
  data: {},
  current: "/",
  basepath: "/",
  processRoute: function processRoute(data) {
    return !data;
  },
  redirect: function redirect(data) {
  }
};
var RouterContext = React.createContext(dumbdata);

function buildGuard(guardstring) {
  var split = guardstring.split(":");

  if (split.length == 1) {
    return {
      name: split[0]
    };
  } else {
    var _arguments = split[1].split(",");

    return {
      name: split[0],
      arguments: _arguments
    };
  }
}
function printGuard(props) {
  var response = [];

  for (var key in props) {
    var prop = props[key];

    if (prop !== true) {
      response.push(key + ":" + prop);
    } else {
        response.push(key);
      }
  }

  return response;
}

function guest(_arguments, data) {
  if (!("auth" in data.router)) return true;
  return !data.router["auth"];
}

function logged(_arguments, data) {
  if (!("auth" in data.router)) return false;
  return !!data.router["auth"];
}

function when(_arguments, data) {
  if (!("when" in data.route)) return true;
  return !!data.route["when"];
}

function testPath(current, path, exact, negate) {
  if (exact === void 0) {
    exact = true;
  }

  if (negate === void 0) {
    negate = false;
  }

  var splitpath = path.split("/").filter(function (value) {
    return value !== "";
  });
  var splitcurrent = current.split("/").filter(function (value) {
    return value !== "";
  });
  var data = {};
  if (splitpath.length == 0 && splitcurrent.length != 0 && exact) return negate;

  for (var i = 0; i < splitpath.length; i++) {
    if (splitpath[i].match(/\{\S+\}/)) {
      var name = splitpath[i].replace(/\{/, "").replace(/\}/, "");
      var optional = name.match(/\?$/);

      if (splitcurrent[i]) {
        data[name] = splitcurrent[i];
      } else if (!optional) {
        return negate;
      }
    } else {
        if (!splitcurrent[i]) return negate;
        if (splitpath[i] !== splitcurrent[i]) return negate;
      }
  }

  if (splitpath.length < splitcurrent.length && exact) return negate;
  return negate ? false : data;
}

function path(_arguments, data) {
  if (!("path" in data.route)) return true;
  var negate = data.route["negate"] ? data.route["negate"] : false;
  var exact = data.route["exact"] ? data.route["exact"] : false;
  var current = "/" + data.context["basepath"].replace(/(^\/|\/$)/, "") + "/" + data.context["current"].replace(/^\//, "");
  return testPath(current, data.route["path"], exact, negate);
}

function title(_arguments, data) {
  var basetitle = data.router["basetitle"];
  var subtitle = data.route["title"];
  var basetitlestring = Array.isArray(basetitle) ? basetitle[0] : basetitle;
  var midtitlestring = Array.isArray(basetitle) ? basetitle[1] : "-";
  if (basetitle && subtitle) document.title = basetitlestring + " " + midtitlestring + " " + subtitle;else if (basetitle) document.title = basetitlestring;else document.title = subtitle;
  return true;
}

function redirect(_arguments, data) {
  data.context["redirect"](data.route["redirect"]);
  return true;
}

var bundle = {
  guest: guest,
  logged: logged,
  when: when,
  path: path,
  title: title,
  redirect: redirect
};

function Router(_ref) {
  var _ref$basepath = _ref.basepath,
      basepath = _ref$basepath === void 0 ? "/" : _ref$basepath,
      _ref$guards = _ref.guards,
      guards = _ref$guards === void 0 ? {} : _ref$guards,
      _ref$sticky = _ref.sticky,
      sticky = _ref$sticky === void 0 ? false : _ref$sticky,
      props = _objectWithoutPropertiesLoose(_ref, ["basepath", "guards", "sticky"]);

  var _React$useState = React.useState(window.location.pathname),
      current = _React$useState[0],
      setcurrent = _React$useState[1];

  var _React$useState2 = React.useState(_extends({}, bundle, guards)),
      readyguards = _React$useState2[0];

  var _React$useState3 = React.useState([]),
      history = _React$useState3[0],
      sethistory = _React$useState3[1];

  var onSetCurrent = React.useCallback(function (newcurrent) {
    var base = basepath.replace(/\/$/, "");
    var target = newcurrent.replace(/(^\/|\/$)/, "");
    if (base == "" && target == "") setcurrent("/");else setcurrent(base + (target === "" ? "" : "/" + target));
  }, [setcurrent]);
  var onProcessMimic = React.useCallback(function (_guard, data) {
    if (data === void 0) {
      data = {};
    }

    var guard = buildGuard(_guard);

    if (guard.name in readyguards) {
      return readyguards[guard.name](guard.arguments, {
        data: data,
        router: props,
        context: context
      });
    }

    return false;
  }, [props, readyguards, current]);
  var onProcessRoute = React.useCallback(function (data) {
    var guard = data.guard,
        clearedProps = _objectWithoutPropertiesLoose(data, ["to", "guard"]);

    var prioritydata = onProcessGuard(guard, data);
    if (!prioritydata) return false;
    var nonprioritydata = onProcessGuard(printGuard(clearedProps), data, false);
    if (!nonprioritydata) return false;
    return _extends({}, prioritydata, nonprioritydata);
  }, [current, props]);
  var onProcessGuard = React.useCallback(function (guards, route, priority) {
    if (priority === void 0) {
      priority = true;
    }

    var data = {};
    if (guards === undefined) return true;

    var _guards = Array.isArray(guards) ? guards : [guards];

    for (var i = 0; i < _guards.length; i++) {
      var guard = buildGuard(_guards[i]);

      if (guard.name in readyguards) {
        var response = readyguards[guard.name](guard.arguments, {
          route: route,
          router: props,
          context: context
        });
        if (!response) return false;
        if (typeof response === "object") data = _extends({}, data, response);
      } else if (priority) {
        console.warn("Requested guard [" + _guards[i] + "] was not found.");
      }
    }

    return data;
  }, [current, props]);
  var handleHash = React.useCallback(function (event) {
    event.preventDefault();
    var path = window.location.pathname.replace(/(^\/|\/$)/, "");

    if ("/" + path != current) {
      onSetCurrent(window.location.pathname);
    }
  }, [current]);
  var onProcessBack = React.useCallback(function () {
    var _history = history;

    var path = _history.pop();

    sethistory(_history);
    onSetCurrent(path || "/");
  }, [current, history]);
  React.useEffect(function () {
    window.addEventListener("popstate", handleHash, false);
    return function () {
      document.removeEventListener("hashchange", handleHash, false);
    };
  }, [current]);
  React.useEffect(function () {
    if ("/" + window.location.pathname.replace(/(^\/|\/$)/, "") != current) {
      if (!sticky) window.history.pushState("", window.document.title, current);
      var _history = history;

      _history.push(current);

      sethistory(_history);
    }
  }, [current]);
  var context = {
    current: current,
    processRoute: onProcessRoute,
    processGuard: onProcessGuard,
    redirect: onSetCurrent,
    data: props,
    mimic: onProcessMimic,
    back: onProcessBack,
    basepath: basepath
  };
  return React.createElement(RouterContext.Provider, {
    value: context
  }, props.children);
}

function Route(_ref) {
  var children = _ref.children,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? function () {
    return null;
  } : _ref$to,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "to"]);

  var _React$useContext = React.useContext(RouterContext),
      processRoute = _React$useContext.processRoute,
      current = _React$useContext.current,
      data = _React$useContext.data;

  var Component = React.useCallback(function () {
    var response = processRoute(props);

    if (response) {
      if (to !== null) {
        return React.createElement(to, _extends({}, props, response));
      }

      if (children !== null) {
        return React.createElement(children, _extends({}, props, response));
      }
    }

    return null;
  }, [current, data]);
  return React.createElement(Component, null);
}

function Link(_ref) {
  var _ref$to = _ref.to,
      to = _ref$to === void 0 ? "/" : _ref$to,
      props = _objectWithoutPropertiesLoose(_ref, ["to"]);

  var _React$useContext = React.useContext(RouterContext),
      redirect = _React$useContext.redirect,
      current = _React$useContext.current;

  var targetMemo = React.useMemo(function () {
    return "/" + to.replace(/(^\/|\/$)/, "");
  }, [to]);
  var propclassName = React.useMemo(function () {
    var activable = props.active;
    var baseclassname = props.className;
    if (!activable) return baseclassname ? baseclassname : "";

    if (current === targetMemo) {
      return (baseclassname ? baseclassname + " " : "") + (activable === true ? "active" : activable);
    }

    return baseclassname ? baseclassname + " " : "";
  }, [props, current, targetMemo]);
  var onClick = React.useCallback(function (event) {
    event.preventDefault();
    if ("onClick" in props) props.onClick(event);
    redirect(targetMemo);
  }, [props, redirect, targetMemo]);

  var domprop = _objectWithoutPropertiesLoose(props, ["active", "className", "exact", "negate", "title"]);

  return React.createElement("a", Object.assign({}, domprop, {
    onClick: onClick,
    href: "#",
    className: propclassName
  }), props.children);
}

function Switch(_ref) {
  var props = _extends({}, _ref);

  var _React$useState = React.useState(),
      ComponentToRender = _React$useState[0],
      setcomponent = _React$useState[1];

  var _React$useContext = React.useContext(RouterContext),
      processRoute = _React$useContext.processRoute,
      current = _React$useContext.current,
      data = _React$useContext.data;

  React.useEffect(function () {
    var compchildren = React.Children.toArray(props.children);
    if (compchildren.length == 0) return setcomponent(null);

    for (var i = 0; i < compchildren.length; i++) {
      var child = compchildren[i];

      var _child$props = child.props,
          to = _child$props.to,
          children = _child$props.children,
          childprops = _objectWithoutPropertiesLoose(_child$props, ["to", "children"]);

      if (!React.isValidElement(child)) continue;
      var result = processRoute(childprops);

      if (result) {
        var renderable = to ? to : children;

        var newprops = _extends({}, childprops, result);

        var restprops = _objectWithoutPropertiesLoose(newprops, ["path", "exact"]);

        if (typeof child.type === "function" && child.type.name == "Route") {
          if (React.isValidElement(renderable)) return setcomponent(React.cloneElement(renderable, _extends({}, renderable.props, restprops)));else return setcomponent(React.createElement(renderable, restprops));
        } else {
          if (React.isValidElement(child)) return setcomponent(React.cloneElement(child, _extends({}, child.props, restprops)));else return setcomponent(React.createElement(child, restprops));
        }
      }
    }

    return setcomponent(null);
  }, [current, data]);
  return ComponentToRender ? ComponentToRender : null;
}

var Router$1 = Router;
var Route$1 = Route;
var Link$1 = Link;
var Switch$1 = Switch;
var RouterContext$1 = RouterContext;
var bundled = {
  Router: Router,
  Route: Route,
  Link: Link,
  Switch: Switch,
  RouterContext: RouterContext
};

exports.Link = Link$1;
exports.Route = Route$1;
exports.Router = Router$1;
exports.RouterContext = RouterContext$1;
exports.Switch = Switch$1;
exports.default = bundled;
//# sourceMappingURL=index.js.map
