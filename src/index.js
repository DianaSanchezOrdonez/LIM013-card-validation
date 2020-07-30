import validator from './validator.js';

const tarjeta = document.querySelector('#tarjeta'),
    formulario = document.querySelector('#formulario-tarjeta'),
    creditCardNumber = document.querySelector('#tarjeta .numero'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre'),
    firma = document.querySelector('#tarjeta .firma p'),
    mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
    yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
    ccv = document.querySelector('#tarjeta .ccv'),
    seccion1 = document.querySelector('#pantalla-wave'),
    seccion2 = document.querySelector('#contenedor'),
    boton = document.querySelector('#boton');


seccion2.classList.add('hide')
//Enviar a la seccion2
boton.addEventListener('click', () => {
    seccion1.classList.add('hide');
    seccion2.classList.add('show');
})

//Campos disabled
formulario.inputNombre.disabled = true;
formulario.inputNombre.disabled = true;
formulario.selectMes.disabled = true;
formulario.selectYear.disabled = true;
formulario.inputCCV.disabled = true;
formulario.enviar.disabled = true;

// Volteamos la tarjeta para mostrar el frente
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active')
    }
}

/*--------------Girar Tarjeta --------------------*/
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

/*--------------Select Mes --------------------*/
for (let i = 1; i <= 12; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    formulario.selectMes.appendChild((option))
}

/*--------------Select Año --------------------*/
const yearActual = new Date().getFullYear();
let toYear = yearActual + 10;
for (let i = yearActual; i <= toYear; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    formulario.selectYear.appendChild(option)
}

/*--------------Input Numero de Tarjeta -------------------*/
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
        //Eliminando espacios en blanco
        .replace(/\s/g, '')

        //Eliminar las letras 
        .replace(/\D/g, '')

        //Espacio en blanco cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')

        //Elimina el ultimo espaciado
        .trim();

    let valorJunto = valorInput.replace(/ /g, '')
    creditCardNumber.textContent = validator.maskify(valorJunto);

    if (valorInput == '') {
        creditCardNumber.textContent = '#### #### #### ####'
    }

    let metodo = validator.isValid(valorJunto)

    // Volteamos la tarjeta para mostrar el frente

    mostrarFrente();
    disabledCampos(metodo);

});


console.log('metodo', validator.isValid('1234567890'))
console.log('metodo', validator.isValid('79927398713'))
console.log('metodo', validator.isValid('4137894711755904'))

// Inhabilitar campos input
const disabledCampos = (value) => {
    if (value == false || value == '' || value == null) {

        formulario.inputNombre.disabled = true;
        formulario.inputNombre.disabled = true;
        formulario.selectMes.disabled = true;
        formulario.selectYear.disabled = true;
        formulario.inputCCV.disabled = true;
        formulario.enviar.disabled = true;
        document.querySelector('.formulario_validacion-estado').classList.add('formulario_validacion-estado-activo');
        document.querySelector('.grupo .formulario_input-error').classList.add('formulario_input-error-activo');
        document.querySelector('.grupo .formulario_validacion-correcto').classList.remove('formulario_validacion-correcto-activo')
      
    } else {

        formulario.inputNombre.disabled = false;
        formulario.inputNombre.disabled = false;
        formulario.selectMes.disabled = false;
        formulario.selectYear.disabled = false;
        formulario.inputCCV.disabled = false;
        formulario.enviar.disabled = false;
        document.querySelector('.formulario_validacion-estado').classList.remove('formulario_validacion-estado-activo');
        document.querySelector('.grupo .formulario_input-error').classList.remove('formulario_input-error-activo');
        document.querySelector('.grupo .formulario_validacion-correcto').classList.add('formulario_validacion-correcto-activo')
    }
}

// Input nombre de Tarjeta 
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'JHON DOE'
    }
    mostrarFrente();

});

// Select Mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// Select Año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// ccv
formulario.inputCCV.addEventListener('keyup', () => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active')
    }

    formulario.inputCCV.value = formulario.inputCCV.value
        //Eliminando espacios en blanco
        .replace(/\s/g, '')

        //Eliminar las letras 
        .replace(/\D/g, '')

    ccv.textContent = formulario.inputCCV.value

});