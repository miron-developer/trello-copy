import "./action.scss";

export default function TaskEditAction({ text, iconClassName, onClick }) {
  return (
    <div onClick={onClick} className="task-edit-action">
      <i className={iconClassName}></i>
      <span>{text}</span>
    </div>
  );
}
