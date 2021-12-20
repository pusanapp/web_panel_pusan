exports.statusMapper = (status) => {
  switch (status) {
    case 'NEW ORDER' :
      return 'Pesanan Baru'
    case 'PAID ORDER' :
      return 'Pesanan Sudah Dibayar'
    case 'ON PROCESS' :
      return 'Pesanan Sedang Diproses'
    case 'ON DELIVERY' :
      return 'Pesanan Dalam Pengiriman'
    case 'DONE' :
      return 'Pesanan Selesai'
    case 'CANCEL' :
      return 'Pesanan Dibatalkan'
    default:
      return 'Tidak Diketahui'
  }
}

exports.onDelivery = (status) => {
  switch (status) {
    case 'ON DELIVERY':
      return true
    default:
      return false
  }
}

exports.doneTransaction = (status) => {
  switch (status) {
    case 'DONE':
      return true
    default:
      return false
  }
}
