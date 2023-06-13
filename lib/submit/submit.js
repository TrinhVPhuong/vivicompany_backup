const RefreshToken = "1//04nuWc93xhsPKCgYIARAAGAQSNwF-L9IrsCi1m1DODp2Iev8IPH8oI4bW1CIr9j3Cge-c916sfs3R12knvUQ9tFaVSJedy_g25JA";
const CLIENT_ID = "132755443514-a6q73m4n038i6jv4479c53m10df3go1j.apps.googleusercontent.com";
const Client_Secret = "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";
const spreadsheetId = "1Din6PTQCxM1cc7PYdThoPGut-2cMiaJgFo0EB4PBSu0";

function sendContact() {
  var valid;
  valid = validateContactSubmit();
  if (valid) {
    try {
      GetToken();
    } catch {}
  }
}

function validateContactSubmit() {
  var valid = true;

  if (!$("#name").val()) {
    $("#name").addClass("is-invalid");
    valid = false;
  }
  if (!$("#email").val()) {
    $("#email").addClass("is-invalid");
    valid = false;
  }
  if (
    !$("#email")
      .val()
      .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
  ) {
    $("#email").addClass("is-invalid");
    valid = false;
  }
  if (!$("#subject").val()) {
    $("#subject").addClass("is-invalid");
    valid = false;
  }
  if (!$("#message").val()) {
    $("#message").addClass("is-invalid");
    valid = false;
  }
  if (!$("#phone").val()) {
    $("#phone").addClass("is-invalid");
    valid = false;
  }
  if (
    !$("#phone")
      .val()
      .match(/((09|03|07|08|05)+([0-9]{8})\b)/g)
  ) {
    $("#phone").addClass("is-invalid");
    valid = false;
  }
  return valid;
}

function validateContact(id) {
  var valid = true;

  if (id === "submit") return valid;
  if (!$(`#${id}`).val()) {
    $(`#${id}`).addClass("is-invalid");
    valid = false;
  } else {
    $(`#${id}`).removeClass("is-invalid");
  }

  if (
    !$("#email")
      .val()
      .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
  ) {
    $("#email").addClass("is-invalid");
    valid = false;
  } else {
    $(`#${id}`).removeClass("is-invalid");
  }

  if (
    !$("#phone")
      .val()
      .match(/((09|03|07|08|05)+([0-9]{8})\b)/g)
  ) {
    $("#phone").addClass("is-invalid");
    valid = false;
  } else {
    $(`#${id}`).removeClass("is-invalid");
  }

  return valid;
}

function GetToken() {
  const url = "https://oauth2.googleapis.com/token";
  const data = `grant_type=refresh_token&refresh_token=${encodeURIComponent(RefreshToken)}&client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(Client_Secret)}`;

  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: data,
    success: function (response) {
      SubmitToSheet(response.access_token);
    },
  });
}

function SubmitToSheet(access_token) {
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=RAW`;
  var value = [[$("#name").val(), $("#email").val(), $("#phone").val(), $("#subject").val(), $("#message").val(), new Date()]];
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: value }),
  }).then((response) => {
    $("#frmContact").css("display", "none");
    $(".contact-submit").text("Thank you for contact!!!");
  });
}
