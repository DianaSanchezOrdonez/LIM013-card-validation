const validator = {

  maskify: (creditCardNumber) => {
    /* let resultado = creditCardNumber.slice(0, -4).replace(/./g, '#') + creditCardNumber.slice(-4);
    return resultado */
    let salida = '',
        ultimos = creditCardNumber.slice(-4, creditCardNumber.length);

    if (creditCardNumber.length > 4) {
      for (let i = 0; i < creditCardNumber.length - 4; i++) {
        salida = salida + '#' ;
      }
      
    } else {
      return creditCardNumber;
    }
    return salida + ultimos;
  },

  isValid(creditCardNumber) {
    let suma = 0,
      len = creditCardNumber.length - 1,
      par = false;

    for (let i = len; i >= 0; i--) {
      let digito = parseInt(creditCardNumber[i]);

      if (par) {
        digito = digito * 2;

        if (digito > 9) {
          digito = (digito % 10) + 1;
        }
      }

      suma = suma + digito;
      par = !par;
    }

    if (suma !==0 && suma % 10 == 0) {
      return true
    } else {
      return false
    }

  },

};


export default validator;