import Swal from "sweetalert2";

export const swalSuccessMessage = (msg, timer = 3000) => {
  Swal.fire({
    title: "Successful!",
    text: msg,
    icon: "success",
    confirmButtonText: "Okay",
    timer: timer,
  });
};

export const swalWarningMessage = (msg, timer = 3000) => {
  Swal.fire({
    title: "Warning!",
    text: msg,
    icon: "warning",
    showConfirmButton: true,
    timer: timer,
  });
};

export const swalErrorMessage = (msg) => {
  if (msg)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
      timer: 3000,
    });
};

export const swalConfirmationMessage = (
  text,
  confirmButtonText,
  toggle,
  onConfirm,
  title = "Warning!"
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Cancel",
    denyButtonText: confirmButtonText,
    denyButtonColor: "#7066e0",
    confirmButtonColor: "#dc3741",
    willClose: toggle,
  }).then(async (result) => {
    if (result.isConfirmed) {
      toggle();
    } else if (result.isDenied) {
      onConfirm();
    }
  });
};
