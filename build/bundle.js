var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,i;function l(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function u(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function $(){return m(" ")}function p(){return m("")}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function y(t){i=t}function x(t){(function(){if(!i)throw new Error("Function called outside component initialization");return i})().$$.on_mount.push(t)}const b=[],v=[],w=[],_=[],k=Promise.resolve();let C=!1;function A(t){w.push(t)}let E=!1;const R=new Set;function j(){if(!E){E=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];y(e),Y(e.$$)}for(y(null),b.length=0;v.length;)v.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];R.has(e)||(R.add(e),e())}w.length=0}while(b.length);for(;_.length;)_.pop()();C=!1,E=!1,R.clear()}}function Y(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const z=new Set;let M;function q(){M={r:0,c:[],p:M}}function P(){M.r||r(M.c),M=M.p}function T(t,e){t&&t.i&&(z.delete(t),t.i(e))}function D(t,e,n,r){if(t&&t.o){if(z.has(t))return;z.add(t),M.c.push((()=>{z.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function G(t){t&&t.c()}function H(t,n,c,s){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(n,c),s||A((()=>{const n=l.map(e).filter(o);u?u.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(A)}function N(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&(b.push(t),C||(C=!0,k.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function L(e,o,c,s,l,u,a,d=[-1]){const m=i;y(e);const $=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(m?m.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||m.$$.root};a&&a($.root);let p=!1;if($.ctx=c?c(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return $.ctx&&l($.ctx[t],$.ctx[t]=o)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](o),p&&S(e,t)),n})):[],$.update(),p=!0,r($.before_update),$.fragment=!!s&&s($.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);$.fragment&&$.fragment.l(t),t.forEach(f)}else $.fragment&&$.fragment.c();o.intro&&T(e.$$.fragment),H(e,o.target,o.anchor,o.customElement),j()}y(m)}class F{$destroy(){N(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const I=t=>({matches:1&t}),J=t=>({matches:t[0]});function K(t){let e;const n=t[4].default,r=function(t,e,n,r){if(t){const o=l(t,e,n,r);return t[0](o)}}(n,t,t[3],J);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,[o]){r&&r.p&&(!e||9&o)&&function(t,e,n,r,o,c){if(o){const s=l(e,n,r,c);t.p(s,o)}}(r,n,t,t[3],e?function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(n,t[3],o,I):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[3]),J)},i(t){e||(T(r,t),e=!0)},o(t){D(r,t),e=!1},d(t){r&&r.d(t)}}}function O(t,e,n){let r,o,{$$slots:c={},$$scope:s}=e,{query:i}=e,l=!1,u=!1;function a(){r&&o&&r.removeListener(o)}return x((()=>(n(2,l=!0),()=>{a()}))),t.$$set=t=>{"query"in t&&n(1,i=t.query),"$$scope"in t&&n(3,s=t.$$scope)},t.$$.update=()=>{6&t.$$.dirty&&l&&(a(),function(t){r=window.matchMedia(t),o=t=>n(0,u=t.matches),r.addListener(o),n(0,u=r.matches)}(i))},[u,i,l,s,c]}class Q extends F{constructor(t){super(),L(this,t,O,K,c,{query:1})}}function W(e){let n;return{c(){n=d("div"),n.innerHTML='<h1 id="name" class="svelte-dgra9l">GIREESH YEJJU</h1> \n    <h5 class="svelte-dgra9l">Cloud Support Associate at Amazon Web Services</h5> \n    <h3 class="svelte-dgra9l">&quot; Storytelling is my Ikigai. I tell stories through my designs. &quot;</h3>',h(n,"class","header svelte-dgra9l")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class X extends F{constructor(t){super(),L(this,t,null,W,c,{})}}function U(e){let n,r,o,c,s,i,l,m,p,y,x,b,v,w;return{c(){n=d("div"),r=d("div"),o=$(),c=d("a"),c.textContent="Email",s=$(),i=d("a"),i.textContent="Resume",l=$(),m=d("p"),m.textContent=`Copyright © ${e[1]} Gireesh Yejju. All Rights Reserved.`,p=$(),y=d("a"),y.textContent="LinkedIn",x=$(),b=d("a"),b.textContent="Twitter",v=$(),w=d("div"),h(c,"target","_blank"),h(c,"href","mailto:gireesh.developer@gmail.com"),h(i,"target","_blank"),h(i,"href","https://google.com"),h(m,"id","copyright"),h(m,"class","svelte-1ygttcr"),h(y,"target","_blank"),h(y,"href","https://linkedin.com/"),h(b,"target","_blank"),h(b,"href","https://twitter.com/GireeshYejju"),h(n,"id","footer-row"),g(n,"padding-bottom","24px"),h(n,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),u(n,r),u(n,o),u(n,c),u(n,s),u(n,i),u(n,l),u(n,m),u(n,p),u(n,y),u(n,x),u(n,b),u(n,v),u(n,w)},p:t,d(t){t&&f(n)}}}function V(e){let n,r,o,c;return{c(){n=d("div"),n.innerHTML='<a target="_blank" href="mailto:gireesh.developer@gmail.com">Email</a> \n            <a target="_blank" href="https://google.com">Resume</a> \n            <a target="_blank" href="https://linkedin.com/">LinkedIn</a> \n            <a target="_blank" href="https://twitter.com/GireeshYejju">Twitter</a>',r=$(),o=d("div"),c=d("p"),c.textContent=`Copyright © ${e[1]} Gireesh Yejju. All Rights Reserved.`,h(n,"id","footer-row"),g(n,"padding-bottom","10px"),h(n,"class","svelte-1ygttcr"),h(c,"id","copyright"),h(c,"class","svelte-1ygttcr"),h(o,"id","footer-copyright-section"),h(o,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),a(t,r,e),a(t,o,e),u(o,c)},p:t,d(t){t&&f(n),t&&f(r),t&&f(o)}}}function B(e){let n,r,o=!e[0]&&U(e),c=e[0]&&V(e);return{c(){n=d("footer"),o&&o.c(),r=$(),c&&c.c(),h(n,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),o&&o.m(n,null),u(n,r),c&&c.m(n,null)},p(t,[e]){t[0]?o&&(o.d(1),o=null):o?o.p(t,e):(o=U(t),o.c(),o.m(n,r)),t[0]?c?c.p(t,e):(c=V(t),c.c(),c.m(n,null)):c&&(c.d(1),c=null)},i:t,o:t,d(t){t&&f(n),o&&o.d(),c&&c.d()}}}function Z(t,e,n){let{isMobile:r}=e,o=(new Date).getFullYear();return t.$$set=t=>{"isMobile"in t&&n(0,r=t.isMobile)},[r,o]}class tt extends F{constructor(t){super(),L(this,t,Z,B,c,{isMobile:0})}}function et(e){let n,r,o,c,i;return{c(){var t,l;n=d("div"),r=d("h4"),r.textContent="UX PROJECTS",o=$(),c=d("iframe"),h(r,"class","svelte-1m5xix1"),h(c,"title","case-study"),t=c.src,l=i="https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000",s||(s=document.createElement("a")),s.href=l,t!==s.href&&h(c,"src","https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000"),h(c,"frameborder","0"),h(c,"width",e[0]),h(c,"height",e[1]),c.allowFullscreen="true",h(c,"mozallowfullscreen","true"),h(c,"webkitallowfullscreen","true"),h(n,"class","svelte-1m5xix1")},m(t,e){a(t,n,e),u(n,r),u(n,o),u(n,c)},p(t,[e]){1&e&&h(c,"width",t[0]),2&e&&h(c,"height",t[1])},i:t,o:t,d(t){t&&f(n)}}}function nt(t,e,n){let r=window.innerWidth,o=0;return r<1200?(r*=.9,o=r/1.7):(o=569,r=960),[r,o]}class rt extends F{constructor(t){super(),L(this,t,nt,et,c,{})}}function ot(t){let e,n,r,o,c,s,i,l;return r=new X({}),c=new rt({}),i=new tt({props:{isMobile:!1}}),{c(){e=d("main"),n=d("div"),G(r.$$.fragment),o=$(),G(c.$$.fragment),s=$(),G(i.$$.fragment),h(n,"id","name-and-body"),h(n,"class","svelte-1708yxo"),h(e,"class","svelte-1708yxo")},m(t,f){a(t,e,f),u(e,n),H(r,n,null),u(n,o),H(c,n,null),a(t,s,f),H(i,t,f),l=!0},i(t){l||(T(r.$$.fragment,t),T(c.$$.fragment,t),T(i.$$.fragment,t),l=!0)},o(t){D(r.$$.fragment,t),D(c.$$.fragment,t),D(i.$$.fragment,t),l=!1},d(t){t&&f(e),N(r),N(c),t&&f(s),N(i,t)}}}function ct(t){let e,n,r=t[0]&&ot();return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),a(t,e,o),n=!0},p(t,n){t[0]?r?1&n&&T(r,1):(r=ot(),r.c(),T(r,1),r.m(e.parentNode,e)):r&&(q(),D(r,1,1,(()=>{r=null})),P())},i(t){n||(T(r),n=!0)},o(t){D(r),n=!1},d(t){r&&r.d(t),t&&f(e)}}}function st(t){let e,n,r,o,c,s,i;return n=new X({}),o=new rt({}),s=new tt({props:{isMobile:!0}}),{c(){e=d("main"),G(n.$$.fragment),r=$(),G(o.$$.fragment),c=$(),G(s.$$.fragment),h(e,"class","svelte-1708yxo")},m(t,l){a(t,e,l),H(n,e,null),u(e,r),H(o,e,null),u(e,c),H(s,e,null),i=!0},i(t){i||(T(n.$$.fragment,t),T(o.$$.fragment,t),T(s.$$.fragment,t),i=!0)},o(t){D(n.$$.fragment,t),D(o.$$.fragment,t),D(s.$$.fragment,t),i=!1},d(t){t&&f(e),N(n),N(o),N(s)}}}function it(t){let e,n,r=t[0]&&st();return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),a(t,e,o),n=!0},p(t,n){t[0]?r?1&n&&T(r,1):(r=st(),r.c(),T(r,1),r.m(e.parentNode,e)):r&&(q(),D(r,1,1,(()=>{r=null})),P())},i(t){n||(T(r),n=!0)},o(t){D(r),n=!1},d(t){r&&r.d(t),t&&f(e)}}}function lt(t){let e,n,r,o;return e=new Q({props:{query:"(min-width: 481px)",$$slots:{default:[ct,({matches:t})=>({0:t}),({matches:t})=>t?1:0]},$$scope:{ctx:t}}}),r=new Q({props:{query:"(max-width: 480px)",$$slots:{default:[it,({matches:t})=>({0:t}),({matches:t})=>t?1:0]},$$scope:{ctx:t}}}),{c(){G(e.$$.fragment),n=$(),G(r.$$.fragment)},m(t,c){H(e,t,c),a(t,n,c),H(r,t,c),o=!0},p(t,[n]){const o={};3&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const c={};3&n&&(c.$$scope={dirty:n,ctx:t}),r.$set(c)},i(t){o||(T(e.$$.fragment,t),T(r.$$.fragment,t),o=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),o=!1},d(t){N(e,t),t&&f(n),N(r,t)}}}return new class extends F{constructor(t){super(),L(this,t,null,lt,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
