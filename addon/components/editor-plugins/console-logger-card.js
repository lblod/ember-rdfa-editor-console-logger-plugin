import Component from '@ember/component';
import { debug } from '@ember/debug';
import { reads } from '@ember/object/computed';
import layout from '../../templates/components/editor-plugins/console-logger-card';

/**
* Card displaying a hint of the Console Logger plugin
*
* @module editor-console-logger-plugin
* @class ConsoleLoggerCard
* @extends Component
*/
export default Component.extend({
  layout,

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  location: reads('info.location'),

  /**
   * Unique identifier of the event in the hints registry
   * @property hrId
   * @type Object
   * @private
  */
  hrId: reads('info.hrId'),

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  editor: reads('info.editor'),

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  hintsRegistry: reads('info.hintsRegistry'),

  actions: {
    /**
     * Insert the hint in the editor by replacing the text at `location` with the value of the card
     *
     * @method insert
     *
     * @private
    */
    insert(){
      debug(`Insert card: ${this.get('info.title')}`);

      let mappedLocation = this.get('hintsRegistry').updateLocationToCurrentIndex(this.get('hrId'), this.get('location'));

      this.get('editor').replaceTextWithHTML(...mappedLocation, this.get('info.value'));
    }
  }
});
