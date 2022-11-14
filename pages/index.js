import Image from "next/image";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { jobs } from "../../zapaska.js";
// компоненти
import PagesPanel from "../components/PagesPanel";

// чи працює карта на мобілках 
// ДЕПЛОЙ, ЧИ НОРМАЛЬНО ПРАЦЮЄ ЯКЩО ПРЯМО ОНОВИТИ СТОРІНКУ З РОБОТОЮ

// оскільки дані при кожному новому запиті приходять різні, то обрав getServerSideProps, а не getStaticProps
// export async function getServerSideProps(context) {
//     const { request } = useHttp();

//     const res = await request(
//         `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
//     );
//     return {
//         props: { jobs: res },
//     };
// }

// Posted 2 days ago поміняти на функцію
export default function Home({ jobsNorm }) {
    // взяти jobs юзефект перший і записати в стор редакс, щоб не робити запит знову на сторінці айді

    // лічильник для того, щоб показати не всі роботи відразу, а по кілька робіт на сторінці (встановив по 5 пропозицій робіт на одній сторінці)
    const [jobStart, setJobStart] = useState(0);

    const showJobsList =
        jobs.length > 0 ? (
            jobs.slice(jobStart, jobStart + 5).map(item => {
                return (
                    <li className='jobsList__item'>
                        <div className='jobsList__item-photo'>
                            {/* <Image width={85} height={85} src={item.pictures[0]} /> */}
                            <img src={item.pictures[2]} alt='job-photo' />
                        </div>
                        <div className='jobsList__item-main'>
                            <div className='jobsList__item-main-textbox'>
                                <div className='jobsList__item-main-textbox-title'>
                                    <Link href={`/${item.id}`}>{item.title}</Link>
                                </div>
                                <div className='jobsList__item-main-textbox-subtitle'>
                                    Department name • {item.name}
                                </div>
                                <div className='jobsList__item-main-textbox-place'>
                                    <img src='/location-icon.svg' alt='bookmark-icon' />
                                    <p> Vienna, Austria</p>
                                </div>
                            </div>
                            <div className='jobsList__item-main-raiting'>
                                <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                            </div>
                            <div className='jobsList__item-main-date'>
                                <img
                                    src='/bookmark-icon.svg'
                                    className='jobsList__item-main-date-icon'
                                    alt='bookmark-icon'
                                />
                                <p>Posted 2 days ago</p>
                            </div>
                        </div>
                    </li>
                );
            })
        ) : (
            <div className='loading'>
                <ClipLoader color={"#fd7d24"} size={15} />
            </div>
        );

    return (
        <div>
            <div className='container'>
                <ul className='jobsList'>{showJobsList}</ul>
                <PagesPanel jobStart={jobStart} setJobStart={setJobStart} jobs={jobs} />
            </div>
        </div>
    );
}
