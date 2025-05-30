// Wait for the document to be fully loaded
$(document).ready(function() {
  // Function to rotate the green monkey eyes based on mouse movement
  $(".green_monkey_move-area").mousemove(function(event) {
      // Select the green monkey eye element
      var eye = $(".green_monkey_eye");
      
      // Calculate the center of the eye
      var x = (eye.offset().left) + (eye.width() / 2);
      var y = (eye.offset().top) + (eye.height() / 2);
      
      // Calculate the angle of rotation based on mouse position
      var rad = Math.atan2(event.pageX - x, event.pageY - y);
      var rot = (rad * (180 / Math.PI) * -1) + 45;
      
      // Apply the rotation to the eye
      eye.css({
          '-webkit-transform': 'rotate(' + rot + 'deg)',
          '-moz-transform': 'rotate(' + rot + 'deg)',
          '-ms-transform': 'rotate(' + rot + 'deg)',
          'transform': 'rotate(' + rot + 'deg)'
      });
  });
});
