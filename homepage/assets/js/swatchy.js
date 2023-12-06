let hasSwatchyRun = false;

function Swatchy(
    autoClose = true,
    swatches = [
        { color: "#64CCC5", tag: "Cya" },   // 青色
        { color: "#6a1b9a", tag: "Pur" },   // 紫色
        { color: "#f584d3", tag: "Pin" },   // 粉红色
        { color: "#f20707", tag: "Red" },   // 红色
        { color: "#d11d9b", tag: "Mag" },   // 洋红色
        { color: "#f5e50a", tag: "Yel" },   // 黃色
        { color: "#1af50a", tag: "Gre" },   // 綠色
        { color: "#f2a90c", tag: "Ora" },   // 橙色
        { color: "#ed8251", tag: "Pch" },   // 桃色
        { color: "#5166ed", tag: "Blu" },   // 藍色
        { color: "#6d6a8f", tag: "Gra" },   // 灰色
        { color: "#40f7b1", tag: "Whi" },   // 白色
        { color: "#000000", tag: "Bla" },   // 黑色
        { color: "#756937", tag: "Bro" },   // 褐色
        { color: "#11038c", tag: "DBl" },   // 深藍色
    ]
) {
    if (!hasSwatchyRun) {
        hasSwatchyRun = true;
        let swatchyCount = document.querySelectorAll('.swatchy-trigger');

        for (let id = 0; id < swatchyCount.length; id++) {
            let output;
            let container;

            document.querySelectorAll('.swatchy-trigger').item(id).addEventListener('click', togglePopup);
            output = document.querySelectorAll('.swatchy-output').item(id);

            // create popup element
            container = document.createElement("div");
            container.classList.add('swatchy-element');
            container.setAttribute('style', 'display: none;');
            output.after(container);

            // add swatches to popup
            let swatchContainer = document.createElement('div');
            swatchContainer.classList.add('swatchy-swatches');
            container.appendChild(swatchContainer);

            for (const swatch of swatches) {
                let colorButton = document.createElement('div');
                colorButton.setAttribute('data-swatchy-color', swatch.color);
                colorButton.style.backgroundColor = swatch.color;
                colorButton.classList.add('swatchy-color-button');
                colorButton.addEventListener('click', selectColor);

                let inputTag = document.createElement('input');
                inputTag.classList.add('swatchy-tag-input');
                inputTag.value = swatch.tag;
                inputTag.disabled = true;

                // Append the tag and color button to the swatch container
                swatchContainer.appendChild(colorButton);
                swatchContainer.appendChild(inputTag);
            }

            let editBut = document.createElement('button');
            editBut.id = "colorPicker";
            editBut.onclick = function () {
                toggleEdit();
            };
            editBut.innerHTML = "edit";
            editBut.type = "button";
            swatchContainer.appendChild(editBut);

            function toggleEdit() {
                // Find all input elements inside the container
                let inputs = swatchContainer.querySelectorAll('.swatchy-tag-input');
            
                // Check if the inputs are in edit mode
                let isEditMode = inputs[0].disabled;
            
                // Toggle between edit and display modes for each input
                inputs.forEach(input => {
                    input.disabled = !isEditMode;
                });

                let colorButtons = swatchContainer.querySelectorAll('.swatchy-color-button');
                colorButtons.forEach(button => {
                    if (isEditMode) {
                        button.removeEventListener('click', selectColor);
                        button.style.pointerEvents = 'none';
                    } else {
                        button.addEventListener('click', selectColor);
                        button.style.pointerEvents = 'auto';
                    }
                });
            
                // Change the button text accordingly
                editBut.innerHTML = isEditMode ? "save" : "edit";
            }


            function selectColor(e) {
                let input = document.querySelectorAll('.swatchy-output').item(id);
                let newColor = e.target.getAttribute('data-swatchy-color');
                let tagText = e.target.nextSibling.value;
                
                input.setAttribute('value', tagText);
                input.setAttribute('data-swatchy-color', newColor);
                input.setAttribute('style', 'background-color: ' + newColor + '; color: ' + newColor + ';');

                if (autoClose) {
                    togglePopup();
                }
            }

            function togglePopup() {
                let el = document.querySelectorAll('.swatchy-element').item(id);

                let display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display;
                if ('none' === display) {
                    el.style.display = 'block';
                } else {
                    el.style.display = 'none';
                }
            }
        }
    } else {
        console.info('You only need to call swatchy once per page');
    }
}

Swatchy();