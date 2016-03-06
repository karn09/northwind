$(document).ready(function() {
  $('.collapsible').collapsible({
    accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $('.delete-btn').on('click', function() {
    var current = this.value;
    $.ajax({
      url: '/products/delete',
      method: 'GET',
      data: {
        id: current
      },
      dataType: "json",
      success: function(data, status) {
        if (status === 'success') {
          $('#'+current).remove();
          console.log('Item removed');
        }
      }
    });
  });

  $('.qty-btn').on('click', function() {
    var current = this.value;
    var currentValue = $('#' + current +' .current-qty')[0].value;
    $.ajax({
      url: '/products/update',
      method: 'PUT',
      data: {
        id: current,
        qty: currentValue
      },
      dataType: "json",
      success: function(data, status) {
        $('#' + current + ' .header-qty').text(currentValue);
      }
    });
  });

  $('.disc-btn').on('click', function() {
    var current = this.value;
    var btn = this;
    var setStatus = checkStatus($(this).text());
    $.ajax({
      url: '/products/update',
      method: 'PUT',
      data: {
        id: current,
        status: setStatus
      },
      dataType: "json",
      success: function(data, status) {
        if (setStatus === 'inactive') {
          $(btn).text('Activate').toggleClass('red');
          $('#' + current + ' .collapsible-header').toggleClass('red lighten-2');
        } else if (setStatus === 'active') {
          $(btn).text('Discontinue').toggleClass('red');
          $('#' + current + ' .collapsible-header').toggleClass('red lighten-2');

        }
      }
    });
  });

  function checkStatus(str) {
    if (str === 'Discontinue') {
      return 'inactive';
    } else if (str === 'Activate') {
      return 'active';
    }
  }

});
