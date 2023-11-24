'use client'
import { Box } from '@chakra-ui/react'
import React from 'react'
import 'dayjs/locale/zh-cn';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

function page() {

  const { RangePicker } = DatePicker;

  return (
    <Space direction="vertical">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            style={{colorScheme:'light'}}
          />
    </Space>
  )
}

export default page
