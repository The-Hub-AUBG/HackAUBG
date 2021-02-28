var destination="";
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
    let link= location.href;
    destination=parseURLParams(link).city_name;
    document.getElementById("preferences_title").innerHTML=`Let's configure your trip to ${destination}`;
})();

function start_planning(){
    let allow_crowded=true;
    let budget=100;
    let currency="dollar";
    let food="any";
    let to_walk="medium";
    let visit_preferences="any";
    //validate

    if(false){

    }
    else{
        location.href=`/map?city_name=${destination}&allow_crowded=${allow_crowded}&budget=${budget}&currency=${currency}&to_walk=${to_walk}&food=${food}&visit_preferences=${visit_preferences}`;
    }
}
