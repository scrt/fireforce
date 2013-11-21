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

function OK(){
    
	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
	                   .getService(Components.interfaces.nsIPromptService);
	var rv = false;
	
	rv = prompts.confirmEx(null,
	       "Are you sure you want to close this window?",
	       "Are you sure you want to close this window? Closing this window will stop the tests.",
	       prompts.STD_YES_NO_BUTTONS, "", "", "", null, new Object());
	
	this.stopTest = 1;
	
	return !rv, this.stopTest;
    
}

this.updateUI = function(){
	this.nbrPasswordTested++;
	this.bar.value = this.nbrPasswordTested / this.nbrTotalPassword * 100;
	this.description.value = this.nbrPasswordTested.toString() + '/' + this.nbrTotalPassword.toString() + ' Passwords tested';
	return true;
}

function onUnLoad() {
	this.bar = null;
	this.span = null;
}

this.updateInformation = function(information){
	this.result = information;
	this.description.value = this.nbrTotalPassword.toString() + " passwords tested";
	this.label.value = "Test terminated, Result : " + this.result.toString();
}

function onLoad() {
	this. nbrPasswordTested = 0;
	window.centerWindowOnScreen();
	this.nbrTotalPassword = window.arguments[0];
	this.stopTest = window.arguments[1];
	this.bar = null;
	this.span = null;
	this.label = null;
	this.dialogTitle = null;
	this.result = null;
	
	this.bar = document.getElementById('nbrPasswordTestedBar');
	this.description = document.getElementById('nbrPasswordTested');
	this.label = document.getElementById('information');
	this.dialogTitle = document.getElementById('dialogTitle');
}

