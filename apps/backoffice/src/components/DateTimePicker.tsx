import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

dayjs.extend(customParseFormat);

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

interface DateTimePickerProps {
  name: string;
  value: string;
  onChange: (date : string, name:string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ name, onChange, value }) => {

  const handleDateTimeChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    const utcString = date ? date.toISOString() : ''; // Handle null date
    console.log("UTC String:", utcString);
    onChange(utcString, name);
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        locale={locale}
        format="YYYY-MM-DD HH:mm"
        disabledDate={disabledDate}
        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:') }}
        onChange={handleDateTimeChange}
        value={value ? dayjs(value) : undefined}
        name={name}
      />
    </Space>
  );
};

export default DateTimePicker;

