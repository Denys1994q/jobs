import Link from "next/link";
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
            <h2>
                Повернення на{" "}
                <Link href='/'>
                    <a>головну сторінку</a> через 5 секунд...
                </Link>
            </h2>
        </div>
    );
};

export default NotFoundPage;
