"use strict";

/*  Write here your JavaScript for HackYourRepo!  */


/*  Build The HTML Elements   */  

  const header = document.createElement('HEADER');
  const paragraphHeader = document.createElement('P');
  const selectYourRepo = document.createElement('SELECT');
  const firstOption = document.createElement('OPTION');
  const containerSection = document.createElement('SECTION');
  const leftSideSection = document.createElement('SECTION');
  const rightSideSection = document.createElement('SECTION');
  const contributorsHead = document.createElement('H4');
  const contributorsBody = document.createElement('DIV');
  // const contributorsAvatar = document.createElement('IMG');
  // const contributorsName = document.createElement('Div');
  // const contributorsContributions = document.createElement('Div');
  const footer = document.createElement('FOOTER');
  const paragraphFooter = document.createElement('P');

 
/* Generate Table & Append It To leftSideSection  */

function generateTable() {

  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  for (let i = 0; i < 4; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 2; j++) {
      const cell = document.createElement('td');
      if(i === 0 && j === 1){
        const repoName = document.createElement('a');
        repoName.id = 'repoName';
        repoName.href = '#';
        repoName.target = '_blank';
        cell.appendChild(repoName);  
      }
      if(j === 0){
        cell.classList.add('leftTd');
        cell.id = `repoInfo${i}${j}`;
      }
      if(i != 0 && j === 1){
        cell.id = `repoData${i}${j}`;
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  leftSideSection.appendChild(table);

}
  

/*  Append Children  */

function appendChildren(){

  selectYourRepo.appendChild(firstOption);

  header.appendChild(paragraphHeader);
  header.appendChild(selectYourRepo);

  // contributorsBody.appendChild(contributorsAvatar);
  // contributorsBody.appendChild(contributorsName);
  // contributorsBody.appendChild(contributorsContributions);

  rightSideSection.appendChild(contributorsHead);
  rightSideSection.appendChild(contributorsBody);

  containerSection.appendChild(leftSideSection);
  containerSection.appendChild(rightSideSection);

  footer.appendChild(paragraphFooter);

  document.body.appendChild(header);
  document.body.appendChild(containerSection);
  document.body.appendChild(footer);

}


/*  Assign ID & Classes & Properties To The Elements  */

function assignProperty(){

  selectYourRepo.id = "chooseYourRepo";
  containerSection.id = "container";
  leftSideSection.id = "leftSide";
  rightSideSection.id = "rightSide";
  contributorsBody.id = "contributorsBody";

  // Give element's ID's a semantic name 
  document.getElementById('repoData11').id = "repoDescription";
  document.getElementById('repoData21').id = "repoForksNumbers";
  document.getElementById('repoData31').id = "repoUpdateInfo";

  firstOption.disabled = true;
  firstOption.selected = true;
  firstOption.value = " ";

}



/*  Add Text Content To The Elements  */

function addTextContent(){

  paragraphHeader.textContent = "HYF Repositories";
  paragraphFooter.textContent = "HYF Repositories";
  firstOption.textContent = "Select Your Repo";
  contributorsHead.textContent = "Contributors";

  document.getElementById('repoInfo00').textContent = "Repository :";
  document.getElementById('repoInfo10').textContent = "Description :";
  document.getElementById('repoInfo20').textContent = "Forks :";
  document.getElementById('repoInfo30').textContent = "Updated :";

}



generateTable();
appendChildren();
assignProperty();
addTextContent();
getReposData();


//const repoName = document.getElementById("repoName");

// const repoDescription = document.getElementById("repoDescription");
// const repoForksNumbers = document.getElementById("repoForksNumbers");
// const repoUpdateInfo = document.getElementById("repoUpdateInfo");



// console.log(repoName);
// console.log(repoDescription);
// console.log(repoForksNumbers);
// console.log(repoUpdateInfo);
// console.log(contributorsBody);



/* Create Array Of Repos Names */

function getReposNames(gitHubRepoApi){
  return gitHubRepoApi.map(element => element.name);
}

/* Build Sort Function */
// We Can Use String.localeCompare() Also.
// We Can Write A Shorthand For Sort Function : sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);

function sortReposNames (arrayOfNames){
  const orderdArray = arrayOfNames.sort(function(a,b){
    if(a.toLowerCase() < b.toLowerCase()){
      return -1;
    }
    if(a.toLowerCase() > b.toLowerCase()){
      return 1;
    }
    return 0;
  });
  return orderdArray;
}

/* Create An Option For Each Repo & Append It To Select Tag & Give It innerText */

function createOptions (arrayOfOrderdReposNames){
  arrayOfOrderdReposNames.forEach(element => {
    const newOption = document.createElement('OPTION');
    selectYourRepo.appendChild(newOption);
    newOption.innerText = element;
  });
}

/* Link Repo Name With Own Object */

function linkRepoNameWithOwnObject(jasonData,name){
  const foundRepoObj = jasonData.find(element => element.name === name)
  return foundRepoObj;
}

/* Create A BodyContributors For Each Contributors */

function createBodyContributors(contributorsAPI){
  contributorsAPI.forEach(element => { 
    const contributorsChild = document.createElement('DIV');
    const contributorsAvatar = document.createElement('IMG');
    const contributorsName = document.createElement('a');
    const contributorsContributions = document.createElement('Div');
    contributorsChild.appendChild(contributorsAvatar);
    contributorsChild.appendChild(contributorsName);
    contributorsChild.appendChild(contributorsContributions);
    contributorsBody.appendChild(contributorsChild);
    contributorsAvatar.src = element.avatar_url;
    contributorsName.href = element.html_url;
    contributorsName.target = '_blank';
    contributorsName.innerText = element.login;
    contributorsContributions.innerText = element.contributions;  
  });
}

/* Clear Data For Each Contributors */

function clearContributorsData(contributorsBody){
  for (let i = 0; i < contributorsBody.childNodes.length; i++) {
    contributorsBody.removeChild(contributorsBody.childNodes[i]);
    
  }
}



/* Get Contributors Data */

function getReposContributors(url){
  
  fetch(url)
  .then(result => result.json())
  .then(jsonContributors =>  {
    createBodyContributors(jsonContributors);
    //clearContributorsData();
    return jsonContributors;
  })
  .catch((contributorsError) => {
    contributorsName.innerText = contributorsError;
  });
  
}


/*  Get Repos Info  */

function getReposInfo(jsonData){
  selectYourRepo.onchange = function(){
    clearContributorsData(contributorsBody);
    const myCurrentRepo = linkRepoNameWithOwnObject(jsonData,this.value);
    repoName.innerText = this.value;
    repoName.href = myCurrentRepo.html_url;
    repoDescription.innerText = myCurrentRepo.description;
    repoForksNumbers.innerText = myCurrentRepo.forks;
    repoUpdateInfo.innerText = myCurrentRepo.updated_at.replace("T"," ").replace("Z"," ");
    getReposContributors(myCurrentRepo.contributors_url);
    clearContributorsData(contributorsBody);
    // console.log(contributorsBody.childNodes);
    // console.log(contributorsBody.childNodes[0]);
    // console.log(contributorsBody.childNodes[1]);
    // console.log(contributorsBody.childNodes.length);
    
  }
}

/* Build The Logic & Fetching Data */

function getReposData (){
  const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  fetch(url)
  .then(response => response.json())
  .then( (jsonData) => {
    console.log(jsonData);
    const reposNames = getReposNames(jsonData);
    const reposNamesOrderd = sortReposNames(reposNames);
    createOptions(reposNamesOrderd);  
    getReposInfo(jsonData);

  });
}










// const placeholderRepos = [
//   {
//     name: 'SampleRepo1',
//     description: 'This repository is meant to be a sample',
//     forks: 5,
//     updated: '2020-05-27 12:00:00',
//   },
//   {
//     name: 'AndAnotherOne',
//     description: 'Another sample repo! Can you believe it?',
//     forks: 9,
//     updated: '2020-05-27 12:00:00',
//   },
//   {
//     name: 'HYF-Is-The-Best',
//     description: "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
//     forks: 130,
//     updated: '2020-05-27 12:00:00',
//   },
// ];


// /*

// Sort as alphabetically-ordered list using sort function which has a call back function as a parameter 
// This call back function expect 2 parameters [ which are 2 elements from the array ] return negative number, positive number or zero 
// If the first argument should appear before the second argument then we return a negative number 
// If the first argument should appear after the second argument then we return a positive number 
// If they are equal then we return zero.

// */

// placeholderRepos.sort(function(a,b){
//   if(a.name.toLowerCase() < b.name.toLowerCase()){
//     return -1;
//   }
//   if(a.name.toLowerCase() > b.name.toLowerCase()){
//     return 1;
//   }
//   return 0;
// });



// const firstRepo = document.getElementById("firstOption");
// firstRepo.innerText = placeholderRepos[0].name;

// const secondRepo = document.getElementById("secondOption");
// secondRepo.innerText = placeholderRepos[1].name;

// const thirdRepo = document.getElementById("thirdOption");
// thirdRepo.innerText = placeholderRepos[2].name;

// const chooseYourRepo = document.getElementById("chooseYourRepo");

// const repoName = document.getElementById("repoName");
// const repoDescription = document.getElementById("repoDescription");
// const repoForksNumbers = document.getElementById("repoForksNumbers");
// const repoUpdateInfo = document.getElementById("repoUpdateInfo");
// const contributorsNames = document.getElementById("contributorsNames");



// chooseYourRepo.onchange = function(){  // we can also use onclick instead of onchange 
 

//   /* 
//   In Case First Option Is Enabled, Then We Got An Error Cannot read property 'name' of undefined [and this is logical because the value is " " and can't read name for undefind 
//   (not only name but also all proprities but name mention as first in line 83 so this is the first error we facing )]
//   */
//   /*  // In Case First Option Is Enabled, I used this code to clear all data 
//   if(chooseYourRepo.value == " "){
//     repoName.innerText = "";
//     repoDescription.innerText = "";
//     repoForksNumbers.innerText = "";
//     repoUpdateInfo.innerText = "";
//     contributorsNames.innerText = "";
//   }
//   */
 
//   repoName.innerText = placeholderRepos[chooseYourRepo.value].name;
//   repoDescription.innerText = placeholderRepos[chooseYourRepo.value].description;
//   repoForksNumbers.innerText = placeholderRepos[chooseYourRepo.value].forks;
//   repoUpdateInfo.innerText = placeholderRepos[chooseYourRepo.value].updated;
//   contributorsNames.innerText = "We don't have contributors for this week!";    
// };


