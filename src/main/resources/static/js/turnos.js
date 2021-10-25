$(function()
{
    var selectsFill = false;

    loadVeterinaries();
    loadClients();

    $('input.timepicker').timepicker({
      timeFormat: 'HH:mm',
      interval: 30,
      minTime: '08:00',
      maxTime: '19:30',
      defaultTime: '08:00',
      startTime: '08:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
    });

    $("div button#openCreate").click(function(){
          if (!selectsFill) {
              getAllVeterinaries();
              getAllClients();
          }
    });

    function getAllVeterinaries() {
      const url = '/veterinaries/list';
      const settings = {
      method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
          fillSelectedVeterinaries(data);
      })

      selectsFill = true;
    }

    function fillSelectedVeterinaries(veterinary_data) {
      for(veterinary of veterinary_data){
          let $option = $('<option />', {
              text:  veterinary.name.toUpperCase() + ' ' + veterinary.lastname.toUpperCase(),
              value: veterinary.id,
              enrollment: veterinary.enrollment,
              id: veterinary.id,
          });
          $('div select#veterinary_add').prepend($option);
      };
    }

    function getAllClients() {
      const url = '/clients/list';
      const settings = {
        method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
          fillSelectedClients(data);
      })

      selectsFill = true;
    }

    function fillSelectedClients(clients_data) {
      for(client of clients_data){
          let $option = $('<option />', {
              text:  client.name_dog.toUpperCase() + ' ' + '(' + client.owner.toUpperCase() + ')',
              value: client.id,
              name_dog: client.name_dog,
              id: client.id,
          });
          $('div select#client_add').prepend($option);
      };
    }
});

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
        const url = '/turnos/' + id;
        const settings = {
            method: 'DELETE'
        }
        fetch(url,settings)
        .then(response => {
            response.json();
            if (response.status === 500) {
                msg = 'Ocurrió un error inesperado.';
                responseDanger(msg);
            } else {
                //borrar la fila del cliente eliminado
                let row_id = "#tr_" + id;
                document.querySelector(row_id).remove();
                responseDanger('Turno Eliminado.');
            }
        })

        $('div#spinnerDelete').css("display", "none");
        document.getElementById('confirmDelete').disabled = false;
}

function findBy(id) {
    const url = '/turnos/' + id;
    const settings = {
        method: 'GET'
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(data => {
        let client = data;

//        if (selectsFillEdit === false) {
//            // TODO: Se ejecuta despues de que abrimos la modal del EDIT la primera vez.
//            loadVeterinaries();
//            loadClients();
//        }

        fillEditFields(client);
        $('#updateRegister').modal('toggle');
        $('#updateRegister').modal('show');
        var s = '';
    }).catch(error => {
        alert("Error: " + error);
    })
}
/////////////////////
    var selectsFillEdit = false;

    function loadVeterinaries() {
          const url = '/veterinaries/list';
          const settings = {
          method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              fillSelectedVeterinariesForEdit(data);
          })

          selectsFillEdit = true;
    }

    function fillSelectedVeterinariesForEdit(veterinary_data) {
      for(veterinary of veterinary_data){
          let $option = $('<option />', {
              text:  veterinary.name.toUpperCase() + ' ' + veterinary.lastname.toUpperCase(),
              value: veterinary.id,
              enrollment: veterinary.enrollment,
              id: veterinary.id,
              vet: veterinary.name.toUpperCase() + ' ' + veterinary.lastname.toUpperCase(),
          });
          $('div select#veterinary').prepend($option);
      };
    }

    function loadClients() {
          const url = '/clients/list';
          const settings = {
            method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              fillSelectedClientsForEdit(data);
          })

          selectsFillEdit = true;
    }

    function fillSelectedClientsForEdit(clients_data) {
      for(client of clients_data){


          let $option = $('<option />', {
              text:  client.name_dog.toUpperCase() + ' ' + '(' + client.owner.toUpperCase() + ')',
              value: client.id,
              name_dog: client.name_dog,
              owner: client.owner,
              id: client.id,
          });
          $('div select#client').prepend($option);
      };
    }

///////////////////////////////

function fillEditFields(client) {
    document.querySelector('#date').value = client.shift_date.substr(0,10);
    document.querySelector('#time').value = client.shift_date.substr(11, 5);
    document.querySelector('#client_id').value = client.id;
    document.querySelector('#client').value = client.client.id;
    document.querySelector('#veterinary').value = client.veterinary.id;

//    $("#client").val(''+client.client.id+'');
//    $("#client").change();
//    $("#veterinary").val(''+client.veterinary.id+'').change();
//    $("#veterinary").change();
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
    document.querySelector('#date_add').value = '';
    document.querySelector('#time_add').value = '8:00';
    document.getElementById('client_add').value = '';
    document.getElementById('veterinary_add').value = '';
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

      const url = '/turnos/list';
      const settings = {
        method: 'GET'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
         for(client of data){
           //prepare date
           let valor = client.shift_date;
           valor = valor.replace('T', ' ');
           let indice = valor.indexOf(".");
           valor = valor.substr(0, indice);
           client.shift_date = valor;

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
                    '<td class=\"td_id_turno\" style="font-weight:bold;">' + client.id + '</td>' +
                    '<td class=\"td_date_turno\">' + client.shift_date + '</td>' +
                     '<td class=\"td_dog_turno\">' + client.client.nameDog.toUpperCase() + '</td>' +
                      '<td class=\"td_dogowner_turno\">' + client.client.owner.toUpperCase() + '</td>' +
                    '<td class=\"td_veterinary_turno\">' + client.veterinary.name.toUpperCase() + ' ' + client.veterinary.lastname.toUpperCase() + '</td>' +
                    '<td style="display:flex">' + updateButton + deleteButton + '</td>' +
                    '</tr>';
           $('#clientTable tbody').append(clientRow);
        };

      })
    })

    (function() {
        let pathname = window.location.pathname;
        if (pathname == "/turnos.html") {
            $(".navbar .nav-item a").removeClass("active");
            $(".navbar .nav-item a#turnos").addClass("active");
        }
    })
 });

function getAll() {
    const url = '/turnos/list';
    const settings = {
        method: 'GET'
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(data => {
         for(client of data){
               //prepare date
               let valor = client.shift_date;
               valor = valor.replace('T', ' ');
               let indice = valor.indexOf(".");

               valor = valor.substr(0, indice);
               client.shift_date = valor;


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
                        '<td class=\"td_id_turno\" style="font-weight:bold;">' + client.id + '</td>' +
                        '<td class=\"td_date_turno\">' + client.shift_date + '</td>' +
                         '<td class=\"td_dog_turno\">' + client.client.nameDog.toUpperCase() + '</td>' +
                          '<td class=\"td_dogowner_turno\">' + client.client.owner.toUpperCase() + '</td>' +
                        '<td class=\"td_veterinary_turno\">' + client.veterinary.name.toUpperCase() + ' ' + client.veterinary.lastname.toUpperCase() + '</td>' +
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
        let date = $('form#create_client_form input#date_add').val();
        let time = $('form#create_client_form input#time_add').val();
        let shift_date = date + 'T' + time + ':00';
        let dog = $('form#create_client_form select#client_add').val();

        let client_id = $("select#client_add").val();
        let veterinary_id = $("select#veterinary_add").val();

        if (!date || !dog || !time) {
            $('div#spinnerCreate').css("display", "none");
            document.getElementById('create-client').disabled = false;
            return alert('Complete los campos.');
        }

        const formData = {
            shift_date: shift_date,
            client: {name_dog: $("div select#client_add option[value="+client_id+"]").attr("name_dog")},
            veterinary: {enrollment: $("select#veterinary_add option[value="+veterinary_id+"]").attr("enrollment")},
        };

        const url = '/turnos';
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
                 responseSuccess('Turno Agregado.');

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
    let date = $('form#update_client_form input#date').val();
    let time = $('form#update_client_form input#time').val();
    let shift_date = date + 'T' + time + ':00';
    let dog = $('form#update_client_form select#client').val();

    let client_id = $("select#client").val();
    let veterinary_id = $("select#veterinary").val();

    if (!date || !time || !veterinary || !dog || !id) {
        $('div#spinnerUpdate').css("display", "none");
        document.getElementById('update-client').disabled = false;
        return alert('Complete los campos.');
    }

    const formData = {
        id: parseInt(document.querySelector('#client_id').value),
        shift_date: shift_date,
        client: {name_dog: $("div select#client option[value="+client_id+"]").attr("name_dog")},
        veterinary: {enrollment: $("div select#veterinary option[value="+veterinary_id+"]").attr("enrollment")},
    };

    const url = '/turnos/'+ formData.id;

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
            let $date = $("form#update_client_form div.form-group input#date").val();
            let $time = $("form#update_client_form div.form-group input#time").val();
            let $datetime = $date + ' ' + $time + ':00';

            let $client = $("div select#client option[value="+client_id+"]").attr("name_dog");
            let $owner = $("div select#client option[value="+client_id+"]").attr("owner");
            let $veterinary = $("select#veterinary option[id="+veterinary_id+"]").attr("vet");

            $("tr#tr_"+row_id)[0].childNodes[1].innerText = $datetime;
            $("tr#tr_"+row_id)[0].childNodes[2].innerText = $client.toUpperCase();
            $("tr#tr_"+row_id)[0].childNodes[3].innerText = $owner.toUpperCase();
            $("tr#tr_"+row_id)[0].childNodes[4].innerText = $veterinary;
            resetUpdateForm();
            responseSuccess('Turno Actualizado.');
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
        document.querySelector('#date').value = '';
        document.querySelector('#time').value = '8:00';
        document.getElementById('client').value = '';
        document.getElementById('veterinary').value = '';
}