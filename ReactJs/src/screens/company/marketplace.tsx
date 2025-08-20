import { useTranslation } from "react-i18next";
const Marketplace = ()=> {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
       <div className="flex justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("marketplace")}
          </h2>
          </div>
          </div>
      </main>
    </div>
  )
}
export default Marketplace