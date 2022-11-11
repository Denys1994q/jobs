import Image from "next/image";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationPin, faBookmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// ГУГЛ КАРТИ
// МОБІЛЬНУ ВЕРСІЮ 
// ДЕПЛОЙ, ЧИ НОРМАЛЬНО ПРАЦЮЄ ЯКЩО ПРЯМО ОНОВИТИ СТОРІНКУ З РОБОТОЮ 

// оскільки дані при кожному новому запиті приходять трохи інші, то обрав getServerSideProps, а не getStaticProps
export async function getServerSideProps(context) {
    const { request } = useHttp();

    const res = await request(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
    );
    return {
        props: { jobs: res },
    };
}

// https://www.youtube.com/watch?v=9e-5QHpadi0 - гугл меп

export default function Home({ jobs }) {
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
                        <div className='jobsList__item-textbox'>
                            <div className='jobsList__item-textbox-title'>
                                <Link href={`/${item.id}`}>{item.title}</Link>
                            </div>
                            <div className='jobsList__item-textbox-subtitle'>
                                Department name • Allgemeines Krankenhaus der Stadt Wien - AKH
                            </div>
                            <div className='jobsList__item-textbox-place'>
                                <FontAwesomeIcon icon={faLocationPin} className='fa-regular fa-lg'></FontAwesomeIcon>
                                <p> Vienna, Austria</p>
                            </div>
                        </div>
                        <div className='jobsList__item-raiting'>
                            <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faStar} className='fa-regular'></FontAwesomeIcon>
                        </div>
                        <div className='jobsList__item-date'>
                            <FontAwesomeIcon icon={faBookmark} className='jobsList__item-date-icon'></FontAwesomeIcon>
                            <p>Posted 2 days ago</p>
                        </div>
                    </li>
                );
            })
        ) : (
            <div className='loading'>
                <ClipLoader color={"#fd7d24"} size={15} />
            </div>
        );

    // показуємо по 5 оголошень роботи на сторінці. Зараз у масив приходить з северу 20 робіт, тому створюється 4 li з цифрами.
    const showPagesNumbers =
        jobs.length > 0
            ? jobs.map((item, index) => {
                  if (index < jobs.length / 5) {
                      return (
                          <li
                              onClick={() => showChosenPage(index)}
                              className={index === jobStart / 5 ? "activePageNumber" : null}>
                              {index + 1}
                          </li>
                      );
                  }
              })
            : null;

    // показуємо наступну сторінку
    const showNextPage = () => {
        if (jobStart !== jobs.length - 5) {
            setJobStart(old => old + 5);
        }
    };

    // показуємо попередню сторінку
    const showPrevPage = () => {
        if (jobStart !== 0) {
            setJobStart(old => old - 5);
        }
    };

    // показуємо ту сторінку, по якій клікнув користувач
    const showChosenPage = pageNumber => {
        setJobStart(pageNumber * 5);
    };

    return (
        <div>
            <div className='container'>
                <ul className='jobsList'>{showJobsList}</ul>
                <div className='pagesPanel'>
                    <ul>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            style={{ color: "#7D859C", opacity: jobStart !== 0 ? "1" : ".2" }}
                            onClick={() => showPrevPage()}
                            className='fa-2x pagesPanel-leftArrow'></FontAwesomeIcon>
                        {showPagesNumbers}
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            style={{ color: "#7D859C", opacity: jobStart !== jobs.length - 5 ? "1" : ".2" }}
                            onClick={() => showNextPage()}
                            className='fa-2x pagesPanel-rightArrow'></FontAwesomeIcon>
                    </ul>
                </div>
            </div>
        </div>
    );
}
