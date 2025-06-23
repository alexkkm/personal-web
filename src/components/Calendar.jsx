import React, { useState } from 'react';
import './Calendar.css';
import Button from './Button';
import Dropdown from './Dropdown';

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState({});
  const [eventDetails, setEventDetails] = useState({
    time: '',
    venue: '',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDayClick = day => {
    const dateString = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${day}`;
    setSelectedDate(new Date(dateString));
    setIsModalOpen(true); // Open the modal on date click
  };

  const handleAddEvent = () => {
    const newEvent = {
      ...eventDetails,
      day: selectedDate.toISOString().split('T')[0],
    };
    setEvents(prev => ({
      ...prev,
      [newEvent.day]: [...(prev[newEvent.day] || []), newEvent],
    }));
    setEventDetails({ time: '', venue: '', description: '' });
  };

  const handleDeleteEvent = eventToDelete => {
    setEvents(prev => ({
      ...prev,
      [selectedDate.toISOString().split('T')[0]]: prev[
        selectedDate.toISOString().split('T')[0]
      ].filter(event => event !== eventToDelete),
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMonthChange = e => {
    const month = e.target.value;
    setSelectedDate(new Date(selectedDate.getFullYear(), month, 1));
  };

  const handleYearChange = e => {
    const year = e.target.value;
    setSelectedDate(new Date(year, selectedDate.getMonth(), 1));
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: new Date().getFullYear() - 5 + i,
    label: new Date().getFullYear() - 5 + i,
  }));

  const daysInMonth = getDaysInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );

  return (
    <div className='Calendar'>
      <div className={isModalOpen ? 'blurred' : ''}>
        <h1>Calendar</h1>
        <div className='month-selector'>
          <Dropdown
            options={months}
            onChange={handleMonthChange}
            defaultValue={selectedDate.getMonth()}
          />
          <Dropdown
            options={years}
            onChange={handleYearChange}
            defaultValue={selectedDate.getFullYear()}
          />
        </div>
        <div className='weekdays'>
          {weekdays.map(day => (
            <div key={day} className='weekday'>
              {day}
            </div>
          ))}
        </div>
        <div className='calendar-grid'>
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className='calendar-day empty'></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => (
            <div
              key={index + 1}
              className='calendar-day'
              onClick={() => handleDayClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className='modal-background'></div>
          {/* Optional: If you want an overlay */}
          <div className='event-preview'>
            <div className='event-preview-background'></div>
            {/* Black background layer */}
            <Button label='Close' onClick={handleCloseModal} />
            <h2>Events for {selectedDate.toDateString()}</h2>
            <ul>
              {(events[selectedDate.toISOString().split('T')[0]] || []).map(
                (event, index) => (
                  <li key={index}>
                    {event.time} - {event.venue}
                    <Button
                      label='Delete'
                      onClick={() => handleDeleteEvent(event)}
                    />
                  </li>
                )
              )}
            </ul>
            <input
              type='text'
              placeholder='Time'
              value={eventDetails.time}
              onChange={e =>
                setEventDetails({ ...eventDetails, time: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='Venue'
              value={eventDetails.venue}
              onChange={e =>
                setEventDetails({ ...eventDetails, venue: e.target.value })
              }
            />
            <Button label='Add Event' onClick={handleAddEvent} />
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
