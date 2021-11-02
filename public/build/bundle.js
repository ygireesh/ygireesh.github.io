var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,i;function l(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function u(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function $(){return m(" ")}function p(){return m("")}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function y(t){i=t}function x(t){(function(){if(!i)throw new Error("Function called outside component initialization");return i})().$$.on_mount.push(t)}const b=[],v=[],w=[],_=[],k=Promise.resolve();let A=!1;function C(t){w.push(t)}let E=!1;const R=new Set;function j(){if(!E){E=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];y(e),Y(e.$$)}for(y(null),b.length=0;v.length;)v.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];R.has(e)||(R.add(e),e())}w.length=0}while(b.length);for(;_.length;)_.pop()();A=!1,E=!1,R.clear()}}function Y(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const q=new Set;let z;function M(){z={r:0,c:[],p:z}}function P(){z.r||r(z.c),z=z.p}function D(t,e){t&&t.i&&(q.delete(t),t.i(e))}function N(t,e,n,r){if(t&&t.o){if(q.has(t))return;q.add(t),z.c.push((()=>{q.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function G(t){t&&t.c()}function H(t,n,c,s){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(n,c),s||C((()=>{const n=l.map(e).filter(o);u?u.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(C)}function J(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&(b.push(t),A||(A=!0,k.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function T(e,o,c,s,l,u,a,d=[-1]){const m=i;y(e);const $=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(m?m.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||m.$$.root};a&&a($.root);let p=!1;if($.ctx=c?c(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return $.ctx&&l($.ctx[t],$.ctx[t]=o)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](o),p&&S(e,t)),n})):[],$.update(),p=!0,r($.before_update),$.fragment=!!s&&s($.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);$.fragment&&$.fragment.l(t),t.forEach(f)}else $.fragment&&$.fragment.c();o.intro&&D(e.$$.fragment),H(e,o.target,o.anchor,o.customElement),j()}y(m)}class L{$destroy(){J(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const U=t=>({matches:1&t}),F=t=>({matches:t[0]});function I(t){let e;const n=t[4].default,r=function(t,e,n,r){if(t){const o=l(t,e,n,r);return t[0](o)}}(n,t,t[3],F);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,[o]){r&&r.p&&(!e||9&o)&&function(t,e,n,r,o,c){if(o){const s=l(e,n,r,c);t.p(s,o)}}(r,n,t,t[3],e?function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(n,t[3],o,U):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[3]),F)},i(t){e||(D(r,t),e=!0)},o(t){N(r,t),e=!1},d(t){r&&r.d(t)}}}function K(t,e,n){let r,o,{$$slots:c={},$$scope:s}=e,{query:i}=e,l=!1,u=!1;function a(){r&&o&&r.removeListener(o)}return x((()=>(n(2,l=!0),()=>{a()}))),t.$$set=t=>{"query"in t&&n(1,i=t.query),"$$scope"in t&&n(3,s=t.$$scope)},t.$$.update=()=>{6&t.$$.dirty&&l&&(a(),function(t){r=window.matchMedia(t),o=t=>n(0,u=t.matches),r.addListener(o),n(0,u=r.matches)}(i))},[u,i,l,s,c]}class O extends L{constructor(t){super(),T(this,t,K,I,c,{query:1})}}function Q(e){let n;return{c(){n=d("div"),n.innerHTML='<h1 id="name" class="svelte-dgra9l">GIREESH YEJJU</h1> \n    <h5 class="svelte-dgra9l">Cloud Support Associate at Amazon Web Services</h5> \n    <h3 class="svelte-dgra9l">&quot; Storytelling is my Ikigai. I tell stories through my designs. &quot;</h3>',h(n,"class","header svelte-dgra9l")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class W extends L{constructor(t){super(),T(this,t,null,Q,c,{})}}function X(e){let n,r,o,c,s,i,l,p,y,x,b,v,w,_,k,A,C,E;return{c(){n=d("div"),r=d("div"),o=$(),c=d("a"),s=m("Email"),i=$(),l=d("a"),p=m("Resume"),y=$(),x=d("p"),x.textContent=`Copyright © ${e[1]} Gireesh Yejju. All Rights Reserved.`,b=$(),v=d("a"),w=m("LinkedIn"),_=$(),k=d("a"),A=m("Twitter"),C=$(),E=d("div"),h(c,"target","_blank"),h(c,"href",Z),h(l,"target","_blank"),h(l,"href",tt),h(x,"id","copyright"),h(x,"class","svelte-1ygttcr"),h(v,"target","_blank"),h(v,"href",et),h(k,"target","_blank"),h(k,"href",nt),h(n,"id","footer-row"),g(n,"padding-bottom","24px"),h(n,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),u(n,r),u(n,o),u(n,c),u(c,s),u(n,i),u(n,l),u(l,p),u(n,y),u(n,x),u(n,b),u(n,v),u(v,w),u(n,_),u(n,k),u(k,A),u(n,C),u(n,E)},p:t,d(t){t&&f(n)}}}function B(e){let n,r,o,c,s,i,l,p,y,x,b,v,w,_,k;return{c(){n=d("div"),r=d("a"),o=m("Email"),c=$(),s=d("a"),i=m("Resume"),l=$(),p=d("a"),y=m("LinkedIn"),x=$(),b=d("a"),v=m("Twitter"),w=$(),_=d("div"),k=d("p"),k.textContent=`Copyright © ${e[1]} Gireesh Yejju. All Rights Reserved.`,h(r,"target","_blank"),h(r,"href",Z),h(s,"target","_blank"),h(s,"href",tt),h(p,"target","_blank"),h(p,"href",et),h(b,"target","_blank"),h(b,"href",nt),h(n,"id","footer-row"),g(n,"padding-bottom","10px"),h(n,"class","svelte-1ygttcr"),h(k,"id","copyright"),h(k,"class","svelte-1ygttcr"),h(_,"id","footer-copyright-section"),h(_,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),u(n,r),u(r,o),u(n,c),u(n,s),u(s,i),u(n,l),u(n,p),u(p,y),u(n,x),u(n,b),u(b,v),a(t,w,e),a(t,_,e),u(_,k)},p:t,d(t){t&&f(n),t&&f(w),t&&f(_)}}}function V(e){let n,r,o=!e[0]&&X(e),c=e[0]&&B(e);return{c(){n=d("footer"),o&&o.c(),r=$(),c&&c.c(),h(n,"class","svelte-1ygttcr")},m(t,e){a(t,n,e),o&&o.m(n,null),u(n,r),c&&c.m(n,null)},p(t,[e]){t[0]?o&&(o.d(1),o=null):o?o.p(t,e):(o=X(t),o.c(),o.m(n,r)),t[0]?c?c.p(t,e):(c=B(t),c.c(),c.m(n,null)):c&&(c.d(1),c=null)},i:t,o:t,d(t){t&&f(n),o&&o.d(),c&&c.d()}}}let Z="mailto:gireesh.developer@gmail.com",tt="https://docs.google.com/document/d/1lNpJxeKUlJd3WqyPxQOU4cqU2lBtyA0hLdCtH71rDU4/edit?usp=sharing",et="https://linkedin.com/GireeshYejju",nt="https://twitter.com/GireeshYejju";function rt(t,e,n){let{isMobile:r}=e,o=(new Date).getFullYear();return t.$$set=t=>{"isMobile"in t&&n(0,r=t.isMobile)},[r,o]}class ot extends L{constructor(t){super(),T(this,t,rt,V,c,{isMobile:0})}}function ct(e){let n,r,o,c,i;return{c(){var t,l;n=d("div"),r=d("h4"),r.textContent="UX PROJECTS",o=$(),c=d("iframe"),h(r,"class","svelte-1m5xix1"),h(c,"title","case-study"),t=c.src,l=i="https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000",s||(s=document.createElement("a")),s.href=l,t!==s.href&&h(c,"src","https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000"),h(c,"frameborder","0"),h(c,"width",e[0]),h(c,"height",e[1]),c.allowFullscreen="true",h(c,"mozallowfullscreen","true"),h(c,"webkitallowfullscreen","true"),h(n,"class","svelte-1m5xix1")},m(t,e){a(t,n,e),u(n,r),u(n,o),u(n,c)},p(t,[e]){1&e&&h(c,"width",t[0]),2&e&&h(c,"height",t[1])},i:t,o:t,d(t){t&&f(n)}}}function st(t,e,n){let r=window.innerWidth,o=0;return r<1200?(r*=.9,o=r/1.7):(o=569,r=960),[r,o]}class it extends L{constructor(t){super(),T(this,t,st,ct,c,{})}}function lt(t){let e,n,r,o,c,s,i,l;return r=new W({}),c=new it({}),i=new ot({props:{isMobile:!1}}),{c(){e=d("main"),n=d("div"),G(r.$$.fragment),o=$(),G(c.$$.fragment),s=$(),G(i.$$.fragment),h(n,"id","name-and-body"),h(n,"class","svelte-1708yxo"),h(e,"class","svelte-1708yxo")},m(t,f){a(t,e,f),u(e,n),H(r,n,null),u(n,o),H(c,n,null),a(t,s,f),H(i,t,f),l=!0},i(t){l||(D(r.$$.fragment,t),D(c.$$.fragment,t),D(i.$$.fragment,t),l=!0)},o(t){N(r.$$.fragment,t),N(c.$$.fragment,t),N(i.$$.fragment,t),l=!1},d(t){t&&f(e),J(r),J(c),t&&f(s),J(i,t)}}}function ut(t){let e,n,r=t[0]&&lt();return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),a(t,e,o),n=!0},p(t,n){t[0]?r?1&n&&D(r,1):(r=lt(),r.c(),D(r,1),r.m(e.parentNode,e)):r&&(M(),N(r,1,1,(()=>{r=null})),P())},i(t){n||(D(r),n=!0)},o(t){N(r),n=!1},d(t){r&&r.d(t),t&&f(e)}}}function at(t){let e,n,r,o,c,s,i;return n=new W({}),o=new it({}),s=new ot({props:{isMobile:!0}}),{c(){e=d("main"),G(n.$$.fragment),r=$(),G(o.$$.fragment),c=$(),G(s.$$.fragment),h(e,"class","svelte-1708yxo")},m(t,l){a(t,e,l),H(n,e,null),u(e,r),H(o,e,null),u(e,c),H(s,e,null),i=!0},i(t){i||(D(n.$$.fragment,t),D(o.$$.fragment,t),D(s.$$.fragment,t),i=!0)},o(t){N(n.$$.fragment,t),N(o.$$.fragment,t),N(s.$$.fragment,t),i=!1},d(t){t&&f(e),J(n),J(o),J(s)}}}function ft(t){let e,n,r=t[0]&&at();return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),a(t,e,o),n=!0},p(t,n){t[0]?r?1&n&&D(r,1):(r=at(),r.c(),D(r,1),r.m(e.parentNode,e)):r&&(M(),N(r,1,1,(()=>{r=null})),P())},i(t){n||(D(r),n=!0)},o(t){N(r),n=!1},d(t){r&&r.d(t),t&&f(e)}}}function dt(t){let e,n,r,o;return e=new O({props:{query:"(min-width: 481px)",$$slots:{default:[ut,({matches:t})=>({0:t}),({matches:t})=>t?1:0]},$$scope:{ctx:t}}}),r=new O({props:{query:"(max-width: 480px)",$$slots:{default:[ft,({matches:t})=>({0:t}),({matches:t})=>t?1:0]},$$scope:{ctx:t}}}),{c(){G(e.$$.fragment),n=$(),G(r.$$.fragment)},m(t,c){H(e,t,c),a(t,n,c),H(r,t,c),o=!0},p(t,[n]){const o={};3&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const c={};3&n&&(c.$$scope={dirty:n,ctx:t}),r.$set(c)},i(t){o||(D(e.$$.fragment,t),D(r.$$.fragment,t),o=!0)},o(t){N(e.$$.fragment,t),N(r.$$.fragment,t),o=!1},d(t){J(e,t),t&&f(n),J(r,t)}}}return new class extends L{constructor(t){super(),T(this,t,null,dt,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
