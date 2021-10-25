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
        const url = '/clients/' + id;
        const settings = {
            method: 'DELETE'
        }
        fetch(url,settings)
        .then(response => {
            response.json();
            if (response.status === 500) {
                msg = 'No puede eliminar el perro ya que se encuentra con un Turno asignado. Primero elimine el turno.';
                responseDanger(msg);
            } else {
                //borrar la fila del cliente eliminado
                let row_id = "#tr_" + id;
                document.querySelector(row_id).remove();
                responseDanger('Perro Eliminado.');
            }
        });

        $('div#spinnerDelete').css("display", "none");
        document.getElementById('confirmDelete').disabled = false;
}

function findBy(id) {
      const url = '/clients/' + id;
      const settings = {
          method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
          let client = data;
          document.querySelector('#client_id').value = client.id;
          document.querySelector('#nombre_perro').value = client.name_dog;
          document.querySelector('#raza_perro').value = client.race_dog;
          document.querySelector('#dueño').value = client.owner;

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
    document.querySelector('#nombrePerro_add').value = '';
    document.querySelector('#razaPerro_add').value = '';
    document.querySelector('#dueñoPerro_add').value = '';
    $('#createRegister').modal('toggle');
    $('#createRegister').modal('hide');
    $('div#spinnerCreate').css("display", "none");
    document.getElementById('create-client').disabled = false;
}

window.addEventListener('load', function () {
    // GET
    (function getList() {
      event.preventDefault();
      $("div#message").hide();
      const url = '/clients/list';
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
                    '<td class=\"td_id_dog\" style="font-weight:bold;">' + client.id + '</td>' +
                    '<td class=\"td_name_dog\">' + client.name_dog.toUpperCase() + '</td>' +
                     '<td class=\"td_race_dog\">' + client.race_dog.toUpperCase() + '</td>' +
                    '<td class=\"td_owner\">' + client.owner.toUpperCase() + '</td>' +
                    '<td style="display:flex">' + updateButton + deleteButton + '</td>' +
                    '</tr>';
          $('#clientTable tbody').append(clientRow);
        };

      })
    })

    (function() {
        let pathname = window.location.pathname;
        if (pathname == "/clients.html") {
            $(".navbar .nav-item a").removeClass("active");
            $(".navbar .nav-item a#clients").addClass("active");
        }
    })
 });

function getAll() {
    const url = '/clients/list';
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
                    '<td class=\"td_id_dog\" style="font-weight:bold;">' + client.id + '</td>' +
                    '<td class=\"td_name_dog\">' + client.name_dog.toUpperCase() + '</td>' +
                     '<td class=\"td_race_dog\">' + client.race_dog.toUpperCase() + '</td>' +
                    '<td class=\"td_owner\">' + client.owner.toUpperCase() + '</td>' +
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
        let name_dog = document.querySelector('#nombrePerro_add').value;
        let race_dog = document.querySelector('#razaPerro_add').value;
        let owner = document.querySelector('#dueñoPerro_add').value;

        if (!name_dog || !race_dog || !owner) {
            $('div#spinnerCreate').css("display", "none");
            document.getElementById('create-client').disabled = false;
            return alert('Complete los campos.');
        }

        const formData = {
            name_dog: document.querySelector('#nombrePerro_add').value,
            race_dog: document.querySelector('#razaPerro_add').value,
            owner: document.querySelector('#dueñoPerro_add').value,
        };

        const url = '/clients';
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
                 responseSuccess('Perro Agregado.');

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
    let name_dog = document.querySelector('#nombre_perro').value;
    let race_dog = document.querySelector('#raza_perro').value;
    let owner = document.querySelector('#dueño').value;

    if (!name_dog || !race_dog || !owner || !id) {
        $('div#spinnerUpdate').css("display", "none");
        document.getElementById('update-client').disabled = false;
        return alert('Complete los campos.');
    }

    const formData = {
        id: parseInt(document.querySelector('#client_id').value),
        name_dog: document.querySelector('#nombre_perro').value,
        race_dog: document.querySelector('#raza_perro').value,
        owner: document.querySelector('#dueño').value
    };

    const url = '/clients/'+ formData.id;

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
              let nombre_perro = $("form#update_client_form div.form-group input#nombre_perro").val();
              let raza_perro = $("form#update_client_form div.form-group input#raza_perro").val();
              let dueño = $("form#update_client_form div.form-group input#dueño").val();
              $("tr#tr_"+row_id)[0].childNodes[1].innerText = nombre_perro.toUpperCase();
              $("tr#tr_"+row_id)[0].childNodes[2].innerText = raza_perro.toUpperCase();
              $("tr#tr_"+row_id)[0].childNodes[3].innerText = dueño.toUpperCase();
              resetUpdateForm();
              responseSuccess('Perro Actualizado.');
      }).catch(error => {
            responseDanger('ERROR Intente nuevamente.');
            resetUpdateForm();
      })
}

function resetUpdateForm() {
          $('#updateRegister').modal('toggle');
          $('#updateRegister').modal('hide');
          $('div#spinnerUpdate').css("display", "none");
          document.getElementById('update-client').disabled = false;
          document.querySelector('#client_id').value = '';
          document.querySelector('#nombre_perro').value = '';
          document.querySelector('#raza_perro').value = '';
          document.querySelector('#dueño').value = '';
}