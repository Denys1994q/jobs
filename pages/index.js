import ClipLoader from "react-spinners/ClipLoader";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { mainPage_getJobsList } from "../components/pages/mainPageSlice";

// import { jobs } from "../../zapaska.js";
// компоненти
import PagesPanel from "../components/common/paginationPanel/PagesPanel";

// чи працює карта на мобілках
// ДЕПЛОЙ, ЧИ НОРМАЛЬНО ПРАЦЮЄ ЯКЩО ПРЯМО ОНОВИТИ СТОРІНКУ З РОБОТОЮ

// оскільки дані при кожному новому запиті приходять різні, то обрав getServerSideProps, а не getStaticProps
export async function getServerSideProps(context) {
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

    // визначає скільки років пройшло з моменту опублікування оголошення про роботу (у форматі UTC, як і дані, які приходять в апі)
    const getNumberOfDays = publishedDate => {
        const timeFrom = Date.parse(new Date()) - Date.parse(publishedDate);
        const days = Math.floor(timeFrom / (1000 * 60 * 60 * 24));
        const years = days / 365;
        return Math.floor(years);
    };

    useEffect(() => {
        dispatch(mainPage_getJobsList(jobs));
    }, []);

    const showJobsList =
        jobs.length > 0 ? (
            jobs.slice(jobStart, jobStart + 5).map((item, index) => {
                return (
                    <li key={index} className='jobsList__item'>
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
                                <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                                <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                                <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                                <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                                <img src='/star-icon.svg' className='star-icon' alt='star-icon' />
                            </div>
                            <div className='jobsList__item-main-date'>
                                <img
                                    src='/bookmark-icon.svg'
                                    className='jobsList__item-main-date-icon'
                                    alt='bookmark-icon'
                                />
                                <p>Posted {getNumberOfDays(item.createdAt)} years ago</p>
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
                <PagesPanel offset={5} />
            </div>
        </div>
    );
}
