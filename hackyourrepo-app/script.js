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
  const contributorsHead = document.createElement('DIV');
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
  contributorsBody.id = "contributorsNames";

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


/* Build The Logic & Fetching Data */

function getRepoData (){
  const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  fetch(url)
  .then(response => response.json())
  .then(jsonData => console.log(jsonData));
}







generateTable();
appendChildren();
assignProperty();
addTextContent();
getRepoData();
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


