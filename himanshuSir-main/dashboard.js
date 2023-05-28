// Get the username from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Update the username element in the dashboard
const usernameElement = document.getElementById('username');
usernameElement.textContent = `Welcome, ${username}!`;


// Redirect to the mock interview page with the username
const mockInterviewUrl = 'mock-interview.html?username=' + encodeURIComponent(username);
const mockInterviewLink = document.getElementById('mock-interview-link');
mockInterviewLink.href = mockInterviewUrl;


// Load the detail data
fetch('detail.xlsx')
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const detailSheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const detailData = XLSX.utils.sheet_to_json(detailSheet, { header: 1 });

    // Find the column indexes for A to M (0-based index)
    const columnIndexes = getColumnIndexes(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']);

    // Find the row with the username as the second column value (row index starts from 1 since 0 is the header)
    const userData = detailData.find(row => row[columnIndexes[1]] === username);

    // Display the user's data in the detail-data element
    const detailDataElement = document.getElementById('detail-data');
    detailDataElement.innerHTML = '';

    if (userData) {
      const headingRow = detailData[0];
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

      detailDataElement.appendChild(table);
    } else {
      detailDataElement.textContent = 'No data available for the user.';
    }
  })
  .catch(error => {
    console.error('Error reading detail file:', error);
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
  errorMsg.textContent = message;
}
