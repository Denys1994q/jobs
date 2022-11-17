import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { pagesPanel_plusPageStart, pagesPanel_minusPageStart, pagesPanel_showChosenPageStart } from "./pagesPanelSlice";

// пагінація - по offset пропозицій робіт на одній сторінці
const PagesPanel = ({ offset }) => {
    const dispatch = useDispatch();

    const jobs = useSelector(state => state.mainPageSlice.jobsList);
    const jobStart = useSelector(state => state.pagesPanelSlice.pageStart);

    // показуємо наступну сторінку
    const showNextPage = () => {
        if (jobStart !== jobs.length - offset) {
            dispatch(pagesPanel_plusPageStart(offset));
        }
    };

    // показуємо попередню сторінку
    const showPrevPage = () => {
        if (jobStart !== 0) {
            dispatch(pagesPanel_minusPageStart(offset));
        }
    };

    // показуємо ту сторінку, по якій клікнув користувач
    const showChosenPage = pageNumber => {
        dispatch(pagesPanel_showChosenPageStart(pageNumber * offset));
    };

    const showPagesNumbers =
        jobs.length > 0
            ? jobs.map((item, index) => {
                  if (index < jobs.length / offset) {
                      return (
                          <li
                              key={index}
                              onClick={() => showChosenPage(index)}
                              className={index === jobStart / offset ? "activePageNumber" : null}>
                              {index + 1}
                          </li>
                      );
                  }
              })
            : null;

    return (
        <div className='pagesPanel'>
            <ul>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ color: "#7D859C", width: 15, height: 18, opacity: jobStart !== 0 ? "1" : ".2" }}
                    onClick={() => showPrevPage()}
                    className='pagesPanel-leftArrow'></FontAwesomeIcon>
                {showPagesNumbers}
                <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                        color: "#7D859C",
                        width: 15,
                        height: 18,
                        opacity: jobStart !== jobs.length - offset ? "1" : ".2",
                    }}
                    onClick={() => showNextPage()}
                    className='fa-2x pagesPanel-rightArrow'></FontAwesomeIcon>
            </ul>
        </div>
    );
};

export default PagesPanel;
