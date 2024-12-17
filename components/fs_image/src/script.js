var isSend = !1,
isShowWifi = !1,
wifiList = [],
partitionList = [],
timeoutNum = 0,
Ajax = {
  get: function (e, t, i) {
    var n;
    window.XMLHttpRequest
      ? (n = new XMLHttpRequest())
      : window.ActiveObject && (n = new ActiveXobject("Microsoft.XMLHTTP")),
      n.open("GET", e, !0),
      i && n.setRequestHeader("Object", i),
      (n.onreadystatechange = function () {
        4 == n.readyState &&
          (console.log(n.status),
          200 == n.status || 304 == n.status
            ? t.call(this, n.responseText)
            : console.log("GET FAILED"));
      }),
      n.send();
  },
  post: function (e, t, i, n, o = !0, s = !1) {
    var a;
      window.XMLHttpRequest
        ? (a = new XMLHttpRequest())
        : window.ActiveObject && (a = new ActiveXobject("Microsoft.XMLHTTP")),
      a.open("POST", e, o),
      a.setRequestHeader(
        "Content-Type",
        s
          ? "application/json"
          : "application/x-www-form-urlencoded;charset=UTF-8"
      ),
      n && a.setRequestHeader("Object", n),
      (a.onreadystatechange = function () {
        4 == a.readyState &&
          (200 == a.status || 304 == a.status
            ? i.call(this, a.responseText)
            : console.log("POST FAILED"));
      }),
      a.send(t);
  }
};

function setMessage(msg) {
  document.getElementById("message").value = msg;
}

// Post Network info to connect chip with
function postNetworkData() {
  timeoutNum = 0;
  var e = document.getElementById("ssid").value;
  var t = document.getElementById("password").value;
  if ("" == e || null == e) {
    setMessage("Please enter Network Name");
    return;
  } 
  if (e.length > 32) {
    setMessage("Network Name too long");
    return;
  }
  if (t.length > 64) {
    setMessage("Password length too long");
    return;
  }
  var i = {
    ssid_len: e.length || 0,
    ssid: e,
    password_len: t.length || 0,
    password: t,
  };
  Ajax.post(
    "/setstainfo",
    JSON.stringify(i),
    function (e) {
      (e = JSON.parse(e)),
      console.log(e),
      0 == e.state
        ? setTimeout(function () {
            getNetworkStatus();
          }, 1e3)
        : setMessage("Connection Failed");
    },
    null,
    !0,
    !0
  );
}

function getResult() {
  setTimeout(function () {
    closeWindow();
  }, 1e3);
}

function closeWindow() {
  window.open("about:blank", "_self").close();
}

function getNetworkStatus() {
  if (timeoutNum > 40)
    return (
      setMessage("Connection Failed"), !1
    );
  timeoutNum++,
  Ajax.get("/getstainfo", function (e) {
    (e = JSON.parse(e)),
      console.log(e),
      (document.getElementById("message").value = e.message),
      1 == e.state
        ? getResult()
        : 0 == e.state
        ? setTimeout(function () {
            getNetworkStatus();
          }, 1e3)
        : setMessage("Connection Failed");
  });
}

var passwordInput = document.getElementById("password");
passwordInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    event.target.blur();
    postNetworkData();
  }
});
