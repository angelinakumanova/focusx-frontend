import FieldError from "./FieldError";

export default interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  fieldErrors?: FieldError[];
  
}
