import flatpickr from 'flatpickr';
import { Georgian } from 'flatpickr/dist/l10n/ka.js';

let datetimePickerInstance;

export const initFlatpickr = () => {
  datetimePickerInstance = flatpickr('#datetimePicker', {
    locale: Georgian,
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    time_24hr: true,
    minDate: 'today',
    onChange: (selectedDates) => {
      if (selectedDates.length > 0) {
        const startTime = selectedDates[0];
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour
        
        document.getElementById('selectedStartTime').value = startTime.toISOString();
        document.getElementById('selectedEndTime').value = endTime.toISOString();
      }
    }
  });
};

export const getDateTimePickerInstance = () => datetimePickerInstance; 