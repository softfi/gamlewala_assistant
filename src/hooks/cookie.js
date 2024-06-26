import { useCallback } from "react";
import Cookies from 'js-cookie'

export default function useCookie() {

    const setCookie = useCallback(function (cname, cvalue, exdays) {
        // const d = new Date();
        // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        // let expires = "expires=" + d.toUTCString();
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; Secure";
        Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
        return true;
    }, []);


    const getCookie = useCallback(function useGetCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },[]);


    return [setCookie, getCookie];

};


export const deleteCookie = function () {
    document.cookie = 'authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return true;
};