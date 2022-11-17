// стилі, картинки
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLocationPin } from "@fortawesome/free-solid-svg-icons";
// хуки
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
// компоненти
import MapComponent from "../../components/common/map/Map.js";

// import { jobs } from "../../zapaska.js";

export const getStaticPaths = async () => {
    const { request } = useHttp();

    const res = await request(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
    );

    const paths = res.map(job => {
        return {
            params: { id: job.id },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async context => {
    const id = context.params.id;
    const { request } = useHttp();

    const res = await request(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
    );

    const data = res.filter(item => item.id === id);

    return {
        props: {
            job: data,
        },
    };
};

// СПІНЕР НЕ ПРАЦЮЄ
// чи потрібна умова взагалі про джоб
const Job = ({ job }) => {
    // скільки днів з моменту опублікування роботи
    const [numberOfDays, setNumberOfDays] = useState(null);
    // розбивка на абзаци блоку description
    const [descriptionStart, setDescriptionStart] = useState(null);
    const [descriptionResponsibilities, setDescriptionResponsibilities] = useState(null);
    const [descriptionCompensation, setDescriptionCompensation] = useState(null);

    // визначає скільки днів пройшло з моменту опублікування оголошення про роботу (у форматі UTC, як і дані, які приходять в апі)
    const getNumberOfDays = publishedDate => {
        const timeFrom = Date.parse(new Date()) - Date.parse(publishedDate);
        const days = Math.floor(timeFrom / (1000 * 60 * 60 * 24));
        setNumberOfDays(days);
    };

    useEffect(() => {
        if (job && job.length > 0) {
            getNumberOfDays(job[0].createdAt);

            // розбивка на абзаци
            const ind = job[0].description.indexOf("Responsopilities:");
            setDescriptionStart(job[0].description.substring(0, ind));

            const ind2 = job[0].description.indexOf("Compensation & Benefits:");
            setDescriptionResponsibilities(job[0].description.substring(ind, ind2).replace("Responsopilities:", ""));

            setDescriptionCompensation(
                job[0].description
                    .substring(ind2, job[0].description.length - 1)
                    .replace("Compensation & Benefits:", "")
            );
        }
    }, [job]);

    return (
        <>
            <div className='job'>
                <div className='job__left'>
                    <div className='job__top'>
                        <p className='job__top-title'>Job Details</p>
                        <img src='/bookmark-icon.svg' alt='bookmark-icon' />
                        <p className='job__top-iconText job__top-iconText-save'>Save to my list</p>
                        <img src='/share-icon.svg' alt='share-icon' />
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
                    <div className='job__date'>Posted {numberOfDays} days ago</div>
                    <div className='job__description'>
                        <p className='job__description-start'>{descriptionStart}</p>
                        <p className='job__description-responsibilities'>
                            <span>Responsibilities:</span> <br /> {descriptionResponsibilities}
                        </p>
                        <p className='job__description-compensation'>
                            <span>Compensation & Benefits:</span> <br /> {descriptionCompensation}
                        </p>
                    </div>
                    <button className='btn job__bottom-btn'>Apply now</button>
                    <div className='additional'>
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
                    </div>
                    <div className='attached'>
                        <div className='job__subtitle'>Attached images</div>
                        <ul className='job__types job__types-images'>
                            {job[0].pictures.map((item, i) => {
                                return (
                                    <li key={i}>
                                        {/* <Image src={item} width={200} height={133}></Image> */}
                                        <img className='attached-photo' src={item} alt='' />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='contacts job__subtitle'>Contacts</div>
                </div>

                <div className='job__right'>
                    <div className='job__right-infocard'>
                        <p className='job__right-infocard-name'>{job[0].name}</p>
                        <p className='job__right-infocard-address'>
                            <img src='/location-icon-dark.svg' alt='location-icon-dark' />
                            <span>{job[0].address}</span>
                        </p>
                        <p className='job__right-infocard-phone'>{job[0].phone},</p>
                        <p className='job__right-infocard-email'>{job[0].email}</p>
                        <MapComponent lat={job[0].location.lat} long={job[0].location.long} />
                    </div>
                    <div className='fake'></div>
                </div>
            </div>
            <Link href='/'>
                <button className='btn__return'>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className='fa-regular fa-2x btn__return-caret'></FontAwesomeIcon>
                    <span>Return to job board</span>
                </button>
            </Link>
        </>
    );
};

export default Job;
