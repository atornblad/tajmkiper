(function(context) {
	
	var root = context.document;
	
	/**
	* Finds all elements matching [selector] and returns them as a real array
	*
	* @param {string} selector CSS selector
	* @return {Array} An array of matching elements
	*/
	function $(selector) {
		return [].slice.call(root.querySelectorAll(selector), 0);
	}
	
	/**
	* Finds the first element matching [selector]
	*
	* @param {string} selector CSS selector
	* @return {HTMLElement} The first matching element, or null
	*/
	function $one(selector) {
		return root.querySelector(selector);
	}
	
	/**
	* Determines whether [element] is a match for [selector]
	*
	* @param {HTMLElement} element The element to check
	* @param {string} selector CSS selector
	* @return {boolean}
	*/
	var $matches = (function() {
		var docElement = root.documentElement;
		var names = "matches,matchesSelector,msMatchesSelector,mozMatchesSelector,webkitMatchesSelector,oMatchesSelector".split(/,/g);
		names = names.filter(function(item) {
			return !!docElement[item];
		});
		var name = names[0];
		return function(element, selector) { return element[name](selector); };
	})();
	
	/**
	* Finds the nearest ancestor of [element] matching the [selector]
	*
	* @param {HTMLElement} element Where to start the search
	* @param {string} selector CSS selector to find among ancestors
	* @return {HTMLElement} The nearest matching ancestor, or null
	*/
	function $ancestor(element, selector) {
		while (element) {
			element = element.parentNode;
			if ($matches(element, selector)) {
				return element;
			}
		}
		return null;
	}
	
	/**
	* Creates a new element with the provided [elementName] and [attributes]
	*
	* @param {string} elementName Tag name for the new element
	* @param {object} attributes Anonymous object containing attribute names and values
	* @return {HTMLElement} The new element
	*/
	function $new(elementName, attributes) {
		var result = root.createElement(elementName);
		
		for (var key in attributes) {
			if (attributes.hasOwnProperty(key)) {
				result.setAttribute(key, attributes[key]);
			}
		}
		
		return result;
	}
	
	/**
	* Clears the content of [target] and sets the [text] content
	*
	* @param {HTMLElement} target Target element
	* @param {string} text New text
	*/
	function $text(target, text) {
		target.innerHTML = "";
		target.appendChild(root.createTextNode(text));
	}
	
	/**
	* Finds all form elements and returns an object containing their values
	*
	* @param {HTMLElement} form Form element
	* @return {object} All form values by name
	*/
	function $formValues(form) {
		function fillData (element, target) {
			var trav = element.firstChild;
			
			while (trav) {
				if (trav.hasAttribute && trav.hasAttribute("name")) {
					target[trav.name] = trav.value;
				}
				
				fillData(trav, target);
				
				trav = trav.nextSibling;
			}
		}
		
		var result = {};
		
		fillData(form, result);
		
		return result;
	}
	
	/**
	* Expands [target] with all properties of [items]
	*
	* @param {object} target Target object
	* @param {object} items Contains all properties to expand [target] with
	*/
	function $expand(target, items) {
		for (var key in items) {
			if (items.hasOwnProperty(key)) {
				target[key] = items[key];
			}
		}
	}
	
	
	$expand(context,
			{
				"$" : $,
				"$one" : $one,
				"$matches" : $matches,
				"$ancestor" : $ancestor,
				"$new" : $new,
				"$text" : $text,
				"$formValues" : $formValues,
				"$expand" : $expand
			});
	
})(window);