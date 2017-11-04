'use strict'

const socket = io('/');
const config = {
    audio: true,
    video: {width: 480, height: 320}
}
navigator.mediaDevices.getUserMedia(config) 
.then(mediaStream => {
    let video = document.querySelector('video');
    console.log(mediaStream);
    video.srcObject = mediaStream;
    video.onloadedmetadata = e => {        
       video.play();        
    }    
})
.catch(err => console.log("Error: ", err.name + " : ", err.message));

const Filters=[{id:1,type:"blur",max:5,"default":0,step:.1,unit:"px"},{id:2,type:"brightness",max:150,"default":100,step:1,unit:"%"},{id:3,type:"contrast",max:150,"default":100,step:1,unit:"%"},{id:4,type:"grayscale",max:150,"default":100,step:1,unit:"%"},{id:5,type:"invert",max:100,"default":0,step:1,unit:"%"},{id:6,type:"opacity",max:100,"default":100,step:1,unit:"%"},{id:7,type:"saturate",max:200,"default":0,step:1,unit:"%"},{id:8,type:"sepia",max:150,"default":0,step:1,unit:"%"}];

listFilters();

document.getElementById('filter').addEventListener('change', e => {
    generateFilter(e.target.value);
})

document.getElementById('slider').addEventListener('change', e => {
    let elem = e.target;
    applyFilters(elem.getAttribute('index'), elem.value);
})

function listFilters() {
    let elem = document.getElementById('filter');
    let options = Filters.map((filter,index) => `<option value='${index}'>${filter.type}</option>`).join('');
    elem.innerHTML = `<Select>${options}</Select>`;
    generateFilter(0);
}


function generateFilter(index) {
    let filter = Filters[index];
    let str = `${filter.type} <input type ="range" index="${index}" min ="0" max="${filter.max}" step ="${filter.step}" value ="${filter.default}"/>`;
    document.getElementById('slider').innerHTML = str;
}


function applyFilters(index, value) {
    let filter = Filters[index];
    let video = document.querySelector('video');
    video.style.filter = `${filter.type}(${value}${filter.unit})`;    
}