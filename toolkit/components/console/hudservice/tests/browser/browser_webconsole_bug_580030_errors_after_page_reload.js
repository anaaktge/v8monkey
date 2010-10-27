/* vim:set ts=2 sw=2 sts=2 et: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is DevTools test code.
 *
 * The Initial Developer of the Original Code is Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *  David Dahl <ddahl@mozilla.com>
 *  Patrick Walton <pcwalton@mozilla.com>
 *  Julian Viereck <jviereck@mozilla.com>
 *  Mihai Sucan <mihai.sucan@gmail.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

// Tests that errors still show up in the Web Console after a page reload.

const TEST_URI = "http://example.com/browser/toolkit/components/console/hudservice/tests/browser/test-error.html";

function test() {
  addTab(TEST_URI);
  browser.addEventListener("load", onLoad, true);
}

// see bug 580030: the error handler fails silently after page reload.
// https://bugzilla.mozilla.org/show_bug.cgi?id=580030
function onLoad(aEvent) {
  browser.removeEventListener(aEvent.type, arguments.callee, true);

  openConsole();

  browser.addEventListener("load", testErrorsAfterPageReload, true);
  executeSoon(function() {
    content.location.reload();
  });
}

function testErrorsAfterPageReload(aEvent) {
  browser.removeEventListener(aEvent.type, arguments.callee, true);

  // dispatch a click event to the button in the test page and listen for
  // errors.

  Services.console.registerListener(consoleObserver);

  var button = content.document.querySelector("button").wrappedJSObject;
  var clickEvent = content.wrappedJSObject.document.createEvent("MouseEvents").wrappedJSObject;
  clickEvent.initMouseEvent("click", true, true,
    content.wrappedJSObject, 0, 0, 0, 0, 0, false, false,
    false, false, 0, null);

  executeSoon(function() {
    button.dispatchEvent(clickEvent);
  });
}

var consoleObserver = {
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),

  observe: function test_observe(aMessage)
  {
    // Ignore errors we don't care about.
    if (!(aMessage instanceof Ci.nsIScriptError) ||
      aMessage.category != "content javascript") {
      return;
    }

    Services.console.unregisterListener(this);

    const successMsg = "Found the error message after page reload";
    const errMsg = "Could not get the error message after page reload";

    var display = HUDService.getDisplayByURISpec(content.location.href);
    var outputNode = display.querySelector(".hud-output-node");

    executeSoon(function() {
      testLogEntry(outputNode, "fooBazBaz",
                   { success: successMsg, err: errMsg });

      finishTest();
    });
  }
};

