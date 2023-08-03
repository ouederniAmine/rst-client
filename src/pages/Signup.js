import Header from "../components/login&signup/Header";
import Signup from "../components/login&signup/Signup";
import { useTranslation } from 'react-i18next';

export default function SignupPage(){
    const { t } = useTranslation();
    return(
        
           <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
            <Header
              heading={t("Signup to create an account")}
              paragraph={t("Already have an account?")}
              linkName={t("Login")}
              linkUrl="/login"
            />
            <Signup/>
            </div>
            </div>
        
    )
}