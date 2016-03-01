// Al cargar la página llamamos a la función iniciar
window.onload = iniciar;


function iniciar()
{validarNombreApellidos();
    
    // Asignamos los distintos listeners para asegurarnos de tenerlos disponibles
    document.getElementById('enviar').addEventListener('click', enviar, false);
    document.getElementById('nombre').addEventListener('blur', capitalizar.bind(null, "nombre"), false);
    document.getElementById('apellidos').addEventListener('blur', capitalizar.bind(null, "apellidos"), false);

    /* Prevenimos que se envíe el formulario por defecto al pulsar enviar
     * porque queremos manejar nosotros si hay errores y pedir confirmación */
    document.getElementById('formulario').addEventListener('click', function(event){ event.preventDefault() });
    
    // Cookie
    document.cookie="intentos=0";
}


// Función para obtener el valor de una cookie por su nombre
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 


// Método que llamamos al enviar el formulario
function enviar()
{       
    // Obtenemos la cookie "intentos"
    var intentos = parseInt(getCookie("intentos"));
    // Le sumamos 1
    intentos++;
    // La guardamos
    document.cookie="intentos="+intentos;
    // Muestra el contenido
    document.getElementById("intentos").innerHTML = "Intentos: " + intentos;
    
    // Resteamos los errores
    document.getElementById("errores").innerHTML = "";
    
    // Valida todos los campos
    if (validarNombreApellidos() == false
        || validarEdad() == false
        || validarNIF() == false
        || validarEmail() == false
        || validarProvincia() == false
        || validarFecha() == false
        || validarTelefono() == false
        || validarHora() == false)
    {   
        return false;
    }
    else
    {
        // Si valida, pide confirmación
        if (confirm("¿Deseas enviar el formulario?"))
        {
            // Envía el formulario en caso afirmativo
            document.getElementById('formulario').submit();
        }
    }
}


// Pasa a mayúsculas el valor del elemento cuya ID se le pase como argumento
function capitalizar(id)
{
    var textoMayus = document.getElementById(id).value.toUpperCase();
    document.getElementById(id).value = textoMayus;   
}


function validarNombreApellidos()
{
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    
    if(!nombre.value)
    {
        document.getElementById("errores").innerHTML += "ERROR: el nombre no puede estar en blanco.</br>";
        nombre.focus();
        return false;
    }
    if(!apellidos.value)
    {
        document.getElementById("errores").innerHTML += "ERROR: los apellidos no pueden estar en blanco.</br>";
        apellidos.focus();
        return false;
    }
    return true;
}


function validarEdad()
{
    var EDAD_REGEX = /^\d+$/;
    /* Expresión regular para números
    /^ indica comienzo de la expresión
    \d+ indica un caracter digital (número) o más
    $/ indica final de la expresión */ 
    
    var edad = document.getElementById("edad");
    var edad_valor = parseInt(edad.value, 10);
    
    if(!edad.value.match(EDAD_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: la edad debe ser un número entre 0 y 150.</br>";
        edad.focus();
        return false;
    }
    if(Number(edad_valor) < 0 || Number(edad_valor) > 150)
    {
        document.getElementById("errores").innerHTML += "ERROR: la edad debe ser un número entre 0 y 150.</br>";
        edad.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarNIF()
{
    var NIF_REGEX = /^(\d{8})+\-([A-Z])$/;
    /* Expresión regular para validar un NIF
    /^ indica comienzo de la expresión
    (\d{8}) indica que deben haber 8 caracteres seguidos y han de ser dígitos
    +\- indica que debe haber un caracter guión después de los 8 caracteres
    ([A-Z]) indica que debe haber un caracter que sea letra y maýuscula
    $/ indica final de la expresión */ 
        
    var nif = document.getElementById("nif");
    if(!nif.value.match(NIF_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: el NIF es incorrecto.</br>";
        nif.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarEmail()
{
    var EMAIL_REGEX = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    /* Expresión regular para validar un NIF_REGEX
    /^ indica comienzo de la expresión
    [a-z0-9._-] indica un bloque de sin límite de caracteres de la A a la Z (minúsculas), dígitos del 0 al 9 o signos "." "_" y "-"
    +@ indica que debe haber una arroba a continuación
    [a-z0-9._-] otro bloque igual al anterior a la arroba
    +\. indica que despúes debe haber un punto
    [a-zA-Z]{2,6} a continuación del punto un bloque sólo de letras de la A a la Z (minúsculas)
    $/ indica final de la expresión */ 
        
    var email = document.getElementById("email");
    if(!email.value.match(EMAIL_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: el email es incorrecto.</br>";
        email.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarProvincia()
{
    var provincia = document.getElementById("provincia");
    
    if(provincia.value == 0)
    {
        document.getElementById("errores").innerHTML += "ERROR: debe seleccionar una provincia.</br>";
        provincia.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarFecha()
{
    var FECHA_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    /* Expresión regular para fecha en formato dd/mm/aaaa o dd-mm-aaaa
    /^ indica el comienzo de la expresión
    ( indicio del bloque para días
    0?[1-9] indica un 0 opcional y un caracter digital del 1 al 9 (para los días del 1 al 9)
    | indica "OR" (alternativa excluyente)
    [12][0-9] indica un 1 o un 2 seguido de un caracter digital del 0 al 9 (para los días del 10 al 29)
    | indica "OR" (alternativa excluyente)
    3[01] indica número 3 seguido de un caracter 0 o 1 (para los días 30 o 31)
    ) fin del bloque para días
    [\/\-] caracter separador - o /
    ( inicio del bloque para meses
    0?[1-9] indica un 0 opcional y un número del 1 al 9 (para los meses del 1 al 9
    | indica "OR" (alternativa excluyente)
    1[012] indica un 1 y luego un número 0 1 o 2 (para los meses del 10 al 12)
    ) fin del bloque para meses
    [\/\-] caracter separador - o /
    \d{4} 4 caracteres digitales (números) para el año
    $/ indica el fin de la expresión */
    
    var fecha = document.getElementById("fecha");
    
    if(!fecha.value.match(FECHA_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: la fecha debe tener formato dd/mm/aaaa o dd-mm-aaaa</br>";
        fecha.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarTelefono()
{
    var TELEFONO_REGEX = /^\d{9}$/
    /* Expresión regular para un teléfono de 9 caracteres
    /^ indica el comienzo de la expresión
    \d{9} indica 9 caracteres numéricos
    $/ indica el fin de la expresión */
     
    var telefono = document.getElementById("telefono");
    
    if(!telefono.value.match(TELEFONO_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: el teléfono debe ser un número de 9 caracteres";
        telefono.focus();
        return false;
    }
    else
    {
        return true;
    }
}


function validarHora()
{
    var HORA_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    /* Expresión regular para horas en formato 24 horas
    /^ indica el comienzo de la expresión
    ( inicio del bloque hora
    [01]?[0-9] indica un número 0 o 1 (opcional) seguido de un número del 0 al 9 (para horas de las 00 a las 19)
    | indica "OR" (alternativa excluyente)
    2[0-3] indica el número 2 seguido de un número del 0 al 3 (para horas de las 20 a las 23)
    ) fin del bloque hora
    : caracter ":"
    [0-5][0-9] un caracter del 0 al 5 seguido de un caracter del 0 al 59
    $/ indica el fin de la expresión */
    
    var hora = document.getElementById("hora");

    if(!hora.value.match(HORA_REGEX))
    {
        document.getElementById("errores").innerHTML += "ERROR: la hora es incorrecta";
        hora.focus();
        return false;
    }
    else
    {
        return true;
    }
}