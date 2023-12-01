let hasSwatchyRun = false;

/**
 *
 * @param {Boolean} [autoClose=false] - Should the color picker close after selecting a color?
 * @param {Array} [watches] - Custom color swatches to use. Enter an array of hex codes
 * @constructor
 */

function Swatchy(
    autoClose=true,
    swatches=[
    "#B71C1C","#880E4F","#4A148C","#0D47A1","#006064",
    "#004D40","#194D33","#33691E","#827717","#F57F17",
    "#FF6F00","#E65100","#BF360C","#3E2723","#263238",
    ]
) {

    if (!hasSwatchyRun) {
        hasSwatchyRun = true;
        let swatchyCount = document.querySelectorAll('.swatchy-trigger');

        for (let id = 0; id < swatchyCount.length; id++) {

            let output
            let container

            // swatches = props?.swatches ?? this.swatches

            document.querySelectorAll('.swatchy-trigger').item(id)
            document.querySelectorAll('.swatchy-trigger').item(id).addEventListener('click', togglePopup)
            output = document.querySelectorAll('.swatchy-output').item(id)

            // create popup element
            container = document.createElement("div")
            container.classList.add('swatchy-element')
            container.setAttribute('style', 'display: none;')
            output.after(container)

            // add swatches to popup
            let swatchContainer = document.createElement('div')
            swatchContainer.classList.add('swatchy-swatches')
            container.appendChild(swatchContainer)

            let swatchCount = -1;
            for (const swatch of swatches) {
                swatchCount++;
                let colorButton = document.createElement('div')
                colorButton.setAttribute('data-swatchy-color', swatch)
                colorButton.style.backgroundColor = swatch
                colorButton.classList.add('swatchy-color-button')
                colorButton.addEventListener('click', selectColor)
                swatchContainer.appendChild(colorButton)

            }

            function selectColor(e) {
                let input = document.querySelectorAll('.swatchy-output').item(id)
                let newColor = e.target.getAttribute('data-swatchy-color')
                input.setAttribute('value', newColor)
                input.setAttribute('data-swatchy-color', newColor)
                input.setAttribute('style', 'background-color: ' + newColor + '; color: ' + newColor + ';')
                if (autoClose) {
                    togglePopup()
                }
            }

            function togglePopup() {
                let el = document.querySelectorAll('.swatchy-element').item(id)

                let display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display
                if ('none' === display) {
                    el.style.display = 'block'
                } else {
                    el.style.display = 'none'
                }
            }
        }
    } else {
        console.info('You only need to call swatchy once per page');
    }
}
Swatchy();

