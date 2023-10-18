export const validName = new RegExp(/^[a-z ,.'-]{2,50}$/i);
export const validEmail = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
export const validPassword = new RegExp(
  /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~])[A-Za-z0-9!?@#$%^&*()\-+\\\/.,:;"'{}\[\]<>~]{8,}/
);
export const validText = new RegExp();
export const validAddress = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
export const validPostCode = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
export const validMobile = new RegExp(
  //   /(?:\(?\+\d{3})?\)?[- ]?[2-9]\d{2}[- ]?\d{4}/
  /(?<!\d)\d{10}(?!\d)/
);
