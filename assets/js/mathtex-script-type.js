// Mostly copied from https://github.com/KaTeX/KaTeX/tree/main/contrib/mathtex-script-type
// Options for global command definitions added by @pdmosses

// import katex from "katex";

      // "\\bit": "\\{0,1\\}",
      // "\\bits": "\\bit^\\ast",
// const macros = {
//       "\\set": "\\{#1\\}",
//       "\\bit": "{0,1}",
//       "\\testmacro": "tesmacro",
//       "\\bits": "\\bit^\\ast",
//       "\\N": "\\mathbb{N}",
//       "\\eps": "\\epsilon",
//       "\\poly": "\\mathrm{poly}",
//       "\\Supp": "\\mathrm{Supp}",
//       "\\E": "\\mathop{\\mathbb{E}}",
//       "\\ceil": "{\\left\\lceil #1 \\right\\rceil}",
//       "\\floor": "{\\left\\lfloor #1 \\right\\rfloor}",
//       "\\cA": "\\mathcal{A}",
//       "\\cB": "\\mathcal{B}",
//       "\\cC": "\\mathcal{C}",
//       "\\cD": "\\mathcal{D}",
//       "\\cH": "\\mathcal{H}",
//       "\\cK": "\\mathcal{K}",
//       "\\cM": "\\mathcal{M}",
//       "\\cO": "\\mathcal{O}",
//       "\\cX": "\\mathcal{X}",
//       "\\cY": "\\mathcal{Y}",
//       "\\cZ": "\\mathcal{Z}",
//       "\\Gen": "\\mathsf{Gen}",
//       "\\pk": "\\mathit{pk}",
//       "\\sk": "\\mathit{sk}",
//     };

let scripts = document.body.getElementsByTagName("script");
scripts = Array.prototype.slice.call(scripts);
scripts.forEach(function(script) {
    if (!script.type || !script.type.match(/math\/tex/i)) {
        return -1;
    }
    const display =
          (script.type.match(/mode\s*=\s*display(;|\s|\n|$)/) != null);

    const katexElement = document.createElement(display ? "div" : "span");
    katexElement.setAttribute("class",
                              display ? "equation" : "inline-equation");
    try {
        katex.render(script.text, katexElement, {
          displayMode: display,
          globalGroup: true,
          trust: true,   // [WK: to enable htmlId and href, see below]
          strict: false, // [WK: https://katex.org/docs/support_table.html]
          throwOnError: false,
          macros
        });
    } catch (err) {
        //console.error(err); linter doesn't like this
        katexElement.textContent = script.text;
    }
    script.parentNode.replaceChild(katexElement, script);
});