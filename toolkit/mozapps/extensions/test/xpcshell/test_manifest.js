/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/
 */

// This tests that all properties are read from the install manifests and that
// items are correctly enabled/disabled based on them (blocklist tests are
// elsewhere)

function run_test() {
  createAppInfo("xpcshell@tests.mozilla.org", "XPCShell", "1", "1.9.2");
  const profileDir = gProfD.clone();
  profileDir.append("extensions");

  writeInstallRDFForExtension({
    id: "addon1@tests.mozilla.org",
    version: "1.0",
    optionsURL: "chrome://test/content/options.xul",
    aboutURL: "chrome://test/content/about.xul",
    iconURL: "chrome://test/skin/icon.png",
    icon64URL: "chrome://test/skin/icon64.png",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 1",
    description: "Test Description",
    creator: "Test Creator",
    homepageURL: "http://www.example.com",
    developer: [
      "Test Developer 1",
      "Test Developer 2"
    ],
    translator: [
      "Test Translator 1",
      "Test Translator 2"
    ],
    contributor: [
      "Test Contributor 1",
      "Test Contributor 2"
    ]
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon2@tests.mozilla.org",
    version: "1.0",
    updateURL: "https://www.foo.com",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 2"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon3@tests.mozilla.org",
    version: "1.0",
    updateURL: "http://www.foo.com",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 3"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon4@tests.mozilla.org",
    version: "1.0",
    updateURL: "http://www.foo.com",
    updateKey: "foo",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 4"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon5@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "*"
    }],
    name: "Test Addon 5"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon6@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "0",
      maxVersion: "1"
    }],
    name: "Test Addon 6"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon7@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "0",
      maxVersion: "0"
    }],
    name: "Test Addon 7"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon8@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1.1",
      maxVersion: "*"
    }],
    name: "Test Addon 8"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon9@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9.2",
      maxVersion: "1.9.*"
    }],
    name: "Test Addon 9"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon10@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9.2.1",
      maxVersion: "1.9.*"
    }],
    name: "Test Addon 10"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon11@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9",
      maxVersion: "1.9.2"
    }],
    name: "Test Addon 11"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon12@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9",
      maxVersion: "1.9.1.*"
    }],
    name: "Test Addon 12"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon13@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9",
      maxVersion: "1.9.*"
    }, {
      id: "xpcshell@tests.mozilla.org",
      minVersion: "0",
      maxVersion: "0.5"
    }],
    name: "Test Addon 13"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon14@tests.mozilla.org",
    version: "1.0",
    targetApplications: [{
      id: "toolkit@mozilla.org",
      minVersion: "1.9",
      maxVersion: "1.9.1"
    }, {
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 14"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon15@tests.mozilla.org",
    version: "1.0",
    updateKey: "foo",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 15"
  }, profileDir);

  writeInstallRDFForExtension({
    id: "addon16@tests.mozilla.org",
    version: "1.0",
    updateKey: "foo",
    updateURL: "https://www.foo.com",
    targetApplications: [{
      id: "xpcshell@tests.mozilla.org",
      minVersion: "1",
      maxVersion: "1"
    }],
    name: "Test Addon 16"
  }, profileDir);

  do_test_pending();
  startupManager();
  AddonManager.getAddonsByIDs(["addon1@tests.mozilla.org",
                               "addon2@tests.mozilla.org",
                               "addon3@tests.mozilla.org",
                               "addon4@tests.mozilla.org",
                               "addon5@tests.mozilla.org",
                               "addon6@tests.mozilla.org",
                               "addon7@tests.mozilla.org",
                               "addon8@tests.mozilla.org",
                               "addon9@tests.mozilla.org",
                               "addon10@tests.mozilla.org",
                               "addon11@tests.mozilla.org",
                               "addon12@tests.mozilla.org",
                               "addon13@tests.mozilla.org",
                               "addon14@tests.mozilla.org",
                               "addon15@tests.mozilla.org",
                               "addon16@tests.mozilla.org"],
                               function([a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
                                         a11, a12, a13, a14, a15, a16]) {

    do_check_neq(a1, null);
    do_check_eq(a1.id, "addon1@tests.mozilla.org");
    do_check_eq(a1.type, "extension");
    do_check_eq(a1.version, "1.0");
    do_check_eq(a1.optionsURL, "chrome://test/content/options.xul");
    do_check_eq(a1.aboutURL, "chrome://test/content/about.xul");
    do_check_eq(a1.iconURL, "chrome://test/skin/icon.png");
    do_check_eq(a1.icon64URL, "chrome://test/skin/icon64.png");
    do_check_eq(a1.name, "Test Addon 1");
    do_check_eq(a1.description, "Test Description");
    do_check_eq(a1.creator, "Test Creator");
    do_check_eq(a1.homepageURL, "http://www.example.com");
    do_check_eq(a1.developers[0], "Test Developer 1");
    do_check_eq(a1.developers[1], "Test Developer 2");
    do_check_eq(a1.translators[0], "Test Translator 1");
    do_check_eq(a1.translators[1], "Test Translator 2");
    do_check_eq(a1.contributors[0], "Test Contributor 1");
    do_check_eq(a1.contributors[1], "Test Contributor 2");
    do_check_true(a1.isActive);
    do_check_false(a1.userDisabled);
    do_check_false(a1.appDisabled);
    do_check_true(a1.isCompatible);
    do_check_true(a1.providesUpdatesSecurely);
    do_check_eq(a1.blocklistState, AM_Ci.nsIBlocklistService.STATE_NOT_BLOCKED);

    do_check_neq(a2, null);
    do_check_eq(a2.id, "addon2@tests.mozilla.org");
    do_check_true(a2.isActive);
    do_check_false(a2.userDisabled);
    do_check_false(a2.appDisabled);
    do_check_true(a2.providesUpdatesSecurely);

    do_check_neq(a3, null);
    do_check_eq(a3.id, "addon3@tests.mozilla.org");
    do_check_false(a3.isActive);
    do_check_false(a3.userDisabled);
    do_check_true(a3.appDisabled);
    do_check_false(a3.providesUpdatesSecurely);

    do_check_neq(a4, null);
    do_check_eq(a4.id, "addon4@tests.mozilla.org");
    do_check_true(a4.isActive);
    do_check_false(a4.userDisabled);
    do_check_false(a4.appDisabled);
    do_check_true(a4.providesUpdatesSecurely);

    do_check_neq(a5, null);
    do_check_true(a5.isActive);
    do_check_false(a5.userDisabled);
    do_check_false(a5.appDisabled);
    do_check_true(a5.isCompatible);

    do_check_neq(a6, null);
    do_check_true(a6.isActive);
    do_check_false(a6.userDisabled);
    do_check_false(a6.appDisabled);
    do_check_true(a6.isCompatible);

    do_check_neq(a7, null);
    do_check_false(a7.isActive);
    do_check_false(a7.userDisabled);
    do_check_true(a7.appDisabled);
    do_check_false(a7.isCompatible);

    do_check_neq(a8, null);
    do_check_false(a8.isActive);
    do_check_false(a8.userDisabled);
    do_check_true(a8.appDisabled);
    do_check_false(a8.isCompatible);

    do_check_neq(a9, null);
    do_check_true(a9.isActive);
    do_check_false(a9.userDisabled);
    do_check_false(a9.appDisabled);
    do_check_true(a9.isCompatible);

    do_check_neq(a10, null);
    do_check_false(a10.isActive);
    do_check_false(a10.userDisabled);
    do_check_true(a10.appDisabled);
    do_check_false(a10.isCompatible);

    do_check_neq(a11, null);
    do_check_true(a11.isActive);
    do_check_false(a11.userDisabled);
    do_check_false(a11.appDisabled);
    do_check_true(a11.isCompatible);

    do_check_neq(a12, null);
    do_check_false(a12.isActive);
    do_check_false(a12.userDisabled);
    do_check_true(a12.appDisabled);
    do_check_false(a12.isCompatible);

    do_check_neq(a13, null);
    do_check_false(a13.isActive);
    do_check_false(a13.userDisabled);
    do_check_true(a13.appDisabled);
    do_check_false(a13.isCompatible);

    do_check_neq(a14, null);
    do_check_true(a14.isActive);
    do_check_false(a14.userDisabled);
    do_check_false(a14.appDisabled);
    do_check_true(a14.isCompatible);

    do_check_neq(a15, null);
    do_check_true(a15.isActive);
    do_check_false(a15.userDisabled);
    do_check_false(a15.appDisabled);
    do_check_true(a15.isCompatible);
    do_check_true(a15.providesUpdatesSecurely);

    do_check_neq(a16, null);
    do_check_true(a16.isActive);
    do_check_false(a16.userDisabled);
    do_check_false(a16.appDisabled);
    do_check_true(a16.isCompatible);
    do_check_true(a16.providesUpdatesSecurely);

    do_test_finished();
  });
}
