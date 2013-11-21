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
// Function Name  : generatePassword
// Objective      : Generate all possible passwords
// Author         : Manoé Zwahlen
// Date           : 13.07.2011
// Parameter 1    : Type of char
// Parameter 2    : max length
// Parameter 3    : min length
// Parameter 4    : Text 
// Parameter 5    : Name of selected field
// Parameter 6    : end of request
// Parameter 7    : Method
// Parameter 8    : URL
// Parameter 9    : Progress window in a object
// Parameter 10   : Type of test for message
///////////////////////////////////////////////////
function generatePassword(typeChar, lengthPassword, lengthPasswordMin, text, selectedFieldName, finRequete, method, url, progressBar, checkType){
	
	var dataTest = null;
	var nextValue = null;
	var nbrCharMax = lengthPassword;
	var nbrTotal = null;
	var firstChar = null;
	var lastPos = null;
	var nextPos = null;
	var char = null;
	var prefLimit = 50;
	
	passwordFound = 0;
	requestSent = 0;
	stopTest = 0;
	
	switch (typeChar){
		case "a-z" :
			char = "abcdefghijklmnopqrstuvwxyz";	
			break;
		case "A-Z" :
			char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";	
			break;
		case "0-9" :
			char = "0123456789";		
			break;
		case "a-zA-Z" :
			char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";			
			break;
		case "a-z0-9" :
			char = "abcdefghijklmnopqrstuvwxyz0123456789";	
			break;
		case "A-Z0-9" :
			char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			break;
		case "a-zA-Z0-9" :
			char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			break;
		case "range" :
			char = "";
			break;
		default :
			alert("Error this case is not possible");	
	}
	
	if (typeChar != "range"){
	
		firstChar = char.charAt(0);

		for (compteurNbrPassword=2;compteurNbrPassword<=lengthPasswordMin;compteurNbrPassword++){
			firstChar += "" + char.charAt(0);
		}
		
		for (i=lengthPassword;i>=lengthPasswordMin;i--){
			nbrPasswordTmp = Math.pow(char.length, i);
			nbrTotal += nbrPasswordTmp;
		}
		
		nextValue = firstChar;
		for (compteurNbrPassword=1;compteurNbrPassword<=nbrTotal;compteurNbrPassword++){
			if (passwordFound ==  0 && stopTest == 0){	
				dataTest = selectedFieldName+"="+nextValue+finRequete;
				if (compteurNbrPassword%prefLimit == 0){
					sendFormSynchronous(method, url, dataTest, text, nbrTotal, progressBar, nextValue, checkType);
				} else {
					sendFormAsynchronous(method, url, dataTest, text, nbrTotal, progressBar, nextValue, checkType);
				}
				nextValue = goToNextValue(char, nextValue);
			}
		}
	}else{
		
		startRange = lengthPasswordMin;
		stopRange = lengthPassword;
		nbrTotal = (stopRange - startRange) + 1;
		
		for (compteurNbrPassword=startRange;compteurNbrPassword<=stopRange;compteurNbrPassword++){
			if (passwordFound ==  0 && stopTest == 0){	
				dataTest = selectedFieldName+"="+compteurNbrPassword+finRequete;
				if (compteurNbrPassword%prefLimit == 0){
					sendFormSynchronous(method, url, dataTest, text, nbrTotal, progressBar, compteurNbrPassword, checkType);
				} else {
					sendFormAsynchronous(method, url, dataTest, text, nbrTotal, progressBar, compteurNbrPassword, checkType);
				}
			}
		}
	}
}


///////////////////////////////////////////////////
// Function Name  : goToNextValue
// Objective      : Generate the next password based on type of char and last value
// Author         : Manoé Zwahlen
// Date           : 13.07.2011
// Parameter 1    : Type of char
// Parameter 2    : last password
///////////////////////////////////////////////////
function goToNextValue(char, lastValue){
	var nbrChar = lastValue.length;
	var nextValue = "";
	var lastPos = parseInt(char.indexOf(lastValue, nbrChar-1));
	var compteurTab = nbrChar-1;
	var i=0;
	var tab = [];
	
	for (compteur=compteurTab;compteur>=0;compteur--){
		tab[i] = lastValue.charAt(compteur);
		i++;
	}
	
	for (compteur=0;compteur<nbrChar;compteur++){
		lastPos = parseInt(char.indexOf(tab[compteur], 0));
		if (lastPos < char.length-1){
			tab[compteur] = char.charAt(lastPos+1);
			break;
		}
	}
	
	if (compteur<nbrChar){
		for (u=0;u<compteur;u++){
			tab[u] = char.charAt(0);	
		}	
	} else {
		for (u=0;u<=nbrChar;u++){
			tab[u] = char.charAt(0);
		}	
	}
	
	for (u=tab.length-1;u>=0;u--){
		nextValue += tab[u] + "";
	}
	return nextValue;	
}
