let swatches = [
    { color: "#64CCC5", tag: "預設" },
    { color: "#009788", tag: "" },
    { color: "#039be6", tag: "" },
    { color: "#f5511e", tag: "" },
    { color: "#ef6c00", tag: "" },
    { color: "#ef9300", tag: "" },
    { color: "#ad1457", tag: "" },
    { color: "#d81a60", tag: "" },
    { color: "#d60000", tag: "" },
    { color: "#7986cc", tag: "" },
    { color: "#b39ddb", tag: "" },
    { color: "#9e69af", tag: "" },
    { color: "#795547", tag: "" },
    { color: "#616161", tag: "" },
    { color: "#a79b8d", tag: "" },
]

function loadUserTagName(userID, callback){
    $.ajax({
        url: "assets/php/searchColorTag.php",
        method: "post",
        dataType: "json",
        data: { 'userID': userID},
        success: function (json) {
            //console.log(json);
            showTagName(json[0]);
            Swatchy();
            callback();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function showTagName(json){
    const arrayOfValue = Object.values(json);
    for(let i=1; i<arrayOfValue.length; i++){
        swatches[i-1].tag = arrayOfValue[i];
    }
}

let hasSwatchyRun = false;
function Swatchy(
    autoClose = true,
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

            let i = 1;
            for (const swatch of swatches) {
                let colorButton = document.createElement('div');
                colorButton.setAttribute('data-swatchy-color', swatch.color);
                colorButton.style.backgroundColor = swatch.color;
                colorButton.classList.add('swatchy-color-button');
                colorButton.addEventListener('click', selectColor);

                let inputTag = document.createElement('input');
                inputTag.classList.add('swatchy-tag-input');
                inputTag.id = `inputColor${i}`;
                i++;
                inputTag.value = swatch.tag;
                inputTag.disabled = true;

                // Append the tag and color button to the swatch container
                swatchContainer.appendChild(colorButton);
                swatchContainer.appendChild(inputTag);
            }

            let editBut = document.createElement('button');
            editBut.id = "editcolorPicker";
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

                if (!isEditMode) {
                    // When in edit mode, send the updated data to colorTag.php
                    sendDataToColorTagPHP();
                }
            }

            function sendDataToColorTagPHP() {
                // Collect the updated data
                let tags = [];
                let inputs = swatchContainer.querySelectorAll('.swatchy-tag-input');
                let passUserID = userID;

                inputs.forEach(input => {
                    tags.push(input.value);
                    //console.log(input.value);
                });

                let passData = {
                    passUserID: passUserID,
                    tags: tags,
                };
                //console.log(passData)

                // Send the data to colorTag.php using fetch
                fetch('assets/php/colorTag.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(passData),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data); // handle the response from the server if needed
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            function selectColor(e) {
                let input = document.querySelectorAll('.swatchy-output').item(id);
                let newColor = e.target.getAttribute('data-swatchy-color');
                let tagText = e.target.nextSibling.value;
                input.value = tagText;
                input.setAttribute('data-swatchy-color', newColor);
                input.setAttribute('style', 'background-color: ' + newColor + '; color: #ffffff;');

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


//loadUserTagName(userID);



