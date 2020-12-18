/*

Inside the JavaScript file write two functions: one with XMLHttpRequest, and the other with axios
Each function should make a HTTP Request to the given endpoint: https://www.randomuser.me/api
Log the received data to the console
Incorporate error handling: log to the console the error message

*/

const url = "https://www.randomuser.me/api";
const btnInfo = document.getElementById('userInfo');


// Creat HTTP Request Using XHR...

function httpRequestUsingXHR(){
    
    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.onload = function(){

        if(xhr.status >= 200 && xhr.status < 400){
            console.log(xhr.response);
            btnInfo.innerText = `${xhr.response.results[0].name.title} ${xhr.response.results[0].name.first} ${xhr.response.results[0].name.last} `;
            btnInfo.style.color = "blue";
            btnInfo.style.fontSize = "30px";
        }
        else{  // 400 .. 500
            console.log("HTTP Error :", xhr.status);
            btnInfo.innerText = `HTTP Error: ${xhr.status}`;
            btnInfo.style.color = "red";
            btnInfo.style.fontSize = "30px";
        }
    }

    xhr.onerror = function(){
        console.log("Something Went Wrong!");
        btnInfo.innerText = "Something Went Wrong!";
        btnInfo.style.color = "red";
        btnInfo.style.fontSize = "30px";
    }

    xhr.open("GET",url);
    xhr.send();

}


// Create HTTP Request Using Axios...

function httpRequestUsingAxios(){

    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
        // handle success
        console.log(response);
        btnInfo.innerText = `${response.data.results[0].name.title} ${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
        btnInfo.style.color = "green";
        btnInfo.style.fontSize = "30px";
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        btnInfo.innerText = error;
        btnInfo.style.color = "red";
        btnInfo.style.fontSize = "30px";
    })
    .finally(function () {
        // always executed
        console.log("All Done!");
    });

}


// Try To Run only One Of The Following Functions...

httpRequestUsingXHR();        // Blue When Succeed And Red When Failed  
httpRequestUsingAxios();   // Green When Succeed And Red When Failed 