export default interface FieldError {
  field: string;
  message: string;
  rejectedValue: any;
  code: string;
}
