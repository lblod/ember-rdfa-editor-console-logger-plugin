import { debug } from '@ember/debug';
import { Promise } from 'rsvp';
import Service from '@ember/service';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';

/**
* RDFa Editor plugin that pushes a dummy hint on specific keyword.
* Mainly used for debugging purposes.
*
* @module editor-console-logger-plugin
* @class RdfaEditorConsoleLoggerPlugin
* @extends Service
*/
export default Service.extend({
  /**
   * @property who
   * @type string
   * @default 'editor-plugins/console-logger-card'
   *
   * @private
  */
  who: 'editor-plugins/console-logger-card',

  /**
   * @property keyword
   * @type string
   * @default 'console'
   *
   * @private
  */
  keyword: 'console',

  /**
   * Restartable task to handle the incoming events from the editor dispatcher
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Array} contexts RDFa contexts of the text snippets the event applies on
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @public
   */
  execute: task(function * (hrId, contexts, hintsRegistry, editor) {
    const promises = contexts.map((context) => {
      new Promise((resolve) => {
        const hints = this.generateHintsForContext(context, hrId, hintsRegistry, editor);

        hintsRegistry.removeHintsInRegion(context.region, hrId, this.get('who'));

        if (hints.length > 0) {
          hintsRegistry.addHints(hrId, this.get('who'), hints);
        }

        resolve();
      });
    });

    yield Promise.all(promises);
  }).restartable(),

  /**
   * Generates hints for a location matching the keyword
   *
   * @method generateHintsForContext
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @return {Array} Array of cards to hint for a given context
   *
   * @private
   */
  generateHintsForContext(context, hrId, hintsRegistry, editor) {
    const hints = [];

    const message = `Hello at ${new Date().toISOString()}`;

    const length = this.get('keyword').length;
    let offset = 0;
    let i = context.text.indexOf(this.get('keyword'), offset);

    while (i >= 0) {
      const location = [context.region[0] + i, context.region[0] + i + length];
      debug(`Console logger plugin found a keyword match at [${location}]`);

      hints.push(
        EmberObject.create({
          location,
          card: this.get('who'),
          info: { title: message, value: 'hello', hrId, hintsRegistry, editor, location }
        })
      );

      offset = i + length;
      i = context.text.indexOf(this.get('keyword'), offset);
    }

    return hints;
  }
});
