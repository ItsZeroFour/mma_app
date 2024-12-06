import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const achievementsData = [
  {
    id: 1,
    title: "Чемпионы",
    description: "Ответь верно по 5 действующим чемпионам UFC среди мужчин",
  },
  {
    id: 2,
    title: "Бывшие чемпионы",
    description: "Ответь верно по 5 бывшим чемпионам UFC",
  },
  {
    id: 3,
    title: "Россия в UFC",
    description: "Ответь верно по 3 бойцам UFC из России",
  },
  {
    id: 4,
    title: "Никогда не сдавайся",
    description:
      "Ответь верно по 8 бойцам, которые ни разу не проигрывали досрочно",
  },
  {
    id: 5,
    title: "Двойные чемпионы",
    description: "Ответь верно по 5 чемпионам UFC в двух весовых категориях",
  },
  {
    id: 6,
    title: "Временные чемпионы",
    description: "Ответь верно по 5 временным чемпионам UFC",
  },
  {
    id: 7,
    title: "США в UFC",
    description: "Ответь верно по 10 бойцам из США",
  },
  {
    id: 8,
    title: "Мастера джиу-джитсу",
    description: "Ответь верно по 15 черным поясам по бразильскому джиу-джитсу",
  },
  {
    id: 9,
    title: "В бой идут одни старики",
    description: "Ответь верно по 5 бойцам старше 40 лет",
  },
];

const Achives = ({ registerLink, giftLink }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const [achievements, setAchievements] = useState(
    Array(achievementsData.length).fill(false)
  );

  useEffect(() => {
    const updatedAchievements = achievements.map((_, index) => {
      let achiveList;
      try {
        achiveList = JSON.parse(localStorage.getItem(`achive${index + 1}List`));
      } catch (error) {
        console.error("Ошибка при парсинге JSON:", error);
        achiveList = null;
      }

      let minLength;

      // Set minLength based on achievement id
      switch (index + 1) {
        case 3:
          minLength = 3;
          break;
        case 4:
          minLength = 8;
          break;
        case 7:
          minLength = 10;
          break;
        case 8:
          minLength = 15;
          break;
        default:
          minLength = 5;
      }

      return (
        achiveList &&
        Array.isArray(achiveList) &&
        achiveList.length >= minLength
      );
    });
    setAchievements(updatedAchievements);
  }, []);

  const goBack = () => {
    if (location.state?.isGameRef) {
      navigate(`/game?index=${searchParams.get("index")}`, {
        state: {
          score1: JSON.parse(localStorage.getItem("score1")),
          shuffledFootballers: JSON.parse(
            localStorage.getItem("shuffledFootballers1")
          ),
          currentIndex: JSON.parse(localStorage.getItem("currentIndex")),
          correctChoosedImages: JSON.parse(
            localStorage.getItem("correctChoosedImages")
          ),
        },
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={style.achives}>
      <div className={`wrapper ${style.achives__wrapper}`}>
        <Header giftLink={giftLink} />
        <div className={style.achives__container}>
          <div className={style.achives__top}>
            <h1>Достижения</h1>
            <button onClick={goBack} />
          </div>

          <ul>
            {achievementsData.map((achive, index) => (
              <li key={achive.id}>
                <img
                  src={require(`../../assets/achives/${achive.id}.png`)}
                  style={{
                    filter: achievements[index]
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                  }}
                  width={59}
                  height="auto"
                  alt={`achive ${achive.id}`}
                />
                <div>
                  <h3>{achive.title}</h3>
                  <p>{achive.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Achives;
