import PropTypes from "prop-types";

const Badge = ({ status }) => {
  const statusText = status || "Under Review";
  const statusLower = statusText.toLowerCase();

  let badgeClass = "badge badge-outline";
  switch (statusLower) {
    case "under review":
      badgeClass = "badge badge-info";
      break;
    case "set interview":
      badgeClass = "badge badge-warning";
      break;
    case "hired":
    case "offer accepted":
      badgeClass = "badge badge-success";
      break;
    case "rejected":
    case "offer rejected":
      badgeClass = "badge badge-error";
      break;
    case "interview scheduled":
    case "offer letter":
      badgeClass = "badge badge-primary";
      break;
    case "offer pending":
      badgeClass = "badge badge-warning";
      break;
    case "offer withdrawn":
    case "offer expired":
      badgeClass = "badge badge-secondary";
      break;
    default:
      badgeClass = "badge badge-outline";
      break;
  }

  return (
    <span className={`${badgeClass} flex items-center gap-2`}>
      {statusText}
      <span className="animate-pulse text-xs text-gray-400">⏺</span>
    </span>
  );
};

Badge.propTypes = {
  status: PropTypes.string,
};

export default Badge;
