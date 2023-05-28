// Function to handle file upload for an option
function handleFileUpload(option, file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Overwrite the existing sheet data with the uploaded data based on the option
    switch (option) {
      case 'mock-interview':
        mockInterviewData = jsonData;
        break;
      case 'gd':
        gdData = jsonData;
        break;
      case 'resume':
        resumeData = jsonData;
        break;
      case 'activity-sheet':
        activitySheetData = jsonData;
        break;
      default:
        break;
    }

    // Update the uploaded data table
    const uploadedDataTable = document.getElementById('uploaded-data-body');
    const existingRow = document.getElementById(`${option}-row`);

    if (existingRow) {
      // Update the existing row
      const filenameCell = existingRow.querySelector('.filename');
      const uploadedOnCell = existingRow.querySelector('.uploaded-on');

      filenameCell.textContent = file.name;
      uploadedOnCell.textContent = new Date().toLocaleString();
    } else {
      // Create a new row
      const row = document.createElement('tr');
      row.id = `${option}-row`;
      const optionCell = document.createElement('td');
      const filenameCell = document.createElement('td');
      filenameCell.classList.add('filename');
      const uploadedOnCell = document.createElement('td');
      uploadedOnCell.classList.add('uploaded-on');

      optionCell.textContent = option;
      filenameCell.textContent = file.name;
      uploadedOnCell.textContent = new Date().toLocaleString();

      row.appendChild(optionCell);
      row.appendChild(filenameCell);
      row.appendChild(uploadedOnCell);
      uploadedDataTable.appendChild(row);
    }
  };
  reader.readAsArrayBuffer(file);
}

// Function to handle file input change event
function handleFileInputChange(option) {
  const fileInput = document.getElementById(`${option}-file`);
  const files = fileInput.files;
  if (files.length > 0) {
    const file = files[0];
    handleFileUpload(option, file);
  }
}

// Add event listeners for file input changes
document.getElementById('mock-interview-file').addEventListener('change', () => handleFileInputChange('mock-interview'));
document.getElementById('resume-file').addEventListener('change', () => handleFileInputChange('resume'));
document.getElementById('gd-file').addEventListener('change', () => handleFileInputChange('gd'));
document.getElementById('activity-sheet-file').addEventListener('change', () => handleFileInputChange('activity-sheet'));
