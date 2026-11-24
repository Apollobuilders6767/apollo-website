import { useEffect, useState } from "react";
import { ATTRIBUTION_KEYS, getAttribution } from "@/lib/attribution";

// Hidden inputs so the click ids travel with the form itself. The JSON
// post reads the same store at submit time (see submitEnquiry).
export default function AttributionFields() {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(getAttribution());
  }, []);

  return (
    <div hidden aria-hidden="true">
      {ATTRIBUTION_KEYS.map((key) => (
        <input
          key={key}
          type="hidden"
          name={key}
          value={values[key] || ""}
          readOnly
        />
      ))}
    </div>
  );
}
