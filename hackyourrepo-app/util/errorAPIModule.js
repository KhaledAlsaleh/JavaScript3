

import {leftSideSection,rightSideSection,containerSection} from './domModule.js';


/* Contributors Error Function */
//You Can Test This Error With hyfer-infra Repository
function contributorsError(errorContributors){
  
    const contributorsErrorChild = document.createElement('SPAN');
    const contributorsParaError = document.createElement('P');
  
    contributorsErrorChild.appendChild(contributorsParaError);
    contributorsBody.appendChild(contributorsErrorChild);
  
    contributorsErrorChild.id = "contributorsError";
    contributorsParaError.id = "contributorsParaError";
  
    contributorsParaError.textContent = errorContributors;
  
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

   export{contributorsError,mainAPIError}