/*

Who knew programmers could be funny?

Write a function that makes a HTTP Request to https://xkcd.now.sh/?comic=latest

Inside the same file write two programs: one with XMLHttpRequest, and the other with axios
Each function should make a HTTP Request to the given endpoint: https://xkcd.now.sh/?comic=latest
Log the received data to the console
Render the img property into an <img> tag in the DOM
Incorporate error handling: log to the console the error message

*/

const url = "https://xkcd.now.sh/?comic=latest"; 
let electionMap = document.createElement('img');
document.body.appendChild(electionMap);


// Creat HTTP Request Using XHR...

function httpRequestUsingXHR2 (){

    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.onload = function(){
        
        if(xhr.status >= 200 && xhr.status < 400){
            console.log(xhr.response);
            electionMap.src = xhr.response.img;
            electionMap.style.margin = "10px";   
        }
        else{  // 400 .. 500
            console.log("HTTP Error :", xhr.status);
        }
    }

    xhr.onerror = function(){
        console.log("Something Went Wrong!");
    }

    xhr.open("GET",url);
    xhr.send();

}



// Create HTTP Request Using Axios...

function httpRequestUsingAxios2(){

    // Make a request for a user with a given ID
    axios.get(url)
    .then(function (response) {
        // handle success
        console.log(response);
        electionMap.src = response.data.img;
        electionMap.style.margin = "10px";  

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
        console.log("All Done!");
    });

}


// Try To Run only One Of The Following Functions...

httpRequestUsingXHR2();
//httpRequestUsingAxios2();

