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
// Function Name  : sendFormAsynchronous
// Objective      : Send asynchronus request
// Author         : Manoé Zwahlen
// Date           : 13.07.2011
// Parameter 1    : method
// Parameter 2    : URL
// Parameter 3    : Data
// Parameter 4    : Text
// Parameter 5    : total number of password
// Parameter 6    : Progress window in an objection
// Parameter 7    : current password tested	
// Parameter 8    : Type of test for message
///////////////////////////////////////////////////
function sendFormAsynchronous(method, url, data, text, nbrTotal, progressBar, passwordTested, checkType){
	
	var xhr_object = null;
	var hashResponse = null;
	
	if (passwordFound == 0 && stopTest == 0){
		xhr_object = new XMLHttpRequest();	
	
		xhr_object.open(method, url, true);
		
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
		
		xhr_object.send(data);
		
		xhr_object.onreadystatechange = function() {
			if(xhr_object.readyState == 4){
				if (passwordFound == 0 && stopTest == 0){
					testResponseText = xhr_object.responseText;
					
					if (checkType == "failed"){
						if(testResponseText.match(text)){
							passwordFound += 0;
							requestSent += 1;
							progressBar.updateUI();
							
							if (requestSent == nbrTotal){
								progressBar.updateInformation("Password not found!");
							}
						}else{
							passwordFound += 1;
							progressBar.updateInformation("Password found: " + passwordTested);
						}
					}else{
						if(testResponseText.match(text)){
							passwordFound += 1;
							progressBar.updateInformation("Password found: " + passwordTested);
						}else{
							passwordFound += 0;
							requestSent += 1;
							progressBar.updateUI();
							
							if (requestSent == nbrTotal){
								progressBar.updateInformation("Password not found!");
							}
						}
					}
				}
			}
		}
	}
}

///////////////////////////////////////////////////
// Function Name  : sendFormSynchronous
// Objective      : Send synchronus request
// Author         : Manoé Zwahlen
// Date           : 13.07.2011
// Parameter 1    : method
// Parameter 2    : URL
// Parameter 3    : Data
// Parameter 4    : Text
// Parameter 5    : total number of password
// Parameter 6    : Progress window in an objection
// Parameter 7    : current password tested	
// Parameter 8    : Type of test for message
///////////////////////////////////////////////////
function sendFormSynchronous(method, url, data, text, nbrTotal, progressBar, passwordTested, checkType){
	var xhr_object = null;
	var hashResponse = null;
	
	if (passwordFound == 0  && stopTest == 0){
		
		xhr_object = new XMLHttpRequest();	
		
		xhr_object.open(method, url, false);
		
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
		
		xhr_object.send(data);
		
		testResponseText = xhr_object.responseText;
		
		if (passwordFound == 0 && stopTest == 0){			
			if(testResponseText.match(text)){
				requestSent += 1;
				passwordFound += 0;	
				progressBar.updateUI();
				
				if (requestSent == nbrTotal){
					progressBar.updateInformation("Password not found!");
				}
			}else{
				passwordFound += 1;
				progressBar.updateInformation("Password found : " + passwordTested);
			}
		}
	}
}
