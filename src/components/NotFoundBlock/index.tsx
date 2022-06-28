import React from 'react'
import styles from './NotFoundBlock.module.scss';
export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1>Nothing found 🙁</h1>
        <p className={styles.descr}>there is no such page in our online store</p>
    </div>
  )
}