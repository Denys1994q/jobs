import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShare, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// 404 сторінку створити
//  спінера прикрутити з реакт спінерс
// зарплати, замінити букву k на 000
const Job = () => {
    const router = useRouter();
    const { id } = router.query;

    const { request } = useHttp();

    const [job, setJob] = useState(null);

    const findJob = arr => {
        setJob(arr.filter(item => item.id === id));
    };

    useEffect(() => {
        request(
            "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
        ).then(data => findJob(data));
    }, []);

    return (
        <>
            {job ? (
                <div className='job'>
                    <div className='job-left'>
                        <div className='job__top'>
                            <p className='job__top-title'>Job Details</p>
                            <FontAwesomeIcon icon={faBookmark} className='fa-regular'></FontAwesomeIcon>
                            <p className='job__top-iconText job__top-iconText-save'>Save to my list</p>
                            <FontAwesomeIcon icon={faShare} className='fa-regular'></FontAwesomeIcon>
                            <p className='job__top-iconText job__top-iconText-share'>Share</p>
                        </div>
                        <button className='btn job__top-btn'>Apply now</button>
                        <div className='job__title-box'>
                            <p className='job__title-box-left'>{job[0].title}</p>
                            <div className='job__title-box-right'>
                                <p>€ {job[0].salary}</p>
                                <p>Brutto, per year</p>
                            </div>
                        </div>
                        <div className='job__date'>Posted 2 days ago</div>
                        <div className='job__description'>{job[0].description}</div>
                        <button className='btn job__bottom-btn'>Apply now</button>
                        <div className='job__subtitle'>Additional info</div>
                        <div className='job__sectionHeading'>Employment type</div>
                        <ul className='job__types'>
                            {job[0].employment_type.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <button>{item}</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='job__sectionHeading'>Benefits</div>
                        <ul className='job__types job__types-benefits'>
                            {job[0].benefits.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <button>{item}</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='job__subtitle'>Attached images</div>
                        <ul className='job__types job__types-images'>
                            {job[0].pictures.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Image src={item} width={200} height={133}></Image>
                                    </li>
                                );
                            })}
                        </ul>
                        <button className='btn__return'>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className='fa-regular fa-2x btn__return-caret'></FontAwesomeIcon>
                            <span>Return to job board</span>
                        </button>
                    </div>

                    <div className='job-right'>2</div>
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </>
    );
};

export default Job;
