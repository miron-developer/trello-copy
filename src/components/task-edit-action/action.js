import "./action.scss";

export default function TaskEditAction({ text, Icon, onClick }) {
  return (
    <div onClick={onClick} className="task-edit-action">
      {Icon}

      <span>{text}</span>
    </div>
  );
}
