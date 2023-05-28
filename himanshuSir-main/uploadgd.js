// Placeholder code for handling the GD file upload and updating

document.getElementById('gd-file').addEventListener('change', handleGDFileUpload);

function handleGDFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const gdData = e.target.result;
    // TODO: Process the GD data and update the existing GD file
    updateGDData(gdData);
  };

  reader.readAsArrayBuffer(file);
}

  function updateGDData(data) {
    // Convert the array buffer to a Blob object
    const blob = new Blob([data]);
  
    // Create a FormData object
    const formData = new FormData();
  
    // Append the Blob object to the FormData with a specific field name
    formData.append('gdFile', blob, 'new_gd_file_name.extension');
  
    // Send the FormData to the server using AJAX or fetch API
    // Replace the URL and method with your own server-side implementation
    fetch('/update_gd_data', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('GD data uploaded and updated.');
        } else {
          console.log('Failed to upload GD data.');
        }
      })
      .catch(error => {
        console.error('An error occurred while uploading GD data:', error);
      });
  }
  

