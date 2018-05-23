/**
 * @module src/app
 */
import MotherComponent from '../MotherComponent/MotherComponent.js';

import template from './Home.html!text';
import stylesheet from './Home.css!';

import {geolocation} from '../../Services/geolocation.js';
import {wikiRetreiver} from '../../Services/wiki.js';

export default class Home extends MotherComponent {
    /**
     * Creates a full Home component with its whole logic encapsulated:
     *
     * * display of the result
     *
     * Example:
     *
     * ```
     * var myHome = (new Home('home')).init();
     * ```
     * @namespace Components.Home.Home
     * @class Home
     * @extends Components.MotherComponent.MotherComponent
     * @constructor
     * @param {HTMLElement|String} domNode Can be an domNode or a domNode id
     */
    constructor(domNode) {
        super(domNode, template);
    }

    init() {
        var search = this.domNode.querySelector('.searchWiki'),
            content = this.domNode.querySelector('#contentView');

        search.addEventListener('click', () => {
            let inputValue = document.getElementsByTagName("input")[0].value;
            wikiRetreiver(inputValue).then((res) => {
                let textToShow = res.parse.text["*"];
                let $el = document.createElement('html');
                $el.innerHTML = `${textToShow}`;
                console.log("textToShow", $el);
                content.appendChild($el);
            })
        });
    }
}