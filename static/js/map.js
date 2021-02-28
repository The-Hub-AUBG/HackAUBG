var is_schedule_open=true;
function open_close_schedule(){
    if(is_schedule_open){
      document.getElementById("open_close_schedule_image").src="../img/open.png";
      document.getElementById("open_close_schedule_button").style.left="30px";
      document.getElementById("schedule").style.width="0px";
      is_schedule_open=false;
    }
    else{
      document.getElementById("open_close_schedule_image").src="../img/close.png";
      document.getElementById("open_close_schedule_button").style.left="calc(20% + 30px)";
      document.getElementById("schedule").style.width="20%";
      is_schedule_open=true;
    }
}
document.getElementById("open_close_schedule_button").addEventListener('click',open_close_schedule);


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  appendMessage(PERSON_NAME, "right", msgText);
  msgerInput.value = "";
  botResponse();
});

function appendMessage(name, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var is_chat_open=true;

function open_close_chat(){
  if(is_chat_open){
    document.getElementById("chat_div").style.display="none";
    is_chat_open=false;
  }
  else{
    document.getElementById("chat_div").style.display="block";
    is_chat_open=true;
  }
}

document.getElementById("chat-button").addEventListener('click',open_close_chat);


var destination;
var allow_crowded;
var budget;
var currency;
var to_walk;
var food;
var visit_preferences;

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

(()=>{
    let parameters= parseURLParams(location.href);
    console.log(parameters);
    destination=parameters.city_name.toString();
    allow_crowded=parameters.allow_crowded || true;
    budget=parameters.budget || 100;
    currency=parameters.currency || "dollar";
    to_walk=parameters.to_walk || "medium";
    food=parameters.food || "any";
    visit_preferences=parameters.visit_preferences || "any";
    console.log(destination + " " +allow_crowded + " " + budget+  " " +currency+ " " +to_walk+ " " + food +" " +visit_preferences+ " ");
})();

let map;
function initMap() {
  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 0, lng: 0} ,
    zoom: 16,
    disableDefaultUI: true,
  });
  geocoder.geocode({'address':destination }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
