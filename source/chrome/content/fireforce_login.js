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

var passwordFound = 0;

var requestSent = 0;

var stopTest = 0;

///////////////////////////////////////////////////
// Function Name : makeData
// Objective     : Call fonctions based on user's choice
// Author        : Manoé Zwahlen
// Date          : 13.07.2011
// Parameter 1   : password source
// Parameter 2   : number of char
///////////////////////////////////////////////////
function makeData(typeChar, lengthChar){
	
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);	
	var win = wm.getMostRecentWindow("navigator:browser");
		
	var passwords = null;
	var text = null;
	var result = false;
	var checkType = null;
	var i = 0;
	var finRequete = "";
	var selectedFieldName = null;
	var forms = null;
	
	passwordFound = 0;

	forms = getGoodForm();
	
	if(forms){
		var method = forms.method;
		var url = forms.action;
		
		selectedFieldName = win.content.document.activeElement.name;
			
		for (element in forms.elements){
			if (forms.elements[element].name != selectedFieldName){
				finRequete = finRequete+"&"+forms.elements[element].name+"="+forms.elements[element].value;
			}
		}

		if (typeChar == "dictionary"){
			passwords = makePasswordsTab();
			if(passwords){
				
				var inputValue = [];
				createOptionDialogDictionnary(inputValue);
				
				if (inputValue[0] != "cancel") {
				
					while (inputValue[0] == null) {
						if(inputValue[0] == "cancel"){
							break;	
						}
						createOptionDialogDictionnary(inputValue);
					}

					if (inputValue[0] != "cancel") {
						var progressBar = createProgressBar(0, 0, 0, passwords.length, 0);
						
						text = inputValue[0];
						checkType = inputValue[1];
						
						var tempWindow = window.open("");
						tempWindow.close();
					
						bruteForce(passwords, text, selectedFieldName, finRequete, method, url, progressBar, checkType);
					
					}
				}
			}else{
				alert("No password selected");	
			}
		}else if (typeChar == "range"){
			var inputValue = [];
			createOptionDialogGenerationRange(inputValue);
			
			if (inputValue[0] != "cancel") {
			
				while (inputValue[0] == null || parseInt(inputValue[0]) != inputValue[0] || inputValue[0] < 1 || inputValue[1] == null || parseInt(inputValue[1]) != inputValue[1] || inputValue[1] < 1 || inputValue[1] < inputValue[0] || inputValue[2] == null) {
					if(inputValue[0] == "cancel"){
						break;	
					}
					createOptionDialogGenerationRange(inputValue);
				}
				
				if (inputValue[0] != "cancel"){
									
					lengthPasswordMin = inputValue[0];
					lengthPassword = inputValue[1];
					nbrPasswordRange = (inputValue[1] - inputValue[0]) + 1;
					text = inputValue[2];
					checkType = inputValue[3];
					
					var progressBar = createProgressBar(0, 0, 0, 0, nbrPasswordRange);
					
						var tempWindow = window.open("");
						tempWindow.close();
					
					generatePassword(typeChar, lengthPassword, lengthPasswordMin, text, selectedFieldName, finRequete, method, url, progressBar, checkType);
				}
			}
		}else{
			var inputValue = [];
			createOptionDialogGeneration(inputValue);
			
			if (inputValue[0] != "cancel") {
			
				while (inputValue[0] == null || parseInt(inputValue[0]) != inputValue[0] || inputValue[0] < 1 || inputValue[1] == null || parseInt(inputValue[1]) != inputValue[1] || inputValue[1] < 1 || inputValue[1] < inputValue[0] || inputValue[2] == null) {
					if(inputValue[0] == "cancel"){
						break;	
					}
					createOptionDialogGeneration(inputValue);
				}
				
				if (inputValue[0] != "cancel"){
									
					lengthPasswordMin = inputValue[0];
					lengthPassword = inputValue[1];
					text = inputValue[2];
					checkType = inputValue[3];
					
					var progressBar = createProgressBar(lengthPasswordMin, lengthPassword, lengthChar, 0, 0);
					
						var tempWindow = window.open("");
						tempWindow.close();
					
					generatePassword(typeChar, lengthPassword, lengthPasswordMin, text, selectedFieldName, finRequete, method, url, progressBar, checkType);
				}
			}
		}
	}else{
		alert("No form or selected field found!");
	}
}

///////////////////////////////////////////////////
// Function Name  : bruteForce
// Objective      : Call functions for sending request
// Author         : Manoé Zwahlen
// Date           : 13.07.2011
// Parameter 1    : Table of password
// Parameter 2    : Text
// Parameter 3    : Name of selected field
// Parameter 4    : end of request
// Parameter 5    : method
// Parameter 6    : URL
// Parameter 7    : Progress window in an object
// Parameter 8    : Type of test for message
///////////////////////////////////////////////////
function bruteForce(passwords, text, selectedFieldName, finRequete, method, url, progressBar, checkType){

	var textTest = null;
	var i = 0;
	var dataTest = null;
	var prefLimit = 50;
	
	passwordFound = 0;
	requestSent = 0;
	stopTest = 0;
	
	while(i < passwords.length){
		dataTest = selectedFieldName+"="+passwords[i]+finRequete;
		if (passwordFound ==  0 && stopTest == 0){	
			if (i+1%prefLimit == 0){
				sendFormSynchronous(method, url, dataTest, text, passwords.length-1, progressBar, passwords[i], checkType);
			}else{
				sendFormAsynchronous(method, url, dataTest, text, passwords.length-1, progressBar, passwords[i], checkType);
			}
			i++;
		}
	}
}
