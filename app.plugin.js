// @ts-check

const expoCP = require('@expo/config-plugins')

/** @type {expoCP.ConfigPlugin} */
function expoModifyPlugin (config) {
    config = expoCP.AndroidConfig.Permissions.withPermissions(config, ["android.permission.FOREGROUND_SERVICE"])
    return expoCP.withAndroidManifest(config, config => {
        const mainApplication = expoCP.AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

        if (!mainApplication.service)
            mainApplication.service = [];

        mainApplication.service?.push({ $: {
            "android:name": "com.tanguyantoine.react.MusicControlNotification$NotificationService",
            "android:foregroundServiceType": "mediaPlayback",
            "android:exported": "false"
        }})
        return config;
    });
}

module.exports = expoModifyPlugin;