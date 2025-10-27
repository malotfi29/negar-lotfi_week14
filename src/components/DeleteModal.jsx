import styles from "./DeleteModal.module.css"

function DeleteModal() {
  return (
    <div>
      <div className={styles.backdrop} ></div>
       <div className={styles.modal}>
        delete modal
       </div>
    </div>
  )
}

export default DeleteModal
