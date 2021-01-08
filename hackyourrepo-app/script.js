"use strict";

/*
  Write here your JavaScript for HackYourRepo!
*/


const placeholderRepos = [
  {
    name: 'SampleRepo1',
    description: 'This repository is meant to be a sample',
    forks: 5,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'AndAnotherOne',
    description: 'Another sample repo! Can you believe it?',
    forks: 9,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'HYF-Is-The-Best',
    description: "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
    forks: 130,
    updated: '2020-05-27 12:00:00',
  },
];


/*

Sort as alphabetically-ordered list using sort function which has a call back function as a parameter 
This call back function expect 2 parameters [ which are 2 elements from the array ] return negative number, positive number or zero 
If the first argument should appear before the second argument then we return a negative number 
If the first argument should appear after the second argument then we return a positive number 
If they are equal then we return zero.

*/

placeholderRepos.sort(function(a,b){
  if(a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if(a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
});



const firstRepo = document.getElementById("firstOption");
firstRepo.innerText = placeholderRepos[0].name;

const secondRepo = document.getElementById("secondOption");
secondRepo.innerText = placeholderRepos[1].name;

const thirdRepo = document.getElementById("thirdOption");
thirdRepo.innerText = placeholderRepos[2].name;

const chooseYourRepo = document.getElementById("chooseYourRepo");

const repoName = document.getElementById("repoName");
const repoDescription = document.getElementById("repoDescription");
const repoForksNumbers = document.getElementById("repoForksNumbers");
const repoUpdateInfo = document.getElementById("repoUpdateInfo");
const contributorsNames = document.getElementById("contributorsNames");



chooseYourRepo.onchange = function(){  // we can also use onclick instead of onchange 
 

  /* 
  In Case First Option Is Enabled, Then We Got An Error Cannot read property 'name' of undefined [and this is logical because the value is " " and can't read name for undefind 
  (not only name but also all proprities but name mention as first in line 83 so this is the first error we facing )]
  */
  /*  // In Case First Option Is Enabled, I used this code to clear all data 
  if(chooseYourRepo.value == " "){
    repoName.innerText = "";
    repoDescription.innerText = "";
    repoForksNumbers.innerText = "";
    repoUpdateInfo.innerText = "";
    contributorsNames.innerText = "";
  }
  */
 
  repoName.innerText = placeholderRepos[chooseYourRepo.value].name;
  repoDescription.innerText = placeholderRepos[chooseYourRepo.value].description;
  repoForksNumbers.innerText = placeholderRepos[chooseYourRepo.value].forks;
  repoUpdateInfo.innerText = placeholderRepos[chooseYourRepo.value].updated;
  contributorsNames.innerText = "We don't have contributors for this week!";    
};


