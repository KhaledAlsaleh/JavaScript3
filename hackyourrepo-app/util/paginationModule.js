/* Pagination */

import {containerPagination,previousButtonPagination,nextButtonPagination} from './domModule.js';
import {createBodyContributors} from './logicAPIModule.js'

export let itemsTamplet = [];
export let pagesTamplet = [];
export let currentPage;

export function statusNextPrevious(arrayOfPagesButtons,currentButton){

  if(currentButton === 0){
    previousButtonPagination.classList.add("disabled");
    previousButtonPagination.disabled = true;
  }
  else{
    previousButtonPagination.classList.remove("disabled");
    previousButtonPagination.disabled = false;
  }
  if(currentButton === arrayOfPagesButtons.length - 1){
    nextButtonPagination.classList.add("disabled");
    nextButtonPagination.disabled = true;
  }
  else{
    nextButtonPagination.classList.remove("disabled");
    nextButtonPagination.disabled = false;
  }

}


export function initialStatus(arrayOfPagesButtons){
    
    arrayOfPagesButtons[0].classList.add("active");

    previousButtonPagination.classList.add("disabled");
    previousButtonPagination.disabled = true;

    nextButtonPagination.classList.add("disabled");
    nextButtonPagination.disabled = true;
     
}


export function doStep(arrayOfPages,arrayOfButtons,currentActiveButton,pageToGo){

  contributorsBody.innerHTML = "";
  createBodyContributors(arrayOfPages[pageToGo]); 
  arrayOfButtons[currentActiveButton].classList.remove("active");
  arrayOfButtons[pageToGo].classList.add("active");
  
}


// Please Click On Any Button On Pagination To Active Next & Previous Buttons....

export function setupPreviousNextButtons(arrayOfPages,arrayOfButtons){

    previousButtonPagination.onclick = function(){

        let arrayOfPaginationDaynamicButtons = document.getElementsByClassName("buttonPaginationDaynamic");    
        let currentActiveButton = currentButtonActive(arrayOfPaginationDaynamicButtons); 
        let previousPage = currentActiveButton - 1;

        if(currentActiveButton === 1){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,previousPage);
        previousButtonPagination.classList.add("disabled");
        previousButtonPagination.disabled = true;

        }else if(currentActiveButton > 1 && currentActiveButton < arrayOfButtons.length-1){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,previousPage);

        }else if(currentActiveButton === arrayOfButtons.length-1){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,previousPage);
        nextButtonPagination.classList.remove("disabled");
        nextButtonPagination.disabled = false;

        }

    }
    nextButtonPagination.onclick = function(){
        let arrayOfPaginationDaynamicButtons = document.getElementsByClassName("buttonPaginationDaynamic");
        let currentActiveButton = currentButtonActive(arrayOfPaginationDaynamicButtons);
        let nextPage = currentActiveButton + 1;
    

        if(currentActiveButton === arrayOfButtons.length-2){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,nextPage);  
        nextButtonPagination.disabled = true;
        nextButtonPagination.classList.add("disabled");

        }else if(currentActiveButton > 0 && currentActiveButton < arrayOfButtons.length-1){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,nextPage); 

        }else if(currentActiveButton === 0){

        doStep(arrayOfPages,arrayOfButtons,currentActiveButton,nextPage);
        previousButtonPagination.classList.remove("disabled");
        previousButtonPagination.disabled = false;

        }

    }

}


export function currentButtonActive(paginationButtons){
  for(let currentPage=0; currentPage<paginationButtons.length; currentPage++){
    if(paginationButtons[currentPage].classList.contains("active")){
      return currentPage;    
    }
  }
}



export function linkButtonWithPage(paginationPages,paginationButtons){
  createBodyContributors(paginationPages[0]);
  initialStatus(paginationButtons);

  paginationButtons.forEach((button,index) =>{
    
    button.onclick = function(){

      statusNextPrevious(paginationButtons,index);
      contributorsBody.innerHTML = "";
      createBodyContributors(paginationPages[index]);
      removeActive(paginationButtons);
      button.classList.add("active"); 
      
    }

  });
  
}


export function removeActive(paginationButtons){
  paginationButtons.forEach(button =>{
    button.classList.remove("active");
  });
}


export default function createPagination(arrayOfContributers){
  
    let itemsNumber = arrayOfContributers.length;
    let itemPerPage = 5;
    let numberOfPages = Math.ceil(itemsNumber / itemPerPage);
    containerPagination.appendChild(previousButtonPagination);

    for(let i = 0; i < numberOfPages  ; i++){
      let startItem = (itemPerPage * i) ;
      let endItem = startItem + itemPerPage;
      let pageItems = arrayOfContributers.slice(startItem,endItem);
      const paginationButton = document.createElement("BUTTON");
      paginationButton.textContent = `${i+1}`;
      containerPagination.appendChild(paginationButton);
      paginationButton.classList.add("buttonPaginationDaynamic");
      itemsTamplet[i] = pageItems;
      pagesTamplet[i] = paginationButton;
    }
    
    linkButtonWithPage(itemsTamplet,pagesTamplet);
    setupPreviousNextButtons(itemsTamplet,pagesTamplet);   
    containerPagination.appendChild(nextButtonPagination); 


} 
 