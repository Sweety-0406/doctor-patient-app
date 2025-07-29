
import { Appointment, DoctoSignup, PatientSignup } from "@/app/types";

export const API_BASE = process.env.NEXT_PUBLIC_BASE_API;



//DOCTOR_APIS
export const getDoctors = () =>
  fetch(`${API_BASE}/doctors`).then(res => res.json());

export const getDoctorById = (id: number) =>
  fetch(`${API_BASE}/doctors/${id}`).then(res => res.json());

export const getDoctorByEmail = (email: string) =>
  fetch(`${API_BASE}/doctors?email=${email}`);

export const doctorSignUp = (payload: DoctoSignup) =>
  fetch(`${API_BASE}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});

export const doctorLogin = (email: string) =>
  fetch(`${API_BASE}/doctors?email=${email}`);

export const updateDoctorProfile = (id: string, name: string, specialization: string) =>
  fetch(`${API_BASE}/doctors/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, specialization }),
  });
 
export const getDoctorAppointments = (doctorId: string) =>
  fetch(`${API_BASE}/appointments?doctorId=${doctorId}`);

export const updateAppointmentsByDoctor = (id: string, status: string) =>
  fetch(`${API_BASE}/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

export const doctorChangePassword = (doctorId: string, newPassword: string) =>
  fetch(`${API_BASE}/doctors/${doctorId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  });

export const getMyPatientByDoctor = (id: string) =>
  fetch(`${API_BASE}/appointments?doctorId=${id}`);





//PATIENT_APIS

export const getPatientByEmail = (email: string) =>
  fetch(`${API_BASE}/patients?email=${email}`);

export const patientSignUp = (payload: PatientSignup) =>
  fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

export const patientLogin = (email: string) =>
  fetch(`${API_BASE}/patients?email=${email}`);

export const getPatientById = (id: number) =>
  fetch(`${API_BASE}/patients/${id}`).then(res => res.json());

export const patientChangePassword = (patientId: string, newPassword: string) =>
  fetch(`${API_BASE}/patients/${patientId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  });

export const getPatientAppointments = (id: string) =>
  fetch(`${API_BASE}/appointments?patientId=${id}`)

export const postAppointment = (data: Appointment) =>
  fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
