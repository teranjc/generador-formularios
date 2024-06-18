let fields = [];
let jsonEditorOptions;
let jsonEditorRules;
let jsonEditorConditional;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize JSON Editors
  jsonEditorOptions = new JSONEditor(
    document.getElementById("jsonEditorOptions"),
    {
      modes: ["text", "tree"],
      onChange: function () {
        // Optionally handle changes
      },
      enableSort: false, // Habilitar ordenamiento en el árbol
      enableTransform: true, // Habilitar transformación en el árbol
      enableContextMenu: true, // Habilitar menú contextual
      enableDragDrop: true, // Habilitar arrastrar y soltar en el árbol
      enableClipboard: true, // Habilitar portapapeles (copiar, cortar, pegar)
      enableSearch: true, // Habilitar búsqueda en el árbol
      contextMenu: {
        actions: {
          // Configuración del menú contextual
          edit: true, // Habilitar edición
          cut: true, // Habilitar cortar
          copy: true, // Habilitar copiar
          paste: true, // Habilitar pegar
          remove: true, // Habilitar eliminar
          duplicate: true, // Habilitar duplicar
          extract: true, // Habilitar extraer
          sort: true, // Habilitar ordenar
          transform: true, // Habilitar transformar
          replace: true, // Habilitar reemplazar/insertar
        },
      },
    }
  );

  jsonEditorConditional = new JSONEditor(
    document.getElementById("jsonEditorConditional"),
    {
      modes: ["text", "tree"],
      onChange: function () {
        // Optionally handle changes
      },
      enableSort: false, // Habilitar ordenamiento en el árbol
      enableTransform: true, // Habilitar transformación en el árbol
      enableContextMenu: true, // Habilitar menú contextual
      enableDragDrop: true, // Habilitar arrastrar y soltar en el árbol
      enableClipboard: true, // Habilitar portapapeles (copiar, cortar, pegar)
      enableSearch: true, // Habilitar búsqueda en el árbol
      contextMenu: {
        actions: {
          // Configuración del menú contextual
          edit: true, // Habilitar edición
          cut: true, // Habilitar cortar
          copy: true, // Habilitar copiar
          paste: true, // Habilitar pegar
          remove: true, // Habilitar eliminar
          duplicate: true, // Habilitar duplicar
          extract: true, // Habilitar extraer
          sort: true, // Habilitar ordenar
          transform: true, // Habilitar transformar
          replace: true, // Habilitar reemplazar/insertar
        },
      },
    }
  );

  jsonEditorRules = new JSONEditor(document.getElementById("jsonEditorRules"), {
    modes: ["text", "tree"],
    onChange: function () {
      // Optionally handle changes
    },
    enableSort: true, // Habilitar ordenamiento en el árbol
    enableTransform: true, // Habilitar transformación en el árbol
    enableContextMenu: true, // Habilitar menú contextual
    enableDragDrop: true, // Habilitar arrastrar y soltar en el árbol
    enableClipboard: true, // Habilitar portapapeles (copiar, cortar, pegar)
    enableSearch: true, // Habilitar búsqueda en el árbol
    contextMenu: {
      actions: {
        // Configuración del menú contextual
        edit: true, // Habilitar edición
        cut: true, // Habilitar cortar
        copy: true, // Habilitar copiar
        paste: true, // Habilitar pegar
        remove: true, // Habilitar eliminar
        duplicate: true, // Habilitar duplicar
        extract: true, // Habilitar extraer
        sort: true, // Habilitar ordenar
        transform: true, // Habilitar transformar
        replace: true, // Habilitar reemplazar/insertar
      },
    },
  });

  // Set default value for fieldRules textarea
  const defaultRules = { required: true };
  jsonEditorRules.set(defaultRules);
  // Check if there are stored fields in localStorage
  if (localStorage.getItem("formFields")) {
    Swal.fire({
      title: "Formulario encontrado",
      text: "¿Desea cargar el formulario guardado previamente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cargar",
      cancelButtonText: "No, empezar de nuevo",
    }).then((result) => {
      if (result.isConfirmed) {
        loadFieldsFromLocalStorage();
      }
    });
  }
});

// Function to toggle display of optionsField based on fieldType selection
function toggleOptionsAndRulesFields() {
  const fieldType = document.getElementById("fieldType").value;
  const optionsField = document.getElementById("optionsField");

  if (fieldType === "SelectButton" || fieldType === "Dropdown") {
    optionsField.style.display = "block";
  } else {
    optionsField.style.display = "none";
  }
}

// Function to toggle display of optionsField based on fieldType selection
function toggleConditional() {
  const fieldType = document.getElementById("fieldInputCoditional").value;
  const conditionalField = document.getElementById("conditionalField");

  if (fieldType === "SI") {
    conditionalField.style.display = "block";
  } else {
    conditionalField.style.display = "none";
  }
}

// Function to add a new field to the fields array
function addField() {
  const fieldType = document.getElementById("fieldType").value;
  const fieldLabel = document.getElementById("fieldLabel").value;
  const fieldName = document.getElementById("fieldName").value;
  const fieldPlaceholder = document.getElementById("fieldPlaceholder").value;
  const fieldCol = document.getElementById("fieldCol").value;
  const fieldInputType = document.getElementById("fieldInputType").value;
  const fieldUnit = document.getElementById("fieldUnit").value;
  const fieldInputCoditional = document.getElementById(
    "fieldInputCoditional"
  ).value;
  const fieldOptions = jsonEditorOptions.get(); // Get the JSON from editor
  const fieldRules = jsonEditorRules.get(); // Get the JSON from editor
  const fieldConditional = jsonEditorConditional.get(); // Get the JSON from editor

  let field = {
    type: fieldType,
    col: fieldCol,
    model: fieldName,
    name: fieldName,
    label: fieldLabel,
    inputType: fieldInputType,
    rules: fieldRules,
    unit: fieldUnit,
  };

  // Depending on the fieldType, handle specific field properties
  if (fieldType === "Field") {
    field.placeholder = fieldPlaceholder;
  }
  if (fieldInputCoditional === "SI") {
    field.conditional = fieldConditional;
  }
  if (fieldType === "SelectButton" || fieldType === "Dropdown") {
    field.options = fieldOptions;
  }

  fields.push(field); // Add the field to the fields array
  generateJson(); // Generate and display the JSON representation
  updateTable(); // Update the HTML table with the fields
  saveFieldsToLocalStorage(); // Save the fields array to localStorage
  clearForm(); // Clear the form inputs
}

// Function to generate and display the JSON representation
function generateJson() {
  const generatedJson = {
    data: fields,
  };

  document.getElementById("generatedJson").textContent = JSON.stringify(
    generatedJson,
    null,
    2
  );
}

// Function to update the HTML table with the current fields array
function updateTable() {
  const tableBody = document.getElementById("fieldsTable");
  tableBody.innerHTML = "";

  fields.forEach((field, index) => {
    const row = document.createElement("tr");

    // Create cells for index, label, name, type, and actions
    const cellIndex = document.createElement("td");
    cellIndex.textContent = index + 1;
    row.appendChild(cellIndex);

    const cellLabel = document.createElement("td");
    cellLabel.textContent = field.label;
    row.appendChild(cellLabel);

    const cellName = document.createElement("td");
    cellName.textContent = field.name;
    row.appendChild(cellName);

    const cellType = document.createElement("td");
    cellType.textContent = field.type;
    row.appendChild(cellType);

    const cellCol = document.createElement("td");
    cellCol.textContent = field.col;
    row.appendChild(cellCol);

    const unitCol = document.createElement("td");
    unitCol.textContent = field.unit;
    row.appendChild(unitCol);

    const cellActions = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = () => {
      deleteField(index);
    };
    cellActions.appendChild(deleteButton);
    row.appendChild(cellActions);

    tableBody.appendChild(row); // Append the row to the table body
  });
}

// Function to delete a field from the fields array
function deleteField(index) {
  fields.splice(index, 1); // Remove the field at the specified index
  generateJson(); // Regenerate and display the JSON representation
  updateTable(); // Update the HTML table with the modified fields
  saveFieldsToLocalStorage(); // Save the updated fields array to localStorage
}

// Function to clear the form inputs and toggle fields display
function clearForm() {
  document.getElementById("formGenerator").reset(); // Reset the form inputs
  toggleOptionsAndRulesFields();
  toggleConditional();

  // Reset JSON editors to their default state
  jsonEditorOptions.set({});
  jsonEditorConditional.set({});
  jsonEditorRules.set({ required: true });
}

// Function to save the current fields array to localStorage
function saveFieldsToLocalStorage() {
  localStorage.setItem("formFields", JSON.stringify(fields));
}

// Function to load fields from localStorage on page load
function loadFieldsFromLocalStorage() {
  const storedFields = localStorage.getItem("formFields");
  if (storedFields) {
    fields = JSON.parse(storedFields); // Parse stored fields into the fields array
    generateJson(); // Generate and display the JSON representation
    updateTable(); // Update the HTML table with the loaded fields
  }
}
