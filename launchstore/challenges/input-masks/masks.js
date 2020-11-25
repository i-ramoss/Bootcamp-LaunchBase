const Mask = {
  apply(input, func) {  
    input.value = input.value.replace(/\D/g, "")

    setTimeout( () => {
      input.value = Mask[func](input.value)
    }, 0.1)
  },

  formatPercentage(value) {
    value = value.replace(/\D/g, "")

    return value = new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value/10000)
  },

  formatCPF(value) {
    value = value.replace(/\D/g, "")

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
  },

  formatCNPJ(value) {
    value = value.replace(/\D/g, "")

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
  }
}