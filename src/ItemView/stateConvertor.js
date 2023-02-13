

var state = {
    "root": {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "This is ",
                  "type": "text",
                  "version": 1
                },
                {
                  "detail": 0,
                  "format": 3,
                  "mode": "normal",
                  "style": "",
                  "text": "bolditalic ",
                  "type": "text",
                  "version": 1
                },
                {
                  "detail": 0,
                  "format": 5,
                  "mode": "normal",
                  "style": "",
                  "text": "TEXT",
                  "type": "text",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "type": "listitem",
              "version": 1,
              "value": 1
            },
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Too",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 1,
                      "type": "listitem",
                      "version": 1,
                      "value": 1
                    },
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "three",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 1,
                      "type": "listitem",
                      "version": 1,
                      "value": 2
                    },
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "detail": 0,
                                  "format": 0,
                                  "mode": "normal",
                                  "style": "",
                                  "text": "Inner",
                                  "type": "text",
                                  "version": 1
                                }
                              ],
                              "direction": "ltr",
                              "format": "",
                              "indent": 2,
                              "type": "listitem",
                              "version": 1,
                              "value": 1
                            }
                          ],
                          "direction": "ltr",
                          "format": "",
                          "indent": 0,
                          "type": "list",
                          "version": 1,
                          "listType": "number",
                          "start": 1,
                          "tag": "ol"
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 1,
                      "type": "listitem",
                      "version": 1,
                      "value": 3
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "type": "list",
                  "version": 1,
                  "listType": "number",
                  "start": 1,
                  "tag": "ol"
                }
              ],
              "direction": null,
              "format": "",
              "indent": 0,
              "type": "listitem",
              "version": 1,
              "value": 2
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "list",
          "version": 1,
          "listType": "number",
          "start": 1,
          "tag": "ol"
        },
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Heading 2",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "heading",
          "version": 1,
          "tag": "h2"
        },
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Heading 3",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "heading",
          "version": 1,
          "tag": "h3"
        },
        {
          "children": [
            {
              "children": [
                {
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "Link",
                  "type": "text",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "type": "link",
              "version": 1,
              "rel": "noopener",
              "target": null,
              "url": "https://"
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        },
        {
          "children": [],
          "direction": null,
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        },
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Right Align",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "right",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  }
/**
 * For each Node Type in Lexical, there is a most commonly
 * used property value.
 * 
 * We treat these as defaults & remove from the exported JSON
 * & Automatically include while importing JSON
 * 
 */
const typeDefaults = {
    text: {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        version: 1
    }, 
    listitem: {
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    },
    list: {
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        listType: 'number',
        start: 1,
        tag: 'ol'
    },
    heading: {
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        tag: 'h1'
    },
    link: {
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        rel: 'noopener',
        target: null,
    },
    paragraph: {
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
    }
}

/**
 * A Hashmap to reduce common key names to single chars
 */

const keyContractions = {
    checked: 'C',
    children: 'c',
    detail :'D',
    direction: 'd',
    format: 'f',
    indent: 'i',
    listType: 'L',
    mode: 'm',
    style: 's',
    rel: 'r',
    start: 'S',
    tag: 'T',
    target: 'A',
    text: 'x',
    type: 't',
    value: 'V',
    version: 'v',

}
var keyExpansions = {}
for (var key in keyContractions){
    keyExpansions[keyContractions[key]] = key
}

const typeContractions = {
    text: 't',
    listitem: 'l',
    list: 'L',
    heading: 'h',
    link: 'a',
    paragraph: 'p',
    excalidraw: 'E'
}
var typeExpansions = {}
for (var key in typeContractions){
    typeExpansions[typeContractions[key]] = key
}

function compactState(state) {
    var result = {}
    for (key in state) {
        // Firebase doesn't like `undefined`
        var value = typeof state[key] === 'undefined' ? null : state[key];
        var type = state.type;
        
        // Transform child states through recursion
        if (key == 'children'){
            result[keyContractions['children']] = value.map (val => compactState(val))
        }

        // Default value is defined in our `typeDefaults` and current key value pair
        // are present.
        else if (
          typeDefaults.hasOwnProperty(type) &&
          typeDefaults[type].hasOwnProperty(key) && 
          (typeDefaults[type][key] === value)) {
            // Skipping adding to `result`
            1;
        }
        else {
            // If it isn't default, save the key & value but with the
            // contracted key
            if (key == 'type'){
                value = typeContractions[value] || value;
            }
            if (keyContractions[key]){
                result[keyContractions[key]] = value
            }
            else {
                result[key] = value
            }
        }
    }
    return result;
}

function expandState (state) {
    var result = {}
    var type = typeExpansions[state[keyContractions['type']]]

    for (var key in state){
        var value = state[key];
        if (key == keyContractions['children']){
            result['children'] = value.map(val => expandState(val))
        }
        else if (key == keyContractions['type']){
            result['type'] = type ? type: value;
        }
        else if (keyExpansions[key]){
          result[keyExpansions[key]] = value;
        }
        else {
            result[key] = value;
        }
    }

    for (var key in typeDefaults[type]){
        result[key] = result[key] || typeDefaults[type][key]
    }

    return result;
}

window.compactState = compactState;
window.expandState = expandState;

export {expandState, compactState}
