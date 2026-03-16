function userList() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
         userListSuccess(users);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userListSuccess(users) {
   $.each(users, function (index, user) {
      userAddRow(user);
   });
}

function userAddRow(user) {
   if ($("#userTable tbody").length == 0) {
      $("#userTable").append("<tbody></tbody>");
   }
   $("#userTable tbody").append(

      userBuildTableRow(user));
}

function userBuildTableRow(user) {
   return "<tr>" +
      "<td>" + user.id + "</td>" +
      "<td>" + user.firstname + "</td>" +
      "<td>" + user.lastname + "</td>" +
      "<td><button class='btn btn-sm btn-primary' onclick='deleteUser(" + user.id + ")'>Delete</button></td>" +
      "<td><button class='btn btn-sm btn-primary' onclick='updateUser(" + user.id + ")'>Update</button></td>" +
      "</tr>";
}

$(document).on('click', '.delete-btn', function() {
    var id = $(this).data('id');
    deleteUser(id);
});

$(document).on('click', '.update-btn', function() {
    var id = $(this).data('id');
    var firstname = $(this).closest('tr').find('td:eq(0)').text();
    var lastname = $(this).closest('tr').find('td:eq(1)').text();
    editUser(id, firstname, lastname);
});

function deleteUser(id) {
    $.ajax({
        url: 'http://localhost:8080/api/users/' + id,
        type: 'DELETE',
        success: function () {
            userList();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function editUser(id, firstname, lastname) {
    currentUserId = id;
    $("#firstname").val(firstname);
    $("#lastname").val(lastname);
    $("#updateButton").text("Update");
}

function handleException(request, message, error) {
   let msg = "";
   msg += "Code: " + request.status + "\n";
   msg += "Text: " + request.statusText + "\n";
   if (request.responseJSON != null) {
      msg += "Message" + request.responseJSON.Message + "\n";
   }
   alert(msg);
}

function formClear() {
   $("#firstname").val("");
   $("#lastname").val("");
}

function updateClick() {
   const User = {};
   User.firstname = $("#firstname").val();
   User.lastname = $("#lastname").val();
   userAdd(User);
}

function userAdd(user) {
   $.ajax({
      url: "http://localhost:8080/api/users",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(user),
      success: function (user) {
         userAddSuccess(user);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function updateUser(id) {
    $.ajax({
        url: 'http://localhost:8080/api/users/' + id,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        success: function () {
            formClear();
            userList();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function deleteAllClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'DELETE',
      success: function () {
         userClearTable();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function changeAllToMilovantcev() {
   $.ajax({
      url: 'http://localhost:8080/api/users/lastname',
      type: 'PUT',
      success: function () {
         userClearTable();
         userList();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function changeAllToArseniy() {
   $.ajax({
      url: 'http://localhost:8080/api/users/firstname',
      type: 'PUT',
      success: function () {
         userClearTable();
         userList();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userClearTable() {
   $("#userTable tbody").remove();
}

function userAddSuccess(user) {
   userAddRow(user);
   formClear();
}