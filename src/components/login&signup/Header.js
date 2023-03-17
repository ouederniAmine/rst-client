//  <Header/> component that render on both the login and signup pages for quick information and navigation
import logo from "../../assets/logo white.jpg"

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    style={{width: "17rem", height: "17em"}}
                    className="rounded-full"
                    onClick={() => window.location.replace(
                        "https://recoveryst.net"
                      )}
                    src={logo}
                    />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <a href={linkUrl} className="font-medium text-sky-600 hover:text-sky-500">
                {linkName}
            </a>
            </p>
        </div>
    )
}