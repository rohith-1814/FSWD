export default function ProgressBar({ value }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <div className="bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}
