// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"
import './process';
import {ReactInstance, Surface} from 'react-360-web';
import GlassModule from "./glasspanel_module/GlassModule";

function init(bundle, parent, options = {}) {

    const glassContainer = document.createElement('div');
    glassContainer.id = 'glass-overlay';

    const myFlatSurface = new Surface(
        200, /* width */
        300, /* height */
        Surface.SurfaceShape.Flat /* shape */
    );
    const r360 = new ReactInstance(bundle, parent, {
      // Add custom options here
      fullScreen: true,
        nativeModules: [ctx => new GlassModule(ctx, glassContainer)],
      ...options,
    });
      parent.parentNode.appendChild(glassContainer);
    // Render your app content to the default cylinder surface
    r360.renderToSurface(
      r360.createRoot('AudioTest360', { /* initial props */ }),
      r360.getDefaultSurface()
    );

    r360.renderToSurface(
        r360.createRoot('AudioTest360', { /*initial props */}),
        myFlatSurface
    );

    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
