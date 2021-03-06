import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | editor plugin console logger card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{editor-plugins/console-logger-card}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#editor-plugin/console-logger-card}}
        template block text
      {{/editor-plugin/console-logger-card}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
