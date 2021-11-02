
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\MediaQuery.svelte generated by Svelte v3.43.1 */
    const get_default_slot_changes = dirty => ({ matches: dirty & /*matches*/ 1 });
    const get_default_slot_context = ctx => ({ matches: /*matches*/ ctx[0] });

    function create_fragment$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, matches*/ 9)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MediaQuery', slots, ['default']);
    	let { query } = $$props;
    	let mql;
    	let mqlListener;
    	let wasMounted = false;
    	let matches = false;

    	onMount(() => {
    		$$invalidate(2, wasMounted = true);

    		return () => {
    			removeActiveListener();
    		};
    	});

    	function addNewListener(query) {
    		mql = window.matchMedia(query);
    		mqlListener = v => $$invalidate(0, matches = v.matches);
    		mql.addListener(mqlListener);
    		$$invalidate(0, matches = mql.matches);
    	}

    	function removeActiveListener() {
    		if (mql && mqlListener) {
    			mql.removeListener(mqlListener);
    		}
    	}

    	const writable_props = ['query'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MediaQuery> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('query' in $$props) $$invalidate(1, query = $$props.query);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		query,
    		mql,
    		mqlListener,
    		wasMounted,
    		matches,
    		addNewListener,
    		removeActiveListener
    	});

    	$$self.$inject_state = $$props => {
    		if ('query' in $$props) $$invalidate(1, query = $$props.query);
    		if ('mql' in $$props) mql = $$props.mql;
    		if ('mqlListener' in $$props) mqlListener = $$props.mqlListener;
    		if ('wasMounted' in $$props) $$invalidate(2, wasMounted = $$props.wasMounted);
    		if ('matches' in $$props) $$invalidate(0, matches = $$props.matches);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*wasMounted, query*/ 6) {
    			{
    				if (wasMounted) {
    					removeActiveListener();
    					addNewListener(query);
    				}
    			}
    		}
    	};

    	return [matches, query, wasMounted, $$scope, slots];
    }

    class MediaQuery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { query: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MediaQuery",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*query*/ ctx[1] === undefined && !('query' in props)) {
    			console.warn("<MediaQuery> was created without expected prop 'query'");
    		}
    	}

    	get query() {
    		throw new Error("<MediaQuery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<MediaQuery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.43.1 */

    const file$3 = "src\\components\\Header.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let h5;
    	let t3;
    	let h3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "GIREESH YEJJU";
    			t1 = space();
    			h5 = element("h5");
    			h5.textContent = "Cloud Support Associate at Amazon Web Services";
    			t3 = space();
    			h3 = element("h3");
    			h3.textContent = "\" Storytelling is my Ikigai. I tell stories through my designs. \"";
    			attr_dev(h1, "id", "name");
    			attr_dev(h1, "class", "svelte-dgra9l");
    			add_location(h1, file$3, 1, 4, 25);
    			attr_dev(h5, "class", "svelte-dgra9l");
    			add_location(h5, file$3, 2, 4, 62);
    			attr_dev(h3, "class", "svelte-dgra9l");
    			add_location(h3, file$3, 3, 4, 122);
    			attr_dev(div, "class", "header svelte-dgra9l");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, h5);
    			append_dev(div, t3);
    			append_dev(div, h3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.43.1 */

    const file$2 = "src\\components\\Footer.svelte";

    // (7:4) {#if !isMobile}
    function create_if_block_1$1(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let a0;
    	let t2;
    	let a1;
    	let t4;
    	let p;
    	let t8;
    	let a2;
    	let t10;
    	let a3;
    	let t12;
    	let div1;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			a0 = element("a");
    			a0.textContent = "Email";
    			t2 = space();
    			a1 = element("a");
    			a1.textContent = "Resume";
    			t4 = space();
    			p = element("p");
    			p.textContent = `Copyright © ${/*year*/ ctx[1]} Gireesh Yejju. All Rights Reserved.`;
    			t8 = space();
    			a2 = element("a");
    			a2.textContent = "LinkedIn";
    			t10 = space();
    			a3 = element("a");
    			a3.textContent = "Twitter";
    			t12 = space();
    			div1 = element("div");
    			add_location(div0, file$2, 8, 12, 187);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "mailto:gireesh.developer@gmail.com");
    			add_location(a0, file$2, 9, 12, 207);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://google.com");
    			add_location(a1, file$2, 12, 12, 320);
    			attr_dev(p, "id", "copyright");
    			attr_dev(p, "class", "svelte-1ygttcr");
    			add_location(p, file$2, 13, 12, 388);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://linkedin.com/");
    			add_location(a2, file$2, 16, 12, 507);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://twitter.com/GireeshYejju");
    			add_location(a3, file$2, 17, 12, 580);
    			add_location(div1, file$2, 20, 12, 693);
    			attr_dev(div2, "id", "footer-row");
    			set_style(div2, "padding-bottom", "24px");
    			attr_dev(div2, "class", "svelte-1ygttcr");
    			add_location(div2, file$2, 7, 8, 123);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, a0);
    			append_dev(div2, t2);
    			append_dev(div2, a1);
    			append_dev(div2, t4);
    			append_dev(div2, p);
    			append_dev(div2, t8);
    			append_dev(div2, a2);
    			append_dev(div2, t10);
    			append_dev(div2, a3);
    			append_dev(div2, t12);
    			append_dev(div2, div1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(7:4) {#if !isMobile}",
    		ctx
    	});

    	return block;
    }

    // (24:4) {#if isMobile}
    function create_if_block$1(ctx) {
    	let div0;
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let div1;
    	let p;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Email";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "Resume";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "LinkedIn";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "Twitter";
    			t7 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = `Copyright © ${/*year*/ ctx[1]} Gireesh Yejju. All Rights Reserved.`;
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "mailto:gireesh.developer@gmail.com");
    			add_location(a0, file$2, 25, 12, 817);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://google.com");
    			add_location(a1, file$2, 28, 12, 930);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://linkedin.com/");
    			add_location(a2, file$2, 29, 12, 998);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://twitter.com/GireeshYejju");
    			add_location(a3, file$2, 30, 12, 1071);
    			attr_dev(div0, "id", "footer-row");
    			set_style(div0, "padding-bottom", "10px");
    			attr_dev(div0, "class", "svelte-1ygttcr");
    			add_location(div0, file$2, 24, 8, 753);
    			attr_dev(p, "id", "copyright");
    			attr_dev(p, "class", "svelte-1ygttcr");
    			add_location(p, file$2, 35, 12, 1243);
    			attr_dev(div1, "id", "footer-copyright-section");
    			attr_dev(div1, "class", "svelte-1ygttcr");
    			add_location(div1, file$2, 34, 8, 1195);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, a0);
    			append_dev(div0, t1);
    			append_dev(div0, a1);
    			append_dev(div0, t3);
    			append_dev(div0, a2);
    			append_dev(div0, t5);
    			append_dev(div0, a3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(24:4) {#if isMobile}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let footer;
    	let t;
    	let if_block0 = !/*isMobile*/ ctx[0] && create_if_block_1$1(ctx);
    	let if_block1 = /*isMobile*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(footer, "class", "svelte-1ygttcr");
    			add_location(footer, file$2, 5, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			if (if_block0) if_block0.m(footer, null);
    			append_dev(footer, t);
    			if (if_block1) if_block1.m(footer, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*isMobile*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(footer, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*isMobile*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(footer, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	let { isMobile } = $$props;
    	let year = new Date().getFullYear();
    	const writable_props = ['isMobile'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('isMobile' in $$props) $$invalidate(0, isMobile = $$props.isMobile);
    	};

    	$$self.$capture_state = () => ({ isMobile, year });

    	$$self.$inject_state = $$props => {
    		if ('isMobile' in $$props) $$invalidate(0, isMobile = $$props.isMobile);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isMobile, year];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { isMobile: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*isMobile*/ ctx[0] === undefined && !('isMobile' in props)) {
    			console.warn("<Footer> was created without expected prop 'isMobile'");
    		}
    	}

    	get isMobile() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isMobile(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Projects.svelte generated by Svelte v3.43.1 */

    const file$1 = "src\\components\\Projects.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let h4;
    	let t1;
    	let iframe;
    	let iframe_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			h4.textContent = "UX PROJECTS";
    			t1 = space();
    			iframe = element("iframe");
    			attr_dev(h4, "class", "svelte-1m5xix1");
    			add_location(h4, file$1, 23, 4, 463);
    			attr_dev(iframe, "title", "case-study");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "width", /*width*/ ctx[0]);
    			attr_dev(iframe, "height", /*height*/ ctx[1]);
    			iframe.allowFullscreen = "true";
    			attr_dev(iframe, "mozallowfullscreen", "true");
    			attr_dev(iframe, "webkitallowfullscreen", "true");
    			add_location(iframe, file$1, 24, 4, 489);
    			attr_dev(div, "class", "svelte-1m5xix1");
    			add_location(div, file$1, 22, 0, 452);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(div, t1);
    			append_dev(div, iframe);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 1) {
    				attr_dev(iframe, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(iframe, "height", /*height*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	let ratio = 1.7;
    	let width = window.innerWidth;
    	let height = 0;

    	if (width < 1200) {
    		width = width * 0.9;
    		height = width / ratio;
    	} else {
    		height = 569;
    		width = 960;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ratio, width, height });

    	$$self.$inject_state = $$props => {
    		if ('ratio' in $$props) ratio = $$props.ratio;
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, height];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.43.1 */
    const file = "src\\App.svelte";

    // (11:1) {#if matches}
    function create_if_block_1(ctx) {
    	let main;
    	let div;
    	let header;
    	let t0;
    	let projects;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	projects = new Projects({ $$inline: true });

    	footer = new Footer({
    			props: { isMobile: false },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(projects.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div, "id", "name-and-body");
    			attr_dev(div, "class", "svelte-hdcn06");
    			add_location(div, file, 12, 3, 322);
    			attr_dev(main, "class", "svelte-hdcn06");
    			add_location(main, file, 11, 2, 312);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(div, t0);
    			mount_component(projects, div, null);
    			insert_dev(target, t1, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(projects);
    			if (detaching) detach_dev(t1);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(11:1) {#if matches}",
    		ctx
    	});

    	return block;
    }

    // (10:0) <MediaQuery query="(min-width: 481px)" let:matches>
    function create_default_slot_1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*matches*/ ctx[0] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*matches*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*matches*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(10:0) <MediaQuery query=\\\"(min-width: 481px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    // (25:1) {#if matches}
    function create_if_block(ctx) {
    	let main;
    	let header;
    	let t0;
    	let projects;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	projects = new Projects({ $$inline: true });

    	footer = new Footer({
    			props: { isMobile: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(projects.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", "svelte-hdcn06");
    			add_location(main, file, 25, 2, 541);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			mount_component(projects, main, null);
    			append_dev(main, t1);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(projects);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(25:1) {#if matches}",
    		ctx
    	});

    	return block;
    }

    // (24:0) <MediaQuery query="(max-width: 480px)" let:matches>
    function create_default_slot(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*matches*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*matches*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*matches*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(24:0) <MediaQuery query=\\\"(max-width: 480px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let mediaquery0;
    	let t;
    	let mediaquery1;
    	let current;

    	mediaquery0 = new MediaQuery({
    			props: {
    				query: "(min-width: 481px)",
    				$$slots: {
    					default: [
    						create_default_slot_1,
    						({ matches }) => ({ 0: matches }),
    						({ matches }) => matches ? 1 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	mediaquery1 = new MediaQuery({
    			props: {
    				query: "(max-width: 480px)",
    				$$slots: {
    					default: [
    						create_default_slot,
    						({ matches }) => ({ 0: matches }),
    						({ matches }) => matches ? 1 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(mediaquery0.$$.fragment);
    			t = space();
    			create_component(mediaquery1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(mediaquery0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(mediaquery1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const mediaquery0_changes = {};

    			if (dirty & /*$$scope, matches*/ 3) {
    				mediaquery0_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery0.$set(mediaquery0_changes);
    			const mediaquery1_changes = {};

    			if (dirty & /*$$scope, matches*/ 3) {
    				mediaquery1_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery1.$set(mediaquery1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mediaquery0.$$.fragment, local);
    			transition_in(mediaquery1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mediaquery0.$$.fragment, local);
    			transition_out(mediaquery1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mediaquery0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(mediaquery1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ MediaQuery, Header, Footer, Projects });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
