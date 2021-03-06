//<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
function startGeoGame() {
  geoFindMe();
  StartStop();
}


function geoFindMe() {

  var output = document.getElementById("out");
  if (!navigator.geolocation) {
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  var cordinatsArray = [];
  var distance = 0;
  function success(position) {
    var latitude = position.coords.latitude; //wrong coordinate
    var longitude = position.coords.longitude;

    // var altitude = position.coords.altitude;
    //if (altitude === null) altitude = 1;
    cordinatsArray.push(latitude);
    cordinatsArray.push(longitude);
    // cordinatsArray.push(altitude);
    distance += chekDistance(cordinatsArray);
    var elem = document.getElementById("myBar");
    elem.style.width = distance / 500 + '%';
    var represintation = distance;
    document.getElementById("out2").innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    document.getElementById("out").innerHTML = '<div>Now you have ' + represintation.toFixed(1) + 'm from 500m </div>';
    if (distance == 500) {
      alert("You Win!")
      return;
    }
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };
  options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 0
  };

  output.innerHTML = "<p>Locating...</p>";
  navigator.geolocation.watchPosition(success, error, options)

}
//next function

function chekDistance(cordinatsArray) {
  if (cordinatsArray.length < 4) return 0;
  var x1 = cordinatsArray[0];
  var y1 = cordinatsArray[1];
  var x2 = cordinatsArray[2];
  var y2 = cordinatsArray[3];
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(x2 - x1);  // deg2rad below
  var dLon = deg2rad(y2 - y1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(x1)) * Math.cos(deg2rad(x2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 100; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}


//next function
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1, m = 1, tm = 1, s = 0, ts = 0, ms = 0, init = 0;

function ClearClock() {
  clearTimeout(clocktimer);
  h = 1; m = 1; tm = 1; s = 0; ts = 0; ms = 0;
  init = 0;
  readout = '00:00:00.00';
  document.MyForm.stopwatch.value = readout;
}

function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) { s++; }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) { ts = ts - ((m - 1) * base); }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) { tm = tm - ((h - 1) * base); }
  }
  ms = Math.round(t / 10);
  if (ms > 99) { ms = 0; }
  if (ms == 0) { ms = '00'; }
  if (ms > 0 && ms <= 9) { ms = '0' + ms; }
  if (ts > 0) { ds = ts; if (ts < 10) { ds = '0' + ts; } } else { ds = '00'; }
  dm = tm - 1;
  if (dm > 0) { if (dm < 10) { dm = '0' + dm; } } else { dm = '00'; }
  dh = h - 1;
  if (dh > 0) { if (dh < 10) { dh = '0' + dh; } } else { dh = '00'; }
  readout = dh + ':' + dm + ':' + ds + '.' + ms;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

function StartStop() {
  if (init == 0) {
    ClearClock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
} 