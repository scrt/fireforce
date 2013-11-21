///////////////////////////////////////////////////////////////////////
// (C) SCRT - Information Security, 2011 - Author Manoé Zwahlen      //
///////////////////////////////////////////////////////////////////////
// This program is free software: you can redistribute it and/or     //
// modify it under the terms of the GNU General Public License as    //
// published by the Free Software Foundation, either version 3 of    //
// the License, or (at your option) any later version.               //
// This program is distributed in the hope that it will be useful,   //
// but WITHOUT ANY WARRANTY; without even the implied warranty of    //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     //
// GNU General Public License for more details.                      //
// You should have received a copy of the GNU General Public License //
// along with this program. If not, see http://www.gnu.org/licenses. //
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////
// Function Name : createProgressBar
// Objective     : Create and display a window with progress bar
// Author        : Manoé Zwahlen
// Date          : 13.07.2011
// Parameter 1   : min length of password
// Parameter 2   : max length of password
// Parameter 3   : number of char (0 if dictionnary or range)
// Parameter 4   : number of password in dictionnary (0 if password generation or range)
// Parameter 5   : number of password in range (0 if dictionnary or password generation)
///////////////////////////////////////////////////
function createProgressBar(lengthPasswordMin, lengthPassword, lengthChar, nbrPasswordDictionnary, nbrPasswordRange){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
	var nbrPassword = 0;
	var nbrPasswordTmp = 0;
	
	if (nbrPasswordDictionnary >0){	
		nbrPassword = nbrPasswordDictionnary;
		var progressBar = win.openDialog('chrome://fireforce/content/fireforce_progressBar.xul','FireforceProgressBar', '', nbrPassword, stopTest);
	}else if (nbrPasswordRange >0){
		nbrPassword = nbrPasswordRange;
		var progressBar = win.openDialog('chrome://fireforce/content/fireforce_progressBar.xul','FireforceProgressBar', '', nbrPassword, stopTest);	
	}else{
		for (i=lengthPassword;i>=lengthPasswordMin;i--){
			nbrPasswordTmp = Math.pow(lengthChar, i);
			nbrPassword += nbrPasswordTmp;
		}
		var progressBar = win.openDialog('chrome://fireforce/content/fireforce_progressBar.xul','FireforceProgressBar', '', nbrPassword, stopTest);	
	}
	
	return progressBar;
}

///////////////////////////////////////////////////
// Function Name : createOptionDialogGeneration
// Objective     : Create and display a window with options for password generation
// Author        : Manoé Zwahlen
// Date          : 13.07.2011
// Parameter 1   : table for all the parameters
///////////////////////////////////////////////////
function createOptionDialogGeneration(inputValue){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
	
	var params = {inn:null, out:null};
	var optionDialog = win.openDialog('chrome://fireforce/content/fireforce_optionDialogGeneration.xul','fireforce_optionDialogGeneration', 'modal', params);
	
					
	if (params.out) {
	  
	  inputValue[0] = params.out.min;
	  inputValue[1] = params.out.max;
	  inputValue[2] = params.out.text;
	  inputValue[3] = params.out.radio;
	  
	  return inputValue;
	}else {
	}
}

///////////////////////////////////////////////////
// Function Name : createOptionDialogGenerationRange
// Objective     : Create and display a window with options for password generation with range
// Author        : Manoé Zwahlen
// Date          : 09.04.2013
// Parameter 1   : table for all the parameters
///////////////////////////////////////////////////
function createOptionDialogGenerationRange(inputValue){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
	
	var params = {inn:null, out:null};
	var optionDialog = win.openDialog('chrome://fireforce/content/fireforce_optionDialogGenerationRange.xul','fireforce_optionDialogGenerationRange', 'modal', params);
	
					
	if (params.out) {
	  
	  inputValue[0] = params.out.start;
	  inputValue[1] = params.out.stop;
	  inputValue[2] = params.out.text;
	  inputValue[3] = params.out.radio;
	  
	  return inputValue;
	}else {
	}
}

///////////////////////////////////////////////////
// Function Name : createOptionDialogGeneration
// Objective     : Create and display a window with options for dictionnary
// Author        : Manoé Zwahlen
// Date          : 13.07.2011
// Parameter 1   : table for all the parameters
///////////////////////////////////////////////////
function createOptionDialogDictionnary(inputValue){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
	
	var params = {inn:null, out:null};
	var optionDialog = win.openDialog('chrome://fireforce/content/fireforce_optionDialogDictionnary.xul','fireforce_optionDialogDictionnary', 'modal', params);
	
					
	if (params.out) {
	  
	  inputValue[0] = params.out.text;
	  inputValue[1] = params.out.radio;
	  
	  return inputValue;
	}else {
	}
}