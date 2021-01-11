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

/* Build The Structure */

function buildStructure(){

  generateTable();
  appendChildren();
  assignProperty();
  addTextContent();
  
}





/* Create Array Of Repos Names */
// It's Not Necessary To Create A Function Here Because [.map] Already Is A Built In Array Function

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
// Also Here It's Not Necessary To Create A Function Here Because [.find] Already Is A Built In Array Function

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
// This Function Doesn't Work 100% Because The Length At First Fetch Is Zero !!!!! 

/*

function clearContributorsData(contributorsBody){

  for (let i = 0; i < contributorsBody.children.length; i++) {
    contributorsBody.removeChild(contributorsBody.children[i]);
  
  }
}

*/


/* Contributors Error Function */

function contributorsError(errorContributors){
  
  const contributorsErrorChild = document.createElement('DIV');
  const contributorsParaError = document.createElement('P');

  contributorsErrorChild.appendChild(contributorsParaError);
  contributorsBody.appendChild(contributorsErrorChild);

  contributorsParaError.innerText = "Error: " + errorContributors;

}


/* Main API Error Function */

 function mainAPIError(mainError){

  leftSideSection.style.display = "none";
  rightSideSection.style.display = "none";
  const mainErrorDiv = document.createElement('Div');
  containerSection.appendChild(mainErrorDiv);
  mainErrorDiv.id = 'mainError';
  mainErrorDiv.innerText = "Error: Network request " + mainError;

 }


/* Get Contributors Data */
// Since Fetch Return A Promise, We Can Fetch Contributors Data After Fetch Repos Data , In The Same Function [And Next Then Will Handle This Promise]
// I Choose This Way , Because In Next Week We Have To Modularization The Code.
function getReposContributors(url){
  
  fetch(url)
  .then(result => {
    if(result.status >= 200 && result.status < 400) {
      return result.json()
    }
  })
  .then((jsonContributors) => createBodyContributors(jsonContributors))
  .catch((errorContributors) => {
    contributorsError(errorContributors);
  });
  
}


/*  Get Repos Info  */

function getReposInfo(jsonData){

  selectYourRepo.onchange = function(){

    const myCurrentRepo = linkRepoNameWithOwnObject(jsonData,this.value);
    repoName.innerText = this.value;
    repoName.href = myCurrentRepo.html_url;
    repoDescription.innerText = myCurrentRepo.description;
    repoForksNumbers.innerText = myCurrentRepo.forks;
    repoUpdateInfo.innerText = myCurrentRepo.updated_at.replace("T"," ").replace("Z"," ");
    getReposContributors(myCurrentRepo.contributors_url);
    //Make Contributors Empty On Change
    contributorsBody.innerHTML = "";

  }

}

/* Build The Logic & Fetching Data From Main API */

function getReposData (){
  const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  fetch(url)
  .then(response => { 
    if(response.status >= 200 && response.status < 400) {
      return response.json()
    }
  })
  .then( (jsonData) => {
    const reposNames = getReposNames(jsonData);
    const reposNamesOrderd = sortReposNames(reposNames);
    createOptions(reposNamesOrderd);  
    getReposInfo(jsonData);
  })
  .catch(error =>{
    mainAPIError(error);
  });
}

/* Main Function */

function mainFunction(){
  
  buildStructure();
  getReposData();

}



window.onload = mainFunction;
// Or 
//window.onload = () => mainFunction();


