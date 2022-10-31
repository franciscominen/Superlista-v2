export function getDynamicPlaceholder(category: String) {
    switch (category) {
        case 'bebidas':
        case 'cosmetica':
        case 'despensa':
        case 'junk-food':
            return 'Marca, cantidad y/o tamaño.'
        case 'panaderia':
        case 'pastas':
            return "Peso, cantidad y/o sabor."
        case 'carnes':
            return "Corte, kilos o gramos, veggie."
        case 'verduleria':
            return "Peso, cantidad y/o color."
        case 'lacteos':
            return "Marca, cantidad, light y/o tipo."
        case 'limpieza':
            return "Marca, cantidad y/o tipo."
        default:
            return "Agregue una nota"
    }
}
