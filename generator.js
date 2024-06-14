let fields = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("formFields")) {
        Swal.fire({
            title: 'Formulario encontrado',
            text: "¿Desea cargar el formulario guardado previamente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cargar',
            cancelButtonText: 'No, empezar de nuevo'
        }).then((result) => {
            if (result.isConfirmed) {
                loadFieldsFromLocalStorage();
            }
        });
    }
});

function addField() {
    const fieldType = document.getElementById('fieldType').value;
    const fieldLabel = document.getElementById('fieldLabel').value;
    const fieldName = document.getElementById('fieldName').value;
    const fieldPlaceholder = document.getElementById('fieldPlaceholder').value;
    const fieldInputType = document.getElementById('fieldInputType').value;

    let field = {
        type: fieldType,
        rules: { required: true },
        col: 4,
        model: fieldName,
        name: fieldName,
        label: fieldLabel,
        inputType: fieldInputType
    };

    if (fieldType === 'Field') {
        field.placeholder = fieldPlaceholder;
    }

    fields.push(field);
    generateJson();
    updateTable();
    saveFieldsToLocalStorage();
    clearForm();
}

function generateJson() {
    const generatedJson = {
        data: fields
    };

    document.getElementById('generatedJson').textContent = JSON.stringify(generatedJson, null, 2);
}

function updateTable() {
    const tableBody = document.getElementById('fieldsTable');
    tableBody.innerHTML = '';

    fields.forEach((field, index) => {
        const row = document.createElement('tr');

        const cellIndex = document.createElement('td');
        cellIndex.textContent = index + 1;
        row.appendChild(cellIndex);

        const cellLabel = document.createElement('td');
        cellLabel.textContent = field.label;
        row.appendChild(cellLabel);

        const cellName = document.createElement('td');
        cellName.textContent = field.name;
        row.appendChild(cellName);

        const cellType = document.createElement('td');
        cellType.textContent = field.type;
        row.appendChild(cellType);

        const cellActions = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.onclick = () => {
            deleteField(index);
        };
        cellActions.appendChild(deleteButton);
        row.appendChild(cellActions);

        tableBody.appendChild(row);
    });
}

function deleteField(index) {
    fields.splice(index, 1);
    generateJson();
    updateTable();
    saveFieldsToLocalStorage();
}

function clearForm() {
    document.getElementById('formGenerator').reset();
}

function saveFieldsToLocalStorage() {
    localStorage.setItem('formFields', JSON.stringify(fields));
}

function loadFieldsFromLocalStorage() {
    const storedFields = localStorage.getItem('formFields');
    if (storedFields) {
        fields = JSON.parse(storedFields);
        generateJson();
        updateTable();
    }
}
