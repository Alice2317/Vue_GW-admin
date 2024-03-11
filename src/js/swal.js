import Swal from 'sweetalert2'

export function toast (state = 'success', title = '') {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false
  })
  Toast.fire({
    icon: state,
    title
  })
}

export function alert () {
  return Swal.fire({
    title: '您確定刪除嗎?',
    text: '刪除後無法恢復',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪除',
    cancelButtonText: '取消'
  })
}
