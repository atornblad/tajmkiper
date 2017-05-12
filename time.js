(function(context) {
	
	function fillZeros(text, positions) {
		text = text.toString();
	
		if (text.length < positions) {
			var array = new Array(positions - text.length + 1);
			return array.join("0") + text;
		} else {
			return text;
		}
	}
	
	var parsePattern = /^((\d)+:)?(([0-5]?\d):)([0-5]\d)$/;
	
	var time = {
		getText : function(seconds, forExport) {
			var hours = (seconds / 3600) | 0;
			seconds -= hours * 3600;
			
			var minutes = (seconds / 60) | 0;
			seconds -= minutes * 60;
			
			seconds |= 0;
			
			if (forExport || hours) {
				return hours + ":" + fillZeros(minutes, 2) + ":" + fillZeros(seconds, 2);
			}
			else {
				return fillZeros(minutes, 2) + ":" + fillZeros(seconds, 2);
			}
		},
		
		parse : function(timeText) {
			var match = timeText.match(parsePattern);
			
			if (match) {
				var total = 0;
				if (match[1]) {
					total += 60 * 60 * parseInt(match[2], 10);
				}
				total += 60 * parseInt(match[4], 10);
				total += parseInt(match[5], 10);
				return total;
			} else {
				return false;
			}
		},
		
		getIsoDateText : function(date) {
			date = date || new Date();
			
			return fillZeros(date.getFullYear(), 4) + "-" + fillZeros(date.getMonth() + 1, 2) + "-" + fillZeros(date.getDate(), 2);
		}
	};
	
	context["time"] = time;
	
})(window);