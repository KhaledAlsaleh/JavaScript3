/*

Inside the JavaScript file write two functions: one with XMLHttpRequest, and the other with axios
Each function should make a HTTP Request to the given endpoint: https://www.randomuser.me/api
Log the received data to the console
Incorporate error handling: log to the console the error message

*/

const url = "https://www.randomuser.me/api";
const userName = document.getElementById('userInfo');
const btnInfo = document.getElementById('ShowData');

// Creat HTTP Request Using XHR...

function httpRequestUsingXHR1(){
    
    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.onload = function(){

        if(xhr.status >= 200 && xhr.status < 400){
            console.log(xhr.response);
            userName.innerText = `${xhr.response.results[0].name.title} ${xhr.response.results[0].name.first} ${xhr.response.results[0].name.last} `;
            userName.style.color = "blue";
            userName.style.fontSize = "30px";
        }
        else{  // 400 .. 500
            console.log("HTTP Error :", xhr.status);
            userName.innerText = `HTTP Error: ${xhr.status}`;
            userName.style.color = "red";
            userName.style.fontSize = "30px";
        }
    }

    xhr.onerror = function(){
        console.log("Something Went Wrong!");
        userName.innerText = "Something Went Wrong!";
        userName.style.color = "red";
        userName.style.fontSize = "30px";
    }

    xhr.open("GET",url);
    xhr.send();

}


// Create HTTP Request Using Axios...

function httpRequestUsingAxios1(){

    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
        // handle success
        console.log(response);
        userName.innerText = `${response.data.results[0].name.title} ${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
        userName.style.color = "green";
        userName.style.fontSize = "30px";
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        userName.innerText = error;
        userName.style.color = "red";
        userName.style.fontSize = "30px";
    })
    .finally(function () {
        // always executed
        console.log("All Done!");
    });

}


window.onload = function (){
    btnInfo.onclick = function(){
        // Try To Run only One Of The Following Functions...
        httpRequestUsingXHR1();  // Blue When Succeed And Red When Failed 
        httpRequestUsingAxios1();   // Green When Succeed And Red When Failed  
    }
}

      
