$(document).ready(function() {
    $("#fork").click(function() {
      var name = $("#name").val();
      var cost = parseFloat($("#cost").val()) || 0;

      if (name && cost) {
        var newItem = $("<div class='row item'>" +
          "<div class='item-name col-xs-3'>" + name + "</div>" +
          "<div class='item-price col-xs-3'>$" + cost.toFixed(2) + "</div>" +
          "<div class='item-qty col-xs-3'><label>QTY</label> <input class='quantity' type='number'></div>" +
          "<div class='col-xs-1'><button class='remove'>Remove</button></div>" +
          "<div class='item-subtotal col-xs-2'>$0.00</div>" +
          "</div>");

        newItem.insertBefore(".new");
        updateSubtotal(newItem);
        updateTotalPrice();
      }
    });

    $(document).on("click", ".remove", function() {
      $(this).closest(".item").remove();
      updateTotalPrice();
    });

    $(document).on("input", ".quantity", function() {
      var newItem = $(this).closest(".item");
      updateSubtotal(newItem);
      updateTotalPrice();
    });

    function updateSubtotal(item) {
      var price = parseFloat(item.find(".item-price").text().replace("$", "") || 0);
      var quantity = parseFloat(item.find(".quantity").val()) || 0;
      var subtotal = price * quantity;
      item.find(".item-subtotal").text("$" + subtotal.toFixed(2));
    }

    function updateTotalPrice() {
      var total = 0;
      $(".item").each(function() {
        var subtotal = parseFloat($(this).find(".item-subtotal").text().replace("$", "") || 0);
        total += subtotal;
      });
      $("#total-price").text("$" + total.toFixed(2));
    }
  });
