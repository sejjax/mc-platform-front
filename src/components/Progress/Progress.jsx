import { formatMoney } from "helpers/dollarsUS"
import styles from "./Progress.module.scss"
import React from "react"

/** @type {import("react").FC<{start? : number, end : number, completed : number, title : string}>} */
export const Progress = ({ completed, end, title, start = 0 }) => {
  return (
    <div className={styles.progress}>
      <div className={styles.progress_header}>
        <div>{title}</div>
        <div>{formatMoney(completed)}</div>
      </div>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_completed}
          style={{ width: `${(completed / end) * 100}%` }}
        ></div>
      </div>
      <div className={styles.progress_footer}>
        <div>{formatMoney(start)}</div>
        <div>{formatMoney(end)}</div>
      </div>
    </div>
  )
}
