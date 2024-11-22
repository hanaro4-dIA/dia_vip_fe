import { CalendarDaysIcon } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

type Props = {
  dateSet: (date: Date | null) => void;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | null; // 추가
};

export default function CalendarPopup({
  dateSet,
  minDate,
  maxDate,
  selectedDate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => setIsOpen((prev) => !prev);

  const handleDateChange = (value: Date) => {
    const date = Array.isArray(value) ? value[0] : value;
    dateSet(date);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={toggleCalendar}
        className='flex items-center bg-white rounded-lg p-1.5 pr-2 w-fit min-w-40 gap-1 justify-center focus:outline-sky-50 focus:outline-none'
      >
        <span className='w-full'>
          {selectedDate
            ? `${selectedDate.getFullYear()}.${(selectedDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}.${selectedDate
                .getDate()
                .toString()
                .padStart(2, '0')}`
            : '---- . -- . --'}
        </span>
        <CalendarDaysIcon />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 mt-1'>
          <Calendar
            onChange={(value) => handleDateChange(value as Date)}
            value={selectedDate || new Date()} // 변경
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
