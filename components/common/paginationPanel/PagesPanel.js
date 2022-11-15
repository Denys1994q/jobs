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
        if (jobStart !== jobs.length - 5) {
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

    // показуємо по 5 оголошень роботи на сторінці. Зараз у масив приходить з северу 20 робіт, тому створюється 4 li з цифрами.
    const showPagesNumbers =
        jobs.length > 0
            ? jobs.map((item, index) => {
                  if (index < jobs.length / 5) {
                      return (
                          <li
                              key={index}
                              onClick={() => showChosenPage(index)}
                              className={index === jobStart / 5 ? "activePageNumber" : null}>
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
    );
};

export default PagesPanel;
