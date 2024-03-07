(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({ key: "AIzaSyBPB4VPZKkuM469YuZcRdGGKnsItE1C7ik", v: "beta" });


// Initialize and add the map
let map;

async function initMap() {
// The location of BS
const position = { lat: 25.0415940, lng: 121.5337079 };
// Request needed libraries.
//@ts-ignore
const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

// The map, centered at BS
map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
});

// The marker, positioned at BS
const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "BS",
});
}

initMap();