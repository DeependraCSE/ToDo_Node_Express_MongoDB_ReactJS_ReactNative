import { useTranslation } from "react-i18next";
import { Label } from "./commonComonent";
const ChangLang = () => {
  const { t, i18n } = useTranslation();
  const languages = [
    {key : "english", value:"en"},
    {key : "hindi", value:"hi"},
  ]
  return (
    <div className="space-y-1">
      <div>
        <Label htmlFor="" text={t("language")}/>
      </div>  
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="border p-1 rounded">
          {languages.map((item)=>{
            return(<option key={item.key} value={item.value} className="">{t(item.key)}</option>)
          })}
      </select>
    </div>
  );
};

export default ChangLang;
