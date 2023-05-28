// Get the username from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Update the username element in the dashboard
const usernameElement = document.getElementById('username');
usernameElement.textContent = `Welcome, ${username}!`;

// Load the mock interview data
fetch('mockinterview.xlsx')
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const mockInterviewSheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const mockInterviewData = XLSX.utils.sheet_to_json(mockInterviewSheet, { header: 1 });

    // Find the column indexes for A to M (0-based index)
    const columnIndexes = getColumnIndexes([ 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']);
    
    // Find the row with the username as the first column value
    const userData = mockInterviewData.find(row => row[columnIndexes[1]] === username);

    // Display the user's data in the mock-interview-data element
    const mockInterviewDataElement = document.getElementById('mock-interview-data'); // Updated ID
    mockInterviewDataElement.innerHTML = '';

    if (userData) {
      const headingRow = mockInterviewData[0];
      const userDataRow = userData;

      // Create a table to display the data
      const table = document.createElement('table');

      // Create the table header
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headingRow.forEach((heading, index) => {
        if (columnIndexes.includes(index)) {
          const th = document.createElement('th');
          th.textContent = heading;
          headerRow.appendChild(th);
        }
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create the table body with the user's data
      const tbody = document.createElement('tbody');
      const userDataRowElement = document.createElement('tr');
      userDataRow.forEach((data, index) => {
        if (columnIndexes.includes(index)) {
          const td = document.createElement('td');
          td.textContent = data;
          userDataRowElement.appendChild(td);
        }
      });
      tbody.appendChild(userDataRowElement);
      table.appendChild(tbody);

      mockInterviewDataElement.appendChild(table);
    } else {
      mockInterviewDataElement.textContent = 'No data available for the user.';
    }
  })
  .catch(error => {
    console.error('Error reading mock interview file:', error);
    showError('An error occurred while loading data.');
  });

// Helper function to get column indexes based on column letters
function getColumnIndexes(columns) {
  const columnIndexes = [];
  columns.forEach(column => {
    const columnIndex = XLSX.utils.decode_col(column);
    columnIndexes.push(columnIndex);
  });
  return columnIndexes;
}

function showError(message) {
  const errorMsg = document.getElementById('error-msg');
  if (errorMsg) {
    errorMsg.textContent = message;
  } else {
    console.error(message);
  }
}
