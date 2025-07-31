"use client"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarApi } from '@fullcalendar/core';
import { useEffect, useRef, useState } from 'react';
import { Appointment } from '@/app/types';
import { EventContentArg } from '@fullcalendar/core';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


export type EventDataType = {
  title: string;
  start: string;
  extendedProps: {
    status: string,
    patientId: string,
    age: string,
    blood: string,
    diagnosis: string,
    gender: string,
    phone: string,
    payment: string,
    triage: string,
  };
};

interface MyCalendarProps {
  scheduleData: Appointment[];
}

const MyCalendar = ({scheduleData}:MyCalendarProps)=>{
    const [events, setEvents] = useState<EventDataType[]>([]);
    const calendarRef = useRef<FullCalendar | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(()=>{
        const eventData: EventDataType[] = scheduleData.map((item: Appointment) => ({
            title: item.patient,
            start: item.date,
            extendedProps: {
                status: item.status,
                patientId: item.patientId,
                age: item.age,
                blood: item.blood,
                diagnosis: item.diagnosis,
                gender: item.gender,
                phone: item.phone,
                payment: item.payment,
                triage: item.triage,
            }
        }));
        setEvents(eventData);
    },[scheduleData])

    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent(clickInfo.event);
        setIsDialogOpen(true);
    };



    const handleWindowResize = () => {
        const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
        if (calendarApi) {
        if (window.innerWidth < 768) {
            calendarApi.changeView('dayGridDay');
        } else {
            calendarApi.changeView('dayGridMonth');
        }
        }
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return(
        <div className="bg-white flex flex-col justify-center items-center p-6 rounded shadow-md w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">My Schedule</h3>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
                height="auto"
                contentHeight="auto"
                fixedWeekCount={false}
                dayMaxEventRows={2}
                eventBackgroundColor="#14B8A6"
                eventBorderColor='#14B8A6'
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-lg shadow-lg bg-white">
                    <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold text-teal-500">
                        Appointment Details
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Here is the detailed information about this appointment.
                    </DialogDescription>
                    </DialogHeader>

                    {selectedEvent && (
                    <div className="mt-4 space-y-3 text-sm text-gray-700">
                        <div className="grid grid-cols-2 gap-y-2">
                        <p className="font-semibold">Patient Name:</p>
                        <p>{selectedEvent.title}</p>

                        <p className="font-semibold">Date of Appointment:</p>
                        <p>{new Date(selectedEvent.start).toLocaleString()}</p>

                        <p className="font-semibold">Status:</p>
                        <p>
                            <span
                            className={`px-2 py-1 text-xs rounded text-white ${
                                selectedEvent.extendedProps.status === "approved"
                                ? "bg-green-500"
                                : selectedEvent.extendedProps.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            >
                            {selectedEvent.extendedProps.status}
                            </span>
                        </p>

                        <p className="font-semibold">Age:</p>
                        <p>{selectedEvent.extendedProps.age}</p>

                        <p className="font-semibold">Blood Group:</p>
                        <p>{selectedEvent.extendedProps.blood}</p>

                        <p className="font-semibold">Diagnosis:</p>
                        <p>{selectedEvent.extendedProps.diagnosis}</p>

                        <p className="font-semibold">Gender:</p>
                        <p>{selectedEvent.extendedProps.gender}</p>

                        <p className="font-semibold">Phone:</p>
                        <p>{selectedEvent.extendedProps.phone}</p>

                        <p className="font-semibold">Payment:</p>
                        <p
                            className={`${
                            selectedEvent.extendedProps.payment === "Paid"
                                ? "text-green-600 font-semibold"
                                : "text-red-600 font-semibold"
                            }`}
                        >
                            {selectedEvent.extendedProps.payment}
                        </p>

                        <p className="font-semibold">Triage:</p>
                        <span
                            className={`font-semibold border w-24 flex justify-center py-1 rounded-full ${
                            selectedEvent.extendedProps.triage === "Emergency"
                            ? "text-red-600 bg-red-100 px-2 border-red-500"
                            : selectedEvent.extendedProps.triage === "Non Urgent"
                            ? "text-yellow-500 bg-yellow-100 px-2 border-yellow-500"
                            : selectedEvent.extendedProps.triage === "Urgent"
                            ? "text-orange-500 bg-orange-100 px-2 border-orange-500"
                            : "text-gray-600 bg-gray-100 px-2 border-gray-600"
                        }`}
                        >{selectedEvent.extendedProps.triage}</span>
                        </div>
                    </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    )
}

const renderEventContent = (eventInfo: EventContentArg) => {
  const status = eventInfo.event.extendedProps.status;
  const badgeColor =
    status === 'approved'
      ? 'bg-green-500'
      : status === 'pending'
      ? 'bg-yellow-500'
      : status === 'rejected'
      ? 'bg-red-500'
      : 'bg-gray-400';

  return (
    <div className="p-2 rounded-sm shadow-lg bg-teal-50 border border-teal-500 text-xs">
      <p className="font-semibold text-gray-700">{eventInfo.event.title}</p>
      <p className="text-red-500">{eventInfo.timeText}</p>
      {status && (
        <span className={`inline-block mt-1 px-2 py-0.5 text-white text-[10px] rounded ${badgeColor}`}>
          {status}
        </span>
      )}
    </div>
  );
};

export default MyCalendar