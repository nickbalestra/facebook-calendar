import hash from "./hash";

class StyleSheet {
  constructor() {
    const tag = document.createElement("style");
    tag.type = "text/css";
    tag.appendChild(document.createTextNode(""));
    this.tag = tag;
  }

  inject() {
    document.querySelector("head").appendChild(this.tag);
  }

  insert(selector, rule) {
    if (![].some.call(this.tag.childNodes, el => el.nodeValue === rule)) {
      this.tag.appendChild(document.createTextNode(rule));
    }
  }
}

const sheet = new StyleSheet();

const css = (...template) => {
  let cssText = "";
  const strings = template[0];
  for (var i = 1; i < template.length; i++) {
    cssText += strings[i - 1] + template[i];
  }
  cssText += strings.slice(i - 1);
  cssText = cssText.replace(/\s{2}/g, "");
  const className = hash(cssText);
  sheet.insert(`.${className}`, `.${className}{${cssText}}`);
  return className;
};

export { css, sheet };
