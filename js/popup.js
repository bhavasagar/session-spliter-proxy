function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

let fill_ip = function(){

    async function getdata(url){
    const response = await fetch(url);
    var data = await response.json();
    
    let ip = document.getElementById('ip_address');
    let country = document.getElementById('country')
    let region = document.getElementById('region')
    let isp = document.getElementById('isp')
    let city = document.getElementById('city')
    let services = document.getElementById('services')    
    
    ip.innerHTML = data['query'];
    country.innerHTML = data['country'];    
    region.innerHTML = data['regionName'];
    city.innerHTML = data['city'];
    services.innerHTML = data['org'];
    isp.innerHTML = data['isp'];
    }
    getdata('http://ip-api.com/json');
}


const hideallboxesexcept = (id) => {
    var boxes = document.getElementsByClassName("box");
    for(var i=0; i<boxes.length; i++){
        boxes[i].style.display = "none";
    }
    var newbox = document.getElementById(id);
    newbox.style.display = "flex"
}

var submit = document.getElementById('submit')

submit.onclick = () => {
    
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    var host = document.getElementById('host').value
    var port = document.getElementById('port').value
    var spassword = document.getElementById('spassword').value    

    setCookie('username',username,1);

    setCookie('password',password,1);

    setCookie('xyz',spassword,1);

    setCookie('set','1',1);
    
    hideallboxesexcept('ip-container');  
    
    chrome.proxy.settings.clear({ scope: 'regular' }, function() {});    

    let portno = parseInt(port);
    
    var config_us = {
        mode: "fixed_servers",
        rules: {
        singleProxy: {
            scheme: "http",
            host: host,
            port: portno
        },
        bypassList: []
        }
    };

    chrome.proxy.settings.set({value: config_us, scope: 'regular'},function() {});         

    fill_ip();
}

var changeip = document.getElementById('ip_change')
changeip.onclick = () => {
    hideallboxesexcept('change-ip');    
}

var verify = document.getElementById('verifypass')

verify.onclick = () => {
    var vpassword = document.getElementById('vpassword')
    if(vpassword != null){
        vpassword=vpassword.value        
    }
    if(vpassword == null){
        var Message = document.getElementById('message')
        Message.innerHTML = 'Fill Password'        
    }
    if(vpassword==getCookie('xyz')){
        hideallboxesexcept('login-container')       
    }
    else{
        var Message = document.getElementById('message')
        Message.innerHTML = 'Worng Password'        
    }
}

if(getCookie('set') == '1'){
    hideallboxesexcept('ip-container');
    fill_ip();
}