'use client'
import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import styles from './Scanner.module.scss'
import dynamic from 'next/dynamic';
export const Scanner = () => {
  const [data, setData] = useState('No result');
  


  const CustomQrReader = dynamic(() => import('./CustomQrReader/CustomQrReader'), { ssr: false })

  
  return (
    <div className={styles.wrapper} style={{ padding: '0' }}>
      <CustomQrReader aspectRatio={1} setData={setData} />
      <p>{data}</p>
    </div>
  )
}