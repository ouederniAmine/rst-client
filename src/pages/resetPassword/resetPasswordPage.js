import Header from "../../components/login&signup/Header"
import ResetPassword from "../../components/login&signup/resetPassword"

export default function ResetPasswordPage(){
    return(
        <>   <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
             <Header
                heading="Reset Password"
                paragraph={"Enter at least 8 characters, including a number and a letter"}
                />
            <ResetPassword/>
        </div>
    </div>
        </>
    )
}