// Submit Pet Sitting Request
$('#petSittingRequestForm').submit(function(event) {
    event.preventDefault();
    const petId = $('#petId').val();
    const details = $('#requestDetails').val();
    $.ajax({
      url: '/petSitter/requests',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ petId, details }),
      success: function(response) {
        alert(response.message);
        // Optionally, refresh the list of pet sitting requests
        fetchPetSittingRequests();
      },
      error: function(error) {
        alert('Failed to submit pet sitting request');
        console.error(error);
      }
    });
  });
  
  // Fetch Pet Sitting Requests
  function fetchPetSittingRequests() {
    $.get('/petSitter/requests', function(requests) {
      $('#petSittingRequests').empty();
      requests.forEach(function(request) {
        $('#petSittingRequests').append(`<div>${request.details}</div>`);
      });
    }).fail(function(error) {
      console.error(error);
      alert('Failed to fetch pet sitting requests');
    });
  }
  
  // Call fetchPetSittingRequests on page load
  fetchPetSittingRequests();
  