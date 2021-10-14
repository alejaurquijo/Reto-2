
function consulta() {
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/",
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
        rows += '<td>' + items[i].room + '</td>';
        rows += '<td>' + items[i].stars + '</td>';
        rows += '<td>' + items[i].category_id + '</td>';
        rows += '<td>' + items[i].description + '</td>';
        rows += '<td> <button onclick="borrar(' + items[i].id + ')"> Borrar </td>';
        rows += '<td> <button onclick="elemEspecifico(' + items[i].id + ')"> Cargar </td>';
        rows += '</tr>';
    }
    rows += '</table>';
    $("#resultado").append(rows);
}

function guardarInfo(){
    let datos={
        room:$("#room").val(),
        stars:$("#stars").val(),
        category_id:$("#category_id").val(),
        description:$("#description").val(),
    };
    console.log(datos);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/",
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
    console.log(elemento);
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/",
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
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/" + idItem,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            let item = response.items[0];
            $("#id").val(item.id),
            $("#room").val(item.room),
            $("#stars").val(item.stars),
            $("#category_id").val(item.category_id),
            $("#description").val(item.description)
        }
    });
}

function editar(){
    let datos={
        id:$("#id").val(),
        room:$("#room").val(),
        stars:$("#stars").val(),
        category_id:$("#category_id").val(),
        description:$("#description").val(),
    };
    let datosEnvio = JSON.stringify(datos)
    console.log(datosEnvio);
    $.ajax({
        url:"https://g468ced4b1f31f1-dbhotel.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/",
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
    $("#room").val("");
    $("#stars").val("");
    $("#category_id").val("");
    $("#description").val("");
}