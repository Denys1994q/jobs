import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PagesPanel = ({ jobStart, setJobStart, jobs }) => {
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
