
/*  Build The HTML Elements   */  

export const header = document.createElement('HEADER');
export const paragraphHeader = document.createElement('P');
export const selectYourRepo = document.createElement('SELECT');
export const firstOption = document.createElement('OPTION');
export const containerSection = document.createElement('SECTION');
export const leftSideSection = document.createElement('SECTION');
export const rightSideSection = document.createElement('SECTION');
export const contributorsHead = document.createElement('H4');
export const contributorsBody = document.createElement('DIV');
export const contributorsEmpty = document.createElement('SPAN');
export const containerPagination = document.createElement('DIV');
export const previousButtonPagination = document.createElement('BUTTON');
export const nextButtonPagination = document.createElement('BUTTON');
export const footer = document.createElement('FOOTER');
export const paragraphFooter = document.createElement('P');


/* Generate Table & Append It To leftSideSection  */

export function generateTable() {

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

export function appendChildren(){

selectYourRepo.appendChild(firstOption);

header.appendChild(paragraphHeader);
header.appendChild(selectYourRepo);

rightSideSection.appendChild(contributorsHead);
rightSideSection.appendChild(contributorsBody);
rightSideSection.appendChild(containerPagination);


containerSection.appendChild(leftSideSection);
containerSection.appendChild(rightSideSection);

footer.appendChild(paragraphFooter);

document.body.appendChild(header);
document.body.appendChild(containerSection);
document.body.appendChild(footer);

}


/*  Assign ID & Classes & Properties To The Elements  */

export function assignProperty(){

selectYourRepo.id = "chooseYourRepo";
containerSection.id = "container";
leftSideSection.id = "leftSide";
rightSideSection.id = "rightSide";
contributorsBody.id = "contributorsBody";
contributorsEmpty.id = "contributorsEmpty";
containerPagination.id = "containerPagination";
previousButtonPagination.id = "leftButtonPagination";
nextButtonPagination.id = "rightButtonPagination";

// Give element's ID's a semantic name 
document.getElementById('repoData11').id = "repoDescription";
document.getElementById('repoData21').id = "repoForksNumbers";
document.getElementById('repoData31').id = "repoUpdateInfo";

previousButtonPagination.classList.add("buttonPagination");
nextButtonPagination.classList.add("buttonPagination");

containerPagination.style.visibility = "hidden";

firstOption.disabled = true;
firstOption.selected = true;

}


/*  Add Text Content To The Elements  */

export function addTextContent(){

paragraphHeader.textContent = "HYF Repositories";
paragraphFooter.textContent = "HYF Repositories";
firstOption.textContent = "Select Your Repo";
contributorsHead.textContent = "Contributors";


document.getElementById('repoInfo00').textContent = "Repository :";
document.getElementById('repoInfo10').textContent = "Description :";
document.getElementById('repoInfo20').textContent = "Forks :";
document.getElementById('repoInfo30').textContent = "Updated :";

previousButtonPagination.textContent = "<";
nextButtonPagination.textContent = ">";

}



/* Build The Structure */

export function buildStructure(){

generateTable();
appendChildren();
assignProperty();
addTextContent();

}


