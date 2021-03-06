/*App.accessRule('*://maxcdn.bootstrapcdn.com');
App.accessRule('*://fonts.googleapis.com');
App.accessRule('*://fonts.gstatic.com');
App.accessRule('*://cdnjs.cloudflare.com');
App.accessRule('*://maxcdn.bootstrapcdn.com');
App.accessRule('*://moreless.meteorapp.com');
App.accessRule('*://localhost:12280');
App.accessRule('*://www.instagram.com');
App.accessRule('*://instagram.fdnk1-2.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk1-1.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk1-3.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk1-4.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk2-2.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk2-1.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk2-3.fna.fbcdn.net');
App.accessRule('*://instagram.fdnk2-4.fna.fbcdn.net');

App.accessRule('https://www.instagram.com', { type: 'navigation' });
App.accessRule('https://www.instagram.com', { type: 'intent' });

App.accessRule('https://instagram.fdnk1-2.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk1-2.fna.fbcdn.net', { type: 'intent' });
App.accessRule('https://instagram.fdnk1-1.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk1-1.fna.fbcdn.net', { type: 'intent' });
App.accessRule('https://instagram.fdnk1-3.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk1-3.fna.fbcdn.net', { type: 'intent' });

App.accessRule('https://instagram.fdnk2-2.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk2-2.fna.fbcdn.net', { type: 'intent' });
App.accessRule('https://instagram.fdnk2-1.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk2-1.fna.fbcdn.net', { type: 'intent' });
App.accessRule('https://instagram.fdnk2-3.fna.fbcdn.net', { type: 'navigation' });
App.accessRule('https://instagram.fdnk2-3.fna.fbcdn.net', { type: 'intent' });*/
App.accessRule("*");

App.info({
    id: 'moreless.meteorapp.com',
    version: '1.0.3',
    name: 'MoreLess',
    description: 'Simple game where you need to choose what Instagram image has more likes',
    author: 'Alexander Halkin',
    email: 'sashalenovo10@gmail.com',
    website: 'http://moreless.meteorapp.com'
});

App.icons({
    "app_store": "resources/icons/app_store.png", // 1024x1024
    "iphone_2x": "resources/icons/iphone_2x.png", // 120x120
    "iphone_3x": "resources/icons/iphone_3x.png", // 180x180
    "ipad": "resources/icons/ipad.png", // 76x76
    "ipad_2x": "resources/icons/ipad_2x.png", // 152x152
    "ipad_pro": "resources/icons/ipad_pro.png", // 167x167
    "ios_settings": "resources/icons/ios_settings.png", // 29x29
    "ios_settings_2x": "resources/icons/ios_settings_2x.png", // 58x58
    "ios_settings_3x": "resources/icons/ios_settings_3x.png", // 87x87
    "ios_spotlight": "resources/icons/ios_spotlight.png", // 40x40
    "ios_spotlight_2x": "resources/icons/ios_spotlight_2x.png", // 80x80
    "ios_notification": "resources/icons/ios_notification.png", // 20x20
    "ios_notification_2x": "resources/icons/ios_notification_2x.png", // 40x40
    "ios_notification_3x":"resources/icons/ios_notification_3x.png", // 60x60
    "iphone_legacy": "resources/icons/iphone_legacy.png", // 57x57
    "iphone_legacy_2x": "resources/icons/iphone_legacy_2x.png", // 114x114
    "ipad_spotlight_legacy": "resources/icons/ipad_spotlight_legacy.png", // 50x50
    "ipad_spotlight_legacy_2x": "resources/icons/ipad_spotlight_legacy_2x.png", // 100x100
    "ipad_app_legacy": "resources/icons/ipad_app_legacy.png", // 72x72
    "ipad_app_legacy_2x": "resources/icons/ipad_app_legacy_2x.png", // 144x144
    "android_mdpi": "resources/icons/android_mdpi.png", // 48x48
    "android_hdpi": "resources/icons/android_hdpi.png", // 72x72
    "android_xhdpi": "resources/icons/android_xhdpi.png", // 96x96
    "android_xxhdpi": "resources/icons/android_xxhdpi.png", // 144x144
    "android_xxxhdpi": "resources/icons/android_xxxhdpi.png"
});

App.launchScreens({
    "iphone_2x": "resources/splashes/iphone_2x.png", // 640x490
    "iphone5": "resources/splashes/iphone5.png", // 640x1136
    "iphone6": "resources/splashes/iphone6.png", // 750x1334
    "iphone6p_portrait": "resources/splashes/iphone6p_portrait.png", // 2208x1242
    "iphone6p_landscape": "resources/splashes/iphone6p_landscape.png", // 2208x1242
    "ipad_portrait": "resources/splashes/ipad_portrait.png", // 768x1024
    "ipad_portrait_2x": "resources/splashes/ipad_portrait_2x.png", // 1536x2048
    "ipad_landscape": "resources/splashes/ipad_landscape.png", // 1024x768
    "ipad_landscape_2x": "resources/splashes/ipad_landscape_2x.png", // 2048x1536
    "android_mdpi_portrait": "resources/splashes/android_mdpi_portrait.png", // 320x480
    "android_mdpi_landscape": "resources/splashes/android_mdpi_landscape.png", // 480x320
    "android_hdpi_portrait": "resources/splashes/android_hdpi_portrait.png", // 480x800
    "android_hdpi_landscape": "resources/splashes/android_hdpi_landscape.png", // 800x480
    "android_xhdpi_portrait": "resources/splashes/android_xhdpi_portrait.png", // 720x1280
    "android_xhdpi_landscape": "resources/splashes/android_xhdpi_landscape.png", // 1280x720
    "android_xxhdpi_portrait": "resources/splashes/android_xxhdpi_portrait.png", // 1080x1440
    "android_xxhdpi_landscape": "resources/splashes/android_xxhdpi_landscape.png" // 1440x1080
})