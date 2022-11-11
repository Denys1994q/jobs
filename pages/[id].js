import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import Image from "next/image";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareAlt, faChevronLeft, faLocationPin } from "@fortawesome/free-solid-svg-icons";

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

    // const formatSalary = job && job.length > 0 ?  : null;

    useEffect(() => {
        request(
            "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
        ).then(data => findJob(data));
    }, []);

    return (
        <>
            {job && job.length > 0 ? (
                <div className='job'>
                    <div className='job__left'>
                        <div className='job__top'>
                            <p className='job__top-title'>Job Details</p>
                            <FontAwesomeIcon icon={faBookmark} className='fa-regular'></FontAwesomeIcon>
                            <p className='job__top-iconText job__top-iconText-save'>Save to my list</p>
                            <FontAwesomeIcon icon={faShareAlt} className='fa-regular'></FontAwesomeIcon>
                            <p className='job__top-iconText job__top-iconText-share'>Share</p>
                        </div>
                        <button className='btn job__top-btn'>Apply now</button>
                        <div className='job__title-box'>
                            <p className='job__title-box-left'>{job[0].title}</p>
                            <div className='job__title-box-right'>
                                <p>€ {job[0].salary.replace(/[k]/g, " 000")}</p>
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
                        <Link href='/'>
                            <button className='btn__return'>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className='fa-regular fa-2x btn__return-caret'></FontAwesomeIcon>
                                <span>Return to job board</span>
                            </button>
                        </Link>
                    </div>

                    <div className='job__right'>
                        <div className='job__right-infocard'>
                            <p className='job__right-infocard-name'>{job[0].name}</p>
                            <p className='job__right-infocard-address'>
                                <FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon>
                                <span>{job[0].address}</span>
                            </p>
                            <p className='job__right-infocard-phone'>{job[0].phone},</p>
                            <p className='job__right-infocard-email'>{job[0].email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='loading'>
                    <ClipLoader color={"#fd7d24"} size={15} />
                </div>
            )}
        </>
    );
};

export default Job;
