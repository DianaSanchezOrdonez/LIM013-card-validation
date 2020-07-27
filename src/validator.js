const validator = {

  maskify: (creditCardNumber) => {
    let resultado = creditCardNumber.slice(0, -4).replace(/./g, '#') + creditCardNumber.slice(-4);
    return resultado
    //return resultado.replace(/([#]{4})/g, '$1 ');
  },

  isValid(creditCardNumber) {
    let suma = 0,
      len = creditCardNumber.length - 1,
      par = false;

    for (let i = len; i >= 0; i--) {
      let digito = creditCardNumber.charAt(i),
        num = parseInt(digito, 10);

      if (par) {
        num *= 2
      }
      if (num > 9) {
        num -= 9
      }

      suma += num;
      par = !par;
    }
    let result = (suma % 10) == 0;
    return result;

  }
};


export default validator;