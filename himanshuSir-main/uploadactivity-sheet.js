// Placeholder code for handling the Activity Sheet file upload and updating

document.getElementById('activity-sheet-file').addEventListener('change', handleActivitySheetFileUpload);

function handleActivitySheetFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const activitySheetData = e.target.result;
    // TODO: Process the activity sheet data and update the existing activity sheet file
    updateActivitySheetData(activitySheetData);
  };

  reader.readAsArrayBuffer(file);
}

function updateActivitySheetData(data) {
  // Convert the array buffer to a Blob object
  const blob = new Blob([data]);

  // Create a URL for the Blob object
  const blobURL = URL.createObjectURL(blob);

  // Get the activity sheet file input element
  const activitySheetFileInput = document.getElementById('activity-sheet-file');

  // Assign the Blob URL to the activity sheet file input element
  activitySheetFileInput.src = blobURL;

  console.log('Activity Sheet data uploaded and updated.');
}