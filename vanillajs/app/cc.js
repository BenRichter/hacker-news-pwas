var d=document.querySelector("#app"),e=/^\/$|top|newest|show|ask|jobs/;document.body.addEventListener("click",function(a){var b=a.target;b.classList.contains("page")&&(a.preventDefault(),history.pushState({offset:0},"",""+b.getAttribute("href")),f(0,b.dataset.scope));b.classList.contains("comments")&&(a.preventDefault(),a=b["story-id"],history.pushState({a:a},"","/story/"+a),g(a))});function h(a){return fetch(a+".json").then(function(a){return a.json()})}
function m(a,b,c){c.filter(function(a){return!a.deleted}).map(n).forEach(function(c){a.appendChild(c);b&&p(c.kids,a)})}function p(a,b){a&&a.length&&Promise.all(a.map(function(a){return h("https://hacker-news.firebaseio.com/v0/item/"+a)})).then(m.bind(null,b,!0))}function n(a){var b=q("ul",{className:"kid-root","story-id":a.id},q("li",{},q("div",{className:"comment-info sub-info"},q("div",{className:"author"},a.by)),q("p",{className:"comment-text",innerHTML:a.text})));p(a.kids,b);return b}
function g(a){d.innerHTML="";h("https://hacker-news.firebaseio.com/v0/item/"+a).then(function(a){var b=q("div",{className:"story-root"},r(a,"div",!0));d.appendChild(b);Promise.all(a.kids.map(function(a){return h("https://hacker-news.firebaseio.com/v0/item/"+a)})).then(function(a){var c=q("ul",{className:"root"});m(c,!1,a);b.appendChild(c)})})}
function t(a,b){var c;b=void 0===b?0:b;c=void 0===c?30:c;return h("https://hacker-news.firebaseio.com/v0/"+a).then(function(a){return Promise.all(a.slice(b,c).map(function(a,c){return h("https://hacker-news.firebaseio.com/v0/item/"+a).then(function(a){return Object.assign(a,{idx:c+b})})}))})}function q(a,b,c){b=b?b:{};var k=document.createElement(a),l;for(l in b)k[l]=b[l];Array.from(arguments).slice(2).forEach(function(a){return k.appendChild("string"===typeof a?new Text(a):a)});return k}
function r(a,b,c){c=void 0===c?!1:c;return q(void 0===b?"li":b,{className:"story"},q("div",{className:"headline"},q("div",{hidden:void 0===a.idx},a.idx+1+"."),q("div",{},q("a",{href:a.url||"/story/"+a.id,className:"title"},a.title,q("div",{className:"sub-info"},q("div",{},a.score+" points |"),q("div",{},"by "+a.by+" |"),q("a",{"story-id":a.id,className:"comments",href:"/story/"+a.id,hidden:void 0===a.descendants},a.descendants+" comments"))))),q("div",{className:"story-text",innerHTML:a.text,hidden:!(c&&
void 0!==a.text)}))}function f(a,b){d.innerHTML="";t(b,a).then(function(a){d.appendChild(a.reduce(function(a,b){return a.appendChild(r(b))&&a},q("ul",{id:"stories"})))})}window.onpopstate=function(a){if(void 0!==a.state.offset){var b=window.location.pathname.match(e);f(a.state.offset,("/"===b[0]?"top":b[0])+"stories")}else g(a.state.a)};
if(match=window.location.pathname.match(e)){var u="/"===match[0]?"top":match[0];history.replaceState({offset:0},"","/"+u);f(0,u+"stories")}else{var v=window.location.pathname.match(/story\/(\d+)/)[1];history.pushState({a:v},"","/story/"+v);g(v)};
