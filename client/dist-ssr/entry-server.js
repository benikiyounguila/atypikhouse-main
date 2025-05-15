var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { Component, createContext, useState, useEffect, useContext, useRef } from "react";
import { StaticRouter } from "react-router-dom/server.mjs";
import { renderToString } from "react-dom/server";
import { useLocation, Link, Outlet, Navigate, useParams, Routes, Route } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import jwt_decode from "jwt-decode";
import axios from "axios";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Avatar as Avatar$1, AvatarImage as AvatarImage$1 } from "@radix-ui/react-avatar";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { X, PenSquare, Upload, Loader2, Text, Mail, LogOut, ChevronRight, ChevronLeft, Calendar as Calendar$1 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { differenceInCalendarDays, format, addDays, differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet$1 = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const HelmetModule = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Helmet: Helmet$1,
  HelmetData,
  HelmetProvider
}, Symbol.toStringTag, { value: "Module" }));
const initialState$1 = {
  user: null,
  register: () => {
  },
  login: () => {
  },
  googleLogin: () => {
  },
  logout: () => {
  },
  loading: true
};
const UserContext = createContext(initialState$1);
const UserProvider = ({ children, initialUser = null }) => {
  const auth = useProvideAuth(initialUser);
  return /* @__PURE__ */ jsx(UserContext.Provider, { value: auth, children });
};
const initialState = {
  places: [],
  setPlaces: () => {
  },
  loading: true,
  setLoading: () => {
  }
};
const PlaceContext = createContext(initialState);
const PlaceProvider = ({ children, initialPlaces = [] }) => {
  const places = useProvidePlaces(initialPlaces);
  return /* @__PURE__ */ jsx(PlaceContext.Provider, { value: places, children });
};
const getItemFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};
const setItemsInLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
const removeItemFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
var define_process_env_default = {};
const isServer = typeof window === "undefined";
const axiosInstance = axios.create({
  baseURL: isServer ? define_process_env_default.VITE_BASE_URL || "http://localhost:5000/api" : "http://localhost:5000",
  withCredentials: true
});
console.log("[AXIOS] Base URL:", isServer ? define_process_env_default.VITE_BASE_URL : "http://localhost:5000");
const useAuth = () => {
  return useContext(UserContext);
};
const useProvideAuth = (initialUser = null) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  useEffect(() => {
    if (!initialUser) {
      const storedUser = getItemFromLocalStorage("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [initialUser]);
  const register = async (formData) => {
    const { name, email, password } = formData;
    try {
      const { data } = await axiosInstance.post("user/register", {
        name,
        email,
        password
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage("user", data.user);
        setItemsInLocalStorage("token", data.token);
      }
      return { success: true, message: "Registration successfull" };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  };
  const login = async (formData) => {
    const { email, password } = formData;
    try {
      const { data } = await axiosInstance.post("user/login", {
        email,
        password
      });
      console.log("User data received: ", data.user);
      console.log("Token received: ", data.token);
      if (data.user && data.token) {
        console.log("Is Admin: ", data.user.isAdmin);
        setUser(data.user);
        setItemsInLocalStorage("user", data.user);
        setItemsInLocalStorage("token", data.token);
      }
      return { success: true, message: "Login successfull" };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  };
  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post("user/google/login", {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage("user", data.user);
        setItemsInLocalStorage("token", data.token);
      }
      return { success: true, message: "Login successfull" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  const logout = async () => {
    try {
      const { data } = await axiosInstance.get("/user/logout");
      if (data.success) {
        setUser(null);
        removeItemFromLocalStorage("user");
        removeItemFromLocalStorage("token");
      }
      return { success: true, message: "Logout successfull" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Something went wrong!" };
    }
  };
  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      const { data } = await axiosInstance.post(
        "/user/upload-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (userDetails) => {
    const { name, password, picture } = userDetails;
    const email = JSON.parse(getItemFromLocalStorage("user")).email;
    try {
      const { data } = await axiosInstance.put("/user/update-user", {
        name,
        password,
        email,
        picture
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    uploadPicture,
    updateUser
  };
};
const usePlaces = () => {
  return useContext(PlaceContext);
};
const useProvidePlaces = (initialPlaces = []) => {
  const [places, setPlaces] = useState(initialPlaces);
  const [loading, setLoading] = useState(!initialPlaces.length);
  const getPlaces = async () => {
    const { data } = await axiosInstance.get("/places");
    setPlaces(data.places);
    setLoading(false);
  };
  useEffect(() => {
    if (initialPlaces.length === 0) {
      getPlaces();
    }
  }, [initialPlaces]);
  return {
    places,
    setPlaces,
    loading,
    setLoading
  };
};
const SearchBar = () => {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    if (searchText.trimStart() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get(
            `/places/search/${searchText.trimStart()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-4/6 overflow-hidden rounded-full border border-gray-400 bg-gray-300 shadow-sm hover:shadow-lg md:w-1/2", children: [
    /* @__PURE__ */ jsx("div", { className: "grow", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        placeholder: "Where do you want to go?",
        className: "h-full w-full border-none px-4 py-2 text-sm  focus:outline-none md:text-lg",
        onChange: (e) => handleSearch(e),
        value: searchText
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue flex cursor-pointer  items-center bg-primary text-white", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex rounded-r-full bg-primary px-4 py-2 md:p-2",
        onClick: handleSearch,
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 3,
              stroke: "currentColor",
              className: "mt-1 h-4 w-4",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-1 hidden md:block", children: "Search" })
        ]
      }
    ) })
  ] }) });
};
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return children;
}
const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = auth;
  const menuRef = useRef(null);
  const handleScroll = () => {
    setHasShadow(window.scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setShowSearchBar(location.pathname === "/");
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const menuItems = [
    { to: "/account", text: "Mon Profil", userOnly: true },
    { to: "/register", text: "Inscription", guestOnly: true },
    { to: "/login", text: "Connexion", guestOnly: true },
    { to: "/infos-proprietaires", text: "Infos Propriétaires" },
    { to: "/about", text: "Découvrir l'entreprise" }
  ];
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white py-4 ${hasShadow ? "shadow-md" : ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full max-w-screen-xl mx-auto px-4", children: [
        /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-12 w-24 md:h-16 md:w-32",
            src: "/Logo_AtypikHouse.png",
            alt: "AtypikHouse Logo"
          }
        ) }),
        showSearchBar && /* @__PURE__ */ jsx(SearchBar, {}),
        /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: toggleMenu,
              className: "flex items-center justify-center rounded-full border border-gray-300 p-2",
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    className: "h-6 w-6",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "ml-2 h-[35px] w-[35px] overflow-hidden rounded-full hidden md:block", children: user ? /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx(Avatar$1, { children: /* @__PURE__ */ jsx(
                  AvatarImage$1,
                  {
                    src: user.picture || "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
                    className: "h-full w-full"
                  }
                ) }) }) : /* @__PURE__ */ jsx(
                  "svg",
                  {
                    fill: "#858080",
                    version: "1.1",
                    id: "Layer_1",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    className: "h-full w-full",
                    children: /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" })
                  }
                ) })
              ]
            }
          ),
          showMenu && /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000]", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: menuItems.map(
            (item, index) => (item.userOnly && user || item.guestOnly && !user || !item.userOnly && !item.guestOnly) && /* @__PURE__ */ jsx(
              Link,
              {
                to: item.to,
                className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                children: item.text
              },
              index
            )
          ) }) })
        ] })
      ] })
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex  w-full justify-center bg-gray-100 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-screen-xl flex-col items-center px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid  w-full grid-cols-1 gap-4 py-8 text-sm md:grid-cols-3 ", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "Support" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Help Center" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Get help with a safety issue" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Air cover" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Anti-discrimination" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Disablity support" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Cancellation options" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Report neighbourhood concern" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "Hosting" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AtypikHouse your home" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AirCover for Hosts" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Hosting resources" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Community forum" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Hosting responsibly" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "AtypikHouse" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Newsroom" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "New features" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Careers" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Investors" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AtypikHouse.org emergency stays" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my-4 w-full border-[1px] border-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex text-sm font-semibold", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "1.5",
              stroke: "currentColor",
              className: "mr-2 h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                }
              )
            }
          ),
          "English(ENG) ",
          /* @__PURE__ */ jsx("span", { className: "mx-4", children: "€ EUR" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2 px-1 font-normal text-gray-700 md:w-auto md:flex-row md:items-center md:gap-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "© 2024" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: " flex gap-6 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer text-gray-700 decoration-1 underline-offset-1 hover:underline md:list-disc", children: "Privacy" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Terms" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Sitemap" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/mentions-legales#mentions-legales-title", children: "Legal terms" }) })
        ] }) })
      ] })
    ] })
  ] }) });
};
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isHomePage = location.pathname === "/";
  if (isHomePage) {
    return null;
  }
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Fil d'Ariane", children: /* @__PURE__ */ jsxs("ol", { className: "flex space-x-2", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-blue-600 hover:underline", children: "Accueil" }) }),
    pathnames.map((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      return /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { children: "/" }),
        /* @__PURE__ */ jsx(Link, { to: routeTo, className: "text-blue-600 hover:underline", children: pathname.charAt(0).toUpperCase() + pathname.slice(1) })
      ] }, routeTo);
    })
  ] }) });
};
const { Helmet } = HelmetModule;
const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gérez et Louez des logements insolites - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Suivez vos réservations et commencez votre aventure en toute simplicité avec notre application intuitive pour la gestion de logements insolites."
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "canonical",
          href: `https://votredomaine.com${location.pathname}`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-4 text-gray-600 text-center mt-20 text-sm", children: /* @__PURE__ */ jsx(Breadcrumb, {}) }),
    isHomePage && /* @__PURE__ */ jsx("main", { className: "flex-grow mt-18", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-22", children: [
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-blue-800 md:text-5xl font-bold text-center mt-16 mb-4\n             ",
          children: "Gérez et Louez des logements insolites"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-center mb-8", children: [
        "Suivez vos réservations, inscrivez-vous dès aujourd'hui et commencez votre aventure ",
        /* @__PURE__ */ jsx("br", {}),
        "en toute simplicité avec notre application intuitive !"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center space-x-4 mb-12", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/login",
            className: "btn btn-sm md:btn-md btn-outline btn-accent",
            "aria-label": "Se connecter à votre compte",
            children: "Se connecter"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/register",
            className: "btn btn-sm md:btn-md btn-accent",
            "aria-label": "Créer un nouveau compte",
            children: "S'inscrire"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Spinner = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
};
const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  const altText = `View of ${title} in ${address}`;
  return /* @__PURE__ */ jsx(Link, { to: `/place/${placeId}`, className: "m-2 flex flex-col md:m-1 xl:m-0", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
    (photos == null ? void 0 : photos[0]) && /* @__PURE__ */ jsx(
      "img",
      {
        src: `${photos[0]}`,
        alt: altText,
        title: altText,
        className: "h-48 w-full rounded-xl object-cover"
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "truncate font-bold mt-2", children: address }),
    /* @__PURE__ */ jsx("h3", { className: "truncate text-sm text-gray-500", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        price,
        "€ "
      ] }),
      "per night"
    ] })
  ] }) });
};
const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places = [], loading = false } = allPlaces || {};
  console.log("✅ Places reçues:", places);
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(12);
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    setCurrentPage(1);
  }, [places]);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "px-4 py-38  bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10", children: currentPlaces.length > 0 ? currentPlaces.map((place) => /* @__PURE__ */ jsx(PlaceCard, { place }, place._id)) : /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center p-8 bg-white shadow-lg rounded-lg", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold mb-4", children: "Result not found!" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mb-6", children: "Sorry, we couldn't find the place you're looking for." }),
      /* @__PURE__ */ jsx("button", { className: "rounded-full bg-primary p-2 text-white hover:bg-primary-dark transition duration-300", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-5 w-5",
            children: [
              /* @__PURE__ */ jsx("line", { x1: "19", y1: "12", x2: "5", y2: "12" }),
              /* @__PURE__ */ jsx("polyline", { points: "12 19 5 12 12 5" })
            ]
          }
        ),
        "Go back"
      ] }) })
    ] }) }) }),
    places.length > placesPerPage && /* @__PURE__ */ jsx(
      Pagination,
      {
        placesPerPage,
        totalPlaces: places.length,
        paginate,
        currentPage
      }
    )
  ] });
};
const Pagination = ({ placesPerPage, totalPlaces, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }
  const getPageNumbers = () => {
    const totalPages = pageNumbers.length;
    if (totalPages <= 5) return pageNumbers;
    if (currentPage <= 3) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    ];
  };
  return /* @__PURE__ */ jsx("nav", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-wrap justify-center items-center space-x-2", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => paginate(Math.max(1, currentPage - 1)),
        className: "px-2 py-1 border rounded bg-white text-primary hover:bg-primary hover:text-white transition-colors",
        disabled: currentPage === 1,
        children: "«"
      }
    ) }),
    getPageNumbers().map((number, index) => /* @__PURE__ */ jsx("li", { children: number === "..." ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1", children: "..." }) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => paginate(number),
        className: `px-2 py-1 border rounded ${currentPage === number ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"} transition-colors`,
        children: number
      }
    ) }, index)),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => paginate(Math.min(pageNumbers.length, currentPage + 1)),
        className: "px-2 py-1 border rounded bg-white text-primary hover:bg-primary hover:text-white transition-colors",
        disabled: currentPage === pageNumbers.length,
        children: "»"
      }
    ) })
  ] }) });
};
const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    if (window.location.hash === "#register-title") {
      const element = document.getElementById("register-title");
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Tous les champs sont requis.");
      setLoading(false);
      return;
    }
    const response = await auth.register(formData);
    setLoading(false);
    if (response == null ? void 0 : response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error((response == null ? void 0 : response.message) || "Erreur lors de l'inscription.");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response == null ? void 0 : response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error((response == null ? void 0 : response.message) || "Erreur lors de l'authentification Google.");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0 flex-grow mt-40", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
    /* @__PURE__ */ jsx("h1", { id: "register-title", className: "mb-4 text-center text-4xl", children: "Inscription" }),
    /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "name",
          type: "text",
          placeholder: "John Doe",
          value: formData.name,
          onChange: handleFormData,
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "email",
          type: "email",
          placeholder: "your@email.com",
          value: formData.email,
          onChange: handleFormData,
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "password",
          type: "password",
          placeholder: "password",
          value: formData.password,
          onChange: handleFormData,
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "primary my-2", disabled: loading, children: loading ? "Chargement..." : "Valider" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
      /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "ou" }),
      /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
      GoogleLogin,
      {
        onSuccess: ({ credential }) => handleGoogleLogin(credential),
        onError: () => toast.error("Échec de la connexion Google"),
        text: "continue_with",
        width: "350"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
      "Déjà inscrit ?",
      " ",
      /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/login", children: "Se connecter" })
    ] })
  ] }) });
};
const AccountNav = () => {
  var _a2;
  const { pathname } = useLocation();
  let subpage = (_a2 = pathname.split("/")) == null ? void 0 : _a2[2];
  const { user } = useContext(UserContext);
  if (subpage === void 0) {
    subpage = "profile";
  }
  const linkClases = (type = null) => {
    let classes = "flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  };
  return /* @__PURE__ */ jsxs("nav", { className: "mb-8 mt-24 flex w-full flex-col justify-center gap-2 p-8 md:flex-row md:p-0", children: [
    /* @__PURE__ */ jsxs(Link, { className: linkClases("profile"), to: "/account", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            }
          )
        }
      ),
      "My Profile"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("bookings"), to: `/account/bookings`, children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            }
          )
        }
      ),
      "My bookings"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("places"), to: "/account/places", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            }
          )
        }
      ),
      "My accommodations"
    ] }),
    (user == null ? void 0 : user.isAdmin) && /* @__PURE__ */ jsxs(Link, { className: linkClases("dashboard"), to: "/admin/dashboard", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Admin Dashboard"
    ] }),
    (user == null ? void 0 : user.role) === "modérateur" && /* @__PURE__ */ jsxs(Link, { className: linkClases("comments"), to: "/admin/comments", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Moderator Dashboard"
    ] })
  ] });
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-full w-full shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-9xl",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const PlaceImg = ({ place, index = 0, className = null }) => {
  var _a2;
  if (!((_a2 = place.photos) == null ? void 0 : _a2.length)) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return /* @__PURE__ */ jsx("img", { src: place.photos[index], alt: "", className });
};
const InfoCard = ({ place }) => {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/account/places/${place._id}`,
      className: "my-3 flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 transition-all hover:bg-gray-300 md:flex-row",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 bg-gray-300 sm:h-32 sm:w-32 ", children: /* @__PURE__ */ jsx(PlaceImg, { place }) }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl", children: place.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm", children: place.description })
        ] })
      ]
    },
    place._id
  );
};
const PlacesPage = ({ initialPlaces = [] }) => {
  const [places, setPlaces] = useState(initialPlaces);
  const [loading, setLoading] = useState(initialPlaces.length === 0);
  useEffect(() => {
    if (initialPlaces.length === 0) {
      const getPlaces = async () => {
        try {
          const { data } = await axiosInstance.get("places/user-places");
          setPlaces(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getPlaces();
    }
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    /* @__PURE__ */ jsx("div", { className: "text-center ", children: /* @__PURE__ */ jsxs(
      Link,
      {
        className: "inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white",
        to: "/account/places/new",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 4.5v15m7.5-7.5h-15"
                }
              )
            }
          ),
          "Add new place"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mx-4 mt-4", children: places.length > 0 && places.map((place) => /* @__PURE__ */ jsx(InfoCard, { place }, place._id)) })
  ] });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = ({ className, ...props }) => /* @__PURE__ */ jsx(DialogPrimitive.Portal, { className: cn(className), ...props });
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] })
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const EditProfileDialog = () => {
  const { user, setUser, uploadPicture, updateUser } = useAuth();
  const uploadRef = useRef(null);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    password: "",
    confirm_password: ""
  });
  const handleImageClick = () => {
    uploadRef.current.click();
  };
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    const { name, password, confirm_password } = userData;
    if (name.trim() === "") {
      setLoading(false);
      return toast.error("Name Can't be empty");
    } else if (password !== confirm_password) {
      setLoading(false);
      return toast.error("Passwords don't match");
    }
    try {
      let pictureUrl = "";
      if (picture) {
        pictureUrl = await uploadPicture(picture);
      }
      const userDetails = {
        name: userData.name,
        password: userData.password,
        picture: pictureUrl
      };
      const res = await updateUser(userDetails);
      if (res.success) {
        setUser(res.user);
        setLoading(false);
        return toast.success("Updated successfully!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-blue-600 hover:bg-blue-600 ", children: [
      /* @__PURE__ */ jsx(PenSquare, { className: "mr-2 h-4 w-4" }),
      "Edit Profile"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-gray-200", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute flex h-full w-full items-center justify-center bg-gray-200 hover:z-10",
            onClick: handleImageClick,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  className: "hidden",
                  ref: uploadRef,
                  onChange: handlePictureChange
                }
              ),
              /* @__PURE__ */ jsx(Upload, { height: 50, width: 50, color: "#4e4646" })
            ]
          }
        ),
        picture ? /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: URL.createObjectURL(picture) }) }) : /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-right", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              value: userData.name,
              className: "col-span-3",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-right", children: "New Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              name: "password",
              value: userData.password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm_Password", className: "text-right", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "confirm_password",
              name: "confirm_password",
              value: userData.confirm_password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(
        Button,
        {
          disabled: loading,
          type: "submit",
          className: "w-full",
          onClick: handleSaveChanges,
          children: [
            loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Save changes"
          ]
        }
      ) })
    ] })
  ] });
};
const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect("/");
    } else {
      toast.error(response.message);
    }
  };
  if (!user && !redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    subpage === "profile" && /* @__PURE__ */ jsxs("div", { className: "m-4 flex flex-col items-center gap-8 rounded-[10px]  p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4  sm:h-72 sm:w-72 md:h-96 md:w-96", children: /* @__PURE__ */ jsxs(Avatar, { children: [
        user.picture ? /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) : /* @__PURE__ */ jsx(
          AvatarImage,
          {
            src: "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
            className: "object-cover"
          }
        ),
        /* @__PURE__ */ jsx(AvatarFallback, { children: user.name.slice([0], [1]) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 sm:items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Text, { height: "18", width: "18" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
              /* @__PURE__ */ jsx("span", { children: "Name: " }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { height: "18", width: "18" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
              /* @__PURE__ */ jsx("span", { children: "Email: " }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.email })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10", children: [
          /* @__PURE__ */ jsx(EditProfileDialog, {}),
          /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: handleLogout, children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            "Logout"
          ] })
        ] })
      ] })
    ] }),
    subpage === "places" && /* @__PURE__ */ jsx(PlacesPage, {})
  ] });
};
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast.error("Veuillez entrer votre e-mail et votre mot de passe.");
      setLoading(false);
      return;
    }
    const response = await auth.login(formData);
    setLoading(false);
    if (response && response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response ? response.message : "Erreur de réponse du serveur");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response && response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response ? response.message : "Erreur de réponse du serveur");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  if (auth.user) {
    return /* @__PURE__ */ jsx(ProfilePage, {});
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0 flex-grow mt-40", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center text-4xl", children: "Login" }),
    /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "email",
          type: "email",
          placeholder: "your@email.com",
          value: formData.email,
          onChange: handleFormData,
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "password",
          type: "password",
          placeholder: "password",
          value: formData.password,
          onChange: handleFormData,
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsxs("button", { className: "primary my-4", disabled: loading, children: [
        " ",
        loading ? "Loading..." : "Login"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
      /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "or" }),
      /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
      GoogleLogin,
      {
        onSuccess: (credentialResponse) => {
          handleGoogleLogin(credentialResponse.credential);
        },
        onError: () => {
          console.log("Login Failed");
        },
        text: "continue_with",
        width: "350"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
      "Don't have an account yet?",
      " ",
      /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/register", children: "Register now" })
    ] })
  ] }) });
};
const BookingDates = ({ booking, className }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 " + className, children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          }
        )
      }
    ),
    differenceInCalendarDays(
      new Date(booking.checkOut),
      new Date(booking.checkIn)
    ),
    "nights:",
    /* @__PURE__ */ jsxs("div", { className: "ml-2 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkIn), "dd-MM-yyyy"),
      " →",
      " "
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "items- flex gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkOut), "dd-MM-yyyy")
    ] })
  ] });
};
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings");
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setLoading(false);
      }
    };
    getBookings();
  }, []);
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    /* @__PURE__ */ jsx("div", { children: (bookings == null ? void 0 : bookings.length) > 0 ? bookings.map((booking) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/account/bookings/${booking._id}`,
          className: "mx-4 my-8 flex h-28 gap-4 overflow-hidden rounded-2xl bg-gray-200 md:h-40 lg:mx-0",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-2/6 md:w-1/6", children: ((_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.photos[0]) && /* @__PURE__ */ jsx(
              PlaceImg,
              {
                place: booking == null ? void 0 : booking.place,
                className: "h-full w-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "grow py-3 pr-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "md:text-2xl", children: (_b2 = booking == null ? void 0 : booking.place) == null ? void 0 : _b2.title }),
              /* @__PURE__ */ jsxs("div", { className: "md:text-xl", children: [
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 border-t " }),
                /* @__PURE__ */ jsxs("div", { className: "md:text-xl", children: [
                  /* @__PURE__ */ jsx(
                    BookingDates,
                    {
                      booking,
                      className: "mb-2 mt-4 hidden items-center text-gray-600  md:flex"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "my-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "h-7 w-7",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xl md:text-2xl", children: [
                      "Total price: ",
                      booking.price,
                      "€"
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ]
        },
        booking._id
      );
    }) : /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-start", children: [
      /* @__PURE__ */ jsx("h1", { className: "my-6 text-3xl font-semibold", children: "Trips" }),
      /* @__PURE__ */ jsx("hr", { className: "border border-gray-300" }),
      /* @__PURE__ */ jsx("h3", { className: "pt-6 text-2xl font-semibold", children: "No trips booked... yet!" }),
      /* @__PURE__ */ jsx("p", { children: "Time to dust off you bags and start planning your next adventure" }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "my-4", children: /* @__PURE__ */ jsx("div", { className: "flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50", children: "Start Searching" }) })
    ] }) }) })
  ] });
};
const Perks = ({ selected, handleFormData }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6", children: [
    /* @__PURE__ */ jsxs(
      "label",
      {
        className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selected.includes("wifi"),
              name: "wifi",
              onChange: handleFormData
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { children: "Wifi" })
        ]
      },
      "perks"
    ),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("parking"),
          name: "parking",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Free parking spot" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("tv"),
          name: "tv",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "TV" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("radio"),
          name: "radio",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Radio" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("pets"),
          name: "pets",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Pets" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("enterence"),
          name: "enterence",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Private Enterence" })
    ] })
  ] });
};
const Image = ({ src, ...rest }) => {
  return /* @__PURE__ */ jsx("img", { src, ...rest, alt: "", className: "rounded-xl" });
};
const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setphotoLink] = useState("");
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axiosInstance.post("/upload-by-link", {
      link: photoLink
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setphotoLink("");
  };
  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axiosInstance.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" }
    });
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };
  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename)
    ]);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: photoLink,
          onChange: (e) => setphotoLink(e.target.value),
          type: "text",
          placeholder: "Add using a link ...jpg"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-2xl bg-gray-200 px-4",
          onClick: addPhotoByLink,
          children: "Add photo"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 ", children: [
      (addedPhotos == null ? void 0 : addedPhotos.length) > 0 && addedPhotos.map((link) => /* @__PURE__ */ jsxs("div", { className: "relative flex h-32", children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            className: "w-full rounded-2xl object-cover",
            src: link,
            alt: ""
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removePhoto(link),
            className: "absolute bottom-1 right-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => selectAsMainPhoto(e, link),
            className: "absolute bottom-1 left-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: [
              link === addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ),
              link !== addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    }
                  )
                }
              )
            ]
          }
        )
      ] }, link)),
      /* @__PURE__ */ jsxs("label", { className: "flex h-32 cursor-pointer items-center justify-center gap-1 rounded-2xl border bg-transparent p-2 text-2xl text-gray-600", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            multiple: true,
            className: "hidden",
            onChange: uploadPhoto
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-8 w-8",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              }
            )
          }
        ),
        "Upload"
      ] })
    ] })
  ] });
};
const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 10,
    price: 500,
    type: ""
  });
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    type
  } = formData;
  const isValidPlaceData = () => {
    if (title.trim() === "") {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === "") {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error("Upload at least 5 photos!");
      return false;
    } else if (description.trim() === "") {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1) {
      toast.error("At least one guests is required!");
      return false;
    } else if (maxGuests > 10) {
      toast.error("Max. guests can't be greater than 10");
      return false;
    }
    return true;
  };
  const handleFormData = (e) => {
    const { name, value, type: type2 } = e.target;
    if (type2 !== "checkbox") {
      setFormData({ ...formData, [name]: value });
      return;
    }
    if (type2 === "checkbox") {
      const currentPerks = [...perks];
      let updatedPerks = [];
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key]
          }));
        }
      }
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);
  const preInput = (header, description2) => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl", children: header }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: description2 })
    ] });
  };
  const savePlace = async (e) => {
    e.preventDefault();
    const formDataIsValid = isValidPlaceData();
    const placeData = { ...formData, addedPhotos };
    console.log("Données envoyées au serveur:", placeData);
    if (!placeData.type) {
      console.error("Le champ 'type' est requis");
      return;
    }
    if (formDataIsValid) {
      try {
        if (id) {
          const { data } = await axiosInstance.put("/places/update-place", {
            id,
            ...placeData
          });
        } else {
          const { data } = await axiosInstance.post(
            "/places/add-places",
            placeData
          );
        }
        setRedirect(true);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
        if (error.response) {
          console.error("Données de l'erreur :", error.response.data);
          console.error("Statut de l'erreur :", error.response.status);
          console.error("Headers de l'erreur :", error.response.headers);
        } else if (error.request) {
          console.error("Erreur de requête :", error.request);
        } else {
          console.error("Erreur :", error.message);
        }
      }
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/account/places" });
  }
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    /* @__PURE__ */ jsxs("form", { onSubmit: savePlace, children: [
      preInput(
        "Title",
        "title for your place. Should be short and catchy as in advertisement"
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "title",
          value: title,
          onChange: handleFormData,
          placeholder: "title, for example: My lovely apt"
        }
      ),
      preInput("Address", "address to this place"),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "address",
          value: address,
          onChange: handleFormData,
          placeholder: "address"
        }
      ),
      preInput("Photos", "more = better"),
      /* @__PURE__ */ jsx(
        PhotosUploader,
        {
          addedPhotos,
          setAddedPhotos
        }
      ),
      preInput("Description", "discription of the place"),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: description,
          name: "description",
          onChange: handleFormData
        }
      ),
      preInput("Perks", " select all the perks of your place"),
      /* @__PURE__ */ jsx(Perks, { selected: perks, handleFormData }),
      preInput("Extra info", "house rules, etc "),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: extraInfo,
          name: "extraInfo",
          onChange: handleFormData
        }
      ),
      preInput("type", "Select the type of your place"),
      /* @__PURE__ */ jsxs("select", { name: "type", value: type, onChange: handleFormData, required: true, children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "Select a type" }),
        /* @__PURE__ */ jsx("option", { value: "Treehouse", children: "Treehouse" }),
        /* @__PURE__ */ jsx("option", { value: "Yurt", children: "Yurt" }),
        /* @__PURE__ */ jsx("option", { value: "Boat", children: "Boat" }),
        /* @__PURE__ */ jsx("option", { value: "Cave", children: "Cave" }),
        /* @__PURE__ */ jsx("option", { value: "Igloo", children: "Igloo" }),
        /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
      ] }),
      " ",
      preInput(
        "Number of guests & Price",
        // 'add check in and out times, remember to have some time window forcleaning the room between guests. '
        "Specify the maximum number of guests so that the client stays within the limit."
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Max no. of guests" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "maxGuests",
              value: maxGuests,
              onChange: handleFormData,
              placeholder: "1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Price per night" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "price",
              value: price,
              onChange: handleFormData,
              placeholder: "1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "mx-auto my-4 flex rounded-full bg-primary px-20 py-3 text-xl font-semibold text-white", children: "Save" })
    ] })
  ] });
};
const AddressLink = ({ placeAddress, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += " flex gap-1 font-semibold underline";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className,
      href: `https://maps.google.com/?q=${placeAddress}`,
      target: "blank",
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                }
              )
            ]
          }
        ),
        placeAddress
      ]
    }
  );
};
function Calendar({ className, classNames, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props,
      required: true
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) })
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function DatePickerWithRange({ className, setDateRange }) {
  const [date, setDate] = React.useState({
    from: /* @__PURE__ */ new Date(),
    to: addDays(Date.now(), 5)
  });
  const today = /* @__PURE__ */ new Date();
  const yesterday = /* @__PURE__ */ new Date();
  yesterday.setDate(today.getDate() - 1);
  React.useEffect(() => {
    if (!date) {
      setDate({ from: /* @__PURE__ */ new Date(), to: /* @__PURE__ */ new Date() });
    } else {
      setDateRange(date);
    }
  }, [date]);
  return /* @__PURE__ */ jsx("div", { className: cn("grid gap-2", className), children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(
      PopoverTrigger,
      {
        asChild: true,
        className: "border-none text-black hover:bg-transparent",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            id: "date",
            variant: "outline",
            className: cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
              (date == null ? void 0 : date.from) ? date.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
                format(date.from, "LLL dd, y"),
                " -",
                ">",
                " ",
                format(date.to, "LLL dd, y")
              ] }) : format(date.from, "LLL dd, y") : /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "Pick a date" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        initialFocus: true,
        mode: "range",
        defaultMonth: date == null ? void 0 : date.from,
        selected: date,
        onSelect: setDate,
        numberOfMonths: 1,
        disabled: (date2) => date2 < (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1)
      }
    ) })
  ] }) });
}
const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: "",
    phone: ""
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useAuth();
  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;
  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);
  const numberOfNights = dateRange.from && dateRange.to ? differenceInDays(
    new Date(dateRange.to).setHours(0, 0, 0, 0),
    new Date(dateRange.from).setHours(0, 0, 0, 0)
  ) : 0;
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };
  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }
    if (numberOfNights < 1) {
      return toast.error("Please select valid dates");
    } else if (noOfGuests < 1) {
      return toast.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === "") {
      return toast.error("Name can't be empty");
    } else if (phone.trim() === "") {
      return toast.error("Phone can't be empty");
    }
    try {
      const response = await axiosInstance.post("/bookings", {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        noOfGuests,
        name,
        phone,
        place: id,
        price: numberOfNights * price
      });
      const bookingId = response.data.booking._id;
      setRedirect(`/account/bookings/${bookingId}`);
      toast("Congratulations! Enjoy your trip.");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error: ", error);
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center text-xl", children: [
      "Price: ",
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        place.price,
        "€"
      ] }),
      " / per night"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-full ", children: /* @__PURE__ */ jsx(DatePickerWithRange, { setDateRange }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Number of guests: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "noOfGuests",
            placeholder: `Max. guests: ${place.maxGuests}`,
            min: 1,
            max: place.maxGuests,
            value: noOfGuests,
            onChange: handleBookingData
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Your full name: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: name,
            onChange: handleBookingData
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "Phone number: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            name: "phone",
            value: phone,
            onChange: handleBookingData
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: handleBooking, className: "primary mt-4", children: [
      "Book this place",
      numberOfNights > 0 && /* @__PURE__ */ jsxs("span", { children: [
        " ",
        numberOfNights * place.price,
        "€"
      ] })
    ] })
  ] });
};
const PlaceGallery = ({ place }) => {
  var _a2, _b2, _c, _d, _e, _f, _g;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20 overflow-auto bg-white text-white", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 bg-white px-2 py-20 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: "fixed right-2 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow-sm shadow-gray-500 md:right-12",
          onClick: () => setShowAllPhotos(false),
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
                    clipRule: "evenodd"
                  }
                )
              }
            ),
            "Close photos"
          ]
        }
      ) }),
      ((_a2 = place == null ? void 0 : place.photos) == null ? void 0 : _a2.length) > 0 && place.photos.map((photo, index) => /* @__PURE__ */ jsx("div", { className: "max-w-full", children: /* @__PURE__ */ jsx("img", { src: photo, alt: "" }) }, index))
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden h-[400px] max-h-[450px] grid-cols-4 gap-2 overflow-hidden rounded-[12px] md:grid", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-2 overflow-hidden", children: ((_b2 = place.photos) == null ? void 0 : _b2[0]) && /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden bg-red-200", children: /* @__PURE__ */ jsx(
        "img",
        {
          onClick: () => setShowAllPhotos(true),
          className: "h-full w-full cursor-pointer object-cover",
          src: place.photos[0],
          alt: ""
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_c = place.photos) == null ? void 0 : _c[1]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[1],
            alt: ""
          }
        ) }),
        ((_d = place.photos) == null ? void 0 : _d[2]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[2],
            alt: ""
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_e = place.photos) == null ? void 0 : _e[3]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[3],
            alt: ""
          }
        ) }),
        ((_f = place.photos) == null ? void 0 : _f[4]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[4],
            alt: ""
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden rounded-[12px] md:hidden", children: ((_g = place.photos) == null ? void 0 : _g[0]) && /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(
      "img",
      {
        onClick: () => setShowAllPhotos(true),
        className: "h-full cursor-pointer object-cover",
        src: place.photos[0],
        alt: ""
      }
    ) }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "absolute bottom-2 right-2 flex gap-1 rounded-xl bg-white px-4 py-2 shadow-md shadow-gray-500 ",
        onClick: () => setShowAllPhotos(true),
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          "Show all photos"
        ]
      }
    )
  ] });
};
const PerksWidget = ({ perks }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("hr", { className: "mb-5 border" }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold", children: "What this place offers" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid flex-col gap-4 lg:grid-cols-2 lg:justify-items-stretch lg:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("wifi")) ? "" : "line-through"}`, children: "Wifi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("tv")) ? "" : "line-through"}`, children: "TV" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("parking")) ? "" : "line-through"}`,
            children: "Free parking spot"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("radio")) ? "" : "line-through"}`, children: "Radio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("pets")) ? "" : "line-through"}`, children: "Pets" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("enterence")) ? "" : "line-through"}`,
            children: "Private enterence"
          }
        )
      ] })
    ] })
  ] });
};
const PlacePage = () => {
  var _a2;
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [replyVisible, setReplyVisible] = useState({});
  const [userName, setUserName] = useState("Unknown User");
  const API_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserName(storedUser ? storedUser.name : "Unknown User");
    }
  }, []);
  useEffect(() => {
    if (!id) {
      return "";
    }
    setLoading(true);
    const getPlace = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL}/api/places/${id}`
        );
        setPlace(data.place);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getPlace();
  }, [id, API_BASE_URL]);
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews`,
        {
          rating,
          comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPlace((prevPlace) => ({
        ...prevPlace,
        reviews: [...prevPlace.reviews, data.data[data.data.length - 1]]
      }));
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleReplySubmit = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews/${reviewId}/reply`,
        {
          comment: reply[reviewId],
          userName
          // Envoi du nom de l'utilisateur avec la réponse
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPlace((prevPlace) => ({
        ...prevPlace,
        reviews: prevPlace.reviews.map(
          (review) => review._id === reviewId ? data.data : review
        )
      }));
      setReply({ ...reply, [reviewId]: "" });
      setReplyVisible({ ...replyVisible, [reviewId]: false });
    } catch (error) {
      console.error(error);
    }
  };
  const toggleReplyForm = (reviewId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  if (!place) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 overflow-x-hidden px-8 pt-20 ", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: place.title }),
    /* @__PURE__ */ jsx(AddressLink, { placeAddress: place.address }),
    /* @__PURE__ */ jsx(PlaceGallery, { place }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsxs("div", { className: "my-4 ", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Description" }),
          place.description
        ] }),
        "Max number of guests: ",
        place.maxGuests,
        /* @__PURE__ */ jsx(PerksWidget, { perks: place == null ? void 0 : place.perks })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BookingWidget, { place }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "-mx-8 border-t bg-white px-8 py-8", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-semibold", children: "Extra Info" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 mt-2 text-sm leading-5 text-gray-700", children: place.extraInfo })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Avis" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: ((_a2 = place.reviews) == null ? void 0 : _a2.length) > 0 ? place.reviews.map(
        (review) => {
          var _a3, _b2;
          return review && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 border rounded", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = review.user) == null ? void 0 : _a3.name) || userName }),
              /* @__PURE__ */ jsxs("span", { className: "ml-4", children: [
                "Note: ",
                review.rating,
                " / 5"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { children: review.comment }),
            ((_b2 = review.replies) == null ? void 0 : _b2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: review.replies.map((reply2) => {
              var _a4;
              return /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a4 = reply2.user) == null ? void 0 : _a4.name) || userName }),
                ": ",
                reply2.comment
              ] }, reply2._id);
            }) }),
            localStorage.getItem("token") && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggleReplyForm(review._id),
                  className: "bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700",
                  children: "Répondre"
                }
              ),
              replyVisible[review._id] && /* @__PURE__ */ jsxs(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    handleReplySubmit(review._id);
                  },
                  className: "mt-4",
                  children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: reply[review._id] || "",
                        onChange: (e) => setReply({
                          ...reply,
                          [review._id]: e.target.value
                        }),
                        placeholder: "Répondre à cet avis",
                        className: "w-full p-2 border rounded",
                        rows: "2"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700",
                        children: "Envoyer"
                      }
                    )
                  ]
                }
              )
            ] })
          ] }, review._id);
        }
      ) : /* @__PURE__ */ jsx("p", { children: "Aucun avis pour l'instant." }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Laisser un avis" }),
      localStorage.getItem("token") ? /* @__PURE__ */ jsxs("form", { onSubmit: handleReviewSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "rating", className: "block font-semibold", children: "Note" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "rating",
              value: rating,
              onChange: (e) => setRating(e.target.value),
              className: "mt-1 block w-full p-2 border rounded",
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionnez une note" }),
                /* @__PURE__ */ jsx("option", { value: "1", children: "1 étoile" }),
                /* @__PURE__ */ jsx("option", { value: "2", children: "2 étoiles" }),
                /* @__PURE__ */ jsx("option", { value: "3", children: "3 étoiles" }),
                /* @__PURE__ */ jsx("option", { value: "4", children: "4 étoiles" }),
                /* @__PURE__ */ jsx("option", { value: "5", children: "5 étoiles" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "comment", className: "block font-semibold", children: "Commentaire" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "comment",
              value: comment,
              onChange: (e) => setComment(e.target.value),
              className: "mt-1 block w-full p-2 border rounded",
              rows: "4",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
            children: "Envoyer"
          }
        )
      ] }) : /* @__PURE__ */ jsx("p", { children: "Veuillez vous connecter pour laisser un avis." })
    ] })
  ] });
};
const SingleBookedPlace = () => {
  var _a2, _b2;
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/bookings");
      const filteredBooking = data.booking.filter(
        (booking2) => booking2._id === id
      );
      setBooking(filteredBooking[0]);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [id]);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    (booking == null ? void 0 : booking.place) ? /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: (_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.title }),
      /* @__PURE__ */ jsx(
        AddressLink,
        {
          className: "my-2 block",
          placeAddress: (_b2 = booking.place) == null ? void 0 : _b2.address
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: " ", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl md:text-2xl", children: "Your booking information" }),
          /* @__PURE__ */ jsx(BookingDates, { booking })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: "Total price" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center text-3xl", children: /* @__PURE__ */ jsxs("span", { children: [
            booking == null ? void 0 : booking.price,
            "€"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(PlaceGallery, { place: booking == null ? void 0 : booking.place })
    ] }) : /* @__PURE__ */ jsx("h1", { children: " No data" })
  ] });
};
const NotFoundPage = () => {
  return /* @__PURE__ */ jsx("div", { className: "px-2 pt-40", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-black", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl", children: "We can't seem to find the page you're looking for." }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-600", children: "Sorry, the page you are looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center gap-x-3", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("button", { className: "rounded-[10px] bg-gray-900 p-2 px-20 hover:bg-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: "Home" }) }) }) })
  ] }) });
};
const InfosProprietaires = () => {
  const infoCards = [
    {
      title: "Pourquoi nous rejoindre ?",
      content: "Atypikhouse vous offre une plateforme unique pour partager votre bien insolite avec des voyageurs du monde entier. Augmentez vos revenus et faites vivre des expériences inoubliables.",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Types de biens acceptés",
      content: "Cabanes dans les arbres, yourtes, tiny houses, bulles, péniches... Tout logement atypique et confortable est le bienvenu !",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Accompagnement personnalisé",
      content: "Notre équipe vous guide à chaque étape : de la création de votre annonce à la gestion de vos réservations. Un support dédié 7j/7.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    },
    {
      title: "Visibilité maximale",
      content: "Bénéficiez de notre forte présence en ligne et de nos partenariats pour attirer des voyageurs en quête d'expériences uniques.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    }
  ];
  const testimonials = [
    {
      name: "Marie L.",
      property: "Cabane dans les arbres",
      quote: "Grâce à Atypikhouse, ma cabane est occupée presque toute l'année. Le processus est simple et l'équipe est toujours là pour m'aider.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Pierre D.",
      property: "Yourte moderne",
      quote: "J'apprécie la flexibilité qu'offre Atypikhouse. Je peux gérer mes réservations facilement et les voyageurs sont toujours respectueux.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow mt-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-center mt-16 mb-12 text-blue-800", children: "Devenez hôte sur Atypikhouse" }),
      /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-8 text-center text-blue-700", children: "Pourquoi choisir Atypikhouse ?" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: infoCards.map((card, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: card.image,
                  alt: card.title,
                  className: "w-full h-48 object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-4 text-blue-600", children: card.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: card.content })
              ] })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-8 text-center text-blue-700", children: "Comment ça marche ?" }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md p-8", children: /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-4", children: [
          /* @__PURE__ */ jsx("li", { className: "text-lg", children: "Inscrivez-vous gratuitement sur notre plateforme" }),
          /* @__PURE__ */ jsx("li", { className: "text-lg", children: "Créez une annonce détaillée de votre bien atypique" }),
          /* @__PURE__ */ jsx("li", { className: "text-lg", children: "Définissez vos tarifs et disponibilités" }),
          /* @__PURE__ */ jsx("li", { className: "text-lg", children: "Recevez des demandes de réservation" }),
          /* @__PURE__ */ jsx("li", { className: "text-lg", children: "Accueillez vos voyageurs et partagez des expériences uniques" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-8 text-center text-blue-700", children: "Témoignages d'hôtes" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-lg shadow-md p-6 flex items-center",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: testimonial.image,
                  alt: testimonial.name,
                  className: "w-24 h-24 rounded-full mr-6 object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-gray-600 italic mb-4", children: [
                  '"',
                  testimonial.quote,
                  '"'
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: testimonial.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: testimonial.property })
              ] })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/register#register-title",
          className: "bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block",
          children: "Commencer l'aventure maintenant"
        }
      ) })
    ] }) })
  ] });
};
const MentionsLegales = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-gray-100 min-h-screen", children: /* @__PURE__ */ jsx("main", { className: "py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center text-blue-800", children: "Mentions légales et Politique de confidentialité" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "AtypikHouse respecte vos droits en matière de données personnelles et de traitements automatisés. Notre politique de confidentialité détaille nos pratiques, leurs objectifs et vos options pour exercer vos droits. Pour plus d'informations sur la protection des données, consultez le site:",
      " ",
      /* @__PURE__ */ jsx("a", { href: "https://www.cnil.fr/", className: "text-blue-600", children: "www.cnil.fr" }),
      ". En utilisant ce site, vous acceptez nos conditions d'utilisation. La version actuelle de ces conditions s'applique jusqu'à sa mise à jour"
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 1 - Mentions légales" }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mt-4 text-blue-700", children: "1.1 Site (ci-après « le site ») :" }),
    /* @__PURE__ */ jsx("p", { children: "Atypik House" }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mt-4 text-blue-700", children: "1.2 Éditeur (ci-après « l'éditeur ») :" }),
    /* @__PURE__ */ jsx("p", { children: "KB SARL au capital de 10 000€" }),
    /* @__PURE__ */ jsx("p", { children: "Siège social : Rue VICTOR AUGANIOR Paris 94000" }),
    /* @__PURE__ */ jsx("p", { children: "Représentée par BENI KIYOUNGUILA, en sa qualité de Développeur Web" }),
    /* @__PURE__ */ jsx("p", { children: "Immatriculée au RCS de Paris 1111213141520" }),
    /* @__PURE__ */ jsx("p", { children: "Téléphone : 07912222222" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Email :",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:atypikhouse@gmail.com", className: "text-blue-600", children: "atypikhouse@gmail.com" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mt-4 text-blue-700", children: "1.3 Hébergeur (ci-après « l'hébergeur ») :" }),
    /* @__PURE__ */ jsx("p", { children: "Ionos, siège social : Paris 95000, France" }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 2 - Accès au site" }),
    /* @__PURE__ */ jsx("p", { children: "L'accès au site et son utilisation sont réservés à un usage strictement personnel. Vous vous engagez à ne pas utiliser ce site et les informations ou données qui y figurent à des fins commerciales, politiques, publicitaires et pour toute forme de sollicitation commerciale." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 3 - Contenu du site" }),
    /* @__PURE__ */ jsx("p", { children: "Tous les éléments présents sur le site sont protégés par les lois en vigueur sur la propriété intellectuelle et sont la propriété de l'éditeur ou de ses partenaires. Toute reproduction, représentation ou utilisation sans autorisation est strictement interdite." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 4 - Gestion du site" }),
    /* @__PURE__ */ jsx("p", { children: "Pour la bonne gestion du site, l'éditeur pourra suspendre, interrompre ou limiter l'accès à certaines parties du site. Ce site peut être suspendu pour des mises à jour." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 5 – Responsabilités" }),
    /* @__PURE__ */ jsx("p", { children: "L'éditeur ne pourra être tenu responsable en cas de défaillance ou d'interruption de fonctionnement, empêchant l'accès au site." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 6 - Liens hypertextes" }),
    /* @__PURE__ */ jsx("p", { children: "La mise en place de liens hypertextes vers tout ou partie du site est interdite sans l'autorisation préalable de l'éditeur." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 7 - Collecte et protection des données" }),
    /* @__PURE__ */ jsx("p", { children: "Les données personnelles collectées sur ce site sont principalement utilisées pour la gestion des relations avec les utilisateurs et le traitement de leurs commandes." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 8 - Droit d’accès, de rectification et de déréférencement de vos données" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Les utilisateurs peuvent exercer leurs droits d'accès, de rectification, de suppression et d'opposition sur leurs données personnelles. Pour toute demande, vous pouvez contacter l'éditeur à l'adresse",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:atypikhouse@gmail.com", className: "text-blue-600", children: "atypikhouse@gmail.com" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 9 - Utilisation des données" }),
    /* @__PURE__ */ jsx("p", { children: "Les données personnelles collectées auprès des utilisateurs ont pour objectif la mise à disposition des services de la Plateforme, leur amélioration et le maintien d'un environnement sécurisé. La base légale des traitements est l'exécution du contrat entre l’utilisateur et la Plateforme." }),
    /* @__PURE__ */ jsx("p", { children: "Plus précisément, les utilisations sont les suivantes :" }),
    /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6", children: [
      /* @__PURE__ */ jsx("li", { children: "Accès et utilisation de la Plateforme par l'utilisateur" }),
      /* @__PURE__ */ jsx("li", { children: "Gestion du fonctionnement et optimisation de la Plateforme" }),
      /* @__PURE__ */ jsx("li", { children: "Mise en œuvre d'une assistance utilisateurs" }),
      /* @__PURE__ */ jsx("li", { children: "Vérification, identification et authentification des données transmises par l'utilisateur" }),
      /* @__PURE__ */ jsx("li", { children: "Personnalisation des services en fonction de l'historique de navigation de l'utilisateur" }),
      /* @__PURE__ */ jsx("li", { children: "Prévention et détection des fraudes et malwares" }),
      /* @__PURE__ */ jsx("li", { children: "Gestion des éventuels litiges avec les utilisateurs" }),
      /* @__PURE__ */ jsx("li", { children: "Envoi d'informations commerciales et publicitaires" }),
      /* @__PURE__ */ jsx("li", { children: "Organisation des conditions d'utilisation des Services de paiement" })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 10 - Politique de conservation des données" }),
    /* @__PURE__ */ jsx("p", { children: "La Plateforme conserve vos données pour la durée nécessaire à la fourniture des services ou de l'assistance. Elle peut conserver certaines informations même après la fermeture de votre compte si cela est nécessaire pour satisfaire à des obligations légales, régler des litiges, ou prévenir des fraudes." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 11 - Partage des données personnelles avec des tiers" }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-800", children: [
      " ",
      "AtypikHouse peut partager vos données personnelles avec des partenaires de l'Union européenne dans les situations suivantes :",
      " "
    ] }),
    " ",
    /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-800", children: [
      " ",
      /* @__PURE__ */ jsx("li", { children: "Pour les services de paiement : collaboration avec des institutions financières agréées." }),
      " ",
      /* @__PURE__ */ jsx("li", { children: "Lorsque vous publiez des informations publiques dans les espaces de commentaires." }),
      " ",
      /* @__PURE__ */ jsx("li", { children: "Si vous autorisez un site tiers à accéder à vos données." }),
      " ",
      /* @__PURE__ */ jsx("li", { children: "Pour fournir des services spécifiques : assistance client, publicité, et traitement des paiements. Les prestataires ont un accès limité et sont tenus de respecter la réglementation sur la protection des données." }),
      " ",
      /* @__PURE__ */ jsx("li", { children: "En cas d'obligation légale : pour répondre aux réclamations ou se conformer aux procédures administratives et judiciaires." }),
      " "
    ] }),
    " ",
    /* @__PURE__ */ jsxs("p", { className: "text-gray-800 mt-2", children: [
      " ",
      "Dans tous les cas, le partage se fait dans le respect strict des lois sur la protection des données personnelles.",
      " "
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 12 - Offres commerciales" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Vous êtes susceptible de recevoir des offres commerciales de l'éditeur. Si vous ne souhaitez pas, vous pouvez nous contacter à l'adresse",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:atypikhouse@gmail.com", className: "text-blue-600", children: "atypikhouse@gmail.com" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 13 - Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "Nous utilisons différents traceurs/cookies sur le site pour mesurer l’audience et intégrer des services permettant d’améliorer l’interactivité du site." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 14 - Photographies et représentation des produits" }),
    /* @__PURE__ */ jsx("p", { children: "Les photographies de produits, accompagnant leur description, ne sont pas contractuelles et n'engagent pas l'éditeur." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 15 - Loi applicable" }),
    /* @__PURE__ */ jsx("p", { children: "Les présentes conditions d'utilisation du site sont régies par la loi française et soumises à la compétence des tribunaux du siège social de l'éditeur." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 text-blue-700", children: "Article 16 - Contactez-nous" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Pour toute question ou information, vous pouvez nous contacter à l'adresse suivante :",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:atypikhouse@gmail.com", className: "text-blue-600", children: "atypikhouse@gmail.com" }),
      "."
    ] })
  ] }) }) }) });
};
const AdminDashboard = () => {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center text-gray-800 mb-8", children: "Tableau de Bord Administrateur" }),
    /* @__PURE__ */ jsxs("nav", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/users",
          className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-12 w-12 mx-auto text-gray-700 mb-4",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2.25c-2.762 0-7.5 1.44-7.5 4.25v.75h15v-.75c0-2.81-4.738-4.25-7.5-4.25z" })
              }
            ),
            "Gérer les utilisateurs"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/equipments",
          className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-12 w-12 mx-auto text-gray-700 mb-4",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18.75V5.25c0-1.35 1.125-2.25 2.25-2.25h7.5c1.125 0 2.25.9 2.25 2.25v13.5" })
              }
            ),
            "Gérer les équipements"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/properties",
          className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-12 w-12 mx-auto text-gray-700 mb-4",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 15v4.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-4.5M4.5 10.5L12 4.5l7.5 6M12 4.5v10.5" })
              }
            ),
            "Gérer les propriétés"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/comments",
          className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-12 w-12 mx-auto text-gray-700 mb-4",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8.25h18M3 12h18M3 15.75h18M5.25 8.25v10.5M18.75 8.25v10.5" })
              }
            ),
            "Modérer les commentaires"
          ]
        }
      )
    ] })
  ] }) });
};
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const API_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log("Données reçues :", response.data);
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error("Format inattendu :", response.data);
        setUsers([]);
      }
    }).catch((error) => console.error("Erreur API :", error));
  }, [API_BASE_URL]);
  const handleDelete = (userId) => {
    const adminUser = users.find((user) => user._id === userId && user.isAdmin);
    if (adminUser) {
      alert(
        "Vous ne pouvez pas supprimer l'utilisateur administrateur principal."
      );
      return;
    }
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      }).catch((error) => console.error(error));
    }
  };
  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("token");
    if (window.confirm(
      "Êtes-vous sûr de vouloir changer le rôle de cet utilisateur ?"
    )) {
      axios.put(
        `${API_BASE_URL}/api/admin/update-user-role/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        setUsers(
          users.map(
            (user) => user._id === userId ? { ...user, role: response.data.data.role } : user
          )
        );
      }).catch((error) => console.error(error));
    }
  };
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };
  const handleSave = (userId) => {
    const token = localStorage.getItem("token");
    axios.put(
      `${API_BASE_URL}/api/admin/update-user/${userId}`,
      { name: editedName, email: editedEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      setUsers(
        users.map(
          (user) => user._id === userId ? { ...user, name: editedName, email: editedEmail } : user
        )
      );
      setEditingUserId(null);
    }).catch((error) => console.error(error));
  };
  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    const name = user.name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) && (roleFilter ? user.role === roleFilter : true);
  }) : [];
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Utilisateurs" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Rechercher par nom...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "p-2 border rounded mr-2"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: roleFilter,
          onChange: (e) => setRoleFilter(e.target.value),
          className: "p-2 border rounded",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Tous les rôles" }),
            /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
            /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Nom" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Rôle" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: Array.isArray(filteredUsers) && filteredUsers.length > 0 ? filteredUsers.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editedName,
            onChange: (e) => setEditedName(e.target.value),
            className: "p-1 border rounded"
          }
        ) : user.name }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editedEmail,
            onChange: (e) => setEditedEmail(e.target.value),
            className: "p-1 border rounded"
          }
        ) : user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: user.role,
            onChange: (e) => handleRoleChange(user._id, e.target.value),
            className: "p-1 border rounded",
            disabled: user.isAdmin,
            children: [
              /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
              /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
              /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 mr-2",
              onClick: () => handleSave(user._id),
              children: "Enregistrer"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700",
              onClick: () => setEditingUserId(null),
              children: "Annuler"
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2",
              onClick: () => handleEdit(user),
              children: "Modifier"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700",
              onClick: () => handleDelete(user._id),
              children: "Supprimer"
            }
          )
        ] }) })
      ] }, user._id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-4 py-2 text-center", children: "Aucun utilisateur trouvé." }) }) })
    ] })
  ] });
};
const basePerks = [
  {
    name: "wifi",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          }
        )
      }
    )
  },
  {
    name: "parking",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          }
        )
      }
    )
  },
  {
    name: "tv",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          }
        )
      }
    )
  },
  {
    name: "radio",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
          }
        )
      }
    )
  },
  {
    name: "pets",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          }
        )
      }
    )
  },
  {
    name: "enterence",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          }
        )
      }
    )
  }
];
const AdminPerks = () => {
  const [perks, setPerks] = useState([]);
  const [newPerk, setNewPerk] = useState("");
  const [newPerkIcon, setNewPerkIcon] = useState("");
  const API_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL}/api/admin/perks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      const fetchedPerks = response.data.data;
      const perksWithIcons = fetchedPerks.map((perk) => {
        const foundPerk = basePerks.find((p) => p.name === perk.name);
        return foundPerk ? { ...perk, icon: foundPerk.icon } : perk;
      });
      setPerks(perksWithIcons);
    }).catch((error) => console.error(error));
  }, [API_BASE_URL]);
  const handleAddPerk = () => {
    const token = localStorage.getItem("token");
    if (newPerk.trim() === "" || newPerkIcon.trim() === "") return;
    axios.post(
      `${API_BASE_URL}/api/admin/perks`,
      { name: newPerk, icon: newPerkIcon },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      const addedPerk = { name: newPerk, icon: newPerkIcon };
      setPerks([...perks, addedPerk]);
      setNewPerk("");
      setNewPerkIcon("");
    }).catch((error) => console.error(error));
  };
  const handleDeletePerk = (perkName) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce perk ?")) {
      axios.delete(`${API_BASE_URL}/api/admin/perks/${perkName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        setPerks(perks.filter((perk) => perk.name !== perkName));
      }).catch((error) => console.error(error));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Perks" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Nom du perk...",
          value: newPerk,
          onChange: (e) => setNewPerk(e.target.value),
          className: "p-2 border rounded mr-2"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "URL de l'icone...",
          value: newPerkIcon,
          onChange: (e) => setNewPerkIcon(e.target.value),
          className: "p-2 border rounded mr-2"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleAddPerk,
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
          children: "Ajouter"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Perk" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: Array.isArray(perks) && perks.length > 0 ? perks.map((perk, index) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mr-2", children: perk.icon ? perk.icon : /* @__PURE__ */ jsx("img", { src: perk.iconUrl, alt: perk.name }) }),
          /* @__PURE__ */ jsx("span", { children: perk.name })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700",
            onClick: () => handleDeletePerk(perk.name),
            children: "Supprimer"
          }
        ) })
      ] }, index)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-2 text-center", children: "Aucun perk trouvé." }) }) })
    ] })
  ] });
};
const AdminProperties = () => {
  const [places, setPlaces] = useState([]);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editedPlace, setEditedPlace] = useState({});
  const API_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL}/api/admin/places`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setPlaces(response.data.data);
    }).catch((error) => console.error(error));
  }, [API_BASE_URL]);
  const handleEditPlace = (place) => {
    setEditingPlaceId(place._id);
    setEditedPlace({ ...place });
  };
  const handleSavePlace = (placeId) => {
    const confirmSave = window.confirm(
      "Êtes-vous sûr de vouloir sauvegarder les modifications ?"
    );
    if (!confirmSave) return;
    const token = localStorage.getItem("token");
    axios.put(`${API_BASE_URL}/api/admin/places/${placeId}`, editedPlace, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setPlaces(
        places.map(
          (place) => place._id === placeId ? response.data.data : place
        )
      );
      setEditingPlaceId(null);
    }).catch((error) => console.error(error));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prevPlace) => ({
      ...prevPlace,
      [name]: value
    }));
  };
  const handleDeletePlace = (placeId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette propriété ?"
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL}/api/admin/places/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setPlaces(places.filter((place) => place._id !== placeId));
    }).catch((error) => console.error(error));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Propriétés" }),
    places.map((place) => /* @__PURE__ */ jsx("div", { className: "mb-8 p-4 border rounded", children: editingPlaceId === place._id ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "title",
          value: editedPlace.title,
          onChange: handleInputChange,
          className: "p-2 border rounded mb-2 w-full",
          placeholder: "Titre"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "address",
          value: editedPlace.address,
          onChange: handleInputChange,
          className: "p-2 border rounded mb-2 w-full",
          placeholder: "Adresse"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          name: "description",
          value: editedPlace.description,
          onChange: handleInputChange,
          className: "p-2 border rounded mb-2 w-full",
          placeholder: "Description"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          name: "price",
          value: editedPlace.price,
          onChange: handleInputChange,
          className: "p-2 border rounded mb-2 w-full",
          placeholder: "Prix"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          name: "maxGuests",
          value: editedPlace.maxGuests,
          onChange: handleInputChange,
          className: "p-2 border rounded mb-2 w-full",
          placeholder: "Nombre maximum d'invités"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSavePlace(place._id),
          className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2",
          children: "Enregistrer"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setEditingPlaceId(null),
          className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2",
          children: "Annuler"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: place.title }),
      /* @__PURE__ */ jsx("p", { children: place.address }),
      /* @__PURE__ */ jsx("p", { children: place.description }),
      /* @__PURE__ */ jsxs("p", { children: [
        place.price,
        " € par nuit"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Max Guests: ",
        place.maxGuests
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleEditPlace(place),
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2",
          children: "Modifier"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDeletePlace(place._id),
          className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
          children: "Supprimer"
        }
      )
    ] }) }, place._id))
  ] });
};
const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL}/api/admin/places/reviews`
        );
        setComments(data.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires:",
          error
        );
        setLoading(false);
      }
    };
    fetchComments();
  }, [API_BASE_URL]);
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet avis ?"
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(
        `${API_BASE_URL}/api/admin/reviews/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
    }
  };
  const handleDeleteReply = async (reviewId, replyId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette réponse ?"
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(
        `${API_BASE_URL}/api/admin/reviews/${reviewId}/replies/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setComments(
        (prevComments) => prevComments.map((comment) => {
          if (comment._id === reviewId) {
            return {
              ...comment,
              replies: comment.replies.filter((reply) => reply._id !== replyId)
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la réponse:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 px-8 pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: "Modération des Commentaires" }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: comments.length > 0 ? comments.map((comment) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 border rounded", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a2 = comment.user) == null ? void 0 : _a2.name) || "Utilisateur inconnu" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-4", children: [
              "Note: ",
              comment.rating,
              " / 5"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteComment(comment._id),
              className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
              children: "Supprimer"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: comment.comment }),
        ((_b2 = comment.replies) == null ? void 0 : _b2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: comment.replies.map((reply) => {
          var _a3;
          return /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = reply.user) == null ? void 0 : _a3.name) || "Utilisateur inconnu" }),
              ": ",
              reply.comment
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteReply(comment._id, reply._id),
                className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
                children: "Supprimer"
              }
            )
          ] }, reply._id);
        }) })
      ] }, comment._id);
    }) : /* @__PURE__ */ jsx("p", { children: "Aucun commentaire pour l'instant." }) })
  ] });
};
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  location.pathname.startsWith("/admin");
  const isCommentsRoute = location.pathname === "/admin/comments";
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (user.isAdmin) {
    return children;
  }
  if (user.role === "modérateur" && isCommentsRoute) {
    return children;
  }
  return /* @__PURE__ */ jsx(Navigate, { to: "/not-authorized" });
};
function App({ initialUser, initialPlaces }) {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getItemFromLocalStorage("token")}`;
  }, []);
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: "995247677756-63hf2vtun353epm0pf9jdhcdnhsv52um.apps.googleusercontent.com", children: /* @__PURE__ */ jsx(UserProvider, { initialUser, children: /* @__PURE__ */ jsxs(PlaceProvider, { initialPlaces, children: [
    /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(IndexPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account", element: /* @__PURE__ */ jsx(ProfilePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places", element: /* @__PURE__ */ jsx(PlacesPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/new", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/:id", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/place/:id", element: /* @__PURE__ */ jsx(PlacePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/bookings", element: /* @__PURE__ */ jsx(BookingsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/bookings/:id", element: /* @__PURE__ */ jsx(SingleBookedPlace, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/infos-proprietaires", element: /* @__PURE__ */ jsx(InfosProprietaires, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/mentions-legales", element: /* @__PURE__ */ jsx(MentionsLegales, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/dashboard",
          element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminDashboard, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/users",
          element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminUsers, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/equipments",
          element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminPerks, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/properties",
          element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminProperties, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/comments",
          element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminComments, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx(ToastContainer, { autoClose: 2e3, transition: Slide }) })
  ] }) }) }) });
}
async function render(url, initialData) {
  const helmetContext = {};
  const { initialUser = null, initialPlaces = [], env = {} } = initialData;
  const app = /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: env.VITE_GOOGLE_CLIENT_ID, children: /* @__PURE__ */ jsx(UserProvider, { initialUser, children: /* @__PURE__ */ jsx(PlaceProvider, { initialPlaces, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, { initialUser, initialPlaces }) }) }) }) }) });
  const appHtml = renderToString(app);
  return {
    appHtml,
    helmet: helmetContext.helmet,
    initialData
  };
}
export {
  render
};
//# sourceMappingURL=entry-server.js.map
