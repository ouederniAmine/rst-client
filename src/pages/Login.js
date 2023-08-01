import Header from "../components/login&signup/Header"
import Login from "../components/login&signup/Login"
import { useTranslation } from 'react-i18next';

export default function LoginPage(){
    const { t, i18n } = useTranslation();
    return(
        <>   <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
             <Header
                heading={t("Login to your account")}
                paragraph={t("Don't have an account yet?")}
                linkName={t("Sign Up")}
              linkUrl="/signUp"
                />
            <Login/>
        </div>
    </div>
        </>
    )
}