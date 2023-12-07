'use client'
import { useState } from 'react';
import styles from './Scanner.module.scss'
import CustomQrReader from './CustomQrReader/CustomQrReader';
export const Scanner = () => {
  const [data, setData] = useState('No result');
  
  return (
    <div className={styles.wrapper} style={{ padding: '0' }}>
      <CustomQrReader aspectRatio={1} setData={setData} />
      <p>{data}</p>
    </div>
  )
}