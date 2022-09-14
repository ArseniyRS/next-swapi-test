import { useFetch } from "hooks/useRequest";
import React from "react";

const PersonPropTooltip = ({ url }: { url: string }) => {
  const [isLoading, error, data] = useFetch<{ name: string; title: string }>(url);
  return (
    <div>
      {isLoading ? "Loading..." : <span>{data ? data.name || data.title : "unknown"}</span>}
    </div>
  );
};

export default PersonPropTooltip;
