import styles from "./AddModal.module.css";

function Input({
  name,
  label,
  register,
  validation,
  errors,
  required,
  ...rest
}) {
  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input id={name} autoComplete="off" {...register(name, validation)} />
      {errors[name] && <p className={styles.error}>{errors[name]?.message}</p>}
    </div>
  );
}

export default Input;
