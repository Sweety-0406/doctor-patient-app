export type Appointment = {
  id: string;
  doctorId: string;
  patientId: string;
  doctorImage: string;
  doctorName: string;
  patient: string;
  gender: "Male" | "Female" | "Other";
  age: string;
  diagnosis: string;
  phone: string;
  address: string;
  blood: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | string; 
  triage: "Non Urgent" | "Urgent" | "Emergency" | string; 
  date: string;  
  time: string; 
  payment: string;
  status: "approved" | "pending"  | "rejected" | "cancelled" | string;
};



