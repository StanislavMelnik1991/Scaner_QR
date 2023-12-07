'use client'
import { useState } from 'react';
import styles from './Scanner.module.scss'

import dynamic from 'next/dynamic';

export const Scanner = () => {
  const [data, setData] = useState('No result');
  const CustomQrReader = dynamic(() => import('./CustomQrReader/CustomQrReader'))
  return (
    <div className={styles.wrapper} style={{ padding: '0' }}>
      <CustomQrReader setData={setData} />
      <p>{data}</p>
    </div>
  )
}