function responseSuccess(msg) {
        let hijo = $('button#closeAlerts').clone();
        $('div#inner-message').text(msg);
        $('div#inner-message').append(hijo);
        $('div#message').removeClass('alert-danger');
        $('div#message').addClass('alert-success');
        $("div#message").show();
}

function responseDanger(msg) {
        let hijo = $('button#closeAlerts').clone();
        $('div#inner-message').text(msg);
        $('div#inner-message').append(hijo);
        $('div#message').removeClass('alert-success');
        $('div#message').addClass('alert-danger');
        $("div#message").show();
}

function deleteBy(id)
{
        $('div#spinnerDelete').css("display", "inline-flex");
        document.getElementById('confirmDelete').disabled = true;
        const url = '/veterinaries/' + id;
        const settings = {
            method: 'DELETE'
        }
        fetch(url,settings)
        .then(response => {
            response.json();
            if (response.status === 500) {
                msg = 'No puede eliminar el veterinario ya que se encuentra con un Turno asignado. Primero elimine el turno.';
                responseDanger(msg);
            } else {
                //borrar la fila del cliente eliminado
                let row_id = "#tr_" + id;
                document.querySelector(row_id).remove();
                responseDanger('Veterinario Eliminado.');
            }
        })

        $('div#spinnerDelete').css("display", "none");
        document.getElementById('confirmDelete').disabled = false;
}

function findBy(id) {
      const url = '/veterinaries/' + id;
      const settings = {
          method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
          let client = data;
          document.querySelector('#client_id').value = client.id;
          document.querySelector('#name').value = client.name;
          document.querySelector('#lastname').value = client.lastname;
          document.querySelector('#enrollment').value = client.enrollment;

          $('#updateRegister').modal('toggle');
          $('#updateRegister').modal('show');
      }).catch(error => {
          alert("Error: " + error);
      })
  }

function openModalCreate(){
    $('#createRegister').modal('toggle');
    $('#createRegister').modal('show');
}

// for delete register
function openModal(client_id) {
    $('#deleteRegister').modal('toggle');
    $('#deleteRegister').modal('show');
    $('button#confirmDelete').attr('onclick', 'deleteBy('+client_id+');dismissModal();');
}

function closeModal() {
    $('button#confirmDelete').attr('onclick', '');
}

function dismissModal(){
    $('#deleteRegister').modal('toggle');
    $('#deleteRegister').modal('hide');
}

function alertDismiss() {
    $("div#message").hide();
}

function resetCreateForm() {
    document.querySelector('#name_add').value = '';
    document.querySelector('#lastname_add').value = '';
    document.querySelector('#enrollment_add').value = '';
    $('#createRegister').modal('toggle');
    $('#createRegister').modal('hide');
    $('div#spinnerCreate').css("display", "none");
    document.getElementById('create-client').disabled = false;
}

window.addEventListener('load', function () {
    // GET
    (function() {
      event.preventDefault();
      $("div#message").hide();

      const url = '/veterinaries/list';
      const settings = {
        method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
         for(client of data){
           let deleteButton = '<button' +
                                      ' id=' + '\"' + 'btn_delete_' + client.id + '\"' +
                                      ' type="button" onclick="openModal('+client.id+');" class="btn btn-danger btn_delete" href="#ex1" rel="modal:open">' +
                                      '&times' +
                                      '</button>';

          let updateButton = '<button' +
                                   ' id=' + '\"' + 'btn_id_' + client.id + '\"' +
                                   ' type="button" onclick="findBy('+client.id+')" style="border:none;background-color:#4AF3A1;padding:7px 10px 7px 10px;margin-right:5px;outline: 5px auto -webkit-focus-ring-color #4AF3A1;border-radius:5px;" class="btn_id"><i class="bi bi-pencil"></i></button>';

          let tr_id = 'tr_' + client.id;
          let clientRow = '<tr id=\"' + tr_id + "\"" + '>' +
                    '<td class=\"td_id_veterinary\" style="font-weight:bold;">' + client.id + '</td>' +
                    '<td class=\"td_name_veterinary\">' + client.name.toUpperCase() + '</td>' +
                     '<td class=\"td_lastname_veterinary\">' + client.lastname.toUpperCase() + '</td>' +
                    '<td class=\"td_enrollment_veterinary\">' + client.enrollment.toUpperCase() + '</td>' +
                    '<td style="display:flex">' + updateButton + deleteButton + '</td>' +
                    '</tr>';
          $('#clientTable tbody').append(clientRow);
        };

      })
    })

    (function() {
        let pathname = window.location.pathname;
        if (pathname == "/veterinaries.html") {
            $(".navbar .nav-item a").removeClass("active");
            $(".navbar .nav-item a#veterinaries").addClass("active");
        }
    })
 });

function getAll() {
    const url = '/veterinaries/list';
    const settings = {
    method: 'GET'
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(data => {
         for(client of data){
              let deleteButton = '<button' +
                                          ' id=' + '\"' + 'btn_delete_' + client.id + '\"' +
                                          ' type="button" onclick="openModal('+client.id+');" class="btn btn-danger btn_delete" href="#ex1" rel="modal:open">' +
                                          '&times' +
                                          '</button>';

              let updateButton = '<button' +
                                   ' id=' + '\"' + 'btn_id_' + client.id + '\"' +
                                   ' type="button" onclick="findBy('+client.id+')" style="border:none;background-color:#4AF3A1;padding:7px 10px 7px 10px;margin-right:5px;outline: 5px auto -webkit-focus-ring-color #4AF3A1;border-radius:5px;" class="btn_id"><i class="bi bi-pencil"></i></button>';

              let tr_id = 'tr_' + client.id;

              let clientRow = '<tr id=\"' + tr_id + "\"" + '>' +
                    '<td class=\"td_id_veterinary\" style="font-weight:bold;">' + client.id + '</td>' +
                    '<td class=\"td_name_veterinary\">' + client.name.toUpperCase() + '</td>' +
                     '<td class=\"td_lastname_veterinary\">' + client.lastname.toUpperCase() + '</td>' +
                    '<td class=\"td_enrollment_veterinary\">' + client.enrollment.toUpperCase() + '</td>' +
                    '<td style="display:flex">' + updateButton + deleteButton + '</td>' +
                    '</tr>';

              $('#clientTable tbody').append(clientRow);
        };
    })
}

//POST
function postClient() {
        $('div#spinnerCreate').css("display", "inline-flex");
        document.getElementById('create-client').disabled = true;
        event.preventDefault();
        let name = document.querySelector('#name_add').value;
        let lastname = document.querySelector('#lastname_add').value;
        let enrollment = document.querySelector('#enrollment_add').value;

        if (!name || !lastname || !enrollment) {
            $('div#spinnerCreate').css("display", "none");
            document.getElementById('create-client').disabled = false;
            return alert('Complete los campos.');
        }

        const formData = {
            name: document.querySelector('#name_add').value,
            lastname: document.querySelector('#lastname_add').value,
            enrollment: document.querySelector('#enrollment_add').value,
        };

        const url = '/veterinaries';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                 responseSuccess('Veterinario Agregado.');

                 resetCreateForm();
                 $("#clientTable").find("tr:gt(0)").remove();
                 getAll();
            })
            .catch(error => {
                responseDanger('ERROR Intente nuevamente.');
                resetCreateForm();
            })
};

//PUT
function EditClient() {
    $('div#spinnerUpdate').css("display", "inline-flex");
    document.getElementById('update-client').disabled = true;
    event.preventDefault();

    let id = parseInt(document.querySelector('#client_id').value);
    let name = document.querySelector('#name').value;
    let lastname = document.querySelector('#lastname').value;
    let enrollment = document.querySelector('#enrollment').value;

    if (!name || !lastname || !enrollment || !id) {
        $('div#spinnerUpdate').css("display", "none");
        document.getElementById('update-client').disabled = false;
        return alert('Complete los campos.');
    }

    const formData = {
        id: parseInt(document.querySelector('#client_id').value),
        name: document.querySelector('#name').value,
        lastname: document.querySelector('#lastname').value,
        enrollment: document.querySelector('#enrollment').value
    };

    const url = '/veterinaries/'+ formData.id;

    const settings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
             let row_id = $("#client_id").val();
             const url = '/veterinaries/' + row_id;
             const settings = {
               method: 'GET'
             }
             fetch(url,settings)
             .then(response => response.json())
             .then(data => {
                  $("tr#tr_"+row_id)[0].childNodes[1].innerText = data.name.toUpperCase();
                  $("tr#tr_"+row_id)[0].childNodes[2].innerText = data.lastname.toUpperCase();
                  $("tr#tr_"+row_id)[0].childNodes[3].innerText = data.enrollment.toUpperCase();

                  responseSuccess('Veterinario Actualizado.');
                  resetUpdateForm();
             })
      }).catch(error => {
            responseDanger('ERROR Intente nuevamente.');
            resetUpdateForm();
      })
}

function resetUpdateForm() {
        document.querySelector('#client_id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#lastname').value = '';
        document.querySelector('#enrollment').value = '';
        $('div#spinnerUpdate').css("display", "none");
        document.getElementById('update-client').disabled = false;
        $('#updateRegister').modal('toggle');
        $('#updateRegister').modal('hide');
}