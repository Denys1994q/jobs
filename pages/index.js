// хуки
import Image from "next/image";
import { useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { mainPage_getJobsList } from "../components/pages/mainPageSlice";
// компоненти
import PagesPanel from "../components/common/paginationPanel/PagesPanel";

// обрав getStaticProps, а не getServerSideProps тому що масив з серверу приходить один і той самий. Плюс можливість отримати динамічні роути за рахунок getStaticPaths
export async function getStaticProps(context) {
    const { request } = useHttp();

    const res = await request(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
    );
    return {
        props: { jobs: res },
    };
}

export default function Home({ jobs }) {
    const dispatch = useDispatch();

    const jobStart = useSelector(state => state.pagesPanelSlice.pageStart);
    // відображати на сторінці по offset робіт (зараз по 5)
    const offset = 5;

    // визначає скільки років пройшло з моменту опублікування оголошення про роботу (у форматі UTC, як і дані, які приходять в апі)
    const getNumberOfDays = publishedDate => {
        const timeFrom = Date.parse(new Date()) - Date.parse(publishedDate);
        const days = Math.floor(timeFrom / (1000 * 60 * 60 * 24));
        const years = days / 365;
        return Math.floor(years);
    };

    // закидаю в store масив jobs. Щоб при потребі використовувати його в інших компонентах
    useEffect(() => {
        dispatch(mainPage_getJobsList(jobs));
    }, []);

    const showJobsList = jobs.slice(jobStart, jobStart + offset).map((item, index) => {
        return (
            <li key={index} className='jobsList__item'>
                <div className='jobsList__item-photo'>
                    <Image src={item.pictures[0]} width={85} height={85} alt='job-photo' />
                </div>
                <div className='jobsList__item-main'>
                    <div className='jobsList__item-main-textbox'>
                        <div className='jobsList__item-main-textbox-title'>
                            <Link href={`/jobs/${item.id}`}>
                                <div>{item.title}</div>
                            </Link>
                        </div>
                        <div className='jobsList__item-main-textbox-subtitle'>Department name • {item.name}</div>
                        <div className='jobsList__item-main-textbox-place'>
                            <img src='/location-icon.svg' alt='bookmark-icon' />
                            <p> Vienna, Austria</p>
                        </div>
                    </div>
                    <div className='jobsList__item-main-raiting'>
                        <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                        <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                        <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                        <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                        <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                    </div>
                    <div className='jobsList__item-main-date'>
                        <img src='/bookmark-icon.svg' className='jobsList__item-main-date-icon' alt='bookmark-icon' />
                        <p>Posted {getNumberOfDays(item.createdAt)} years ago</p>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div>
            <div className='container'>
                <ul className='jobsList'>{showJobsList}</ul>
                <PagesPanel offset={offset} />
            </div>
        </div>
    );
}
