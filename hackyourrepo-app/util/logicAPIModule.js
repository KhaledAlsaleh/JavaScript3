
import {selectYourRepo} from './domModule.js';

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
        
        contributorsBody.style.visibility = "visible";
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

  export{
      getReposNames,
      sortReposNames,
      createOptions,
      linkRepoNameWithOwnObject,
      createBodyContributors
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
