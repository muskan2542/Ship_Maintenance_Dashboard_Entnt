import React, { useEffect, useState } from 'react';
import '../../styles/main.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const JobCalendar = () => {
    const [jobs, setJobs] = useState([]);
    const [ships, setShips] = useState([]);
    const [components, setComponents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem('appData')) || {
            jobs: [],
            ships: [],
            components: []
        };

        setJobs(appData.jobs);
        setShips(appData.ships);
        setComponents(appData.components);
    }, []);


    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const totalSlots = 42;
        const lastMonthDaysCount = new Date(year, month, 0).getDate();

        let days = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: lastMonthDaysCount - i,
                currentMonth: false,
                date: new Date(year, month - 1, lastMonthDaysCount - i),
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                currentMonth: true,
                date: new Date(year, month, i),
            });
        }

        while (days.length < totalSlots) {
            const nextDay = days.length - (firstDay + daysInMonth) + 1;
            days.push({
                day: nextDay,
                currentMonth: false,
                date: new Date(year, month + 1, nextDay),
            });
        }

        return days;
    };

    const calendarDays = getCalendarDays();

    const getJobsForDate = (date) => {
        const dateStr = date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');

        return jobs.filter((job) => job.scheduledDate === dateStr);
    };

    // Helper functions to get ship and component names
    const getShipNameById = (id) => {
        const ship = ships.find(s => s.id === id);
        return ship ? ship.name : 'Unknown Ship';
    };

    const getComponentNameById = (id) => {
        const component = components.find(c => c.id === id);
        return component ? component.name : 'Unknown Component';
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    return (
        <div className="job-calendar-container">
            <div className="job-calendar-header">
                <button onClick={prevMonth} className="job-calendar-nav-button">&lt;</button>
                <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={nextMonth} className="job-calendar-nav-button">&gt;</button>
            </div>

            <div className="job-calendar-grid">
                {DAYS.map((day) => (
                    <div key={day} className="job-calendar-day-label">{day}</div>
                ))}

                {calendarDays.map(({ day, currentMonth, date }, idx) => {
                    const jobsToday = getJobsForDate(date);
                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

                    return (
                        <div
                            key={idx}
                            className={`job-calendar-day-cell ${currentMonth ? '' : 'not-current-month'} ${isSelected ? 'selected' : ''}`}
                            onClick={() => currentMonth && setSelectedDate(date)}
                        >
                            <div>{day}</div>
                            {jobsToday.length > 0 && (
                                <div className="job-calendar-job-indicator">{jobsToday.length}</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="job-calendar-job-details">
                    <h3>Jobs on {selectedDate.toDateString()}</h3>
                    {getJobsForDate(selectedDate).length === 0 ? (
                        <p>No jobs scheduled.</p>
                    ) : (
                        <ul>
                            {getJobsForDate(selectedDate).map((job) => (
                                <li key={job.id}>
                                    <strong>{job.type}</strong> | Ship: {getShipNameById(job.shipId)} | Component: {getComponentNameById(job.componentId)} | Status: {job.status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobCalendar;
