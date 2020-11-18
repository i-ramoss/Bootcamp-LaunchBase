const Mask = {
  apply(input, func) {
    setTimeout( () => {
      input.value = Mask[func](input.value)
    }, 0.1)
  },

  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value/100)
  }
}