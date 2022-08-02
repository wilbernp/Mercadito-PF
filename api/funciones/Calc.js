function calc(car) {
    let subTotal = 0
    let totalProducts = 0
    car.forEach(element => {
        subTotal = (element.cantidad * element.price) + subTotal
        totalProducts += element.cantidad
    });
    let info = { subTotal, totalProducts }
    info.impuestos = Number((0.15 * info.subTotal).toFixed(2))
    info.totalPrice = info.impuestos + info.subTotal
    return info

}
module.exports = {
    calc
}