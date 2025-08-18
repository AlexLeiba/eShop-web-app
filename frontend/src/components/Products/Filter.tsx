import React, { type SetStateAction } from "react";
import { Select } from "../ui/Select";
import { useSearchParams } from "react-router-dom";

type Props = {
  type: "color" | "size" | "sort" | "category";
  label?: string;
  data: { [key: string]: { value: string; title: string }[] };
};
function Filter({ type, label, data }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<SetStateAction<string>>("");
  const [lang, setLang] = React.useState<"en" | "ro">("en");

  React.useEffect(() => {
    const language = localStorage.getItem("language") || "en";
    setLang(language === "RO" ? "ro" : "en");
  }, []);

  React.useEffect(() => {
    handleAddQueryParams();
  }, [selected]);

  function handleAddQueryParams() {
    if (selected) {
      const params = new URLSearchParams(searchParams);

      switch (selected.toString().toLowerCase().replace(/\s+/g, "")) {
        case "allcolors":
          params.delete("color");
          return setSearchParams(params);

        case "allsizes":
          params.delete("size");
          return setSearchParams(params);

        case "allcategories":
          params.delete("category");
          return setSearchParams(params);

        default:
          break;
      }

      params.set(type, selected.toString().toLowerCase() as string);
      setSearchParams(params);
    }
  }

  function handleTypeOfFilter() {
    switch (type) {
      case "color":
        return data[lang];

      case "size":
        return data[lang];

      case "sort":
        return data[lang];
      case "category":
        return data[lang];

      default:
        return [];
    }
  }
  return (
    <Select
      value={searchParams.get(type) || ""}
      handleSelect={setSelected} //TODO : to use redux for any useState passign as props ( to avoid re-renders)
      label={label}
      data={handleTypeOfFilter()}
    />
  );
}

export default Filter;
