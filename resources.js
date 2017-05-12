(function() {

function updateDom() {
	var targets = $("[data-reskey]");
	
	targets.forEach(function(element) {
		var key = element.getAttribute("data-reskey");
		
		if (element.tagName == "INPUT" && (
			element.getAttribute("type") == "button" ||
			element.getAttribute("type") == "submit"
		)) {
			element.value = window.resources[key] || element.value;
		} else {
			$text(element, window.resources[key] || element.textContent);
		}
	});
}

var callbackName = '_setResources' + ((Math.random() * 999999) | 0);

var callback = window[callbackName] = function(values) {
	window.resources = values;
	window.resources.get = function(key, defaultValue) {
		return window.resources[key] || defaultValue;
	};
	updateDom();

	var event = new Event("resources-loaded");
	window.dispatchEvent(event);
	
	delete window[callbackName];
};

document.addEventListener("DOMContentLoaded", function() {
	var script = $new("SCRIPT", { 'src' : '/load-resources.js?callback=' + callbackName });
	script.addEventListener("error", function() {
		callback({
			'tajmkiper' : "Tajmkiper",
			'language-code' : "en-US"
		});
	}, false);
	$one("HEAD").appendChild(script);
}, false);

})();