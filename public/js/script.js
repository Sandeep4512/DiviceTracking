const socket = io();
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(

        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("Send-location", { latitude, longitude });
        }),
        (error) => {
            console.log(error);;
        },
    // this is setting of 
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
}
const map = L.map("map").setView([0, 0], 18);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Wipro limited "
}).addTo(map);


const markers = {};

socket.on("recive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude]);
    if (markers[id]) {
        markers[id].setLatLong([latitude, longitude])
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
})

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];

    }
});





















