const tarjeta = document.querySelector('#tarjeta'),
     btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
     formulario = document.querySelector('#formulario-tarjeta'),
     numeroTarjeta =  document.querySelector('#tarjeta .numero'),
     nombreTarjeta = document.querySelector('#tarjeta .nombre'),
     logoMarca =  document.querySelector('#logo-marca'),
     firma = document.querySelector('#tarjeta .firma p'),
     mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
     yearExpiracion = document.querySelector('#tarjeta #expiracion .year');
     ccv = document.querySelector('#tarjeta .ccv');

// Volteamos la tarjeta para mostrar el frente
const mostrarFrente = ()=>{
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active')
    }
}

/*--------------Girar Tarjeta --------------------*/  
tarjeta.addEventListener('click',()=>{
    tarjeta.classList.toggle('active');
});

/*--------------Select Mes --------------------*/
for(let i  = 1; i <= 12 ; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    formulario.selectMes.appendChild(option)
}

/*--------------Select Año --------------------*/
const yearActual = new Date().getFullYear();
let toYear = yearActual + 10;
for (let i = yearActual; i <= toYear; i++){
    let option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    formulario.selectYear.appendChild(option)
}

/*--------------Input Numero de Tarjeta --------------------*/
formulario.inputNumero.addEventListener('keyup',(e)=>{
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

    numeroTarjeta.textContent = valorInput

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####'
        logoMarca.innerHTML = ''
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/visa.png';
        logoMarca.appendChild(imagen);

    }else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/mastercard.png';
        logoMarca.appendChild(imagen);

    }

    // Volteamos la tarjeta para mostrar el frente
    mostrarFrente();
});

// Input nombre de Tarjeta 
formulario.inputNombre.addEventListener('keyup',(e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g,'');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = 'JHON DOE'
    }

    mostrarFrente();

});

// Select Mes
formulario.selectMes.addEventListener('change',(e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// Select Año
formulario.selectYear.addEventListener('change',(e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// ccv
formulario.inputCCV.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active')
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    //Eliminando espacios en blanco
    .replace(/\s/g, '')
    
    //Eliminar las letras 
    .replace(/\D/g, '')

    ccv.textContent = formulario.inputCCV.value
    
});
