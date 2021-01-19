
/*  Write here your JavaScript for HackYourRepo!  */

"use strict";

import * as dom from './util/domModule.js';
import {getReposNames,sortReposNames,createOptions,linkRepoNameWithOwnObject,createBodyContributors} from './util/logicAPIModule.js';
import getReposData, {getReposContributors,getReposInfo} from './util/fetchLogicModule.js';
import {contributorsError,mainAPIError} from './util/errorAPIModule.js';
import * as pagination from './util/paginationModule.js';


/* Main Function */

function mainFunction(){
  dom.buildStructure();
  getReposData();
}

window.onload = mainFunction;
// Or 
//window.onload = () => mainFunction();

