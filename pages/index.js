import Image from "next/image";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationPin, faBookmark } from "@fortawesome/free-solid-svg-icons";

// https://www.youtube.com/watch?v=9e-5QHpadi0 - гугл меп 
// по ходу треба самому сторінки зробити знизу. Взяти масив з 20 робіт і поділити по 5.. у верстку засунути перші 5 і далі по кліку перерендерювати додаючи наступні +5 через функції роботи з масивом типу splice. Перший раз від 0 до 5, далі від 6 до 10, далі від 11 до 15...
export default function Home() {
    const { request } = useHttp();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        request(
            "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
        ).then(data => setJobs(data));
    }, []);

    const showJobsList =
        jobs.length > 0
            ? jobs.map(item => {
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
            : null;

    return (
        <div>
            <div className='container'>
                <ul className='jobsList'>{showJobsList}</ul>
            </div>
        </div>
    );
}
