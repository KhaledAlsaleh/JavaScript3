

import {selectYourRepo,contributorsEmpty} from './domModule.js';
import {getReposNames,sortReposNames,createOptions,linkRepoNameWithOwnObject} from './logicAPIModule.js';
import {mainAPIError,contributorsError} from './errorAPIModule.js';
import createPagination from './paginationModule.js';

/* Get Contributors Data */
// Since Fetch Return A Promise, We Can Fetch Contributors Data After Fetch Repos Data , In The Same Function [And Next Then Will Handle This Promise]
// I Choose This Way , Because In Next Week We Have To Modularization The Code.
export function getReposContributors(url){
  
    fetch(url)
    .then(result => {
      if(result.status >= 200 && result.status < 400) {
        return result.json()
      }
    })
    .then((jsonContributors) => {
      if(jsonContributors.length == 0){ 
        contributorsBody.appendChild(contributorsEmpty);
        contributorsEmpty.textContent = "No Contributors For This Repository!";
        containerPagination.style.visibility = "hidden";
      }else{
        createPagination(jsonContributors);  
      }
    })
    .catch((errorContributors) => {
      containerPagination.style.visibility = "hidden";
      contributorsError(errorContributors);    
    });
    
  }
  
  
  /*  Get Repos Info  */
  
  export function getReposInfo(jsonData){
  
    selectYourRepo.onchange = function(){
      
      containerPagination.style.visibility = "visible";
      const myCurrentRepo = linkRepoNameWithOwnObject(jsonData,this.value);
      repoName.innerText = this.value;
      repoName.href = myCurrentRepo.html_url;
      repoDescription.innerText = myCurrentRepo.description;
      repoForksNumbers.innerText = myCurrentRepo.forks;
      repoUpdateInfo.innerText = myCurrentRepo.updated_at.replace("T"," ").replace("Z"," ");
      getReposContributors(myCurrentRepo.contributors_url);
      //Make Contributors Empty On Change
      contributorsBody.innerHTML = "";
      // Make Pagination Holder Empty On Change
      containerPagination.innerHTML = "";
      
    }
  
  }
  
  /* Build The Logic & Fetching Data From Main API */
  
  export default function getReposData (){
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