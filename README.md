# @lblod/ember-rdfa-editor-console-logger-plugin

This is a plugin for the editor-plugin-system which logs the information it has received to the console.

## Installation
```
ember install @lblod/ember-rdfa-editor
ember install @lblod/ember-rdfa-editor-console-logger-plugin
```

## Configuration
The plugin will automatically be added in the `default` and `all` editor profiles in `app/config/editor-profiles.js`. Add the plugin name `rdfa-editor-console-logger-plugin` to other editor profiles if you want to enable the plugin in these profiles, too.

Once the plugin is configured in the appropriate editor profiles in `app/config/editor-profiles.js` it will be automatically be picked up by the rdfa-editor.
