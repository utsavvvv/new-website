function authenticateUser(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Read the login Excel file using the xlsx library
    fetch('login.xlsx')
      .then(response => response.arrayBuffer())
      .then(data => {
        var workbook = XLSX.read(data, { type: 'array' });
        var loginSheet = workbook.Sheets['Sheet1']; // Assuming the login data is on "Sheet1"
  
        // Convert Excel data to JSON
        var loginData = XLSX.utils.sheet_to_json(loginSheet);
  
        // Check if username and password match
        var isValidUser = loginData.some(function (row) {
          return row.username === username && row.password === password;
        });
  
        if (isValidUser) {
          // Redirect to the dashboard page with the username
          window.location.href = 'dashboard.html?username=' + encodeURIComponent(username);
        } else {
          showError('Invalid username or password.');
        }
      })
      .catch(error => {
        console.error('Error reading login file:', error);
        showError('An error occurred during authentication.');
      });
  }
  
  function showError(message) {
    var errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = message;
  }
  