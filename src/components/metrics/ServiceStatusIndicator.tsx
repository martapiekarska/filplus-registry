import { SERVICE_STATUS } from "@/lib/constants";
import { ServiceStatusProps } from "@/type";
import React from "react";

export const ServiceStatusIndicator: React.FC<ServiceStatusProps> = ({
  name,
  status
}) => {
  let statusClass = "";
  switch (status) {
    case SERVICE_STATUS.online:
      statusClass = "text-green-500";
      break;
    case SERVICE_STATUS.offline:
      statusClass = "text-red-500";
      break;
    case SERVICE_STATUS.checking:
      statusClass = "text-black";
      break;
  }

  return (
    <div className="flex justify-between items-center border-b-2 py-2">
      <span className="px-4 text-lg">{name}</span>
      <span className={`px-4 text-lg ${statusClass}`}>{status}</span>
    </div>
  );
};
