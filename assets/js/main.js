"use strict";
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/window.$clamp=function(t,e){function n(t,e){return s.getComputedStyle||(s.getComputedStyle=function(t,e){return this.el=t,this.getPropertyValue=function(e){var n=/(\-([a-z]){1})/g;return"float"==e&&(e="styleFloat"),n.test(e)&&(e=e.replace(n,(function(t,e,n){return n.toUpperCase()}))),t.currentStyle&&t.currentStyle[e]?t.currentStyle[e]:null},this}),s.getComputedStyle(t,null).getPropertyValue(e)}function o(e){e=e||t.clientHeight;var n=l(t);return Math.max(Math.floor(e/n),0)}function l(t){var e=n(t,"line-height");return"normal"==e&&(e=1.2*parseInt(n(t,"font-size"))),parseInt(e)}function a(e){return e.lastChild.children&&0<e.lastChild.children.length?a(Array.prototype.slice.call(e.children).pop()):e.lastChild&&e.lastChild.nodeValue&&""!=e.lastChild.nodeValue&&e.lastChild.nodeValue!=c.truncationChar?e.lastChild:(e.lastChild.parentNode.removeChild(e.lastChild),a(t))}function i(t,e){t.nodeValue=e+c.truncationChar}e=e||{};var r,s=window,c={clamp:e.clamp||2,useNativeClamp:void 0===e.useNativeClamp||e.useNativeClamp,splitOnChars:e.splitOnChars||[".","-","–","—"," "],animate:e.animate||!1,truncationChar:e.truncationChar||"…",truncationHTML:e.truncationHTML},u=t.style,d=t.innerHTML,m=void 0!==t.style.webkitLineClamp,p=c.clamp,h=p.indexOf&&(-1<p.indexOf("px")||-1<p.indexOf("em"));c.truncationHTML&&((r=document.createElement("span")).innerHTML=c.truncationHTML);var f,C,v,g,y=c.splitOnChars.slice(0),b=y[0];return"auto"==p?p=o():h&&(p=o(parseInt(p))),m&&c.useNativeClamp?(u.overflow="hidden",u.textOverflow="ellipsis",u.webkitBoxOrient="vertical",u.display="-webkit-box",u.webkitLineClamp=p,h&&(u.height=c.clamp+"px")):(g=p,(u=l(t)*g)<=t.clientHeight&&(v=function e(n,o){if(o){var l=n.nodeValue.replace(c.truncationChar,"");if(f||(b=0<y.length?y.shift():"",f=l.split(b)),1<f.length?(C=f.pop(),i(n,f.join(b))):f=null,r&&(n.nodeValue=n.nodeValue.replace(c.truncationChar,""),t.innerHTML=n.nodeValue+" "+r.innerHTML+c.truncationChar),f){if(t.clientHeight<=o){if(!(0<=y.length&&""!=b))return t.innerHTML;i(n,f.join(b)+b+C),f=null}}else""==b&&(i(n,""),n=a(t),y=c.splitOnChars.slice(0),b=y[0],C=f=null);if(!c.animate)return e(n,o);setTimeout((function(){e(n,o)}),!0===c.animate?10:c.animate)}}(a(t),u))),{original:d,clamped:v}},function(){var t=document.getElementById("menu-btn"),e=document.getElementById("mobile-menu"),n=document.body,o=!1;t.addEventListener("click",(function(){o?(t.classList.remove("close"),e.classList.remove("show"),n.classList.remove("mobile-menu"),o=!1):(t.classList.add("close"),e.classList.add("show"),n.classList.add("mobile-menu"),o=!0)}))}(),Array.from(document.querySelectorAll(".clamp-excerpt p")).forEach((function(t){return $clamp(t,{clamp:4})})),$((function(){$('[data-toggle="tooltip"]').tooltip()})),document.getElementById("copyrightYear").textContent=(new Date).getFullYear(),function(){var t=$(".email"),e=t.first().data("email"),n=t.attr("title");document.addEventListener("click",(function(t){var o,l,a=$(t.target).closest(".email");0!==a.length&&(t.preventDefault(),o=e,l=document.createElement("input"),document.body.appendChild(l),l.setAttribute("value",o),l.select(),document.execCommand("copy"),!0,document.body.removeChild(l),a.tooltip("dispose").first().attr("title","Copied!").tooltip().tooltip("show"),setTimeout((function(){a.tooltip("dispose").first().attr("title",n).tooltip()}),1e3))}))}(),function(){var t=document.getElementById("about");if(t){var e=document.getElementById("my-photo"),n=1200,o=document.getElementById("about-blog-first-section"),l=document.getElementById("about-me-first-section"),a=new IntersectionObserver((function(t){t.forEach((function(t){var e=t.target,n=t.isIntersecting;e.classList.contains("show-on-scroll")?n?$(e).addClass("shown").removeClass("hidden"):$(e).removeClass("shown").addClass("hidden"):e.classList.contains("my-photo")&&(n?$(e).removeClass("blurred").addClass("unblurred"):$(e).addClass("blurred").removeClass("unblurred"))}))}),{rootMargin:"0px",threshold:0});Array.from(t.querySelectorAll(".show-on-scroll")).forEach((function(t){a.observe(t)})),a.observe(e),document.getElementById("meet").addEventListener("click",(function(t){$("html, body").animate({scrollTop:$(e).offset().top},n)})),document.addEventListener("click",(function(t){var e=$(t.target);0!==e.closest(".move-to-about-me-section").length?$("html, body").animate({scrollTop:$(l).offset().top},n):0!==e.closest(".move-to-blog-description").length?$("html, body").animate({scrollTop:$(o).offset().top},n):0!==e.closest(".navigation-arrow").length&&$("html, body").animate({scrollTop:e.closest(".paragraph").next(".paragraph").offset().top},n)}))}}();