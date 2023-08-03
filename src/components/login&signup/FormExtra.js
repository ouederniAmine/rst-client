// this component component holds the template and styles for a simple "Remember me" functionality
import { useTranslation } from 'react-i18next';


export default function FormExtra(){
  const { t } = useTranslation();

    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
           {t("Remember me")}
          </label>
        </div>

        <div className="text-sm">
          <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
           {t("Forgot your password?")}
          </a>
        </div>
      </div>

    )
}