var liveprice = new WebSocket('wss://stream.binance.com:9443/ws/flmusdt@trade');
let id = 0;
let magassag = 0;
let kezdoertek = 0.51;
let stockObject1 = 0;
let zaroar = 0;
let nyitoar = 0;
liveprice.onmessage = (event) => {
    var ar = document.getElementById("XRP");
    var stockObject = JSON.parse(event.data);
    stockObject1 = stockObject;
    
    ar.innerText = Math.round(stockObject.p * 10000)/10000;
    if( stockObject.p>nyitoar){
        document.getElementById("bar"+id).style.height = (stockObject.p - kezdoertek)*500000 + "px";
        document.getElementById("bar"+id).style.transform = "none";
        document.getElementById("bar"+id).style.backgroundColor = "green";
        
    }
    else if (stockObject.p<nyitoar){
        document.getElementById("bar"+id).style.height = -(stockObject.p - kezdoertek)*500000 + "px";
        document.getElementById("bar"+id).style.transform = "rotate(180deg)";
        document.getElementById("bar"+id).style.backgroundColor = "red";
    }
    else{
        document.getElementById("bar"+id).style.height = "5px";
        document.getElementById("bar"+id).style.background = "grey";

    }
    
    



}

setInterval(create, 10000);

function create(){
    id +=1;
    nyitoar = stockObject1.p;
    console.log(kezdoertek);
    const x = document.createElement('div');
    const y = document.getElementById('ptarto');
    x.classList.add('bar0');
    x.setAttribute('id', 'bar' + id)
    y.appendChild(x);
    if (nyitoar > zaroar){
        magassag = magassag + (-(stockObject1.p - kezdoertek)*500000);
    }
    else if ( nyitoar< zaroar){
        magassag = magassag +  Math.abs((stockObject1.p - kezdoertek)*500000);
    }
    else{
        console.log(zaroar);
    }
    kezdoertek = nyitoar;
    document.getElementById("bar"+id).style.top = magassag + "px";
    zaroar = stockObject1.p;
    
    
    
    
    
}