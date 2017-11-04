let CameraFilter = (function() {
    const video = document.querySelector('video');
    const filter = document.getElementById('filter');
    const slider = document.getElementById('slider');
    const Filters=[{id:1,type:"blur",max:5,"default":0,step:.1,unit:"px"},{id:2,type:"brightness",max:150,"default":100,step:1,unit:"%"},{id:3,type:"contrast",max:150,"default":100,step:1,unit:"%"},{id:4,type:"grayscale",max:150,"default":100,step:1,unit:"%"},{id:5,type:"invert",max:100,"default":0,step:1,unit:"%"},{id:6,type:"opacity",max:100,"default":100,step:1,unit:"%"},{id:7,type:"saturate",max:200,"default":0,step:1,unit:"%"},{id:8,type:"sepia",max:150,"default":0,step:1,unit:"%"}];

    let init = ({cameraConfig = {video: true, audio: true}, filters = true}) => {        
        stream(cameraConfig);        
        filters && listFilters();
        handleFilterChange();
    }
    
    let stream = config => {
        navigator.mediaDevices.getUserMedia(config)
        .then(mediaStream => {
            video.srcObject = mediaStream;
            video.onloadedmetadata = e => video.play();
        })
        .catch(err => console.log("Error: ", err.name + " : ", err.message));
    };
    
    let listFilters = () => {
        let options = Filters.map((filter,index) => `<option value='${index}'>${filter.type}</option>`).join('');
        filter.innerHTML = `<Select>${options}</Select>`;
        generateFilter(0);
    }

    let generateFilter = index => {
        let filter = Filters[index];
        let str = `${filter.type} <input type ="range" index="${index}" min ="0" max="${filter.max}" step ="${filter.step}" value ="${filter.default}"/>`;
        slider.innerHTML = str;
    }

    let applyFilters = (index, value) => {
        let filter = Filters[index];
        video.style.filter = `${filter.type}(${value}${filter.unit})`;    
    }

    let handleFilterChange = () => {
        filter.addEventListener('change', e =>generateFilter(e.target.value));
        slider.addEventListener('change', e => applyFilters(e.target.getAttribute('index'), e.target.value));            
    }
    return { init }
})();

CameraFilter.init({
    filters: true
});