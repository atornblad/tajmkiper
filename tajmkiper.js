(function() {

// Some global variables
var running = null;
var edited = null;
var updateTimer = null;
var projectsUl = null;

/**
* Saves a JSON representation of all projects to localStorage 
*
* @private
*/
function save() {
	localStorage["projects"] = stringifyProjects();
}

/**
* Updates the timer text of the currently running project, and the totalTime
*
* @private
*/
function updateRunning() {
	// Prevent the timer from starting more than once
	if (updateTimer) {
		window.clearTimeout(updateTimer);
	}
	
    if (running) {
        running.updateTime();
    }
    
	// Add up timers for all projects
    var totalTime = 0;
	Project.all.forEach(function(trav) {
		totalTime += trav.getTotalTime();
	});
	
	// Update the total timer text
    var totalTimeSpan = $one("#total .time");
    $text(totalTimeSpan, time.getText(totalTime));
    
	// Wait for the next second on the clock
    var now = Date.now();
    var millis = now % 1000;
    var wait = Math.max((1000 - millis), 5);
    updateTimer = window.setTimeout(updateRunning, wait);
}

/**
* Creates a new LI element for showing the timer total
*
* @private
*/
function addTotalsRow() {
    var totalLi = $new("LI", { "id" : "total" });
    var totalA = $new("A", {});
    var totalHeader = $new("HEADER", {});
    var totalTime = $new("SPAN", { "class" : "time" });
    $text(totalHeader, resources.get('total', "Total")  + ":\xa0");
    $text(totalTime, "00:00");
    projectsUl.appendChild(totalLi);
    totalLi.appendChild(totalA);
    totalA.appendChild(totalHeader);
    totalA.appendChild(totalTime);
}

/**
* Stops the currently running timer, and saves to localStorageStorage
*
* @private
*/
function stopTimer() {
	if (running) {
		running.stop();
	}
	
    save();
}

/**
* Creates a JSON string representation of all projects
*
* @private
*/
function stringifyProjects(optionalProjects) {
    var array = optionalProjects || Project.all;
    
    return JSON.stringify(array, function(key, value) {
        if (key == "name" || key == "totalFinishedTime" || key == "startedOn" || key >= 0) {
			// Only certain properties of Project are saved
            return value;
        }
		
        return undefined;
    });
}

/**
* Creates a new instance of Project, together with HTML elements, which are added to the #projects UL
* Also saves all projects to localStorage
*
* @constructor
* @this {Project}
* @param {String} name Display name of the project
* @param {Number} totalFinishedTime Total number of seconds already done counting
* @param {Number} startedOn If this project is running, the Unix timestamp for when it started running
*/
function Project(name, totalFinishedTime, startedOn) {
	/** @expose */
    this.name = name;
	/** @expose */
    this.totalFinishedTime = totalFinishedTime;
	/** @expose */
    this.startedOn = startedOn;
    
	// Add to the array of all projects
    Project.all.push(this);
    
	// Create the HTML elements, and add them to the #projects UL element
	// First the LI element
    var li = this.li = $new("LI", { "class" : (!!this.startedOn) ? "running" : "" } );
    if (projectsUl.firstChild === null) {
        projectsUl.appendChild(li);
    } else {
        projectsUl.insertBefore(li, projectsUl.lastChild);
    }

	// The A element that the user can click to start the project running
	var a = $new("A", { "href" : "#", "class": "activate" });
    li.appendChild(a);
    a["project-reference"] = this;
    a.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var project = this["project-reference"];
        project.onClicked();
    }, false);

	// The HEADER element contains the display name of the project
    var header = $new("HEADER");
    $text(header, name);
    a.appendChild(header);
    
	// The SPAN.time element
	var timeSpan = $new("SPAN", { "class" : "time" });
    var totalTime = this.getTotalTime();
    $text(timeSpan, time.getText(totalTime));
    a.appendChild(timeSpan);
	
	// The A element for editing the timer
	var edit = $new("A", { "href" : "#", "class" : "edit" });
	$text(edit, resources.get('edit', "Edit"));
	a.appendChild(edit);
	
	edit.addEventListener("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var project = $ancestor(this, "a.activate")["project-reference"];
		project.onEditTimeClicked();
	}, false);
	
	timeSpan.addEventListener("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var project = $ancestor(this, "a.activate")["project-reference"];
		project.onEditTimeClicked();
	}, false);
    
	save();
}

Project.prototype = {
	/**
	* Updates the SPAN.time element's time
	*/
	updateTime : function() {
		var span = this.li.querySelector("span.time");
		var total = this.getTotalTime();
		$text(span, time.getText(total));
	},
	
	/**
	* Returns the total number of seconds that this project has been running
	*
	* @return {Number}
	*/
	getTotalTime : function() {
		if (this.startedOn) {
        	var now = Date.now();
        	return (this.totalFinishedTime + (now - this.startedOn) / 1000) | 0;
		} else {
			return this.totalFinishedTime;
		}
	},
	
	/**
	* Stops the currently running timer, starts this project's timer, and updates HTML elements accordingly
	*/
	start : function() {
		if (running) running.stop();

		this.li.className = "running";
		this.totalFinishedTime = this.getTotalTime();
		this.startedOn = Date.now();
		this.updateTime();
		running = this;
	},
	
	/**
	* Stops this project's timer, and updates HTML elements accordingly
	*/
	stop : function() {
		this.li.className = "";
		this.totalFinishedTime = this.getTotalTime();
		this.startedOn = null;
		this.updateTime();
		
		if (running == this) running = null;
	},
	
	/**
	* Gets called when the user clicks on this project's HTML elements
	*/
	onClicked : function() {
		this.start();
		
		save();
	},
	
	onEditTimeClicked : function () {
		if (running == this) {
			stopTimer();
		}
		
		var timeText = time.getText(this.totalFinishedTime, true);
		
		edited = this;
		
		$one("#timeTextBox").value = timeText;
		$one("#editTimeDialog").style.display = "block";
	}
};

/**
* Array holding ll projects
*/
Project.all = [];

/**
* Callback functions for the actions in the "settings" dialog (badly named, I admit)
*/
var actionHandlers = {
    "removeAll": function() {
        if (window.confirm(resources.get('confirm-remove-all', "Do you really want to REMOVE all projects?"))) {
            Project.all = [];
            running = null;
            projectsUl.innerHTML = "";
            save();
            addTotalsRow();
        }
    },
    
    "clearAll": function() {
        if (window.confirm(resources.get('confirm-clear-all', "Do you really want to clear all timers?"))) {
            running = null;
            
			Project.all.forEach(function(trav) {
				trav.stop();
                trav.totalFinishedTime = 0;
                trav.updateTime();
			});
            
            save();
        }
    },
    
    "saveToCsv" : function() {
		var nameHeading = resources.get('csv-headings-name', "Project");
		var timeHeading = resources.get('csv-headings-time', "Tid");
		var separator = resources.get('csv-separator', ",");
		var filenamePrefix = resources.get('tajmkiper', "Tajmkiper");
		var filenameExtension = resources.get('csv-extension', "csv");
		
		var result = [ { "name" : nameHeading, "time" : timeHeading } ];
		
		Project.all.forEach(function(project) {
			result.push({ "name" : project.name, "time" : time.getText(project.getTotalTime(), true) });
		});
		
		var csv = Csv.autoCreate(result, ["name", "time"]);
		
        var filename = filenamePrefix + "-" + time.getIsoDateText() + "." + filenameExtension;
		csv.saveAs(filename, separator, false);
    },
    
    "transfer" : function() {
        $text($one("#transferInfo"), resources.get('please-wait', "Please wait..."));
        var a = $one("#transferUrl");
        $text(a, "");
        a.href = "";
        
        $one("#transferDialog").style.display = "block";
        $one("#transferForm").classList.add("disabled");
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/save");
        
        xhr.onload = function() {
            if (xhr.status == 200){
                // Success!
                var transferId = xhr.responseText;
                
				$text($one("#transferInfo"), resources.get('transfer-info', "You projects are saved on the server, and can be fetched on this address:"));
                var a = $one("#transferUrl");
                $text(a, window.location.host + "/saved/" + transferId);
                a.href = window.location.protocol + "//" + window.location.host + "/saved/" + transferId;
                $one("#transferUrlHidden").value = transferId;
                
                $one("#transferForm").classList.remove("disabled");
            }
        };
        
        xhr.onerror = function() {
            $text($one("#transferInfo"), resources.get('transfer-error-info', "An unexpected error occurred when saving your projects."));
            window.setTimeout(function() {
                $one("#transferDialog").style.display = "none";
            }, 3000);
        };
        
        xhr.send("data=" + encodeURIComponent(stringifyProjects()));
    }
};

/**
* Callback functions for when the user clicks OK in various dialogs
*/
var dialogOkHandlers = {
    "addProjectDialog" : function(values) {
        if (values.name.length == 0) {
            return false;
        }
        $one("#nameTextBox").blur();
        (new Project(values.name, 0)).onClicked();
        return true;
    },
	
    "editTimeDialog" : function(values) {
        var seconds = time.parse(values.time);
        if (time !== false) {
            edited.totalFinishedTime = seconds;
            edited.updateTime();
            updateRunning();
            localStorage.projects = stringifyProjects();
        }
        return true;
    },
    
    "transferDialog" : function(values) {
        localStorage.email = values.email;
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/email-saved");
        
        xhr.send("email=" + encodeURIComponent(values.email) + "&id=" + encodeURIComponent(values.id));
        return true;
    }
};

document.addEventListener("DOMContentLoaded", function() {
	document.body.removeChild($one("H1"));
	document.body.removeChild($one("P"));
}, false);

window.addEventListener("resources-loaded", function() {
	projectsUl = $new("UL", { "id" : "projects" });
    document.body.appendChild(projectsUl);
    
	addTotalsRow();
	document.title = resources.get('tajmkiper', "Tajmkiper") + " - " + resources.get('tagline', "Project time clock");
    
    $(".hideSpan").forEach(function(li) {
        li.setAttribute("title", li.textContent);
    });

    $(".modalDialogPanel").forEach(function(panel) {
        panel.addEventListener("click", function(e) {
            e.preventDefault();
            
            if (e.target == this) {
                this.style.display = "none";
            }
        }, true);
    });
    
    $(".modalDialogPanel > .actions > .closeModal > a").forEach(function(a) {
        a.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var panel = $ancestor(this, ".modalDialogPanel");
            panel.style.display = "none";
        }, false);
    });
    
    $(".modalDialogPanel > .actions > li[rel] > a").forEach(function(a) {
        a.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
			if (this.rel == "external-site") {
				window.location.href = this.href;
				return;
			}
            
            var li = this.parentNode;
            var rel = li.getAttribute("rel");
            
            var handler = actionHandlers[rel];
            handler();
            
            var panel = $ancestor(this, ".modalDialogPanel");
            panel.style.display = "none";
        });
    });
    
    $(".modalDialogPanel form").forEach(function(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var panel = this.parentNode;
            
            var handler = dialogOkHandlers[panel.id];
            var data = $formValues(this);
            if (handler(data)) {
                panel.style.display = "none";
            }
        }, false);
    });
    
    $(".modalDialogPanel label").forEach(function(label) {
        var $for = $one("#" + label.getAttribute("for"));
        $for.setAttribute("placeholder", label.textContent);
    });
    
    $(".modalDialogPanel .buttons input").forEach(function(button) {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var ok = this.classList.contains("ok");
            var cancel = this.classList.contains("cancel");
            
            var form = $ancestor(this, "form");
            var panel = form.parentNode;
            
            if (ok) {
                var handler = dialogOkHandlers[panel.id];
                var data = $formValues(form);
                if (handler(data)) {
                    panel.style.display = "none";
                }
            } else {
                panel.style.display = "none";
            }
            
        }, false);
    });
    
    $one("#stopTimer").addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

		stopTimer();
    }, false);
    
    $one("#addProject").addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $one("#addProjectDialog").style.display = "block";
        $one("#nameTextBox").value = "";
        $one("#nameTextBox").focus();
    }, false);
    
    $one("#settings").addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $one("#settingsDialog").style.display = "block";
    }, false);
    
    var lastUsedEmail = localStorage.email;
    $one("#transferEmailTextBox").value = lastUsedEmail || "";
    
    var projectsJson = localStorage["projects"];

    if (!projectsJson) {
        projectsJson = "[ ]";
    }
    
    var newProjects = [];
    try {
        newProjects = JSON.parse(projectsJson);
    } catch(e) {
        newProjects = [];
    }
    if (!Array.isArray(newProjects)) {
        newProjects = [];
    }
    
    Project.all = [];
	newProjects.forEach(function(project) {
        var p = new Project(project["name"], project["totalFinishedTime"], project["startedOn"]);
        
        if (p.startedOn) {
			p.stop();
			p.start();
        }
	});

    save();
    
    updateRunning();
});

})();
