---
metatable: true
vaultPath: 笔记
searchType: tags
searchText: flexible
searchColor: All
searchTag: 📝/意义
searchCodePro0: i
searchCodePro1: r
searchCodePro2: y
searchCodePro3: i
obsidianUIMode: preview
---

```dataviewjs
/*
Author: Darkluna
Date: 202302240318
Issue: https://github.com/Darkluna999/IFPM-OB-Pub
*/
// 时间记录器
class Timer {
  constructor() {
    this.times = [];
  }
  stamp() {
    this.times.push(new Date().getTime());
  }
  log() {
    for (let i = 0; i < this.times.length - 1; i++) {
      console.log(`Step ${i + 1}: ${this.times[i + 1] - this.times[i]} ms`);
    }
    console.log(`Total time: ${this.times[this.times.length - 1] - this.times[0]} ms`);
  }
}
const timer = new Timer();
timer.stamp();
const metaeditEnabled = app.plugins.enabledPlugins.has("metaedit");
const thisFile = dv.pages().where((f) => f.file.path == dv.current().file.path);
// YAML数据
const {
  vaultPath, // 目录地址
  searchTag,
  searchType,
  searchText,
  searchColor,
  searchCodePro1,
  searchCodePro2,
  searchCodePro0,
  searchCodePro3
} = dv.current();
// colorSystem
const colorSystem = [
  { text: "全色", value: "all", hex: "All" },
  { text: "黄色", value: "yellow", hex: "ffd400" },
  { text: "红色", value: "red", hex: "ff6666" },
  { text: "绿色", value: "green", hex: "5fb236" },
  { text: "蓝色", value: "blue", hex: "2ea8e5" },
  { text: "紫色", value: "purple", hex: "a28ae5" },
  { text: "洋红色", value: "magenta", hex: "e56eee" },
  { text: "橘色", value: "orange", hex: "f19837" },
  { text: "灰色", value: "grey", hex: "aaaaaa" },
]
// 插件判定
if (metaeditEnabled == true) {
  // 拉取metaeditapi
  const { update } = this.app.plugins.plugins["metaedit"].api;
  dv.el("IFPM", "", { cls: "root" });
  // Warning
  // DataView 版本判断
  const dataViewVersion = app.plugins.plugins.dataview.manifest.version;
  if (/0\.4\./.test(dataViewVersion)) {
    dv.el(
      "p",
      `🚨 <u>当前 DataView 为 ${dataViewVersion} 版本，已不再支持，请立即更新为最新版本</u>`,
      { attr: { style: "color:red;font-weight:900;font-size:14px" } }
    );
  }
  // Tips
  // CSS版本判断提示
  const hasCss = app.customCss.extraStyleEls.some(el =>
    el.innerText.includes("/*--DKLN-V1.3.2-IFPM--*/")
  );
  if (!hasCss) {
    dv.el("p", "❇️ 搭配【最新版 IF Pro Max 配套 CSS 片段】使用效果更佳", {
      attr: { style: "color:aqua;font-size:14px" },
    });
  }
  // 通用function
  // 获取当前时间并补位格式化
  function getTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const date = String(time.getDate()).padStart(2, "0");
    const hour = String(time.getHours()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");
    const second = String(time.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${date} ${hour}_${minute}_${second}`;
  }
  // 路径选择器
  const vaultPathDropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().file.folder;
    const paths = Array.from(new Set(arr)).filter(Boolean).sort();
    paths.unshift('""');
    const dropdown = this.container.createEl("select");
    dropdown.style.width = "15em";
    paths.forEach((path, index) => {
      const opt = path;
      const el = dropdown.createEl("option");
      el.textContent = opt !== '""' ? opt : "全库检索";
      el.value = opt;
      dropdown.appendChild(el);
    });
    dropdown.selectedIndex = paths.indexOf(vaultPath.toString()) < 0 ? 0 : paths.indexOf(vaultPath.toString());
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, paths[dropdown.selectedIndex], file);
    });
    return dropdown;
  };
  // 检索类型选择器
  const searchTypeDropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const optionsText = ["标签", "颜色", "图库", "搜索", "生词语料", "高级检索"];
    const optionsValue = ["tags", "color", "image", "searchText", "searchWordLines", "searchpro"];
    const dropdown = this.container.createEl("select");
    dropdown.style.width = "8em";
    for (let i = 0; i < optionsText.length; i++) {
      const option = dropdown.createEl("option");
      option.style = "text-align: left;";
      option.text = optionsText[i];
      option.value = optionsValue[i];
      dropdown.appendChild(option);
    }
    dropdown.selectedIndex = optionsValue.indexOf(searchType);
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, optionsValue[dropdown.selectedIndex], file);
    });
    return dropdown;
  };
  // 检索颜色选择器
  const searchColorDropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const options = colorSystem
    const dropdown = this.container.createEl("select");
    dropdown.style.width = "6em";
    for (const option of options) {
      const el = dropdown.createEl("option");
      el.style = "text-align:left;";
      el.text = option.text;
      el.hex = option.hex;
    }
    dropdown.selectedIndex != null
      ? (dropdown.selectedIndex = options.findIndex((opt) => opt.hex === searchColor))
      : (dropdown.selectedIndex = 0);
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, options[dropdown.selectedIndex].hex, file);
    });
    return dropdown;
  };
  ///进阶检索颜色1
  const searchCodePro1DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const options = colorSystem;
    const dropdown = this.container.createEl("select");
    dropdown.style.width = "6em";
    dropdown.style.textAlign = "center";
    options.forEach((option) => {
      const el = dropdown.createEl("option");
      el.style.textAlign = "left";
      el.text = option.text;
      el.value = option.value;
    });
    dropdown.selectedIndex = options.findIndex((option) => option.value === searchCodePro1);
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, evt.target.value, file);
    });
    return dropdown;
  };
  ///进阶检索颜色2
  const searchCodePro2DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const options = colorSystem;
    const dropdown = this.container.createEl("select");
    dropdown.style.width = "6em";
    dropdown.style.textAlign = "center";
    options.forEach((option) => {
      const el = dropdown.createEl("option");
      el.style.textAlign = "left";
      el.text = option.text;
      el.value = option.value;
    });
    dropdown.selectedIndex = options.findIndex((option) => option.value === searchCodePro2);
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, evt.target.value, file);
    });
    return dropdown;
  };
  ///进阶基础模式选择器
  const searchCodePro3DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const options = [
      { text: "图", value: "i" },
      { text: "标签", value: "t" },
    ];
    const dropdown = this.container.createEl("select");
    dropdown.style = "width:6em;text-align:center";
    options.forEach((option) => {
      const elOption = dropdown.createEl("option");
      elOption.style = "text-align: left;";
      elOption.text = option.text;
      elOption.value = option.value;
    });
    dropdown.selectedIndex = options.findIndex((option) => option.value === searchCodePro3) || 0;
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, options[dropdown.selectedIndex].value, file);
    });
    return dropdown;
  };
  ///进阶文本关键字检索
  const inputMaker = (pn, input_value, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const input = this.container.createEl("input");
    input.setAttribute("name", "input");
    input.setAttribute("id", pn);
    input.setAttribute("placeholder", "输入后回车生效");
    input.setAttribute("value", input_value);
    input.addEventListener("keyup", async function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        await update(pn, this.value, file);
      }
    });
    return input;
  };
  ///进阶附加模式选择器
  const searchCodePro0DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const options = [
      { text: "图", value: "i" },
      { text: "注释", value: "n" },
      { text: "标签", value: "t" },
    ];
    const dropdown = this.container.createEl("select");
    dropdown.style = "width:6em;text-align:center";
    options.forEach((option) => {
      const el = dropdown.createEl("option");
      el.style = "text-align: left;";
      el.text = option.text;
      el.value = option.value;
    });
    dropdown.selectedIndex = options.findIndex((option) => option.value === searchCodePro0);
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, evt.target.value, file);
    });
    return dropdown;
  };
  ///标签选择器
  const tagsDropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().filter((t) => t.file.path.includes(vaultPath))
      .file.tags;
    const tags = Array.from(new Set(arr))
      .filter((t) => t.includes("📝/") || t.includes("🤖️/"))
      .sort((a, b) => { return a.localeCompare(b, "zh"); });
    tags.unshift("#");
    const dropdown = this.container.createEl("select");
    tags.forEach((tag, index) => {
      let opt = tag;
      let el = dropdown.createEl("option");
      opt != "#" ? (el.textContent = opt) : (el.textContent = "全部注释标签");
      el.value = opt;
      dropdown.appendChild(el);
    });
    tags.indexOf("#" + searchTag) < 0
      ? (dropdown.selectedIndex = 0)
      : (dropdown.selectedIndex = tags.indexOf("#" + searchTag));
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, tags[dropdown.selectedIndex].slice(1), file);
    });
    return dropdown;
  };
  /// 生词语料
  const searchWordLinesMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().filter((t) => t.file.path.includes(vaultPath))
      .file.tags;
    const tags = Array.from(new Set(arr))
      .filter((t) => t.includes("🔠/"))
      .sort((a, b) => { return a.localeCompare(b, "zh"); });
    tags.unshift("#");
    const dropdown = this.container.createEl("select");
    tags.forEach((tag, index) => {
      let opt = tag;
      let el = dropdown.createEl("option");
      opt != "#" ? (el.textContent = opt) : (el.textContent = "全部生词语料");
      el.value = opt;
      dropdown.appendChild(el);
    });
    tags.indexOf("#" + searchTag) < 0
      ? (dropdown.selectedIndex = 0)
      : (dropdown.selectedIndex = tags.indexOf("#" + searchTag));
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, tags[dropdown.selectedIndex].slice(1), file);
    });
    return dropdown;
  };
  ///图片标签选择器1
  const imageDropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().filter((t) => t.file.path.includes(vaultPath))
      .file.tags;
    const tags = Array.from(new Set(arr))
      .filter((t) => t.includes("📷/"))
      .sort((a, b) => { return a.localeCompare(b, "zh"); });
    tags.unshift("#");
    const dropdown = this.container.createEl("select");
    tags.forEach((tag, index) => {
      let opt = tag;
      let el = dropdown.createEl("option");
      opt != "#" ? (el.textContent = opt) : (el.textContent = "全部图片标签");
      el.value = opt;
      dropdown.appendChild(el);
    });
    tags.indexOf("#" + searchTag) < 0
      ? (dropdown.selectedIndex = 0)
      : (dropdown.selectedIndex = tags.indexOf("#" + searchTag));
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, tags[dropdown.selectedIndex].slice(1), file);
    });
    return dropdown;
  };
  ///进阶笔记标签选择器1
  const tag1DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().filter((t) => t.file.path.includes(vaultPath))
      .file.tags;
    const tags = Array.from(new Set(arr))
      .filter((t) => t.includes("📝/"))
      .sort((a, b) => { return a.localeCompare(b, "zh"); });
    tags.unshift("#");
    const dropdown = this.container.createEl("select");
    tags.forEach((tag, index) => {
      let opt = tag;
      let el = dropdown.createEl("option");
      opt != "#" ? (el.textContent = opt) : (el.textContent = "全部注释标签");
      el.value = opt;
      dropdown.appendChild(el);
    });
    tags.indexOf("#" + searchCodePro1) < 0
      ? (dropdown.selectedIndex = 0)
      : (dropdown.selectedIndex = tags.indexOf("#" + searchCodePro1));
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, tags[dropdown.selectedIndex].slice(1), file);
    });
    return dropdown;
  };
  ///进阶笔记标签选择器2
  const tag2DropdownMaker = (pn, fpath) => {
    const file = this.app.vault.getAbstractFileByPath(fpath);
    const arr = dv.pages().filter((t) => t.file.path.includes(vaultPath))
      .file.tags;
    const tags = Array.from(new Set(arr))
      .filter((t) => t.includes("📝/"))
      .sort((a, b) => { return a.localeCompare(b, "zh"); });
    tags.unshift("#");
    const dropdown = this.container.createEl("select");
    tags.forEach((tag, index) => {
      let opt = tag;
      let el = dropdown.createEl("option");
      opt != "#" ? (el.textContent = opt) : (el.textContent = "全部注释标签");
      el.value = opt;
      dropdown.appendChild(el);
    });
    tags.indexOf("#" + searchCodePro2) < 0
      ? (dropdown.selectedIndex = 0)
      : (dropdown.selectedIndex = tags.indexOf("#" + searchCodePro2));
    dropdown.addEventListener("change", async (evt) => {
      evt.preventDefault();
      await update(pn, tags[dropdown.selectedIndex].slice(1), file);
    });
    return dropdown;
  };
  ///输出渲染
  dv.el("IFPM", "", { cls: "dvcards" });
  dv.el("b", "检索路径:&emsp;");
  vaultPathDropdownMaker("vaultPath", dv.current().file.path);
  dv.el("br", ""); dv.el("br", "");
  dv.el("b", "检索类型:&emsp;");
  searchTypeDropdownMaker("searchType", dv.current().file.path);
  ///基础检索
  if (["color", "tags", "image", "searchWordLines"].includes(searchType)) {
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "选项:&emsp;&emsp;&emsp;");
  }
  ///检索类型判断
  if (searchType === "tags") {
    tagsDropdownMaker("searchTag", dv.current().file.path);
  } else if (searchType === "searchWordLines") {
    searchWordLinesMaker("searchTag", dv.current().file.path);
  } else if (searchType === "color") {
    searchColorDropdownMaker("searchColor", dv.current().file.path);
  } else if (searchType === "image") {
    imageDropdownMaker("searchTag", dv.current().file.path);
  } else if (searchType === "searchText") {
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "当前检索文本为:&emsp;");
    inputMaker("searchText", searchText, dv.current().file.path);
  } else if (searchType === "searchpro") {
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "基础类型:&emsp;");
    searchCodePro0DropdownMaker("searchCodePro0", dv.current().file.path);
    if (searchCodePro0 == "n") {
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "注释颜色:&emsp;");
      searchCodePro1DropdownMaker("searchCodePro1", dv.current().file.path);
    } else if (searchCodePro0 == "i") {
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "图片颜色:&emsp;");
      searchCodePro1DropdownMaker("searchCodePro1", dv.current().file.path);
    } else if (searchCodePro0 == "t") {
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "选择标签:&emsp;");
      tag1DropdownMaker("searchCodePro1", dv.current().file.path);
    } else {
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "--->【请选择支持的选项组合】<---");
    }
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "附加类型:&emsp;");
    searchCodePro3DropdownMaker("searchCodePro3", dv.current().file.path);
    if (searchCodePro0 == "t" && searchCodePro3 == "t") {//tt
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "选择标签:&emsp;");
      tag2DropdownMaker("searchCodePro2", dv.current().file.path);
    } else if (searchCodePro0 == "n" && searchCodePro3 == "t") {//nt
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "选择标签:&emsp;");
      tagsDropdownMaker("searchTag", dv.current().file.path);
    }
    else if (searchCodePro0 == "i" && searchCodePro3 == "t") {//it
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "选择标签:&emsp;");
      imageDropdownMaker("searchTag", dv.current().file.path);
    } else if (searchCodePro0 != "i" && searchCodePro3 == "i") {//Xi
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "图片颜色:&emsp;");
      searchCodePro2DropdownMaker("searchCodePro2", dv.current().file.path);
    } else if (searchCodePro0 == "i" && searchCodePro3 == "i") {//ii
      dv.el("br", ""); dv.el("br", "");
      dv.el("b", "图片标签:&emsp;");
      imageDropdownMaker("searchTag", dv.current().file.path);
    }
  } else {
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "--->【请选择支持的选项组合】<---");
  }
  ///检索式生成
  let sCode = "";
  let sQuery = "";
  if (searchType === "searchText" && searchText != null) {
    let regex = searchText;
    if (searchText[0] == "/" && searchText[searchText.length - 1] == "/") {
      sCode = `正则【${searchText}】`;
      regex = new RegExp(searchText.substring(1, searchText.length - 1), "gi");
    } else {
      sCode = `文本【${searchText}】`;
      regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
    }
    sQuery = `line.substring(63).replace(/\\(\\[p.*?(\\)\\))/,"").replace(/<\\/span>/,"").match(${regex}) && line.includes("> <span class=");`;
  }

  const colorNames = {};
  for (const color of colorSystem) {
    colorNames[color.hex] = color.text;
  }

  let color = colorNames[searchColor];

  // 做得很好，接下来在优化过程中可以使用之前给你的变量colorSystem
  if (searchType == "color") {
    if (searchColor == "All") {
      sCode = "全部颜色注释";
      sQuery = 'line.includes("background-color: #")';
    } else {
      sCode = "【" + color + "】注释";
      sQuery =
        'line.includes("background-color: #' + dv.current().searchColor + '")';
    }
  }
  else if (searchType == "image") {
    if (dv.current().searchTag == null) {
      sCode = "全部图片";
      sQuery = 'line.includes("image#")';
    } else {
      sCode = "标记 #" + searchTag + " 的图片";
      sQuery = 'line.includes("#' +
        dv.current().searchTag +
        '")&&line.includes("span class=\\"image")';
    }
  }
  else if (searchType == "tags") {
    if (dv.current().searchTag == null) {
      sCode = "全部含标签的注释";
      sQuery = 'line.includes("🏷️ #📝")&&line.includes("span class=")';
    } else {
      sCode = "含 #" + searchTag + " 标签的注释";
      sQuery =
        'line.includes("#' +
        dv.current().searchTag +
        '")&&line.includes("span class=")';
    }
  } else if (searchType == "searchWordLines") {
    if (dv.current().searchTag == null) {
      sCode = "全部语料";
      sQuery = 'line.includes("span class=\\"vocabulary\\"")';
    } else {
      sCode = "标记为 #" + searchTag + " 的生词语料";
      sQuery =
        'line.includes("#' +
        dv.current().searchTag +
        '")&&line.includes("span class=")';
    }
  }
  ///进阶检索检索式
  else if (searchType == "searchpro") {
    // ["全色", "红色", "橙色", "黄色", "蓝色", "绿色", "紫色", "品红", "灰色"]
    // ["all", "red", "orange", "yellow", "blue", "green", "purple", "magenta", "grey"];
    // ["All", "ff6666", "f19837", "ffd400", "2ea8e5", "5fb236", "a28ae5", "e56eee", "aaaaaa",];
    if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#")'; sCode = "同时显示红色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#")'; sCode = "同时显示黄色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#")'; sCode = "同时显示绿色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#")'; sCode = "同时显示蓝色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#")'; sCode = "同时显示橙色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#")'; sCode = "同时显示品红注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#")'; sCode = "同时显示灰色注释和全色图"; }
    // 红色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#ff6666")'; sCode = "同时显示红色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#ffd400")'; sCode = "同时显示红色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#5fb236")'; sCode = "同时显示红色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#2ea8e5")'; sCode = "同时显示红色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#a28ae5")'; sCode = "同时显示红色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#f19837")'; sCode = "同时显示红色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#e56eee")'; sCode = "同时显示红色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#aaaaaa")'; sCode = "同时显示红色注释和灰色图"; }
    // 橙色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#ff6666")'; sCode = "同时显示橙色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#ffd400")'; sCode = "同时显示橙色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#5fb236")'; sCode = "同时显示橙色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#2ea8e5")'; sCode = "同时显示橙色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#a28ae5")'; sCode = "同时显示橙色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#f19837")'; sCode = "同时显示橙色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#e56eee")'; sCode = "同时显示橙色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#aaaaaa")'; sCode = "同时显示橙色注释和灰色图"; }
    // 黄色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#ffd400")'; sCode = "同时显示黄色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#5fb236")'; sCode = "同时显示黄色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#2ea8e5")'; sCode = "同时显示黄色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#a28ae5")'; sCode = "同时显示黄色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#f19837")'; sCode = "同时显示黄色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#e56eee")'; sCode = "同时显示黄色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#aaaaaa")'; sCode = "同时显示黄色注释和灰色图"; }
    // 绿色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#ff6666")'; sCode = "同时显示绿色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#ffd400")'; sCode = "同时显示绿色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#5fb236")'; sCode = "同时显示绿色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#2ea8e5")'; sCode = "同时显示绿色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#a28ae5")'; sCode = "同时显示绿色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#f19837")'; sCode = "同时显示绿色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#e56eee")'; sCode = "同时显示绿色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#aaaaaa")'; sCode = "同时显示绿色注释和灰色图"; }
    // 蓝色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#ff6666")'; sCode = "同时显示蓝色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#ffd400")'; sCode = "同时显示蓝色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#5fb236")'; sCode = "同时显示蓝色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#2ea8e5")'; sCode = "同时显示蓝色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#a28ae5")'; sCode = "同时显示蓝色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#f19837")'; sCode = "同时显示蓝色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#e56eee")'; sCode = "同时显示蓝色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#aaaaaa")'; sCode = "同时显示蓝色注释和灰色图"; }
    // 紫色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#ff6666")'; sCode = "同时显示紫色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#ffd400")'; sCode = "同时显示紫色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#5fb236")'; sCode = "同时显示紫色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#a28ae5")'; sCode = "同时显示紫色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#2ea8e5")'; sCode = "同时显示紫色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#f19837")'; sCode = "同时显示紫色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#e56eee")'; sCode = "同时显示紫色注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#aaaaaa")'; sCode = "同时显示紫色注释和灰色图"; }
    // 品红注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#e56eee")'; sCode = "同时显示品红注释和品红图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#ffd400")'; sCode = "同时显示品红注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#5fb236")'; sCode = "同时显示品红注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#2ea8e5")'; sCode = "同时显示品红注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#a28ae5")'; sCode = "同时显示品红注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#ff6666")'; sCode = "同时显示品红注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#ff6666")'; sCode = "同时显示品红注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#aaaaaa")'; sCode = "同时显示品红注释和灰色图"; }
    //灰色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "grey" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#aaaaaa")'; sCode = "同时显示灰色注释和灰色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#ff6666")'; sCode = "同时显示灰色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "orange" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#f19837")'; sCode = "同时显示灰色注释和橙色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#ffd400")'; sCode = "同时显示灰色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#2ea8e5")'; sCode = "同时显示灰色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#5fb236")'; sCode = "同时显示灰色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#a28ae5")'; sCode = "同时显示灰色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "magenta" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#e56eee")'; sCode = "同时显示灰色注释和品红图"; }
    // 全色注释某色图
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#")'; sCode = "同时显示全色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "red" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#ff6666")'; sCode = "同时显示全色注释和红色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "yellow" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#ffd400")'; sCode = "同时显示全色注释和黄色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "green" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#5fb236")'; sCode = "同时显示全色注释和绿色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "blue" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#2ea8e5")'; sCode = "同时显示全色注释和蓝色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchCodePro2 == "purple" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #")||line.includes("image#a28ae5")'; sCode = "同时显示全色注释和紫色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#")'; sCode = "同时显示紫色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("image#")'; sCode = "同时显示灰色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #f19837")||line.includes("image#")'; sCode = "同时显示橙色注释和全色图"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchCodePro2 == "all" && searchCodePro3 == "i") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("image#")'; sCode = "同时显示品红注释和全色图"; }
    // 某签某色注释
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #ffd400")&&line.includes("#' + searchTag + '")'; sCode = "黄色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #5fb236")&&line.includes("#' + searchTag + '")'; sCode = "绿色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #2ea8e5")&&line.includes("#' + searchTag + '")'; sCode = "蓝色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #a28ae5")&&line.includes("#' + searchTag + '")'; sCode = "紫色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #ff6666")&&line.includes("#' + searchTag + '")'; sCode = "红色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #aaaaaa")&&line.includes("#' + searchTag + '")'; sCode = "灰色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #f19837")&&line.includes("#' + searchTag + '")'; sCode = "橙色注释且具有 #" + searchTag + " 标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #e56eee")&&line.includes("#' + searchTag + '")'; sCode = "品红注释且具有 #" + searchTag + " 标签的注释"; }
    // 某色注释全签图
    else if (searchCodePro0 == "n" && searchCodePro1 == "purple" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #a28ae5")||line.includes("🏷️ #📝")'; sCode = "同时显示紫色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "yellow" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #ffd400")||line.includes("🏷️ #📝")'; sCode = "同时显示黄色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "green" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #5fb236")||line.includes("🏷️ #📝")'; sCode = "同时显示绿色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "blue" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("🏷️ #📝")'; sCode = "同时显示蓝色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "red" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #ff6666")||line.includes("🏷️ #📝")'; sCode = "同时显示红色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "grey" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #aaaaaa")||line.includes("🏷️ #📝")'; sCode = "同时显示灰色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "orange" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #f19837")||line.includes("🏷️ #📝")'; sCode = "同时显示橙色注释和所有带标签的注释"; }
    else if (searchCodePro0 == "n" && searchCodePro1 == "magenta" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #e56eee")||line.includes("🏷️ #📝")'; sCode = "同时显示品红注释和所有带标签的注释"; }
    // 某签某色图
    else if (searchCodePro0 == "i" && searchCodePro1 == "red" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#ff6666")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【红色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "yellow" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#ffd400")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【黄色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "green" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#5fb236")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【绿色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "blue" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#2ea8e5")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【蓝色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "purple" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#a28ae5")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【紫色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "grey" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#aaaaaa")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【灰色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "orange" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#f19837")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【橙色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "magenta" && searchTag != null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#e56eee")&&line.includes("#' + searchTag + '")'; sCode = "显示带有 #" + searchTag + " 标签的【品红】图"; }
    // 某色某签图片
    else if (searchCodePro0 == "i" && searchCodePro1 == "red" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#ff6666")&&line.includes("#' + searchTag + '")'; sCode = "红色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "yellow" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#ffd400")&&line.includes("#' + searchTag + '")'; sCode = "黄色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "green" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#5fb236")&&line.includes("#' + searchTag + '")'; sCode = "绿色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "blue" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#2ea8e5")&&line.includes("#' + searchTag + '")'; sCode = "蓝色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "purple" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#a28ae5")&&line.includes("#' + searchTag + '")'; sCode = "紫色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "grey" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#aaaaaa")&&line.includes("#' + searchTag + '")'; sCode = "灰色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "orange" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#f19837")&&line.includes("#' + searchTag + '")'; sCode = "橙色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "magenta" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#e56eee")&&line.includes("#' + searchTag + '")'; sCode = "品红色且具有 #" + searchTag + " 标签的图片"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "all" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("image#")&&line.includes("#' + searchTag + '")'; sCode = "全色且具有 #" + searchTag + " 标签的图片"; }
    // 某色图全签注释
    else if (searchCodePro0 == "i" && searchCodePro1 == "red" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#ff6666")||line.includes("🏷️ #📝")'; sCode = "同时显示红色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "yellow" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#ffd400")||line.includes("🏷️ #📝")'; sCode = "同时显示黄色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "green" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#5fb236")||line.includes("🏷️ #📝")'; sCode = "同时显示绿色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "blue" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#2ea8e5")||line.includes("🏷️ #📝")'; sCode = "同时显示蓝色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "purple" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#a28ae5")||line.includes("🏷️ #📝")'; sCode = "同时显示紫色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "grey" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#aaaaaa")||line.includes("🏷️ #📝")'; sCode = "同时显示灰色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "orange" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#f19837")||line.includes("🏷️ #📝")'; sCode = "同时显示橙色图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "magenta" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#e56eee")||line.includes("🏷️ #📝")'; sCode = "同时显示品红图和所有带标签的注释"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "all" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#")||line.includes("🏷️ #📝")'; sCode = "同时显示全色图和所有带标签的注释"; }
    // 全部某色图
    else if (searchCodePro0 == "i" && searchCodePro1 == "red" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#ff6666")'; sCode = "全部【红色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "yellow" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#ffd400")'; sCode = "全部【黄色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "green" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#5fb236")'; sCode = "全部【绿色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "blue" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#2ea8e5")'; sCode = "全部【蓝色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "purple" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#a28ae5")'; sCode = "全部【紫色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "grey" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#aaaaaa")'; sCode = "全部【灰色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "orange" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#f19837")'; sCode = "全部【橙色】图"; }
    else if (searchCodePro0 == "i" && searchCodePro1 == "magenta" && searchTag == null && searchCodePro3 == "i") { sQuery = 'line.includes("class=\\"image#e56eee")'; sCode = "全部【品红】图"; }
    // 某签图
    else if (searchCodePro0 == "i" && searchCodePro1 == "all" && searchTag != null && searchCodePro3 == "t") { sQuery = 'line.includes("class=\\"image#")&&line.includes("#' + searchTag + '")'; sCode = "全部具有 #" + searchTag + " 标签的图"; }
    // 全签注释
    else if (searchCodePro0 == "n" && searchCodePro1 == "all" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("background-color: #")&&line.includes("🏷️ #📝")'; sCode = "全部有标签的注释"; }
    // 全色图全签注释
    else if (searchCodePro0 == "i" && searchCodePro1 == "all" && searchTag == null && searchCodePro3 == "t") { sQuery = 'line.includes("image#")||line.includes("🏷️ #📝")'; sCode = "同时显示全色图和所有带标签的注释"; }
    // 双标签
    else if (searchCodePro0 == "t" && searchCodePro2 != null && searchCodePro3 != null && searchCodePro2 != "all" && searchCodePro2 != "red" && searchCodePro2 != "green" && searchCodePro2 != "blue" && searchCodePro2 != "yellow" && searchCodePro2 != "purple" && searchCodePro3 != "all" && searchCodePro2 != "red" && searchCodePro3 != "yellow" && searchCodePro3 != "blue" && searchCodePro3 != "green" && searchCodePro3 != "purple" && searchCodePro3 == "t") { sQuery = 'line.includes("#' + searchCodePro1 + '")&&line.includes("#' + searchCodePro2 + '")&&line.includes("<span ")'; sCode = "同时具有【" + searchCodePro1 + "】和【" + searchCodePro2 + "】标签的注释"; }
  }
  ///检索式判断
  if (sQuery == "") {
    dv.el("br", ""); dv.el("br", "");
    dv.el("b", "--->【请选择支持的选项组合】<---");
  }
  ///笔记拆分检索计算
  const files = app.vault.getMarkdownFiles();
  const path = files
    .filter((file) => file.parent.path.includes(vaultPath) && file.basename.includes("_KEY-"))
    .sort((a, b) => a.stat.ctime - b.stat.ctime);
  const arr = await Promise.all(
    path.map(async (file) => {
      const content = await app.vault.cachedRead(file);
      let lines = await content.split(/\n\^KEY.{8}\n/).filter((line) => eval(sQuery));

      if (app.plugins.plugins.dataview.manifest.version.match(/0\.4\./)) {
        lines = lines.map((line) => line + "</p>");
      }
      return ["[[" + file.basename + "]]", lines];
    })
  );
  ///结果渲染
  Promise.all(arr)
    .then((values) => {
      const exists = values.filter((value) => value[1].length > 0);
      const outPages = exists.reduce((total, value) => total + value[1].length, 0);
      dv.el("p", "");
      dv.el("b", `检索条件: ${sCode}`);
      dv.el("br");
      dv.el("b", `检索结果: 文献共计*[${exists.length}]*篇 笔记共计 *[${outPages}]* 条`);
      dv.el("br", ""); dv.el("br", "");
      ///导出模块
      ///移动端判断
      if (!app.isMobile) {
        let exportButton = document.createElement("a");
        let content = `> [!info] Meta\n> 检索条件: ${sCode}\n> 检索结果: 文献共计*[${exists.length}]*篇 笔记共计 *[${outPages}]* 条\n\n`;
        for (let z = 0; z < exists.length; z++) {
          const [basename, lines] = exists[z];
          content +=
            ">[!note]- " +
            basename.substring(0, basename.length - 2) +
            "|" +
            basename.substring(2, basename.length - 15) +
            "]]";
          content += lines.join("> ") + "\n\n";
        }
        let ba64 =
          "data:text/plain;base64," +
          Buffer.from(content, "utf-8").toString("base64");
        exportButton.innerHTML = "导出笔记";
        exportButton.href = ba64;
        exportButton.download = "IFPM Export " + getTime() + ".md";
        dv.el("center", exportButton, { cls: "exportButton" });
        dv.el("br", "");
      }
      ///表格渲染
      dv.table(["文献", "笔记"], exists);
    });
}
///插件不全
else {
  dv.el("br", "");
  dv.el("b", "# 请安装并启用插件【MetaEdit】");
}
timer.stamp();
timer.log();
```