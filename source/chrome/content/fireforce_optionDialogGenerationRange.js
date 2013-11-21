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

function doCancel(){
            
    var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);
    var rv = false;

	rv = prompts.confirmEx(null,
	       "Are you sure you want to close this window?",
	       "Are you sure you want to close this window? Closing this window will stop the tests.",
	       prompts.STD_YES_NO_BUTTONS, "", "", "", null, new Object());
            
       window.arguments[0].out = {min:"cancel"};
    
    return !rv;
    
}

function onUnLoad() {
    this.label = null;
}

function doOK() {
   window.arguments[0].out = {start:document.getElementById("startRange").value,
        stop:document.getElementById("stopRange").value,    
        text:document.getElementById("text").value,
	    radio:document.getElementById("radio").value};
   return true;
}

function onLoad() {
    window.centerWindowOnScreen();
}

