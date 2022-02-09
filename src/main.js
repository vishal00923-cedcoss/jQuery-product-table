var products = [];

var flag = -1;

$(document).ready(function () {
	$("#add_product").click(function () {
		var psku = $("#product_sku").val();
		var pname = $("#product_name").val();
		var pprice = $("#product_price").val();
		var pquantity = $("#product_quantity").val();

		if (checkValues(psku, pname, pprice, pquantity) && idValidate(psku, products)) {
			var product = getArray(psku, pname, pprice, pquantity);

			if (flag == -1) {
				products.push(product);

				display(products);

				$(".success").css("display", "block");
				$(".error").css("display", "none");
			}
		} else {
			$(".error").css("display", "block");
			$(".success").css("display", "none");
		}
	});

	$("body").on("click", "#edit_form", function () {
		$("#update_product").css("display", "inline");
		$("#add_product").css("display", "none");

		var pid = $(this).data("id");
		product = getProduct(pid);

		$("#product_sku").val(product.productSku);
		$("#product_name").val(product.productName);
		$("#product_price").val(product.productPrice);
		$("#product_quantity").val(product.productQuantity);
	});

	$("body").on("click", "#delete", function () {
		var pid = $(this).data("id");

		alert("Confirm");

		product = getProduct(pid);
		products.splice(products.indexOf(product), 1);

		display(products);
	});

	$("#update_product").click(function () {
		var updateSku = $("#product_sku").val();
		var updateName = $("#product_name").val();
		var updatePrice = $("#product_price").val();
		var updateQuantity = $("#product_quantity").val();

		var temp = getProduct(updateSku);

		temp.productName = updateName;
		temp.productPrice = updatePrice;
		temp.productQuantity = updateQuantity;

		display(products);
	});

	$(".close").click(function () {
		$(".success").css("display", "none");
		$(".error").css("display", "none");
	});
});

function getProduct(psku) {
	for (var i = 0; i < products.length; i++) {
		if (psku == products[i].productSku) {
			return products[i];
		}
	}
}

function display(products) {
	var html = "<tr>\
        <th>SKU</th>\
        <th>Name</th>\
        <th>Price</th>\
        <th>Quantity</th>\
        <th>Action</th>\
    </tr> ";

	for (var i = 0; i < products.length; i++) {
		html +=
			"<tr>\
        <td>" +
			products[i].productSku +
			"</td>\
        <td>" +
			products[i].productName +
			"</td>\
        <td>" +
			products[i].productPrice +
			"</td>\
        <td>" +
			products[i].productQuantity +
			'</td>\
        <td><a href ="#" id="edit_form" data-id=' +
			products[i].productSku +
			'>Edit</a>/<a href ="#" id="delete" data-id=' +
			products[i].productSku +
			">Delete</a></td>\
    </tr>";
	}

	$("#table").html(html);
}

function getArray(psku, pname, pprice, pquantity) {
	flag = -1;

	return {
		productSku: psku,
		productName: pname,
		productPrice: pprice,
		productQuantity: pquantity,
	};
}

function idValidate(psku, products) {
	for (var i = 0; i < products.length; i++) {
		if (psku == products[i].productSku) {
			return false;
		}
	}
	return true;
}

function checkValues(psku, pname, pprice, pquantity) {
	if (psku == "" || pname == "" || pprice == "" || pquantity == "" || isNaN(pprice) || isNaN(pquantity)) {
		return false;
	} else {
		return true;
	}
}
