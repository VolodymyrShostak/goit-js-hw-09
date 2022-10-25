const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");let r=null;t.addEventListener("click",(()=>{r=setInterval((()=>{o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(r)}));
//# sourceMappingURL=01-color-switcher.5b6812f1.js.map
