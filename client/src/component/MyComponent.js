import React, { useState, useEffect } from "react";
const baseURL = "http://localhost:4000/api/v1/permits/";
// la suite du travail consistera a verifier si les reopnse sont bonnes ou pas.  et afficher les bonnes answers.
function MyComponent() {
  //charger la data du niveu et la stocker dans un etat
  const levelIndex = ["b1", "b2", "b3"];
  //const levelIndex = ["un", "deux", "trois"];
  const [storedData, setStoredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [level, setLevel] = useState(0);
  const [idQuestion, setIdQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [comparer, setComparer] = useState([]);
  const [btnDiasabled, setBtnDiasabled] = useState(true);
  const [comptest, setComptest] = useState([]);
  const [levelName, setLevelName] = useState("");
  const [myBadge, setMyBadge] = useState("");

  const loadQestion = async (index) => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      setLevelName(levelIndex[index]);
      console.log("leveNameEtIndex", levelName);
      const mydata = data[0][levelIndex[index]];
      console.log("mydata", mydata);
      setComptest(mydata[0].answer);
      const donneeSansReponse = mydata.map(
        ({ answer, ...keepRest }) => keepRest
      );
      setStoredData(donneeSansReponse);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQestion(level);
  }, []);
  storedData && console.log("storedData", storedData);
  const Options = ({ question, options, qid, badge }) => {
    return options.map((option, idx) => {
      const isSelected = selectedOptions.some(
        (item) => item.answer && item.answer === option
      );
      return (
        <div key={idx}>
          <label
            className={`label ${isSelected ? "option-selected" : ""}`}
            onClick={() => handleOptionClick(question, option, qid, badge)}
          >
            <h2>{option}</h2>
            <h2>test</h2>
          </label>
        </div>
      );
    });
  };

  const qr = storedData.length ? (
    storedData[idQuestion].questions.map((question, idx) => {
      const { question: questionText, options, qid, badge } = question;

      return (
        <div key={idx}>
          <h3>{questionText}</h3>
          <Options
            question={questionText}
            options={options}
            qid={qid}
            badge={badge}
          />
        </div>
      );
    })
  ) : (
    <p>No data stored</p>
  );

  const myId = storedData.length && storedData[idQuestion].id;
  const myText = storedData.length && <h1>{storedData[idQuestion].text}</h1>;
  const texte = storedData.length && storedData[idQuestion].text;
  const myImage = storedData.length && storedData[idQuestion].image;

  const handleOptionClick = (question, answer, qid, badge) => {
    const answerIndex = selectedOptions.findIndex((item) => item.qid === qid);
    const answerr = selectedOptions.findIndex((item) => item.answer === answer);

    if (answerIndex !== -1 && answerr !== -1) {
      const newArray = selectedOptions.filter(
        (_, index) => index !== answerIndex
      );
      setSelectedOptions(newArray);
    } else if (answerIndex !== -1 && answerr === -1) {
      const newArray = selectedOptions.filter(
        (_, index) => index !== answerIndex
      );
      setSelectedOptions(
        newArray.concat({
          answer: answer,
          question: question,
          qid: qid,
          badge: badge,
        })
      );
    } else {
      setSelectedOptions(
        selectedOptions.concat({
          answer: answer,
          question: question,
          qid: qid,
          badge: badge,
        })
      );
    }

    const x = {
      qid: 1,
      question: "What was the name of the famous ship that sunk in 1912?",
      options: ["Titanic", "Lusitania"],
      answer: "Titanic",
      badge: "x",
    };

    setBtnDiasabled(false);
  };
  const compareQuestions = (file1) => {
    const file2 = "test";
    console.log("file1 yesy", file1);
    for (let i = 0; i < file1.questions.length; i++) {
      const question1 = file1.questions[i];
      const question2 = file2.questions[i];
      console.log("question1", question1);
      console.log("question2", question2);

      if (
        JSON.stringify(question1.options) !== JSON.stringify(question2.options)
      ) {
      }

      if (
        question1.qid !== question2.qid ||
        question1.question !== question2.question ||
        JSON.stringify(question1.options) !==
          JSON.stringify(question2.options) ||
        question1.answer !== question2.answer
      ) {
        return false;
      }
    }

    return true;
  };
  const handleSubmit = () => {
    console.log("storedData", storedData[level]);
    console.log("levelName", levelName);
    const myanswer = {
      id: myId,
      text: texte,
      image: myImage,
      questions: selectedOptions,
    };
    //console.log("testsss", myanswer);
    compareQuestions(myanswer);

    // donc en gros j ai l'index de la question et le level a savoir par exemple b1 q1
  };

  /*
  const handleSubmit = () => {
    const traitement = () => {
      const ordreDeQid = selectedOptions.length
        ? selectedOptions.sort(function (a, b) {
            return a.qid - b.qid;
          })
        : null;

      const tableauOronneeDeQid = ordreDeQid.map(
        ({ question, qid, ...keepRest }) => keepRest
      );

      return tableauOronneeDeQid;
    };
    const objetToArray = (object) => {
      // rerifier cette fonction pour qu elle puisse prendre en parametre traitement
      const array = [];
      for (var i in object) {
        array.push(object[i].answer);
        console.log("array", array);
      }
      return array;
    };

    const getResult = (a1, a2) => {
      console.log("a1", a1, "a2", a2);
      var i = a1.length;
      if (i !== a2.length) return false;

      while (i--) {
        if (a1[i] !== a2[i]) return false;
      }
      console.log("vrai");
      return true;
    };
    const obj = traitement();
    const responUser = objetToArray(obj);
    getResult(comptest, responUser);

    // je voudrai verifier toute les repnses une par une
    // puis je retourn un objet des answers utilisateur
    for (let i = 0; i < responUser.length; i++) {
      if (comptest[i] === responUser[i]) {
        // si la answer est oui on ajoute juste l indice cheked= true
        // ici je met ce que j ai a faire
        // c est a dire metre la question, la bonne answer et un indice true a la answer pour le faire tchecker
      } else {
        //si la answer est non on ajoute juste l indice cheked= false
        // ici je met ce que j ai a faire
        // c est a dire metre la question, la bonne answer et un indice true a la answer pour le faire tchecker
      }
      // ici je retourne un objet contenant mes questions et answers dans l'ordre avec les indices qui conviennent
    }
  };
*/
  const verif =
    selectedOptions.length && console.log("selectedOptions", selectedOptions);
  return (
    <div
      style={{
        width: "800px",
        alignSelf: "center",
        marginTop: "5px",
        backgroundColor: "#d8d8d8",
      }}
    >
      <img
        className="question-img"
        src="https://www.abondance.com/wp-content/uploads/2018/07/pirates-des-caraibes.jpg"
        alt="Alternate text"
      />
      {myText}
      {qr}
      <button onClick={handleSubmit}> suivant</button>
    </div>
  );
}

export default MyComponent;
