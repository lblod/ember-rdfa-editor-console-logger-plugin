import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-plugins/console-logger-card', 'Integration | Component | editor plugin console logger card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editor-plugins/console-logger-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editor-plugin/console-logger-card}}
      template block text
    {{/editor-plugin/console-logger-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
