
function notifyMe(msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(msg);
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}

function getElementByInnerText(tag, text) {
    var tags = document.getElementsByTagName(tag);
    var result;
    
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].textContent == text) {
        result = tags[i];
        break;
      }
    }
    return result;
}

function questionCheck() {
    var refreshElement = getElementByInnerText("span", " Refresh");
    console.log('refreshing');
    refreshElement.click();
    
    if (window.find("AVAILABLE QUESTIONS") && !window.find("ACTIVE QUESTIONS")) {
        console.log('notifying');
        notifyMe("New AskBCS Question!");
    }

    setTimeout(questionCheck, 10000); //10,000 is 10 seconds
}

questionCheck();