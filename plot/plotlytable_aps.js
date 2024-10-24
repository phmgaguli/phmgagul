(function () {
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
          fieldset {
              margin-bottom: 10px;
              border: 1px solid #afafaf;
              border-radius: 3px;
          }
          table {
              width: 100%;
          }
          input, textarea, select {
              font-family: "72", Arial, Helvetica, sans-serif;
              width: 100%;
              padding: 4px;
              box-sizing: border-box;
              border: 1px solid #bfbfbf;
          }
          input[type=checkbox] {
              width: inherit;
              margin: 6px 3px 6px 0;
              vertical-align: middle;
          }
      </style>
      <form id="form" autocomplete="off">
        <fieldset> 
          <legend>General</legend>
          <table>
            <tr>
              <td><label for="Text Size">Text Size</label></td>
              <td><input id="textsize" name="textsize" type="text"></td>
            </tr>
            <tr>
              <td><label for="Text Color">Text Color</label></td>
              <td><input id="textcolor" name="textcolor" type="text"></td>
            </tr>
          </table>
        </fieldset>
        <button type="submit" hidden>Submit</button>
      </form>
      <div id="plotlyTable"></div>
    `;

    class plotlyTableAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            let form = this._shadowRoot.getElementById("form");
            form.addEventListener("submit", this._submit.bind(this));
            form.addEventListener("change", this._change.bind(this));

            // Placeholder for Plotly data
            this.plotlyData = [];
        }

        connectedCallback() {
            this.renderTable();
        }

        _submit(e) {
            e.preventDefault();
            let properties = {};
            for (let name of plotlyTableAps.observedAttributes) {
                properties[name] = this[name];
            }
            console.log(properties);
            this._firePropertiesChanged(properties);
            return false;
        }

        _change(e) {
            this._changeProperty(e.target.name);
        }

        _changeProperty(name) {
            let properties = {};
            properties[name] = this[name];
            this._firePropertiesChanged(properties);
        }

        _firePropertiesChanged(properties) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        get textsize() {
            return this.getValue("textsize");
        }

        set textsize(value) {
            console.log("value: " + value);
            this.setValue("textsize", value);
            this.renderTable();
        }

        get textcolor() {
            return this.getValue("textcolor");
        }

        set textcolor(value) {
            this.setValue("textcolor", value);
            this.renderTable();
        }

        getValue(id) {
            return this._shadowRoot.getElementById(id).value;
        }

        setValue(id, value) {
            console.log(id + ":" + value);
            this._shadowRoot.getElementById(id).value = value;
        }

        // Function to render the Plotly table with data
        renderTable() {
            const plotlyTableDiv = this._shadowRoot.getElementById("plotlyTable");

            // Clear previous table
            plotlyTableDiv.innerHTML = '';

            const layout = {
                title: 'Data Visualization',
                height: 400,
                margin: { l: 40, r: 0, t: 40, b: 30 },
                font: {
                    size: parseInt(this.textsize) || 12,
                    color: this.textcolor || '#000'
                }
            };

            // Sample data for demonstration
            this.plotlyData = [
                { A: 1, B: 2, C: 3 },
                { A: 4, B: 5, C: 6 },
                { A: 7, B: 8, C: 9 }
            ];

            // Prepare the table data
            const tableData = this.plotlyData.map(row => Object.values(row));

            // Create the table using Plotly
            Plotly.newPlot(plotlyTableDiv, [{
                type: 'table',
                header: {
                    values: Object.keys(this.plotlyData[0]),
                    align: 'center',
                    line: { width: 1, color: '#506784' },
                    fill: { color: '#119DFF' },
                    font: { family: "Arial", size: 12, color: "white" }
                },
                cells: {
                    values: tableData,
                    align: 'center',
                    line: { color: '#506784', width: 1 },
                    fill: { color: ['#25a0df', 'white'] },
                    font: { family: "Arial", size: 11, color: ["black"] }
                }
            }], layout);
        }

        static get observedAttributes() {
            return [
                "textsize",
                "textcolor"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }
    }
    customElements.define("com-bcx-widget-plotlytable-aps", plotlyTableAps);
})();










































































































// (function () {
//     let tmpl = document.createElement("template");
//     tmpl.innerHTML = `
//       <style>
//           fieldset {
//               margin-bottom: 10px;
//               border: 1px solid #afafaf;
//               border-radius: 3px;
//           }
//           table {
//               width: 100%;
//           }
//           input, textarea, select {
//               font-family: "72",Arial,Helvetica,sans-serif;
//               width: 100%;
//               padding: 4px;
//               box-sizing: border-box;
//               border: 1px solid #bfbfbf;
//           }
//           input[type=checkbox] {
//               width: inherit;
//               margin: 6px 3px 6px 0;
//               vertical-align: middle;
//           }
//       </style>
//       <form id="form" autocomplete="off">
//         <fieldset> 
//           <legend>General</legend>
//           <table>
//             <tr>
//               <td><label for="Text Size">Text Size</label></td>
//               <td><input id="textsize" name="textsize" type="text"></td>
//             </tr>
//             <tr>
//               <td><label for="Text Color">Text Color</label></td>
//               <td><input id="textcolor" name="textcolor" type="text"></td>
//             </tr>
//           </table>
//         </fieldset>
//         <button type="submit" hidden>Submit</button>
//       </form>
//     `;

//     class plotlyTableAps extends HTMLElement {
//         constructor() {
//             super();
//             this._shadowRoot = this.attachShadow({ mode: "open" });
//             this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

//             let form = this._shadowRoot.getElementById("form");
//             form.addEventListener("submit", this._submit.bind(this));
//             form.addEventListener("change", this._change.bind(this));
//         }

//         connectedCallback() {
//         }

//         _submit(e) {
//             e.preventDefault();
//             let properties = {};
//             for (let name of plotlyTableAps.observedAttributes) {
//                 properties[name] = this[name];
//             }
//             console.log(properties);
//             this._firePropertiesChanged(properties);
//             return false;
//         }
//         _change(e) {
//             this._changeProperty(e.target.name);
//         }
//         _changeProperty(name) {
//             let properties = {};
//             properties[name] = this[name];
//             this._firePropertiesChanged(properties);
//         }

//         _firePropertiesChanged(properties) {
//             this.dispatchEvent(new CustomEvent("propertiesChanged", {
//                 detail: {
//                     properties: properties
//                 }
//             }));
//         }

//         get textsize() {
//             return this.getValue("textsize");
//         }
//         set textsize(value) {
//           console.log("value: " + value);
//             this.setValue("textsize", value);
//         }

//         get textcolor() {
//             return this.getValue("textcolor");
//         }
//         set textcolor(value) {
//             this.setValue("textcolor", value);
//         } 

//         getValue(id) {
//             return this._shadowRoot.getElementById(id).value;
//         }
//         setValue(id, value) {
//           console.log(id +":" + value);
//             this._shadowRoot.getElementById(id).value = value;
//         }

//         static get observedAttributes() {
//             return [
//                 "textsize",
//                 "textcolor"
//             ];
//         }

//         attributeChangedCallback(name, oldValue, newValue) {
//             if (oldValue != newValue) {
//                 this[name] = newValue;
//             }
//         }
//     }
//     customElements.define("com-bcx-widget-plotlytable-aps", plotlyTableAps);
// })();