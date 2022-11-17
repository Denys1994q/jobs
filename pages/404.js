import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFoundPage = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 5000);
    }, []);

    return (
        <div className='notFoundPage'>
            <h1>Сторінка не знайдена</h1>
            <h2>Повернення на головну сторінку через 5 секунд...</h2>
        </div>
    );
};

export default NotFoundPage;
