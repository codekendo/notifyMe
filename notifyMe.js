// ==UserScript==
// @name        notifyMe AskBCS
// @namespace   Violentmonkey Scripts
// @match       https://app.slack.com/*
// @grant       none
// @version     0.1
// @author      Nelson Caberto
// @description Adds Browser to OS notification when AskBCS receives a new question. 6/19/2020, 12:52:37 PM
// ==/UserScript==

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
    const tags = document.getElementsByTagName(tag);

    for (var i = 0; i < tags.length; i++)
        if (tags[i].textContent == text) return tags[i];
    return -1;
}

function is(question) { return window.find(question); }
const active = "ACTIVE QUESTIONS";
const inclass = "IN CLASS ACTIVITY QUESTIONS";
const available = "AVAILABLE QUESTIONS";

function questionCheck() {
    const refreshElement = getElementByInnerText("span", " Refresh");

    console.log('refreshing');
    refreshElement.click();

    //wait 2 seconds after refreshing to allow questions to load
    setTimeout(function(){
        console.log('checking');
        if (!is(active) && (is(inclass) || is(available))) {
            console.log('notifying');
            notifyMe("New AskBCS Question!");
        }
        console.log('waiting')
        setTimeout(questionCheck, 10000); //10,000 is 10 seconds
    }, 2000);
}

questionCheck();

window.addEventListener('load', function () {
    !(getElementByInnerText("span", " Refresh") === -1) && questionCheck();
});
