// ============================================================================== //
// Save the url to a var and pull it apart - Deconstructor
// Take those parts and output them to different fields - GenerateHTML
// -- Label of parameter - Label
// -- Textbox for parameter input - Input
// ---- Populated with the values of the parameter - PlainText
// The url will then get reconstructered with values in the input - Reconstructor
// ============================================================================== //
// TODO:
// Add the title in of the page in to the environment header
// Show originalUrl if the url was previously changed
// History function - saves the last url (via checkbox)
// Create parameter field for when you need to create a custom parameter
// Connect up a event to disable a parameter - checkboxes
// Check if there is content to output
// Check if the url parse through contains the json item "installprogram"
// ============================================================================== //
var originalUrl;
var numOfOriginalParams = 0;
var numOfCustomeParams = 0;
// let tabObj: TabObj;
// server endpoint - prefix - pump interval (secs)
var client = new Html5Core.Metrics.Client('http://fpmatlair1/metrics/', 'oorl', 2);
/**
 * TabObj
 */
var TabObj = (function () {
    // headerText: string;
    // paramTable: string;
    function TabObj(tabTitle, tabUrl) {
        // let urlParts = breakUpUrl(tabUrl);
        var urlParts = tabUrl.split('?');
        originalUrl = urlParts[0];
        injectHtml('header', null, '<h3>" ' + tabTitle + ' " :</h3><h4>' + originalUrl + '</h4>');
        createParamTable((urlParts.length > 1) ? ('&' + urlParts[1]) : urlParts[0]);
    }
    return TabObj;
}());
function constructUrl() {
    // Sets the initial url
    var constUrl = originalUrl;
    // Determines what 
    if (numOfOriginalParams != 0) {
        var n = numOfOriginalParams;
        for (var i = 0; i != n; i++) {
            // Get checkbox state
            var cb = document.getElementById('cb' + i);
            // Check if the checkbox is checked, if so progress
            if (cb.checked) {
                // Get the label name
                var lblName = document.getElementById('lbl' + i).innerText;
                // Clean the label
                lblName = lblName.replace(':', '');
                // Get the input value
                var inValue = document.getElementById('in' + i).value;
                // Stick them together for '='
                constUrl += ((constUrl.indexOf('?') == -1 ? '?' : '&') + lblName + '=' + encodeParamUrl(inValue));
            }
        }
    }
    if (numOfCustomeParams != 0) {
        var n = numOfCustomeParams + 1;
        for (var i = 1; i != n; i++) {
            // Get checkbox state
            var cb = document.getElementById('ccb' + i);
            // Check if the checkbox is checked, if so progress
            if (cb.checked) {
                // Get the input values
                var lblName = document.getElementById('cinOne' + i).value;
                var inValue = document.getElementById('cinTwo' + i).value;
                if (lblName != "" || inValue != "") {
                    // Stick them together for '='
                    constUrl += ((constUrl.indexOf('?') == -1 ? '?' : '&') + lblName + '=' + encodeParamUrl(inValue));
                }
            }
        }
    }
    return constUrl;
}
function createParamTable(url) {
    if (url.search('&') != -1) {
        // Create the array that contains the parameters including their values
        var paramEquals = url.split('&');
        // Removes the first empty entry in the array 
        paramEquals.splice(0, 1);
        numOfOriginalParams = paramEquals.length;
        injectHtml('tableContainer', null, '<table id="paramTable"></table>');
        var pt = document.getElementById('paramTable');
        for (var i = 0; i < paramEquals.length; i++) {
            // Seperates the parameters name and value
            var paramNameValue = paramEquals[i].split('=');
            // New row creation
            var nr = pt.insertRow(-1);
            // New Cell creation
            var cbCell = nr.insertCell(0);
            cbCell.style = 'width: 22px';
            var lblCell = nr.insertCell(1);
            lblCell.style = 'width: 104px;';
            var inpCell = nr.insertCell(2);
            inpCell.style = 'width: 636px';
            var label = paramNameValue[0];
            var inputId = "in" + i;
            // Checkbox
            injectHtml(null, cbCell, '<input id="cb' + i + '" type="checkbox" checked>');
            // Label
            injectHtml(null, lblCell, '<label id="lbl' + i + '">' + label + ':   </label>');
            // Input
            if (paramNameValue.length > 1) {
                // Check if the string starts with "HTTP/S" - needs to Decode (decodeURIComponent)
                injectHtml(null, inpCell, '<input id="' + inputId + '" type="text" value="' + decodeParamIsUrl(paramNameValue[1]) + '" placeholder="Parameter value">');
            }
            else {
                injectHtml(null, inpCell, '<input id="' + inputId + '" type="text" placeholder="Parameter value">');
            }
            // Connect up the events for the checkbox and textbox
            checkBoxEvent('cb' + i, 'in' + i, null);
            client.LogCount('extension.parameters.existing.' + paramNameValue[0], 1);
        }
    }
    else {
        injectHtml('tableContainer', null, '<h5 id="np">No parameters... This is awkward.</h5>');
        client.LogCount('extension.loaded.noParameters', 1);
    }
}
function checkBoxEvent(checkboxElement, elemOneAttachTo, elemTwoAttachTo) {
    var ce = document.getElementById(checkboxElement);
    var ie = document.getElementById(elemOneAttachTo);
    var iee = document.getElementById(elemTwoAttachTo || null);
    var one = function () {
        if (!ce.checked) {
            ie.disabled = true;
        }
        else {
            ie.disabled = false;
        }
    };
    var two = function () {
        if (!ce.checked) {
            ie.disabled = true;
            iee.disabled = true;
        }
        else {
            ie.disabled = false;
            iee.disabled = false;
        }
    };
    ce.onclick = iee == null ? one : two;
}
function encodeParamUrl(param) {
    // if (param.search('http') > -1) {
    return encodeURIComponent(param);
    // }
    // return param;
}
function decodeParamIsUrl(param) {
    // if (param.search('http') > -1) {
    return decodeURIComponent(param);
    // }
    // return param;
}
function injectHtml(containerId, elemObj, toInjectText) {
    elemObj = elemObj || null;
    containerId = containerId || null;
    if (containerId && !(elemObj)) {
        elemObj = document.getElementById(containerId);
    }
    elemObj.innerHTML = toInjectText;
}
function addCustomParamRow() {
    var noParams = document.getElementById('np');
    if (noParams) {
        // let tableContainer = document.getElementById('tableContainer');
        // // Clear the no parameters message
        // tableContainer.innerHTML = '<table id="paramTable"></table>';
        injectHtml('tableContainer', null, '<table id="paramTable"></table>');
        // Places and field to input in
        insertEmptyParamField();
    }
    else {
        // Places and field to input in
        insertEmptyParamField();
    }
}
function insertEmptyParamField() {
    // Insert a row in the table at last index
    var newRow = document.getElementById('paramTable').insertRow(-1);
    numOfCustomeParams++;
    // Create row field
    var newRowField = '<td style="width: 22px;"><input id="ccb' + numOfCustomeParams + '" type="checkbox" checked></td>';
    newRowField += '<td style="width: 104px;"><input id="cinOne' + numOfCustomeParams + '" type="text" placeholder="Parameter name"></td>';
    newRowField += '<td style="width: 636px;"><input id="cinTwo' + numOfCustomeParams + '" type="text" placeholder="Parameter value"></td>';
    newRow.innerHTML = newRowField;
    checkBoxEvent('ccb' + numOfCustomeParams, 'cinOne' + numOfCustomeParams, 'cinTwo' + numOfCustomeParams);
    // Scroll to the bottom of the page to follow the new row addition
    window.scrollTo(0, window.innerHeight);
}
// Generate the qrcode
function generateQR(url) {
    // Clear out the inside of the qrcode container
    var cont = document.getElementById('qrcode');
    cont.innerHTML = '';
    // Create the new qrcode
    new QRCode(cont, {
        text: url,
        width: 555,
        height: 555
    });
}
// Attach a metrics log to the event on load page
document.addEventListener("DOMContentLoaded", function (event) {
    // postfix - logged amount
    client.LogCount('extension.loaded', 1);
});
// Entry point
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Creates the tab object
    var currentTab = tabs[0];
    var tabObj = new TabObj(currentTab.title, currentTab.url);
    document.getElementById('addParamBtn').onclick = function () {
        addCustomParamRow();
    };
    document.getElementById('qrShowBtn').onclick = function () {
        if (window.innerHeight < 640) {
            document.body.style.height = '640px';
        }
        document.getElementById('dialogBackground').style.display = 'table';
        generateQR(constructUrl());
    };
    document.getElementById('closeBtn').onclick = function () {
        document.getElementById('dialogBackground').style.display = 'none';
        document.body.style.height = '';
    };
    document.getElementById('openUrlBtn').onclick = function () {
        var tabUrl = { url: constructUrl() };
        if (document.getElementById('newtabChbox').checked) {
            chrome.tabs.create(tabUrl);
        }
        else {
            chrome.tabs.update(tabUrl);
        }
    };
});
