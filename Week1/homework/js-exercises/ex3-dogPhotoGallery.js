/*

Let's make a randomized dog photo gallery!

Write a function that makes a HTTP Request to https://dog.ceo/api/breeds/image/random. It should trigger after clicking a button in your webpage. Every time the button is clicked it should append a new dog image to the DOM.

Create an index.html file that will display your random image
Add 2 <button> and 1 <ul> element, either in the HTML or through JavaScript
Write two versions for the button functionality: one with XMLHttpRequest, and the other with axios
When any one of the 2 buttons is clicked it should make a HTTP Request to https://dog.ceo/api/breeds/image/random
After receiving the data, append to the <ul> a <li> that contains an <img> element with the dog image
Incorporate error handling: log to the console the error message

*/

const url = "https://dog.ceo/api/breeds/image/random";
const XHRbtn = document.getElementById('xhrRequest');
const Axiosbtn = document.getElementById('axiosRequest');
const ulholder = document.createElement('ul');

ulholder.style.listStyle = "none";

// Creat HTTP Request Using XHR...

function httpRequestUsingXHR3(){
    
    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.onload = function(){

        if(xhr.status >= 200 && xhr.status < 400){
            
            //console.log(xhr.response);

            let dogImg = document.createElement('img');
            dogImg.style.width = "500px";
            dogImg.style.height = "500px";
            dogImg.src = xhr.response.message;

            let liholder = document.createElement('li');
            liholder.appendChild(dogImg);
            
            ulholder.appendChild(liholder);
            document.body.appendChild(ulholder);

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

function httpRequestUsingAxios3(){

    axios.get(url)
    .then(function (response) {
        // handle success
        console.log(response);
        let dogImg = document.createElement('img');
        dogImg.style.width = "500px";
        dogImg.style.height = "500px";
        dogImg.src = response.data.message;

        let liholder = document.createElement('li');
        liholder.appendChild(dogImg);
        ulholder.appendChild(liholder);
        document.body.appendChild(ulholder);
        
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


window.onload = function (){
    XHRbtn.onclick = function(){
        httpRequestUsingXHR3();  
    }
    Axiosbtn.onclick = function(){
        httpRequestUsingAxios3();
    }
}
