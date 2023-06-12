const RefreshToken = "1//04P_9ibAJvPO8CgYIARAAGAQSNwF-L9IrEDyS1pTGMkgQePpGwOcM_ofG4gR-8z-btgcOoZOd7a0C1OiC6tulyTCC75gKrSnsPtU";
const CLIENT_ID = "808157992506-qddad9ubh84o28pjtta64n7mj8rdq3bo.apps.googleusercontent.com";
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
  // const url = "https://oauth2.googleapis.com/token";
  // const data = `grant_type=refresh_token&refresh_token=${encodeURIComponent(RefreshToken)}&client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(Client_Secret)}`;
  const url = "https://developers.google.com/oauthplayground/refreshAccessToken";
  const data = {
    token_uri: "https://oauth2.googleapis.com/token",
    refresh_token: `${RefreshToken}`,
  };
  $.ajax({
    url: url,
    type: "POST",
    headers: { "Content-Type": "application/json" },
    contentType: "application/json; charset=utf-8",
    data: data,
    success: function (response) {
      SubmitToSheet(response.access_token);
    },
  });
}

function SubmitToSheet(access_token) {
  $("#spinner").addClass("show");
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=RAW`;
  var value = [[$("#name").val(), $("#email").val(), $("#subject").val(), $("#message").val()]];
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: value }),
  }).then((response) => {
    $("#sendContact").css("display", "none");
    $(".form-control").attr("readonly", true);
    $(".contact-submit").text("Thank you for contact!!!");
    $("#spinner").removeClass("show");
  });
}
