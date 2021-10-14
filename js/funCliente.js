function consulta() {
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            $("#resultado").empty();
            mostrarResultado(response.items);
            console.log(response);
        }
    });
}

function mostrarResultado(items){
    let rows = '<table>';
    for(i = 0; i < items.length; i++){
        rows += '<tr>'
        rows += '<td>' + items[i].id + '</td>';
        rows += '<td>' + items[i].name + '</td>';
        rows += '<td>' + items[i].email + '</td>';
        rows += '<td>' + items[i].age + '</td>';
        rows += '<td> <button onclick="borrar(' + items[i].id + ')"> Borrar </td>';
        rows += '<td> <button onclick="elemEspecifico(' + items[i].id + ')"> Cargar </td>';
        rows += '</tr>';
    }
    rows += '</table>';
    $("#resultado").append(rows);
}

function guardarInfo(){
    let datos={
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    console.log(datos);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/",
        data:datos,
        type:"POST",
        datatype:"json",
        success:function(respuesta){
            alert("Información guardada");
            limpiarFormulario();
        }
    });
}

function borrar(idElemento){
    let elemento = {
        id:idElemento,
    }
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/",
        type:"DELETE",
        data:datoEnvio,
        datatype:"json",
        contentType:'application/json',
        success:function(respuesta){
            $("resultado").empty();
            consulta();
            alert("Elemento eliminado");
        }
    });
}

function elemEspecifico(idItem){
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idItem,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            let item = response.items[0];
            $("#id").val(item.id),
            $("#name").val(item.name),
            $("#email").val(item.email),
            $("#age").val(item.age)
        }
    });
}

function editar(){
    let datos={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let datosEnvio = JSON.stringify(datos)
    console.log(datosEnvio);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/",
        data:datosEnvio,
        contentType:'application/json',
        type:"PUT",
        datatype:"json",
        success:function(respuesta){
            $("#resultado").empty();
            consulta();
            alert("Información actualizada");
        }
    });
    limpiarFormulario();
}

function limpiarFormulario(){
    $("#id").val("");
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}