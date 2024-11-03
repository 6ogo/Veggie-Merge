import { Application } from '@nativescript/core';

// Global error handling
Application.on(Application.uncaughtErrorEvent, (args) => {
    if (global.isIOS) {
        // Prevent iOS from showing the red error screen
        args.returnValue = true;
    }
    console.log('Uncaught error: ', args.error);
});

// Proper initialization
if (global.isIOS) {
    // Ensure UI is ready before starting
    setTimeout(() => {
        Application.run({ moduleName: 'app-root' });
    }, 100);
} else {
    Application.run({ moduleName: 'app-root' });
}