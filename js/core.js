function oWindow(Uri, Wth, Hgt, Resize, Scroll, Name, Left, Top, Params)
{ // Fully definable pop-up windows [backwards compatible with openWin]
    Uri = Uri || "/";
    Name = Name || "buttons";
    if (!Params) {
        Wth = (Wth == parseInt(Wth))? Wth : 500;
        Hgt = (Hgt == parseInt(Hgt))? Hgt : 500;
        var Center = oCenter(Wth, Hgt);
        Resize = (Resize == parseInt(Resize))? Resize : 0;
        Scroll = (Scroll == parseInt(Scroll))? Scroll : 1;
        Left = (Left == "center")? Center[0] : (Left == parseInt(Left))? Left : 50;
        Top = (Top == "center")? Center[1] : (Top == parseInt(Top))? Top : 50;
        Params = "toolbar=0,location=0,directories=0,status=0,menubar=0" +
         ",resizable=" + Resize + ",scrollbars=" + Scroll +
         ",width=" + Wth + ",height=" + Hgt + ",left=" + Left + ",top=" + Top;
    }
    var Win = window.open(Uri, Name, Params);
    Win.focus();
}
function openWin(Uri, Wth, Hgt, Resize, Scroll) { oWindow(Uri, Wth, Hgt, Resize, Scroll); }
function openWin2(Uri, Wth, Hgt, Resize, Scroll) { oWindow(Uri, Wth, Hgt, Resize, Scroll); }
function openWin3(Uri, Wth, Hgt, Resize, Scroll, Name) { oWindow(Uri, Wth, Hgt, Resize, Scroll, Name); }
function popMS(Uri) 
{ // MDA Pop-Up Window
    var Wth=500, Hgt=500, pct=0.85; // 85% of parent window size
    if (parseInt(navigator.appVersion) > 3) {
        Wth = parseInt(screen.availWidth * pct);
        Hgt  = parseInt(screen.availHeight * pct);
    }
    oWindow(Uri, Wth, Hgt, 1, 1, "Genuine")
    return true;
}
function oCenter(Wth, Hgt)
{ // (left-top) screen center based on the provided object's width and height
    return new Array( (screen.width - Wth) / 2, (((screen.height - Hgt) / 2) - 20) );
}

function tableStripe(id, start, stop, cssclass)
{ // Zebra: Colors alternating rows automatically in tables and lists
    var i, obj=document.getElementById(id);
    start = (start)? Math.abs(parseInt(start)) : 0; // rows from top to start striping, positive integer
    stop = (stop)? Math.abs(parseInt(stop)) : 0; // rows from end stop striping, positive integer
    cssclass = (cssclass)? cssclass : "BgBlLhtGry"; // CSS class to use for striping, default to light grey
    if (!obj) { return; }
    var row = obj.getElementsByTagName("tr");
    for (i=start; i < row.length - stop; i+=2) { row[i].className += " " + cssclass; }
}

var rotatingList = {
    timer: [], delay: [], current: [], running: [],
    show: function(objId, menu, timer, idx) // show selected list item
    { // CSS identification of the list of items, milliseconds of delay, timer controller, current index
        var newlist = $(objId);
        idx = (idx == "run")? rotatingList.current[timer] : ((idx == parseInt(idx))? parseInt(idx) : 0);
        idx = (idx >= newlist.length)? 0 : ((idx < 0)? idx.length - 1 : idx);
        if (menu && menu.length > 0) {
            $(menu + " .itemsel").attr({ className:"item" });
            $($(menu + " .item")[idx]).attr({ className:"itemsel" });
        }
        rotatingList.current[timer] = idx;
        newlist.css({ display:"none" });
        $(newlist[idx]).fadeIn();
        if (rotatingList.running[timer]) {
            rotatingList.timer[timer] = setTimeout("rotatingList.show('" + objId + "', '" +
             menu + "', " + timer + ", " + (idx + 1) + ");", rotatingList.delay[timer]);
        }
    },
    control: function(self, objId, menu, listId, idx) // controls interraction
    {
        if (!self || !objId | !menu || !listId || (idx !== 0 && !idx)) { return; }
        var halt = false;
        if (idx == "play") { // pause/play toggle
            if (rotatingList.running[listId] === true) { // list running, then stop
                $(menu + " .playsel").attr({ className:"play" }); // display paused control
                rotatingList.running[listId] = false; // turn off the run status
                clearTimeout(rotatingList.timer[listId]); // kill the current timer
            }
            else { // list is stopped, start from current item
                $(menu + " .play").attr({ className:"playsel" }); // display play control
                rotatingList.running[listId] = true; // turn on the run status
                rotatingList.show(objId, menu, listId, rotatingList.current[listId]); // start rotation
            }
        }
        else if (idx == "next") { // next item requested
            rotatingList.current[listId] = rotatingList.current[listId] + 1;
            halt = true;
        }
        else if (idx == "prev") { // previous item requested
            rotatingList.current[listId] = rotatingList.current[listId] - 1;
            halt = true;
        }
        else if (idx == parseInt(idx)) { // an item was selected
            rotatingList.current[listId] = idx;
            halt = true;
        }
        if (halt === true) {
            $(menu + " .playsel").attr({ className:"play" }); // display paused control
            rotatingList.running[listId] = false; // turn off the run status
            clearTimeout(rotatingList.timer[listId]); // kill the current timer
            rotatingList.show(objId, menu, listId, rotatingList.current[listId]); // show selected
        }
    },
    menu: function(objId, menu, listId)
    { // create the interractive controls
        var obj=$(objId), item="", i, sel;
        var ctls = "<div class=\"media_controls\"><\/div>";
        var play = "<a class=\"playsel\" href=\"javascript:rotatingList.control(this,'" + objId +
         "','" + menu + "','" + listId + "','play')\" title=\"pause/play\">&nbsp;</a>";
        for (i=0; i < obj.length; i++) { // add a control for each roating object
            item += "<a class=\"item\" href=\"javascript:rotatingList.control(this,'" + objId +
             "','" + menu + "','" + listId + "'," + i + ")\" title=\"#" + (i + 1) + "\">&nbsp;<\/a>";
        }
        var prev = "<a class=\"prev\" href=\"javascript:rotatingList.control(this,'" + objId +
         "','" + menu + "','" + listId + "','prev')\" title=\"previous\">&nbsp;<\/a>";
        var next = "<a class=\"next\" href=\"javascript:rotatingList.control(this,'" + objId +
         "','" + menu + "','" + listId + "','next')\" title=\"next\">&nbsp;</a>";
        $(menu).wrapInner("<div style=\"position:relative\"><\/div>"); // wrap inner with relative div
        $(menu + ">div").append(ctls); // insert the controls container
        $(menu + " .media_controls").append(play + item + prev + next); // add the controls
    },
    init: function(objId, delay, options) // initialize rotating list
    { //  CSS identification of the list of items, milliseconds of delay
        if ($(objId).length == 0) { return; } // zero referenced objects found
        var len=rotatingList.timer.length, menu="";
        rotatingList.timer[len] = null; // create timer controller
        rotatingList.delay[len] = delay; // store animation delay
        rotatingList.current[len] = 0; // set start point
        rotatingList.running[len] = true; // set run indicator
        if (options) { // setup any additional options and parameters
            if (options.menu) {
                menu = options.menu;
                rotatingList.menu(objId, menu, len);
            }
        }
        rotatingList.show(objId, menu, len, 0); // start rotation
    }
};

function cssToggle(lnk, oId)
{ // toggles the display of a document object identified by ID
    if (lnk && lnk.tagName) { lnk.blur(); }
    var obj = $("#" + oId);
    if (obj) {
        if (obj.css("display") != "none" || obj.css("display") == "") { obj.css({ display:"none" }); }
        else { obj.css({ display:"block" }); }
    }
    return false;
}

var backdropImg=[], backdropTimer=[];
function backdrop(oID, imgID, delay, callback, flag)
{ // replace css background on a set interval, optionally callback to a related function, (internal flag)
    var obj = $("#" + oID);
    if (obj.length != 1 || !backdropImg[imgID] || !backdropImg[imgID].list ||
     backdropImg[imgID].list.length < 1) { return; } // no replacements defined
    delay = (delay && delay === parseInt(delay) && delay > 1000)? delay : 10000; // 10 second default delay
    var bgcolor = backdropImg[imgID].list[backdropImg[imgID].idx][0];
    if (!bgcolor) { bgcolor = backdropImg[imgID].list[backdropImg[imgID].idx]; }
    if (!bgcolor) { bgcolor = "#fff"; }
    var txcolor = backdropImg[imgID].list[backdropImg[imgID].idx][1];
    if (!txcolor) { txcolor = "#000"; }
    if (flag) { obj.css({ background:bgcolor, color:txcolor }); }
    if (backdropImg[imgID].list.length < 2) { return; } // only one replacement defined
    if (flag && typeof(callback) == "string" && callback.length > 0) { // callback with current index
        setTimeout(callback + "(" + backdropImg[imgID].idx + ");", 10);
    }
    backdropImg[imgID].idx = (backdropImg[imgID].idx >= backdropImg[imgID].list.length - 1)?
     0 : backdropImg[imgID].idx + 1; // set next index
    backdropTimer[backdropImg[imgID].idx] = setTimeout("backdrop('" + oID + "', " + imgID + ", " + delay +
     ((typeof(callback) == "string" && callback.length > 0)? ", '" + callback + "'" : "") + ", true);", delay);
}

function findPos(obj)
{ // get the x and y coordinates of an object within a document
    var objx, objy, x=0, y=0, d=document, t=true;
    obj = (obj.jquery)? obj : ((typeof(obj) == "object")? $(obj) : $("#" + obj));
    if (obj.length != 1 || !obj.attr("offsetParent")) { return { x:0, y:0 }; }
    objx = obj[0];
    while (t) {
        x += objx.offsetLeft;
        if (!objx.offsetParent) { t = false; }
        objx = objx.offsetParent;
    }
    t = true;
    objy = obj[0];
    while (t) {
        y += objy.offsetTop;
        if (!objy.offsetParent) { t = false; }
        objy = objy.offsetParent;
    }
    return { x:x, y:y };
}

function goUrl()
{
    var idx = document.coform.sites.selectedIndex;
    var url = document.coform.sites.options[idx].value;
    top.location.href = url;
}
function stripeOdd(id)
{
    var table = document.getElementById(id);
    if (!table) { return; }
    var trs = table.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i += 2) {
        trs[i].className += " odd";
    }
}
function stripeEven(id)
{
    var table = document.getElementById(id);
    if (!table) { return; }
    var trs = table.getElementsByTagName("tr");
    for (var i = 1; i < trs.length; i += 2) {
        trs[i].className += " odd";
    }
}


var DisableMetricsTagging = false;

